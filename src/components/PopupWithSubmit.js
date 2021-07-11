import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
    constructor (popupSelector,handleFormSubmit) {
        super (popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }
    close () {
        super.close ();
    }
    open () {
        super.open ();
    }
    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this);
        });
    }
}