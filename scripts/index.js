import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {initialCards} from './initial-сards.js'
import {config} from './config.js'

const openEditForm = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector ('.popup_type_edit');
const formEditElement = document.querySelector ('.popup__form_type_edit');
const nameInput = formEditElement.querySelector ('#name');
const jobInput = formEditElement.querySelector ('#job');
const profileTitle = document.querySelector ('.profile__info-title');
const profileSubtitle = document.querySelector ('.profile__info-subtitle');

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = `${nameInput.value}`;
    profileSubtitle.textContent = `${jobInput.value}`;
    closePopup (popupEditForm);
}

const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const opendPopup = document.querySelector('.popup_open');
    closePopup (opendPopup);
  };
}

function openPopup (item) {
    item.classList.add ('popup_open');
    document.addEventListener ('keydown', closeByEsc);
}

function closePopup (item) {
    item.classList.remove ('popup_open');
    document.removeEventListener("keydown", closeByEsc);
}

openEditForm.addEventListener ('click', () => {
    nameInput.value= profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditForm);
});

formEditElement.addEventListener('submit', handleProfileFormSubmit); 

const elements = document.querySelector ('.elements');
const addButton = document.querySelector ('.profile__add-button');
const popupCard = document.querySelector ('.popup_type_card');
const titleInput = popupCard.querySelector ('#title');
const linkInput = popupCard.querySelector ('#link');
const submitCard = popupCard.querySelector ('.popup__form_type_card');
const popupImg = document.querySelector ('.popup_type_image');
const imgPopap = document.querySelector ('.popup__image');
const titlePopap = document.querySelector ('.popup__img-title');
const submitButton = popupCard.querySelector('.popup__submit-button');

function createCard (item) {
  const newCard = new Card(item,'#template-card',openImg);
  const cardElement = newCard.createCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item,'#template-card')
  elements.append (cardElement);
});

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: titleInput.value,
    link: linkInput.value
  });
  elements.prepend(newCard);
  closePopup (popupCard);
  submitCard.reset();
}

function openImg (name,link) {
    imgPopap.alt = name;
    imgPopap.src = link;
    titlePopap.textContent = name;
    openPopup (popupImg);
}; 

addButton.addEventListener ('click', () => {
  cardAddForm.toggleButtonState();
  openPopup (popupCard);
});

submitCard.addEventListener ('submit', handleCardFormSubmit);

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__form-close')) {
          closePopup(popup)
        }
    })
})

const editProfileForm = new FormValidator(config, popupEditForm);
editProfileForm.enableValidation();

const cardAddForm = new FormValidator(config, popupCard);
cardAddForm.enableValidation();