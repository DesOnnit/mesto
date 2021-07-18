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
  avatarForm,
  nameInput,
  jobInput
  } from '../utils/constants.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import Api from '../components/Api.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
//Функция создания карточки
let ownerId = null;
const generateCard = (item) => {
  const newCard = new Card(
    item,
    '#template-card',
    openImg,
    openSubmit,
    {handleLikeClick:_ => newCard.handleLikeCard()},
    api,
    ownerId
    );
  return newCard;
}

//Колбэк открытия картинки
function openImg (name,link) {
  popupImage.open(name,link)
}; 

function openSubmit(card,cardId) {
  popupWithSubmit.open(card,cardId);
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
popupWithSubmit.setEventListeners()

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
      const card = generateCard(res);
      const cardElement = card.createCard();
      cardsList.addItem(cardElement);
      popupCardForm.close();})
    .catch((err) => console.log(err))
    .finally(() => popupCard.querySelector('.popup__submit-button').textContent = `Создать`)
})
popupCardForm.setEventListeners()

//

const userInfo = new UserInfo (config.userNameSelector, config.userJobSelector,config.userAvatarSelector); 

//Форма редактирования профиля
const popupEditForms = new PopupWithForm (config.popupUserSelector, (item) => {
  api.saveUserInfo({
    name: item.name,
    about: item.job
  })
    .then((res) => {
      userInfo.setUserInfo(res)
      popupEditForms.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditForm.querySelector('.popup__submit-button').textContent = `Сохранить`)
})
popupEditForms.setEventListeners()

const popupAvatarChange = new PopupWithForm (config.avatarFormSelector, (item) =>{
  api.handleAvatarChange ({avatar:item.avatar})
  .then ((res) => {
    userInfo.setUserAvatar(res);
    popupAvatarChange.close()
  })
  .catch((err) => console.log(err))
  .finally(() => avatarForm.querySelector('.popup__submit-button').textContent = `Сохранить`)
})
popupAvatarChange.setEventListeners()

const popupAvatarEdit = document.querySelector('.profile__avatar-edit-button')
popupAvatarEdit.addEventListener ('click',()=> {
  popupAvatarChange.open()
  avatarAddForm.resetValidation()
})

//Открытие формы редактирования профиля
openEditForm.addEventListener ('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditForms.open();
  editProfileForm.resetValidation()
});

//Открытие формы добавления карточки
addButton.addEventListener ('click', () => {
  popupCardForm.open();
  cardAddForm.resetValidation()
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

  const cardsList = new Section ({
    renderer: (item) => {
      const card = generateCard(item);
      const cardElement = card.createCard();
      cardsList.addItem(cardElement);
    }
  },elements)
 
  api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })