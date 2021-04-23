let openEditForm = document.querySelector('.profile__edit-button');
let popup = document.querySelector ('.popup');
let formElement = document.querySelector ('.popup__form');
let closeEditForm = document.querySelector ('.popup__form-close');
let nameInput = formElement.querySelector ('#name');
let jobInput = formElement.querySelector ('#job');
let profileTitle = document.querySelector ('.profile__info-title');
let profileSubtitle = document.querySelector ('.profile__info-subtitle');
nameInput.value= profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = `${nameInput.value}`;
    profileSubtitle.textContent = `${jobInput.value}`;
    toglePopup(popup);
}

function togleMainPopup (event) {
    event.preventDefault ();
    toglePopup (popup);
}

function toglePopup (target) {
    target.classList.toggle ('popup_open');
}

openEditForm.addEventListener ('click', togleMainPopup);
closeEditForm.addEventListener ('click', togleMainPopup);
formElement.addEventListener('submit', formSubmitHandler); 


