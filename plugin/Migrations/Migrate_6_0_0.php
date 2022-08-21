<?php

namespace GeminiLabs\SiteReviews\Migrations;

use GeminiLabs\SiteReviews\Contracts\MigrateContract;
use GeminiLabs\SiteReviews\Database\OptionManager;

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
        do_action('litespeed_purge_all'); // @litespeedcache
        return true;
    }

    protected function migrateAddonBlocks(): void
    {
        if (glsr()->addon('site-reviews-filters')) {
            global $wpdb;
            $wpdb->query("
                UPDATE {$wpdb->posts} p
                SET p.post_content = REPLACE(p.post_content, '<!-- wp:site-reviews/filter ', '<!-- wp:site-reviews/filters ')
                WHERE p.post_status = 'publish'
            ");
        }
    }
}
