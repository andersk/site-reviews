<?php defined('WPINC') || die; ?>

<p>This page shows all of the available shortcode options with examples of how to use them.</p>

<div id="shortcodes-01" class="glsr-card postbox">
    <div class="glsr-card-header">
        <h2>[site_reviews]</h2>
        <button type="button" class="handlediv" aria-expanded="true">
            <span class="screen-reader-text"><?= esc_attr_x('Toggle documentation panel', 'admin-text', 'site-reviews'); ?></span>
            <span class="toggle-indicator" aria-hidden="true"></span>
        </button>
    </div>
    <div class="inside">
        <h3>This shortcode displays your most recently submitted reviews.</h3>

        <div class="notice inline notice-info notice-alt">
            <p>Each example below demonstrates a different shortcode option. However, you may of course combine multiple options together (separated with a space) in a single shortcode.</p>
        </div>

        <p class="glsr-heading">assigned_posts</p>
        <p>Include the "assigned_posts" attribute to limit reviews to those assigned posts, pages, or other public post types. Accepted values are a numerical <a href="https://pagely.com/blog/find-post-id-wordpress/">WordPress Post ID</a>, <code>post_id</code> which automatically uses the ID of the current page, or <code>parent_id</code> which automatically uses the ID of the parent page. Separate multiple values with a comma.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews_summary] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default assigned_posts value is: <code>""</code></p>
        <pre><code>[site_reviews assigned_posts="post_id"]</code></pre>

        <p class="glsr-heading">assigned_terms</p>
        <p>Include the "assigned_terms" attribute to limit reviews to those assigned categories. Accepted values are either a category ID or slug. Separate multiple values with a comma.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews_summary] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default assigned_terms value is: <code>""</code></p>
        <pre><code>[site_reviews assigned_terms="13,14"]</code></pre>

        <p class="glsr-heading">assigned_users</p>
        <p>Include the "assigned_users" attribute to limit reviews to those assigned users. Accepted values are either a user ID or username. Separate multiple values with a comma.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews_summary] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default assigned_users value is: <code>""</code></p>
        <pre><code>[site_reviews assigned_users="1,2"]</code></pre>

        <p class="glsr-heading">class</p>
        <p>Include the "class" attribute to add custom CSS classes to the shortcode.</p>
        <p>The default class value is: <code>""</code></p>
        <pre><code>[site_reviews class="my-reviews full-width"]</code></pre>

        <p class="glsr-heading">display</p>
        <p>Include the "display" attribute to change the number of reviews that are displayed.</p>
        <p>The default display value is: <code>"5"</code></p>
        <pre><code>[site_reviews display="20"]</code></pre>

        <p class="glsr-heading">fallback</p>
        <p>Include the "fallback" attribute to change the text that is shown when there are no reviews to display. This option overrides the default fallback text if enabled in the plugin settings.</p>
        <p>The default fallback value is: <code>""</code></p>
        <pre><code>[site_reviews fallback="No reviews found."]</code></pre>

        <p class="glsr-heading">hide</p>
        <p>Include the "hide" attribute to hide any specific fields you don't want to show. If all fields are hidden, the shortcode will not be displayed.</p>
        <p>The default hide value is: <code>""</code></p>
        <pre><code>[site_reviews hide="assigned_to,author,avatar,content,date,rating,response,title"]</code></pre>

        <p class="glsr-heading">id</p>
        <p>Include the "id" attribute to add a custom HTML id attribute to the shortcode. This is especially useful when using pagination with the ajax option.</p>
        <p>The default id value is: <code>""</code></p>
        <pre><code>[site_reviews id="type-some-random-text-here"]</code></pre>

        <p class="glsr-heading">offset</p>
        <p>Include the "offset" attribute to displace or pass over a number of reviews. For example, [site_reviews&nbsp;display=5&nbsp;offset=2] will show 5 reviews, skipping the first two. It is NOT recommended to use this option with pagination enabled.</p>
        <p>The default offset value is: <code>"0"</code></p>
        <pre><code>[site_reviews offset="1"]</code></pre>

        <p class="glsr-heading">pagination</p>
        <p>Include the "pagination" attribute to display reviews in multiple pages (i.e. Page 1, Page 2, etc.). The value can be "true", "ajax", or "false". The "ajax" value allows you to load the next page of reviews without loading a new page. When using pagination, only one [site_reviews] shortcode can be used on a page at a time.</p>
        <p>The default pagination value is: <code>"false"</code></p>
        <pre><code>[site_reviews pagination="ajax"]</code></pre>

        <p class="glsr-heading">rating</p>
        <p>Include the "rating" attribute to set the <em>minimum</em> star-rating of reviews to display. By default, the shortcode displays all 1-5 star reviews.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews_summary] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default rating value is: <code>"1"</code></p>
        <pre><code>[site_reviews rating="4"]</code></pre>

        <p class="glsr-heading">schema</p>
        <p>Include the "schema" attribute to enable the aggregate rating and review schema for your reviews in Google. The difference between this and the schema option in the [site_reviews_summary] shortcode is that this one generates both the aggregate ratings schema and the review schema for each individual review that is visible on the page, while the other only generates the aggregate ratings schema.</p>
        <p><span class="required">Important:</span> This attribute should only be used once on a page to avoid duplicate schemas; keep that in mind if you are using more than one [site_reviews] and/or [site_reviews_summary] shortcodes on the same page.</p>
        <p>The default schema value is: <code>"false"</code></p>
        <pre><code>[site_reviews schema="true"]</code></pre>
    </div>
