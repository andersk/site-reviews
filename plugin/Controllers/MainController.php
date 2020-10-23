<?php

namespace GeminiLabs\SiteReviews\Controllers;

use GeminiLabs\SiteReviews\Commands\RegisterPostType;
use GeminiLabs\SiteReviews\Commands\RegisterShortcodes;
use GeminiLabs\SiteReviews\Commands\RegisterTaxonomy;
use GeminiLabs\SiteReviews\Commands\RegisterWidgets;

class MainController extends Controller
{
    /**
     * @return void
     * @action admin_footer
     * @action wp_footer
     */
    public function logOnce()
    {
        glsr_log()->logOnce();
    }

    /**
     * @return void
     * @action init
     */
    public function registerPostType()
    {
        $this->execute(new RegisterPostType());
    }

    /**
     * @return void
     * @action init
     */
    public function registerShortcodes()
    {
        $this->execute(new RegisterShortcodes([
            'site_reviews',
            'site_reviews_form',
            'site_reviews_summary',
        ]));
    }

    /**
     * @return void
     * @action init
     */
    public function registerTaxonomy()
    {
        $this->execute(new RegisterTaxonomy([
            'hierarchical' => true,
            'meta_box_cb' => [glsr(MetaboxController::class), 'renderTaxonomyMetabox'],
            'public' => false,
            'rest_controller_class' => RestCategoryController::class,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'show_ui' => true,
        ]));
    }

    /**
     * @return void
     * @action widgets_init
     */
    public function registerWidgets()
    {
        $this->execute(new RegisterWidgets([
            'site-reviews' => [
                'description' => _x('Site Reviews: Display your recent reviews.', 'admin-text', 'site-reviews'),
                'name' => _x('Recent Reviews', 'admin-text', 'site-reviews'),
            ],
            'site-reviews-form' => [
                'description' => _x('Site Reviews: Display a form to submit reviews.', 'admin-text', 'site-reviews'),
                'name' => _x('Submit a Review', 'admin-text', 'site-reviews'),
            ],
            'site-reviews-summary' => [
                'description' => _x('Site Reviews: Display a summary of your reviews.', 'admin-text', 'site-reviews'),
                'name' => _x('Summary of Reviews', 'admin-text', 'site-reviews'),
            ],
        ]));
    }
}
