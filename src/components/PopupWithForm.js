import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (popupSelector,handleFormSubmit) {
        super (popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }
    _getInputValues () {
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
    close () {
        this._form.reset ();
        super.close ();
    }
    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}