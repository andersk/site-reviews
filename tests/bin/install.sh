#!/usr/bin/env bash
# v2.0.0

if [ $# -lt 3 ]; then
    echo "usage: $0 <db-name> <db-user> <db-pass> [db-host] [wp-version] [force download]"
    exit 1
fi

DB_NAME=$1
DB_USER=$2
DB_PASS=$3
DB_HOST=${4-localhost}
WP_VERSION=${5-latest}
FORCE=${6-false}

WP_TESTS_DIR=${WP_TESTS_DIR-/tmp/wordpress-tests-lib}
WP_CORE_DIR=${WP_CORE_DIR-/tmp/wordpress}

download() {
    if [ `which curl` ]; then
        curl -s "$1" > "$2";
    elif [ `which wget` ]; then
        wget -nv -O "$2" "$1"
    fi
}

if [[ $WP_VERSION =~ [0-9]+\.[0-9]+(\.[0-9]+)? ]]; then
    WP_TESTS_TAG="tags/$WP_VERSION"
else
    # http serves a single offer, whereas https serves multiple. we only want one
    download http://api.wordpress.org/core/version-check/1.7/ /tmp/wp-latest.json
    grep '[0-9]+\.[0-9]+(\.[0-9]+)?' /tmp/wp-latest.json
    LATEST_VERSION=$(grep -o '"version":"[^"]*' /tmp/wp-latest.json | sed 's/"version":"//')
    if [[ -z "$LATEST_VERSION" ]]; then
        echo "Latest WordPress version could not be found"
        exit 1
    fi
    WP_TESTS_TAG="tags/$LATEST_VERSION"
fi

if [[ $WP_TESTS_TAG == *"beta"* ]]
then
    WP_TESTS_TAG="trunk"
fi

set -ex

install_wp() {
    if [ $FORCE == 'true' ]; then
        rm -Rf $WP_CORE_DIR
    fi
    if [ -d $WP_CORE_DIR ]; then
        return;
    fi
    mkdir -p $WP_CORE_DIR
    if [ $WP_VERSION == 'latest' ]; then
        local ARCHIVE_NAME='latest'
    else
        local ARCHIVE_NAME="wordpress-$WP_VERSION"
    fi
    download https://wordpress.org/${ARCHIVE_NAME}.tar.gz  /tmp/wordpress.tar.gz
    tar --strip-components=1 -zxmf /tmp/wordpress.tar.gz -C $WP_CORE_DIR/
    download https://raw.github.com/markoheijnen/wp-mysqli/master/db.php $WP_CORE_DIR/wp-content/db.php
    # we need Elementor for the code coverage
    download https://downloads.wordpress.org/plugin/elementor.latest-stable.zip /tmp/elementor.zip
    unzip -d $WP_CORE_DIR/wp-content/plugins/ /tmp/elementor.zip
}

install_test_suite() {
    if [ $FORCE == 'true' ]; then
        rm -Rf $WP_TESTS_DIR
    fi
    # portable in-place argument for both GNU sed and Mac OSX sed
    if [[ $(uname -s) == 'Darwin' ]]; then
        local ioption='-i .bak'
    else
        local ioption='-i'
    fi
    # set up testing suite if it doesn't yet exist
    if [ ! -d $WP_TESTS_DIR ]; then
        # set up testing suite
        mkdir -p $WP_TESTS_DIR
        svn co --quiet https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/includes/ $WP_TESTS_DIR/includes
        svn co --quiet https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/data/ $WP_TESTS_DIR/data
        svn co --quiet https://develop.svn.wordpress.org/${WP_TESTS_TAG}/src/ $WP_TESTS_DIR/src
    fi
    cd $WP_TESTS_DIR
    if [ ! -f wp-tests-config.php ]; then
        download https://develop.svn.wordpress.org/${WP_TESTS_TAG}/wp-tests-config-sample.php "$WP_TESTS_DIR"/wp-tests-config.php
        sed $ioption "s:__DIR__.'/src/':'$WP_CORE_DIR/':" "$WP_TESTS_DIR"/wp-tests-config.php
        sed $ioption "s/youremptytestdbnamehere/$DB_NAME/" "$WP_TESTS_DIR"/wp-tests-config.php
        sed $ioption "s/yourusernamehere/$DB_USER/" "$WP_TESTS_DIR"/wp-tests-config.php
        sed $ioption "s/yourpasswordhere/$DB_PASS/" "$WP_TESTS_DIR"/wp-tests-config.php
        sed $ioption "s|localhost|${DB_HOST}|" "$WP_TESTS_DIR"/wp-tests-config.php
    fi
}

install_db() {
    # parse DB_HOST for port or socket references
    local PARTS=(${DB_HOST//\:/ })
    local DB_HOSTNAME=${PARTS[0]};
    local DB_SOCK_OR_PORT=${PARTS[1]};
    local EXTRA=""
    if ! [ -z $DB_HOSTNAME ] ; then
        if [ $(echo $DB_SOCK_OR_PORT | grep -e '^[0-9]\{1,\}$') ]; then
            EXTRA=" --host=$DB_HOSTNAME --port=$DB_SOCK_OR_PORT --protocol=tcp"
        elif ! [ -z $DB_SOCK_OR_PORT ] ; then
            EXTRA=" --socket=$DB_SOCK_OR_PORT"
        elif ! [ -z $DB_HOSTNAME ] ; then
            EXTRA=" --host=$DB_HOSTNAME --protocol=tcp"
        fi
    fi
    # create database
    mysqladmin create $DB_NAME --user="$DB_USER" --password="$DB_PASS"$EXTRA
}

install_wp
install_test_suite
install_db