</div>

<div id="shortcodes-02" class="glsr-card postbox">
    <div class="glsr-card-header">
        <h2>[site_reviews_form]</h2>
        <button type="button" class="handlediv" aria-expanded="true">
            <span class="screen-reader-text"><?= esc_attr_x('Toggle documentation panel', 'admin-text', 'site-reviews'); ?></span>
            <span class="toggle-indicator" aria-hidden="true"></span>
        </button>
    </div>
    <div class="inside">
        <h3>This shortcode displays the review submission form.</h3>

        <div class="notice inline notice-info notice-alt">
            <p>Each example below demonstrates a different shortcode option. However, you may of course combine multiple options together (separated with a space) in a single shortcode.</p>
        </div>

        <p class="glsr-heading">assigned_posts</p>
        <p>Include the "assigned_posts" attribute to automatically assign submitted reviews to those assigned posts, pages, or other public post types. Accepted values are a numerical <a href="https://pagely.com/blog/find-post-id-wordpress/">WordPress Post ID</a>, <code>post_id</code> which automatically uses the ID of the current page, or <code>parent_id</code> which automatically uses the ID of the parent page. Separate multiple values with a comma.</p>
        <p>The default assigned_posts value is: <code>""</code></p>
        <pre><code>[site_reviews_form assigned_posts="post_id"]</code></pre>

        <p class="glsr-heading">assigned_terms</p>
        <p>Include the "assigned_terms" attribute to automatically assign submitted reviews to those assigned categories. Accepted values are either a category ID or slug. Separate multiple values with a comma.</p>
        <p>The default assigned_terms value is: <code>""</code></p>
        <pre><code>[site_reviews_form assigned_terms="13,14"]</code></pre>

        <p class="glsr-heading">assigned_users</p>
        <p>Include the "assigned_users" attribute to automatically assign submitted reviews to those assigned users. Accepted values are either a user ID or username. Separate multiple values with a comma.</p>
        <p>The default assigned_users value is: <code>""</code></p>
        <pre><code>[site_reviews_form assigned_users="1,2"]</code></pre>

        <p class="glsr-heading">class</p>
        <p>Include the "class" attribute to add custom CSS classes to the shortcode form.</p>
        <p>The default class value is: <code>""</code></p>
        <pre><code>[site_reviews_form class="my-reviews-form full-width"]</code></pre>

        <p class="glsr-heading">description</p>
        <p>Include the "description" attribute to display a custom shortcode description.</p>
        <p>The default description value is: <code>""</code></p>
        <pre><code>[site_reviews_form description="Required fields are marked with an asterisk (*)"]</code></pre>

        <p class="glsr-heading">hide</p>
        <p>Include the "hide" attribute to exclude certain fields in the form. If all fields are hidden, the shortcode will not be displayed.</p>
        <p>The default hide value is: <code>""</code></p>
        <pre><code>[site_reviews_form hide="content,email,name,rating,terms,title"]</code></pre>

        <p class="glsr-heading">id</p>
        <p>This shortcode should only be used on a page once. However, if for any reason you need to include more than one on a page, add the "id" attribute to each with some random text to make it a unique shortcode form.</p>
        <p>The default id value is: <code>""</code></p>
        <pre><code>[site_reviews_form id="type-some-random-text-here"]</code></pre>
    </div>
</div>

