import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {
  initialCards,
  openEditForm,
  popupEditForm,
  config,
  elements,
  addButton,
  popupCard,
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
const addCard = new Section ({
  items: initialCards,
  renderer: (item) => {
    addCard.addItem (generateCard (item))
  }
},elements)
addCard.renderItems()

//Открытие картинки
const popupImage= new PopupWithImage ('.popup_type_image')
popupImage.setEventListeners ()

//Форма добавления карточки
const popupCardForm = new PopupWithForm ('.popup_type_card',(item) => {
  addCard.addItem(generateCard (item))
  popupCardForm.close()
})
popupCardForm.setEventListeners()

//Форма редактирования профиля
const popupEditForms = new PopupWithForm ('.popup_type_edit', (item) => {
  const userInfo = new UserInfo ('.profile__info-title','.profile__info-subtitle');
  userInfo.setUserInfo(item);
  popupEditForms.close();
})
popupEditForms.setEventListeners()

//Открытие формы редактирования профиля
openEditForm.addEventListener ('click', () => {
  const userInfo = new UserInfo('.profile__info-title','.profile__info-subtitle');
  userInfo.getUserInfo();
  popupEditForms.open();
});

//Открытие формы добавления карточки
addButton.addEventListener ('click', () => {
  cardAddForm.toggleButtonState();
  popupCardForm.open();
});

//Валидация
const editProfileForm = new FormValidator(config, popupEditForm);
editProfileForm.enableValidation();

const cardAddForm = new FormValidator(config, popupCard);
cardAddForm.enableValidation();


