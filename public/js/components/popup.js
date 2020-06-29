import {ESCAPE_BUTTON} from "../constants";
import UiElement from "./UiElement";

class Popup {
    constructor() {
        this.popupContainer = null;
        this.popup = null;
        this.contentContainer = null;
        this.registerEscButtonEvent = this.registerEscButtonEvent.bind(this);
        this.init();
    }
    init() {
        this.popupContainer = document.createElement('div');
        this.popupContainer.classList.add('popup-container');
        this.popupContainer.addEventListener('click', () => {
            this.hidePopup();
        });
        this.popup = document.createElement('div');
        const button = UiElement.button('', 'popup-close', () => {
            this.hidePopup();
        });
        this.popup.classList.add('popup');
        this.contentContainer = document.createElement('div');
        this.contentContainer.setAttribute('data-popup-content', '');
        this.popup.appendChild(button);
        this.popup.appendChild(this.contentContainer);
        this.popupContainer.appendChild(this.popup);

        const body = document.querySelector('body');
        body.appendChild(this.popupContainer);
    }

    registerEscButtonEvent(e) {
        const key = e.key;
        if (key === ESCAPE_BUTTON) {
            this.hidePopup();
        }
    }

    showPopup(content) {
        document.addEventListener('keydown', this.registerEscButtonEvent);
        this.popupContainer.classList.add('active');
        this.contentContainer.appendChild(content);
        setTimeout(() => {
            this.popup.classList.add('fade-in');
        }, 300)
    }

    hidePopup() {
        document.removeEventListener('keydown', this.registerEscButtonEvent);
        this.popupContainer.classList.remove('active');
        this.popup.classList.remove('fade-in');
        this.contentContainer.innerHTML = '';
    }
}

export default new Popup();