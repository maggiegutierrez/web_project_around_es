import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
/*----PROFILE CONSTS----*/
/*FORM BUTTONS*/
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfileButton = editProfilePopup.querySelector(".popup__close");
const profileForm = document.querySelector("#edit-profile-form");
/*FORM INPUTS*/
/*const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const descriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
); */
/*PROFILE VIEW*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*----CARD CONSTS----*/
/*CONTAINER, POPUP & BUTTONS*/
const cardContainer = document.querySelector(".cards__list");
const plusButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#new-card-popup");
const closeCardPopup = cardPopup.querySelector(".popup__close");
const createCardButton = cardPopup.querySelector(".popup__button");
/*CLICK IMAGE & BUTTONS*/
const imageViewPopup = document.querySelector("#image-popup");
const closeimageViewPopup = imageViewPopup.querySelector(".popup__close");
const cardPopupImage = imageViewPopup.querySelector(".popup__image");
const cardPopupCaption = imageViewPopup.querySelector(".popup__caption");

const cardFormElement = new PopupWithForm(createCardButton, "#new-card-form");
/*const newPlaceNameInput = cardFormElement.querySelector(
 ".popup__input_type_card-name"
);
const newPlaceLinkInput = cardFormElement.querySelector(
  ".popup__input_type_url"
);
*/
const inputsData = {
  nameInput: ".popup__input_type_name",
  descriptionInput: ".popup__input_type_description",
  titleInput: ".popup__input_type_card-name",
  linkInput: ".popup__input_type_url",
};

const popup = new Popup(".popup");

const handleImageClick = (title, link) => {
  cardPopupCaption.textContent = title;
  cardPopupImage.alt = title;
  cardPopupImage.src = link;

  popup.open(imageViewPopup);
};

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal(evt) {
  evt.preventDefault();
  fillProfileForm();
  popup.open(editProfilePopup);
}

editProfileButton.addEventListener("click", handleOpenEditModal);

closeProfileButton.addEventListener("click", function () {
  profileFormValidator.resetValidation();
  popup.close(editProfilePopup);
});

closeimageViewPopup.addEventListener("click", function () {
  popup.close(imageViewPopup);
});

plusButton.addEventListener("click", function () {
  cardFormValidator.resetValidation();
  cardFormElement.reset();
  popup.open(cardPopup);
});

closeCardPopup.addEventListener("click", function () {
  popup.close(cardPopup);
});

/*initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.createCard();
  cardContainer.append(cardElement);
});*/

/*const data = {
  name: newPlaceNameInput.value,
  link: newPlaceLinkInput.value,
};*/

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  };

  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.createCard();

  cardContainer.prepend(cardElement);
  cardFormElement.reset();
  popup.close(cardPopup);
}

//cardFormElement.addEventListener("submit", handleCardFormSubmit);

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nombreInput = profileForm.querySelector(".popup__input_type_name");
  let jobInput = profileForm.querySelector(".popup__input_type_description");

  const nameUpdated = nombreInput.value;
  const jobUpdated = jobInput.value;

  profileTitle.textContent = nameUpdated;
  profileDescription.textContent = jobUpdated;

  popup.close(editProfilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

const defaultCard = new Section(
  {
    initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.createCard();
      defaultCard.addItem(cardElement);
    },
  },
  "cardContainer"
);

const newCard = new Card(data, "#card-template, handleImageClick");
