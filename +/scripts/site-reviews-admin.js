/** global: GLSR, jQuery, StarRating, wp */

import Ajax from '@/admin/ajax.js';
import autosize from 'autosize';
import ColorPicker from '@/admin/color-picker.js';
import Event from '@/public/event.js';
import Filter from '@/admin/filter.js';
import Filters from '@/admin/filters.js';
import Forms from '@/admin/forms.js';
import Metabox from '@/admin/metabox.js';
import Notices from '@/admin/notices.js';
import Pinned from '@/admin/pinned.js';
import Pointers from '@/admin/pointers.js';
import Prism from 'prismjs';
import Search from '@/admin/search.js';
import Sections from '@/admin/sections.js';
import Shortcode from '@/admin/shortcode.js';
import StarRating from '@/public/starrating.js';
import Status from '@/admin/status.js';
import Sync from '@/admin/sync.js';
import Tabs from '@/admin/tabs.js';
import TextareaResize from '@/admin/textarea-resize.js';
import Tools from '@/admin/tools.js';
import tippy, {followCursor} from 'tippy.js';
import Verified from '@/admin/verified.js';

GLSR.autosize = autosize;
GLSR.keys = {
    ALT: 18,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    TAB: 9,
    UP: 38,
};

GLSR.Event = Event;
GLSR.stars = StarRating();
GLSR.Tippy = { tippy, plugins: { followCursor }}

function site_reviews_footer_notice () {
    if (jQuery('.glsr-notice-footer').length) {
        jQuery('#wpbody-content').addClass('has-footer-notice');
    }
}

function discover_site_reviews () {
    if ('no' === GLSR.isLicensed) {
        jQuery('.post-type-site-review.edit-php .page-title-action').after('<a href="' + GLSR.premiumurl + '" target="_blank" id="glsr-premium-button" class="button button-primary">' + GLSR.text.premium + '</a>');
    }
}

