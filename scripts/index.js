let openEditForm = document.querySelector('.profile__edit-button');
let popup = document.querySelector ('.popup');
let formElement = document.querySelector ('.popup__form');
let closeEditForm = document.querySelector ('.popup__form-close');
let nameInput = formElement.querySelector ('#name');
let jobInput = formElement.querySelector ('#job');
let profileTitle = document.querySelector ('.profile__info-title');
let profileSubtitle = document.querySelector ('.profile__info-subtitle');


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = `${nameInput.value}`;
    profileSubtitle.textContent = `${jobInput.value}`;
    closePopup ();
}

function openPopup  () {
    popup.classList.toggle ('popup_open');
    nameInput.value= profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup () {
    popup.classList.remove ('popup_open');
}

openEditForm.addEventListener ('click', openPopup);
closeEditForm.addEventListener ('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 

//5 спринт

const templateCard = document.querySelector ('#template-card');
const elements = document.querySelector ('.elements');
const addButton = document.querySelector ('.profile__add-button');

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

function createCard () {
    const newCard = templateCard.content.querySelector ('#elements__card').cloneNode(true);
    elements.prepend (newCard);
}



initialCards.forEach (function (element) {
    const newCard = templateCard.content.querySelector ('#elements__card').cloneNode(true);
    newCard.querySelector('.element__title').textContent = element.name;
    newCard.querySelector('.element__image').src = element.link;
    let likeButton = newCard.querySelector ('.element__like');
    likeButton.addEventListener ('click', function () {
        likeButton.classList.toggle ('element__like_acive');
    });
    elements.append (newCard);
});

addButton.addEventListener ('click', createCard);
