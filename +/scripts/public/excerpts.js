/** global: GLSR */

const classNames = {
    hidden: 'glsr-hidden',
    readmore: 'glsr-read-more',
    visible: 'glsr-visible',
}

const selectors = {
    hiddenText: '.glsr-hidden-text',
}

class Excerpts {
    constructor (el) {
        this.events = {
            click: this._onClick.bind(this),
        };
        (el || document).querySelectorAll(selectors.hiddenText).forEach(el => this.init(el));
    }

    init (el) {
        const readMoreLink = this._insertLink(el)
        if (!readMoreLink) return;
        if ('expand' === el.dataset.trigger) {
            readMoreLink.dataset.text = el.dataset.showLess;
            readMoreLink.removeEventListener('click', this.events.click);
            readMoreLink.addEventListener('click', this.events.click);
        }
        if ('modal' === el.dataset.trigger) {
            readMoreLink.dataset.excerptTrigger = 'glsr-modal';
        }
    }

    _insertLink (el) {
        let readMoreEl = el.parentNode.querySelector('.' + classNames.readmore);
        if (!readMoreEl) {
            const readMoreSpan = document.createElement('span');
            const readmoreLink = document.createElement('a');
            readmoreLink.setAttribute('href', '#');
            readmoreLink.innerHTML = el.dataset.showMore;
            readMoreSpan.setAttribute('class', classNames.readmore);
            readMoreSpan.appendChild(readmoreLink);
            readMoreEl = el.parentNode.insertBefore(readMoreSpan, el.nextSibling);
        }
        return readMoreEl.querySelector('a')
    }

    _onClick (ev) {
        ev.preventDefault();
        const el = ev.currentTarget;
        const hiddenNode = el.parentNode.previousSibling;
        const text = el.dataset.text;
        hiddenNode.classList.toggle(classNames.hidden);
        hiddenNode.classList.toggle(classNames.visible);
        el.dataset.text = el.innerText;
        el.innerText = text;
    }
}

export default Excerpts;
