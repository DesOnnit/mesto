export default class Card {
    constructor (data,cardSelector,handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        this._newCard = document.querySelector(this._cardSelector).content.querySelector('#elements__card').cloneNode(true);
        return this._newCard;
    }
    createCard = () => {
        this._element = this._getTemplate(); 
        this._setEventListeners ();
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }

    _likeCard (evt) {
        evt.target.classList.add ('element__like_acive');
    }

    _trashCard (evt) {
        evt.target.closest ('#elements__card').remove();
    }

    _setEventListeners () {
        this._element.querySelector ('.element__like').addEventListener('click',this._likeCard);
        this._element.querySelector ('.element__trash').addEventListener('click',this._trashCard);
        this._element.querySelector ('.element__image').addEventListener('click',() => { 
            this._handleCardClick(this._name,this._link);
        });
    }
}

