const openEditForm = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector ('.popup_type_edit');
const formEditElement = document.querySelector ('.popup__form_type_edit');
const closeEditForm = document.querySelector ('.popup__form-close');
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

const closeByEsc = (item) => (evt) => {
  if (evt.key === 'Escape') {
    closePopup (item);
  };
}
const closeByOverlay = (item) => (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup (item);
  };
}


function openPopup (item) {
    item.classList.add ('popup_open');
    document.addEventListener ('keydown', closeByEsc(item));
    item.addEventListener ('click', closeByOverlay(item));
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
closeEditForm.addEventListener ('click', () => {
   closePopup (popupEditForm);
});
formEditElement.addEventListener('submit', handleProfileFormSubmit); 

//5 спринт

const templateCard = document.querySelector ('#template-card');
const elements = document.querySelector ('.elements');
const addButton = document.querySelector ('.profile__add-button');
const popupCard = document.querySelector ('.popup_type_card');
const cardButtonClose = popupCard.querySelector ('.popup__form-close');
const titleInput = popupCard.querySelector ('#title');
const linkInput = popupCard.querySelector ('#link');
const submitCard = popupCard.querySelector ('.popup__form_type_card');
const popupImg = document.querySelector ('.popup_type_image');
const imgCloseButton = popupImg.querySelector ('.popup__form-close');
const imgPopap = document.querySelector ('.popup__image');
const titlePopap = document.querySelector ('.popup__img-title');
const submitButton = popupCard.querySelector('.popup__submit-button');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function getCard (element) {
    const newCard = templateCard.content.querySelector ('#elements__card').cloneNode(true);
    newCard.querySelector('.element__title').textContent = element.name;
    newCard.querySelector('.element__image').alt = element.name;
    newCard.querySelector('.element__image').src = element.link;
    const likeButton = newCard.querySelector ('.element__like');
    likeButton.addEventListener ('click', function () {
      likeButton.classList.toggle ('element__like_acive');
    });
    const trashButton = newCard.querySelector ('.element__trash');
    trashButton.addEventListener ('click', function () {
      trashButton.closest ('#elements__card').remove();
    });
    const elemImg = newCard.querySelector('.element__image');
    elemImg.addEventListener ('click', function () {
      imgPopap.src = elemImg.src;
      imgPopap.alt = elemImg.alt;
      titlePopap.textContent = elemImg.alt;
      openPopup (popupImg);
    }); 
    return newCard;
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const newCard = getCard({
    name: titleInput.value,
    link: linkInput.value
  });
  elements.prepend(newCard);
  closePopup (popupCard);
  submitCard.reset();
}

initialCards.forEach(function(item){
    const newCard = getCard(item);
    elements.append (newCard);
});

addButton.addEventListener ('click', () => {
  submitButton.classList.add('popup__submit-button_disabled');
  submitButton.disabled = true;
  openPopup (popupCard);
});
cardButtonClose.addEventListener ('click', () => {
  closePopup (popupCard);
});
submitCard.addEventListener ('submit', handleCardFormSubmit);
imgCloseButton.addEventListener ('click', () => {
  closePopup (popupImg);
} );

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(config); 