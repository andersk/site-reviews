<div class="glsr-card postbox">
    <h3 class="glsr-card-heading">
        <button type="button" class="glsr-accordion-trigger" aria-expanded="false" aria-controls="hooks-filter-polyfill">
            <span class="title">Optimize CSS and javascript files</span>
            <span class="badge code">site-reviews/optimize/&lt;asset_type&gt;</span>
            <span class="icon"></span>
        </button>
    </h3>
    <div id="hooks-filter-polyfill" class="inside">
        <div class="glsr-notice-inline components-notice is-warning">
            <p class="components-notice__content"><a href="https://wpjohnny.com/why-you-shouldnt-combine-css-js-performance-reasons/" target="_blank">Merging files should be avoided on HTTP/2 servers</a> as it may actually decrease performance.</a></p>
        </div>
        <div class="glsr-notice-inline components-notice is-info">
            <p class="components-notice__content">If you're using a caching plugin or if you don't have any add-ons installed, then you <em>don't</em> need to use these hooks.</p>
        </div>
        <p>Use this hook if you want to merge the CSS of Site Reviews and any installed add-ons into a single file.</p>
        <pre><code class="language-php">/**
 * Paste this in your active theme's functions.php file.
 * @return bool
 */
add_filter('site-reviews/optimize/css', '__return_true');</code></pre>
        <p>Use this hook if you want to merge the javascript files of Site Reviews and any installed add-ons into a single file.</p>
        <pre><code class="language-php">/**
 * Paste this in your active theme's functions.php file.
 * @return bool
 */
add_filter('site-reviews/optimize/js', '__return_true');</code></pre>
    </div>
</div>
