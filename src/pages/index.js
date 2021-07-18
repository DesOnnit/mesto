import  './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {
  openEditForm,
  popupEditForm,
  config,
  elements,
  addButton,
  popupCard,
  avatarForm
  } from '../utils/constants.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import Api from '../components/Api.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
//Функция создания карточки

const generateCard = (item) => {
  const newCard = new Card(
    item,
    '#template-card',
    openImg,
    openSubmit,
    {handleLikeClick:_ => newCard.handleLikeCard()},
    api
    );
  const cardElement = newCard.createCard(userInfo.getUserId());
  return cardElement;
}


//Колбэк открытия картинки
function openImg (name,link) {
  popupImage.open(name,link)
}; 

function openSubmit(card,cardId) {
  popupWithSubmit.open(card,cardId);
  popupWithSubmit.setEventListeners()
}

function deletCard (card,cardId) {
  api.deleteCard(cardId)
  .then(() => {
    card.handleDeleteCard ();
      popupWithSubmit.close();
  })
  .catch((err) => console.log(err))
} 

const popupWithSubmit = new PopupWithSubmit (config.popupSubmitSelector,deletCard)



//Открытие картинки
const popupImage= new PopupWithImage (config.imageSelector)
popupImage.setEventListeners ()

//Форма добавления карточки
const popupCardForm = new PopupWithForm (config.popupCardSelector, item => {
  api.getNewCard ({
    name: item.name,
    link: item.link
  })
    .then ((res) => {
      cardsList.addItem(generateCard (res))})
    .catch((err) => console.log(err))
    .finally(() => popupCardForm.querySelector('.popup__submit-button').textContent = `Создать`)
  popupCardForm.close();
})
popupCardForm.setEventListeners()

//
let userInfo;
const userApi = (res) => {
   userInfo = new UserInfo (config.userNameSelector, config.userJobSelector,config.userAvatarSelector,res); 
}

//Форма редактирования профиля
const popupEditForms = new PopupWithForm (config.popupUserSelector, (item) => {
  api.saveUserInfo({
    name: item.name,
    about: item.job
  })
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .catch((err) => console.log(err))
    .finally(() => document.querySelector('.popup__submit-button').textContent = `Сохранить`)
    popupEditForms.close();
})
popupEditForms.setEventListeners()

const popupAvatarChange = new PopupWithForm (config.avatarFormSelector, (item) =>{
  api.handleAvatarChange ({avatar:item.avatar})
  .then ((res) => {
    userInfo.setUserAvatar(res);
    popupAvatarChange.close()
  })
  .catch((err) => console.log(err))
  .finally(() => document.querySelector('.popup__submit-button').textContent = `Сохранить`)
})
popupAvatarChange.setEventListeners()

const popupAvatarEdit = document.querySelector('.profile__avatar-edit-button')
popupAvatarEdit.addEventListener ('click',()=> {
  avatarAddForm.toggleButtonState();
  popupAvatarChange.open()
  const inputListAvatarForm = Array.from(avatarForm.querySelectorAll(config.inputSelector));
  inputListAvatarForm.forEach((inputElement) => {
  avatarAddForm.hideInputError(inputElement);
  });
})

//Открытие формы редактирования профиля
openEditForm.addEventListener ('click', () => {
  userInfo.getUserInfo();
  popupEditForms.open();
  const inputListEditForms = Array.from(popupEditForm.querySelectorAll(config.inputSelector));
  inputListEditForms.forEach((inputElement) => {
  editProfileForm.hideInputError(inputElement);
  });
});

//Открытие формы добавления карточки
addButton.addEventListener ('click', () => {
  cardAddForm.toggleButtonState();
  popupCardForm.open();
  const inputListFormCard = Array.from(popupCard.querySelectorAll(config.inputSelector));
  inputListFormCard.forEach((inputElement) => {
  cardAddForm.hideInputError(inputElement);
  });
});

//Валидация
const editProfileForm = new FormValidator(config, popupEditForm);
editProfileForm.enableValidation();

const cardAddForm = new FormValidator(config, popupCard);
cardAddForm.enableValidation();

const avatarAddForm = new FormValidator (config, avatarForm);
avatarAddForm.enableValidation();


//9 sprint
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '6faffa29-8c7e-4cda-bdee-257e8f797ff2',
    'Content-Type': 'application/json'
  }
}); 

api.getUserInfo ()
  .then (res =>{
    userApi(res);
  })
  .catch((err) => console.log(err))

let cardsList;
const cardAdd = (res) => {
  cardsList = new Section ({
    items: res,
    renderer: (item) => {
      cardsList.addItem (generateCard (item))
    }
  },elements)
  cardsList.renderItems() 
 }

api.getInitialCards ()
  .then (res => {
    cardAdd(res)
  })
  .catch((err) => console.log(err))
