import  './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {
  initialCards,
  openEditForm,
  popupEditForm,
  config,
  elements,
  addButton,
  popupCard
  } from '../utils/constants.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

//Функция создания карточки
function generateCard (item) {
  const newCard = new Card(item,'#template-card',openImg);
  const cardElement = newCard.createCard();
  return cardElement;
}

//Колбэк открытия картинки
function openImg (name,link) {
  popupImage.open(name,link)
}; 

//Добавление карточки
const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem (generateCard (item))
  }
},elements)
cardsList.renderItems()

//Открытие картинки
const popupImage= new PopupWithImage (config.imageSelector)
popupImage.setEventListeners ()

//Форма добавления карточки
const popupCardForm = new PopupWithForm (config.popupCardSelector,(item) => {
  cardsList.addItem(generateCard (item))
  popupCardForm.close();
})
popupCardForm.setEventListeners()

//
const userInfo = new UserInfo (config.userNameSelector, config.userJobSelector);
//Форма редактирования профиля
const popupEditForms = new PopupWithForm (config.popupUserSelector, (item) => {
  userInfo.setUserInfo(item);
  popupEditForms.close();
})
popupEditForms.setEventListeners()

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
