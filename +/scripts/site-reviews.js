import Ajax from './public/ajax.js';
import Dom from './public/dom.js';
import Event from './public/event.js';
import Excerpts from './public/excerpts.js';
import Form from './public/form.js';
import Modal from './public/modal.js';
import Pagination from './public/pagination.js';
import { debounce } from './public/helpers.js';

const events = {
    excerpts: 'site-reviews/excerpts/init',
    forms: 'site-reviews/forms/init',
    init: 'site-reviews/init',
    modal: 'site-reviews/modal/init',
    pagination: 'site-reviews/pagination/init',
};

const initExcerpts = (el) => {
    new Excerpts(el)
}

const initForms = () => {
    GLSR.forms.forEach(form => form.destroy())
    GLSR.forms = [];
    document.querySelectorAll('form.glsr-review-form').forEach(formEl => {
        const buttonEl = formEl.querySelector('[type=submit]');
        if (buttonEl) {
            const form = new Form(formEl, buttonEl);
            form.init()
            GLSR.forms.push(form)
        }
    })
}

const initModal = () => {
    GLSR.Modal.init({
        id: 'glsr-modal-review',
        onOpen: (modalEl, triggerEl) => {
            const baseEl = triggerEl.closest('.glsr').cloneNode(true);
            const reviewEl = triggerEl.closest('.glsr-review').cloneNode(true);
            baseEl.innerHTML = '';
            baseEl.appendChild(reviewEl);
            modalEl.content.appendChild(baseEl);
            modalEl.classList.add('glsr-modal__review');
        },
    })
}

const initPagination = () => {
    GLSR.pagination.forEach(pagination => pagination.destroy())
    GLSR.pagination = [];
    document.querySelectorAll('.glsr').forEach(el => {
        const paginationEl = el.querySelector('.glsr-pagination');
        if (paginationEl && (paginationEl.classList.contains('glsr-ajax-loadmore') || paginationEl.classList.contains('glsr-ajax-pagination'))) {
            const pagination = new Pagination(el, paginationEl);
            pagination.init()
            GLSR.pagination.push(pagination)
        }
    })
}

const initPlugin = () => {
    // set text direction
    document.querySelectorAll('.glsr').forEach(el => {
        const direction = 'glsr-' + window.getComputedStyle(el, null).getPropertyValue('direction');
        el.classList.add(direction)
    })
    Event.trigger(events.excerpts)
    Event.trigger(events.forms)
    Event.trigger(events.modal)
    Event.trigger(events.pagination)
}

if (!window.hasOwnProperty('GLSR')) {
    window.GLSR = {};
}
window.GLSR.ajax = Ajax;
window.GLSR.forms = [];
window.GLSR.pagination = [];
window.GLSR.Event = Event;
window.GLSR.Modal = Modal;
window.GLSR.Utils = { debounce, dom: Dom };


Event.on(events.excerpts, initExcerpts)
Event.on(events.forms, initForms)
Event.on(events.modal, initModal)
Event.on(events.pagination, initPagination)
Event.on(events.init, initPlugin)

Event.on('site-reviews/pagination/handle', (response, pagination) => {
    Event.trigger(events.excerpts, pagination.wrapperEl)
    Event.trigger(events.modal)
})

document.addEventListener('DOMContentLoaded', () => {
    Event.trigger(events.init)
})
