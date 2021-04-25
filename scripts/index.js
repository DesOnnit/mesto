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


