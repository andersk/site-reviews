<?php

namespace GeminiLabs\SiteReviews\Migrations;

use GeminiLabs\SiteReviews\Contracts\MigrateContract;
use GeminiLabs\SiteReviews\Database;
use GeminiLabs\SiteReviews\Database\CountManager;
use GeminiLabs\SiteReviews\Database\Query;
use GeminiLabs\SiteReviews\Database\SqlSchema;
use GeminiLabs\SiteReviews\Install;

class Migrate_5_9_0 implements MigrateContract
{
    /**
     * Run migration.
     */
    public function run(): bool
    {
        $this->repairDatabase(); // fix orphaned rows and foreign indexes
        glsr(CountManager::class)->recalculate();
        return $this->migrateDatabase();
    }

    protected function install(): void
    {
        glsr(SqlSchema::class)->createTables();
        glsr(SqlSchema::class)->addForeignConstraints();
        glsr(Database::class)->deleteInvalidPostAssignments();
        glsr(Database::class)->deleteInvalidTermAssignments();
        glsr(Database::class)->deleteInvalidUserAssignments();
        glsr(Database::class)->deleteInvalidReviews();
    }

    protected function isDatabaseVersionUpdated(): bool
    {
        if (glsr(SqlSchema::class)->columnExists('ratings', 'terms')) {
            if (!glsr(Database::class)->version('1.1')) {
                update_option(glsr()->prefix.'db_version', '1.1');
            }
            return true;
        }
        return false;
    }

    protected function migrateDatabase(): bool
    {
        $table = glsr(SqlSchema::class)->table('ratings');
        if ($this->isDatabaseVersionUpdated()) {
            return true;
        }
        glsr(Database::class)->dbQuery(glsr(Query::class)->sql("
            ALTER TABLE {$table}
            ADD terms tinyint(1) NOT NULL DEFAULT '1'
            AFTER url
        "));
        if ($this->isDatabaseVersionUpdated()) { // @phpstan-ignore-line
            return true; // check again after updating the database
        }
        glsr_log()->error(sprintf('Database table [%s] could not be altered, column [terms] was not added.', $table));
        return false;
    }

    protected function repairDatabase(): void
    {
        require_once ABSPATH.'/wp-admin/includes/plugin.php';
        if (is_plugin_active_for_network(plugin_basename(glsr()->file))) {
            foreach (glsr(Install::class)->sites() as $siteId) {
                switch_to_blog($siteId);
                $this->install();
                restore_current_blog();
            }
            return;
        }
        $this->install();
    }
}
