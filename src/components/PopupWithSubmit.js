import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
    constructor (popupSelector, handler) {
        super (popupSelector);
        this._setFormSubmitHandler = handler
        this._form = this._popup.querySelector('.popup__form');
    }
    open (card,cardId) {
        super.open ();
        this._card = card;
        this._cardId = cardId;
    }
    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._setFormSubmitHandler(this._card, this._cardId);
        });
    }
}