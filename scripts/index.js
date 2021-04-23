let OpenEditForm = document.querySelector('.profile__info_edit-button');
let popup = document.querySelector ('.popup');
let CloseEditForm = document.querySelector ('.edit-form__close');
let formElement = document.querySelector ('.edit-form');
let nameInput = formElement.querySelector ('#name');
let jobInput = formElement.querySelector ('#job');
let save = formElement.querySelector ('.edit-form__save');
let profileTitle = document.querySelector ('.profile__info_title');
let profileSubtitle = document.querySelector ('.profile__info_subtitle');


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = `${nameInput.value}`;
    profileSubtitle.textContent = `${jobInput.value}`;
    popup.classList.toggle ('popup__open');
   }

function ToglePopup (event) {
    event.preventDefault ();
    popup.classList.toggle ('popup__open');
    nameInput.value= profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}


OpenEditForm.addEventListener ('click', ToglePopup);
CloseEditForm.addEventListener ('click', ToglePopup);
formElement.addEventListener('submit', formSubmitHandler); 


