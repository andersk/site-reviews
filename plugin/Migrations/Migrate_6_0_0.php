<?php

namespace GeminiLabs\SiteReviews\Migrations;

use GeminiLabs\SiteReviews\Contracts\MigrateContract;
use GeminiLabs\SiteReviews\Database;
use GeminiLabs\SiteReviews\Database\OptionManager;
use GeminiLabs\SiteReviews\Database\SqlSchema;

class Migrate_6_0_0 implements MigrateContract
{
    /**
     * Run migration.
     */
    public function run(): bool
    {
        $version = 4; // remove settings from versions older than v5
        while ($version) {
            delete_option(OptionManager::databaseKey($version--));
        }
        $this->migrateAddonBlocks();
        $this->migrateAddonImages();
        $this->migrateDatabase();
        $this->migrateDatabaseSchema();
        return true;
    }

    public function migrateAddonBlocks(): void
    {
        if (glsr()->addon('site-reviews-filters')) {
            global $wpdb;
            glsr(Database::class)->dbQuery("
                UPDATE {$wpdb->posts} p
                SET p.post_content = REPLACE(p.post_content, '<!-- wp:site-reviews/filter ', '<!-- wp:site-reviews/filters ')
                WHERE p.post_status = 'publish'
            ");
        }
    }

    public function migrateAddonImages(): void
    {
        if (glsr()->addon('site-reviews-images')) {
            global $wpdb;
            glsr(Database::class)->dbQuery("
                UPDATE {$wpdb->posts} p
                SET p.post_status = 'inherit'
                WHERE p.post_type = 'attachment' AND p.post_name LIKE 'site-reviews-image%'
            ");
        }
    }

    public function migrateDatabase(): void
    {
        $result = true;
        if (!$this->insertTableColumnIsVerified()) {
            $result = false;
        }
        if (!$this->insertTableColumnScore()) {
            $result = false;
        }
        if ($result) {
            update_option(glsr()->prefix.'db_version', '1.2');
        }
    }

    public function migrateDatabaseSchema(): void
    {
        global $wpdb;
        $indexes = [
            'assigned_posts' => 'post_id',
            'assigned_terms' => 'term_id',
            'assigned_users' => 'user_id',
        ];
        foreach ($indexes as $assignedTable => $columnName) {
            if (!glsr(SqlSchema::class)->isInnodb($assignedTable)) {
                continue;
            }
            $table = glsr(SqlSchema::class)->table($assignedTable);
            $uniqueIndex = "glsr_{$assignedTable}_rating_id_{$columnName}_unique";
            $constraints = glsr(Database::class)->dbGetCol("
                SELECT CONSTRAINT_NAME
                FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
                WHERE CONSTRAINT_SCHEMA = '{$wpdb->dbname}' AND TABLE_NAME = '{$table}'
            ");
            // add primary key first!
            if (!in_array('PRIMARY', $constraints)) {
                glsr(Database::class)->dbQuery("
                    ALTER TABLE {$table}
                    ADD PRIMARY KEY (rating_id,{$columnName})
                ");
            }
            // remove unique key
            if (in_array($uniqueIndex, $constraints)) {
                glsr(Database::class)->dbQuery("
                    ALTER TABLE {$table}
                    DROP INDEX {$uniqueIndex}
                ");
            }
        }
    }

    protected function insertTableColumnIsVerified(): bool
    {
        $table = glsr(SqlSchema::class)->table('ratings');
        if (!glsr(SqlSchema::class)->columnExists('ratings', 'is_verified')) {
            glsr(Database::class)->dbQuery("
                ALTER TABLE {$table}
                ADD is_verified tinyint(1) NOT NULL DEFAULT '0'
                AFTER is_pinned
            ");
        }
        if (!glsr(SqlSchema::class)->columnExists('ratings', 'is_verified')) {
            glsr_log()->error(sprintf('Database table [%s] could not be altered, column [is_verified] was not added.', $table));
            return false;
        }
        return true;
    }

    protected function insertTableColumnScore(): bool
    {
        $table = glsr(SqlSchema::class)->table('ratings');
        if (!glsr(SqlSchema::class)->columnExists('ratings', 'score')) {
            glsr(Database::class)->dbQuery("
                ALTER TABLE {$table}
                ADD score tinyint(1) NOT NULL DEFAULT '0'
                AFTER terms
            ");
        }
        if (!glsr(SqlSchema::class)->columnExists('ratings', 'score')) {
            glsr_log()->error(sprintf('Database table [%s] could not be altered, column [score] was not added.', $table));
            return false;
        }
        return true;
    }
}
