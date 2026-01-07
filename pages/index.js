import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
//import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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
const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const descriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
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
const cardForm = cardPopup.querySelector("#new-card-form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardJobInput = cardForm.querySelector(".popup__input_type_url");
/*CLICK IMAGE & BUTTONS*/
const imageViewPopup = document.querySelector("#image-popup");
const closeimageViewPopup = imageViewPopup.querySelector(".popup__close");
const cardPopupImage = imageViewPopup.querySelector(".popup__image");
const cardPopupCaption = imageViewPopup.querySelector(".popup__caption");

function submitProfileForm(formData) {
  formData = { username, description };
}

function submitCardForm(formData) {
  formData = { title, link };
  console.log(formData.title);
}

const cardFormElement = new PopupWithForm(submitCardForm, "#new-card-popup");
const profileFormElement = new PopupWithForm(submitProfileForm, "#edit-popup");

const handleImageClick = (title, link) => {
  cardPopupCaption.textContent = title;
  cardPopupImage.alt = title;
  cardPopupImage.src = link;

  popup.open(imageViewPopup);
};
const profileData = {
  name: profileTitle,
  description: profileDescription,
};

const fillProfileForm = () => {
  const newUser = new UserInfo(nameInput, descriptionInput);
  newUser.setUserInfo(profileData);
};

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
  cardForm.reset();
  popup.open(cardPopup);
});

closeCardPopup.addEventListener("click", function () {
  popup.close(cardPopup);
});

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

const defaultCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.createCard();
      defaultCard.addItem(cardElement);
    },
  },
  cardContainer
);

defaultCard.renderer();

const newCard = new Section(
  {
    items: data, //falta por definir qué será mi data
    renderer: (data) => {
      const card = new Card(data, "#card-template", handleImageClick);
      const cardElement = card.createCard();
      newCard.addItem(cardElement);
    },
  },
  cardContainer
);

//newCard.renderer(); Aún no sé si se debería usar
