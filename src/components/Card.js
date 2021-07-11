export default class Card {
    constructor (data,cardSelector,handleCardClick,handleRemoveClick) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveClick = handleRemoveClick;
    }

    _getTemplate = () => {
        this._newCard = document.querySelector(this._cardSelector).content.querySelector('#elements__card').cloneNode(true);
        return this._newCard;
    }
    createCard = (userId) => {
        this._element = this._getTemplate(); 
        this._setEventListeners ();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.alt = this._name;
        this._elementImage.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        if (this._owner._id === userId) {
            this._element.querySelector('.element__trash').classList.add('element__trash_active');
          }
        return this._element;
    }

    _handleLikeCard (evt) {
        evt.target.classList.add ('element__like_acive');
    }

    handleDeleteCard () {
        this._element.remove()
    }
    getCardId () {
        return this._id;
    }
    _setEventListeners () {
        this._element.querySelector ('.element__like').addEventListener('click',this._handleLikeCard);
        this._element.querySelector ('.element__trash').addEventListener('click',() => {
            this._handleRemoveClick();
        });
        this._element.querySelector ('.element__image').addEventListener('click',() => { 
            this._handleCardClick(this._name,this._link);
        });
    }
}