<?php defined('WPINC') || die; ?>

<div class="wrap">
    <h1 class="wp-heading-inline"><?= esc_html(get_admin_page_title()); ?></h1>
    <?= $notices; ?>
    <div class="glsr-addons wp-clearfix">
    <?php
        $template->render('partials/addons/addon', [
            'context' => [
                'description' => _x('This add-on allows your site visitors to filter, search, and sort your reviews. Apply now to test the unreleased beta version.', 'admin-text', 'site-reviews'),
                'link' => 'https://niftyplugins.com/plugins/site-reviews-filters/',
                'slug' => 'filters',
                'title' => 'Filters',
            ],
            'plugin' => 'site-reviews-filters/site-reviews-filters.php',
        ]);
        $template->render('partials/addons/addon', [
            'context' => [
                'description' => _x('This add-on allows your site visitors to submit images with their reviews. Apply now to test the unreleased beta version.', 'admin-text', 'site-reviews'),
                'link' => 'https://niftyplugins.com/plugins/site-reviews-images/',
                'slug' => 'images',
                'title' => 'Images',
            ],
            'plugin' => 'site-reviews-images/site-reviews-images.php',
        ]);
    ?>
    </div>
</div>