<div id="shortcodes-03" class="glsr-card postbox">
    <div class="glsr-card-header">
        <h2>[site_reviews_summary]</h2>
        <button type="button" class="handlediv" aria-expanded="true">
            <span class="screen-reader-text"><?= esc_attr_x('Toggle documentation panel', 'admin-text', 'site-reviews'); ?></span>
            <span class="toggle-indicator" aria-hidden="true"></span>
        </button>
    </div>
    <div class="inside">
        <h3>This shortcode displays a summary of your reviews.</h3>

        <div class="notice inline notice-info notice-alt">
            <p>Each example below demonstrates a different shortcode option. However, you may of course combine multiple options together (separated with a space) in a single shortcode.</p>
        </div>

        <p class="glsr-heading">assigned_posts</p>
        <p>Include the "assigned_posts" attribute to limit reviews to those assigned posts, pages, or other public post types. Accepted values are a numerical <a href="https://pagely.com/blog/find-post-id-wordpress/">WordPress Post ID</a>, <code>post_id</code> which automatically uses the ID of the current page, or <code>parent_id</code> which automatically uses the ID of the parent page. Separate multiple values with a comma.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default assigned_posts value is: <code>""</code></p>
        <pre><code>[site_reviews_summary assigned_posts="post_id"]</code></pre>

        <p class="glsr-heading">assigned_terms</p>
        <p>Include the "assigned_terms" attribute to limit reviews to those assigned categories. Accepted values are either a category ID or slug. Separate multiple values with a comma.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default assigned_terms value is: <code>""</code></p>
        <pre><code>[site_reviews_summary assigned_terms="13,14"]</code></pre>

        <p class="glsr-heading">assigned_users</p>
        <p>Include the "assigned_users" attribute to limit reviews to those assigned users. Accepted values are either a user ID or username. Separate multiple values with a comma.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default assigned_users value is: <code>""</code></p>
        <pre><code>[site_reviews_summary assigned_users="1,2"]</code></pre>

        <p class="glsr-heading">class</p>
        <p>Include the "class" attribute to add custom CSS classes to the shortcode.</p>
        <p>The default class value is: <code>""</code></p>
        <pre><code>[site_reviews_summary class="my-reviews-summary full-width"]</code></pre>

        <p class="glsr-heading">hide</p>
        <p>By default the shortcode displays all fields. Use the "hide" attribute to hide any specific fields you don't want to show. Include the "if_empty" value to hide the shortcode when there are no reviews to summarise. If all fields are hidden, the shortcode will not be displayed.</p>
        <p>The default hide value is: <code>""</code></p>
        <pre><code>[site_reviews_summary hide="bars,if_empty,rating,stars,summary"]</code></pre>

        <p class="glsr-heading">labels</p>
        <p>The "labels" attribute allows you to enter custom labels for the percentage bar levels (from high to low), each level should be separated with a comma. However, rather than using this attribute to change the labels it's recommended to instead create a custom translation for them in the <code><a href="<?= admin_url('edit.php?post_type='.glsr()->post_type.'&page=settings#tab-translations'); ?>">Settings &rarr; Translations</a></code> page.</p>
        <p>The default labels value is: <code>"Excellent,Very good,Average,Poor,Terrible"</code></p>
        <pre><code>[site_reviews_summary labels="5 star,4 star,3 star,2 star,1 star"]</code></pre>

        <p class="glsr-heading">rating</p>
        <p>Include the "rating" attribute to set the <em>minimum</em> star-rating of reviews to use.</p>
        <p><span class="required">Important:</span> If you are using this shortcode together with the [site_reviews] shortcode, make sure to set the same attribute value for both shortcodes.</p>
        <p>The default rating value is: <code>"1"</code></p>
        <pre><code>[site_reviews_summary rating="3"]</code></pre>

        <p class="glsr-heading">schema</p>
        <p>Include the "schema" attribute to enable the aggregate rating schema for your reviews in Google. The difference between this and the schema option in the [site_reviews] shortcode is that this one only generates the aggregate ratings schema, while the other generates both the aggregate ratings schema and the review schema for each individual review that is visible on the page. If you have the choice, enable this attribute on the [site_reviews] shortcode instead.</p>
        <p><span class="required">Important:</span> This attribute should only be used once on a page to avoid duplicate schemas; keep that in mind if you are using more than one [site_reviews] and/or [site_reviews_summary] shortcodes on the same page.</p>
        <p>The default schema value is: <code>"false"</code></p>
        <pre><code>[site_reviews_summary schema="true"]</code></pre>

        <p class="glsr-heading">text</p>
        <p>The "text" attribute allows you to change the summary text. Available template tags to use are, "{rating}" which represents the calculated average rating, "{max}" which represents the maximum star rating available, and "{num}" which represents the total number of reviews. However, rather than using this attribute to change the summary text it's recommended to instead create a custom translation for it in the <code><a href="<?= admin_url('edit.php?post_type='.glsr()->post_type.'&page=settings#tab-translations'); ?>">Settings &rarr; Translations</a></code> page. That way, you will be able to customize both the singular (1 review) and plural (2 reviews) summary texts.</p>
        <p>The default text value is: <code>"{rating} out of {max} stars (based on {num} reviews)"</code></p>
        <pre><code>[site_reviews_summary text="{num} customer reviews"]</code></pre>
    </div>
</div>
