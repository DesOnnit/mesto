import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);
        this._imgPopap = document.querySelector ('.popup__image');
        this._titlePopap = document.querySelector ('.popup__img-title');
    }
    open (name,link) {
        this._imgPopap.alt = name;
        this._imgPopap.src = link;
        this._titlePopap.textContent = name;
        super.open();
    }
}