jQuery(function ($) {
    Prism.highlightAll();
    GLSR.notices = new Notices();
    GLSR.shortcode = new Shortcode('.glsr-mce');
    GLSR.stars.init('.glsr-field-rating select', { clearable: true });

    GLSR.Tippy.tippy('.glsr-tooltip', {appendTo: () => document.body});
    $('.glsr-tooltip').each((i, el) => {
        const content = el.dataset.tippyContent;
        const syntax = el.dataset.syntax;
        if (el._tippy && content && syntax && Prism.languages[syntax]) {
            el._tippy.setContent('<pre class="language-' + syntax + '"><code>' + Prism.highlight(content, Prism.languages[syntax], syntax) + '</code></pre>')
        }
    });

    ColorPicker();
    new Filters();
    $('.glsr-filter').each((index, filterEl) => {
        new Filter(filterEl);
    })
    new Forms('form.glsr-form');
    new Metabox();
    new Pinned();
    new Verified();
    new Pointers();
    new Search('#glsr-search-posts', {
        action: 'search-posts',
        onInit: function () {
            this.el.find('.glsr-remove-button').on('click', this.onUnassign_.bind(this));
        },
        onResultClick: function (ev) {
            var result = $(ev.currentTarget);
            var template = wp.template('glsr-assigned-posts');
            var entry = {
                id: result.data('id'),
                name: 'post_ids[]',
                url: result.data('url'),
                title: result.text(),
            };
            if (template) {
                var entryEl = $(template(entry));
                entryEl.find('.glsr-remove-button').on('click', this.onUnassign_.bind(this));
                this.el.find('.glsr-selected-entries').append(entryEl);
                this.reset_();
            }
            this.options.searchEl.focus();
        },
    });
    new Search('#glsr-search-translations', {
        action: 'search-strings',
        onInit: function () {
            this.makeSortable_();
        },
        onResultClick: function (ev) {
            var result = $(ev.currentTarget);
            var entry = result.data('entry');
            var template = wp.template('glsr-string-' + (entry.p1 ? 'plural' : 'single'));
            entry.index = this.options.entriesEl.children().length;
            entry.prefix = this.options.resultsEl.data('prefix');
            if (template) {
                this.options.entriesEl.append(template(entry));
                this.options.exclude.push({ id: entry.id });
                this.options.results = this.options.results.filter(function (i, el) {
                    return el !== result.get(0);
                });
            }
            this.setVisibility_();
        },
    });
    new Search('#glsr-search-users', {
        action: 'search-users',
        onInit: function () {
            this.el.find('.glsr-remove-button').on('click', this.onUnassign_.bind(this));
        },
        onResultClick: function (ev) {
            var result = $(ev.currentTarget);
            var template = wp.template('glsr-assigned-users');
            var entry = {
                id: result.data('id'),
                name: 'user_ids[]',
                url: result.data('url'),
                title: result.text(),
            };
            if (template) {
                var entryEl = $(template(entry));
                entryEl.find('.glsr-remove-button').on('click', this.onUnassign_.bind(this));
                this.el.find('.glsr-selected-entries').append(entryEl);
                this.reset_();
            }
            this.options.searchEl.focus();
        },
    });
    new Status('a.glsr-toggle-status');
    new Sections(); // this comes before Tabs
    new Tabs();
    new TextareaResize();
    new Tools();
    new Sync();

    var trackValue = function () {
        this.dataset.glsrTrack = this.value;
    };
    $('select[data-glsr-track]').each(trackValue);
    $('select[data-glsr-track]').on('change', trackValue);

    $('.glsr-card.postbox:not(.open)').addClass('closed')
        .find('.glsr-accordion-trigger').attr('aria-expanded', false)
        .closest('.glsr-nav-view').addClass('collapsed');

    if ($('.glsr-support-step').not(':checked').length < 1) {
        $('.glsr-card-result').removeClass('hidden');
    }

    $('.glsr-support-step').on('change', function () {
        var action = $('.glsr-support-step').not(':checked').length > 0 ? 'add' : 'remove';
        $('.glsr-card-result')[action + 'Class']('hidden');
    });

    $('.glsr-card.postbox .glsr-card-heading').on('click', function () {
        var parent = $(this).parent();
        var view = parent.closest('.glsr-nav-view');
        var action = parent.hasClass('closed') ? 'remove' : 'add';
        parent[action + 'Class']('closed').find('.glsr-accordion-trigger').attr('aria-expanded', action !== 'add');
        action = view.find('.glsr-card.postbox').not('.closed').length > 0 ? 'remove' : 'add';
        view[action + 'Class']('collapsed');
    });

    $('.post-type-site-review #the-list').on('click', '.editinline', function() {
        var row = $(this).closest('tr');
        $(':input[data-name="post_content"]').val('');
        $(':input[name="_response"]').val('');
        setTimeout(function () {
            $(':input[data-name="post_content"]').val(row.find('._post_content').text());
            $(':input[name="_response"]').val(row.find('._response').text());
        }, 50);
    });

    const $bulkActionNotice = $('#glsr-notices .bulk-action-notice').on('click', 'button.button-link', function() {
        $(this)
            .toggleClass('bulk-action-errors-collapsed')
            .attr('aria-expanded', !$(this).hasClass('bulk-action-errors-collapsed'));
        $bulkActionNotice.find('.bulk-action-errors').toggleClass('hidden');
    });

    discover_site_reviews();
    site_reviews_footer_notice();

    $('.glsr-youtube-button').on('click', function () {
        let id = this.dataset.id;
        let iframe = $(document.createElement('iframe'));
        iframe.attr('frameborder', '0');
        iframe.attr('allowfullscreen', '');
        iframe.attr('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        if (id.length > 12) {
            iframe.attr('src', 'https://www.youtube-nocookie.com/embed/videoseries?list='+ id +'&rel=0&showinfo=0&autoplay=1');
        } else {
            iframe.attr('src', 'https://www.youtube-nocookie.com/embed/'+ id +'?rel=0&showinfo=0&autoplay=1');
        }
        $(this).parent().prepend(iframe);
    });
});

const setTextDirection = (type) => {
    [].forEach.call(document.querySelectorAll(`[data-type="site-reviews/${type}"] .glsr`), el => {
        const direction = 'glsr-' + window.getComputedStyle(el, null).getPropertyValue('direction');
        el.classList.add(direction);
    })
}

Event.on('site-reviews/form', (response, attributes) => {
    if (!_.isEmpty(response) && !response.error) {
        setTextDirection('form')
        GLSR.stars.destroy();
        GLSR.stars.init('.glsr-field-rating select', { clearable: true });
    }
});
Event.on('site-reviews/reviews', (response, attributes) => {
    if (!_.isEmpty(response) && !response.error) {
        setTextDirection('reviews')
    }
});
Event.on('site-reviews/summary', (response, attributes) => {
    if (!_.isEmpty(response) && !response.error) {
        setTextDirection('summary')
    }
});
