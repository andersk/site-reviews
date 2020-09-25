<?php

defined('WPINC') || die;

/**
 * Add human-readable capability names
 * @return void
 * @see https://wordpress.org/plugins/members/
 */
add_action('members_register_caps', function () {
    members_register_cap('delete_others_site-reviews', [
        'label' => _x("Delete Others' Reviews", 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('delete_site-reviews', [
        'label' => _x('Delete Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('delete_private_site-reviews', [
        'label' => _x('Delete Private Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('delete_published_site-reviews', [
        'label' => _x('Delete Approved Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('edit_others_site-reviews', [
        'label' => _x("Edit Others' Reviews", 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('edit_site-reviews', [
        'label' => _x('Edit Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('edit_private_site-reviews', [
        'label' => _x('Edit Private Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('edit_published_site-reviews', [
        'label' => _x('Edit Approved Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('publish_site-reviews', [
        'label' => _x('Approve Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('read_private_site-reviews', [
        'label' => _x('Read Private Reviews', 'admin-text', 'site-reviews'),
    ]);
    members_register_cap('create_site-review', [
        'label' => _x('Create Review (inactive)', 'admin-text', 'site-reviews'),
    ]);
});

/**
 * Provide a partial, native PHP implementation for the Mbstring extension.
 * @return bool
 * @see https://github.com/symfony/polyfill-mbstring
 */
add_action('plugins_loaded', function () {
    if (glsr()->filterBool('support/multibyte', true)) {
        require_once __DIR__.'/vendors/symfony/polyfill-mbstring/bootstrap.php';
    }
});

/**
 * Exclude the reCAPTCHA script from being defered
 * @param array $scriptHandles
 * @return array
 * @see https://wordpress.org/plugins/speed-booster-pack/
 */
add_filter('sbp_exclude_defer_scripts', function ($scriptHandles) {
    $scriptHandles[] = 'site-reviews/google-recaptcha';
    return array_keys(array_flip($scriptHandles));
});

/**
 * Fix to display all reviews when sorting by rank
 * @param array $query
 * @return array
 * @see https://searchandfilter.com/
 */
add_filter('sf_edit_query_args', function ($query) {
    if (!empty($query['meta_key']) && '_glsr_ranking' == $query['meta_key']) {
        unset($query['meta_key']);
        $query['meta_query'] = [
            'relation' => 'OR',
            ['key' => '_glsr_ranking', 'compare' => 'NOT EXISTS'], // this comes first!
            ['key' => '_glsr_ranking', 'compare' => 'EXISTS'],
        ];
    }
    return $query;
}, 20);

/**
 * Fix checkboxes for the Divi plugin style
 * @param \GeminiLabs\SiteReviews\Modules\Html\Builder $instance
 * @return void
 * @see https://www.elegantthemes.com/gallery/divi/
 */
add_action('site-reviews/customize/divi', function ($instance) {
    if ('label' == $instance->tag && 'checkbox' == $instance->args['type']) {
        $instance->args['text'] = '<i></i>'.$instance->args['text'];
        return;
    }
});

/**
 * Load the Ninja Forms (v3) CSS if the plugin style is selected.
 * @return void
 * @see https://ninjaforms.com/
 */
function glsr_is_ninja_forms_compatible() {
    return class_exists('Ninja_Forms')
        && class_exists('NF_Display_Render')
        && method_exists('Ninja_Forms', 'get_setting')
        && method_exists('NF_Display_Render', 'enqueue_styles_display');
}
add_action('enqueue_block_editor_assets', function () {
    if ('ninja_forms' === glsr_get_option('general.style') && glsr_is_ninja_forms_compatible()) {
        NF_Display_Render::enqueue_styles_display(Ninja_Forms::$url.'assets/css/');
    }
});
add_filter('site-reviews/config/styles/ninja_forms', function ($config) {
    if (glsr_is_ninja_forms_compatible()) {
        $formClass = 'nf-style-'.Ninja_Forms()->get_setting('opinionated_styles');
        $config = glsr_set($config, 'classes.form', $formClass);
    }
    return $config;
});
add_action('site-reviews/customize/ninja_forms', function ($instance) {
    if (glsr_is_ninja_forms_compatible()) {
        NF_Display_Render::enqueue_styles_display(Ninja_Forms::$url.'assets/css/');
    }
});

/**
 * Clears the WP-Super-Cache plugin cache after a review has been submitted
 * @param \GeminiLabs\SiteReviews\Review $review
 * @param \GeminiLabs\SiteReviews\Commands\CreateReview $request
 * @return void
 * @see https://wordpress.org/plugins/wp-super-cache/
 */
add_action('site-reviews/review/created', function ($review, $request) {
    if (!function_exists('wp_cache_post_change')) {
        return;
    }
    wp_cache_post_change($request->post_id);
    foreach ($review->assigned_posts as $postId) {
        if ($postId != $request->post_id) {
            wp_cache_post_change($postId);
        }
    }
}, 10, 2);

/**
 * Fix Star Rating control when review form is used inside an Elementor Pro Popup
 * @return void
 * @see https://elementor.com/
 */
add_action('wp_enqueue_scripts', function () {
    if (defined('ELEMENTOR_PRO_VERSION') && 0 > version_compare('2.7.0', ELEMENTOR_PRO_VERSION)) {
        wp_add_inline_script(glsr()->id,
            '"undefined"!==typeof jQuery&&jQuery(document).on("elementor/popup/show",function(){new GLSR.Forms()})'
        );
    }
}, 1000);
