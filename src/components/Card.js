export default class Card {
    constructor (data,cardSelector,handleCardClick,handleRemoveClick,{handleLikeClick},api) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner
        this._id = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveClick = handleRemoveClick;
        this._handleLikeClick = handleLikeClick;
        this._api = api;
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
        this._likeCount = this._element.querySelector('.element__like_counter');
        this._likeCount.textContent = this._likes.length;
        if(this._likes.find((obj) => userId === obj._id)) {
            this._element.querySelector('.element__like').classList.add('element__like_acive')
          }
        return this._element;
    }

    handleDeleteCard () {
        this._element.remove();
        this._element = null;
    }

    handleLikeCard() {
        const likeButton = this._element.querySelector('.element__like')
        if(!(likeButton.classList.contains('element__like_acive'))) {
          this._api.handleLikeCard(this._id)
            .then((data) => {
              likeButton.classList.add('element__like_acive')
              this._likeCount.textContent = data.likes.length
            })
            .catch((err) => {
              console.log(`${err}`)
            })
        } else {
          this._api.handleUnlike(this._id)
            .then((data) => {
              likeButton.classList.remove('element__like_acive')
              this._likeCount.textContent = data.likes.length
            })
            .catch((err) => {
              console.log(`${err}`)
            })
        }
      }
    
    _setEventListeners () {
        this._element.querySelector ('.element__trash').addEventListener('click',() => {
            this._handleRemoveClick(this,this._id);
        });
        this._element.querySelector ('.element__image').addEventListener('click',() => { 
            this._handleCardClick(this._name,this._link);
        });
        this._element.querySelector ('.element__like').addEventListener('click',() => {
            this._handleLikeClick();
        });
    }
}