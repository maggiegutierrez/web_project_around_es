import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

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

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfileButton = editProfilePopup.querySelector(".popup__close");

const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const descriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template") //<template id="card-template">
  .content.querySelector(".card");

const plusButton = document.querySelector(".profile__add-button");
const plusButtonPopup = document.querySelector("#new-card-popup"); //  <div class="popup" id="new-card-popup">
const closePlusButton = plusButtonPopup.querySelector(".popup__close");
const createCardButton = plusButtonPopup.querySelector(".popup__button");

const imagePopup = document.querySelector("#image-popup");
const closeImagePopup = imagePopup.querySelector(".popup__close");
const cardPopupImage = imagePopup.querySelector(".popup__image");
const cardTitlePopup = imagePopup.querySelector(".popup__caption");

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal(evt) {
  evt.preventDefault();
  fillProfileForm();
  openModal(editProfilePopup);
}

editProfileButton.addEventListener("click", handleOpenEditModal);

closeProfileButton.addEventListener("click", function () {
  profileFormValidator.resetValidation();
  closeModal(editProfilePopup);
});

closeImagePopup.addEventListener("click", function () {
  closeModal(imagePopup);
});

plusButton.addEventListener("click", function () {
  cardFormValidator.resetValidation();
  cardFormElement.reset();
  openModal(plusButtonPopup);
});

closePlusButton.addEventListener("click", function () {
  closeModal(plusButtonPopup);
});

const handleImageClick = (title, link) => {
  cardTitlePopup.textContent = title;
  cardPopupImage.alt = title;
  cardPopupImage.src = link;

  openModal(imagePopup);
};

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.createCard();
  cardContainer.append(cardElement);
});

const cardFormElement = document.querySelector("#new-card-form");
const newPlaceNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceLinkInput = cardFormElement.querySelector(
  ".popup__input_type_url"
);

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
  closeModal(plusButtonPopup);
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const formElement = document.querySelector("#edit-profile-form");
const profileFormValidator = new FormValidator(validationConfig, formElement);
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nombreInput = formElement.querySelector(".popup__input_type_name");
  let jobInput = formElement.querySelector(".popup__input_type_description");

  const nameUpdated = nombreInput.value;
  const jobUpdated = jobInput.value;

  profileTitle.textContent = nameUpdated;
  profileDescription.textContent = jobUpdated;

  closeModal(editProfilePopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);

      if (openPopup.id === "edit-popup") {
        profileFormValidator.resetValidation();
      }

      if (openPopup.id === "new-card-popup") {
        cardFormValidator.resetValidation();
        cardFormElement.reset();
      }
    }
  }
});

document.addEventListener("mousedown", (evt) => {
  const openPopup = document.querySelector(".popup_is-opened");
  if (openPopup && evt.target === openPopup) {
    closeModal(openPopup);

    if (openPopup.id === "edit-popup") {
      profileFormValidator.resetValidation();
    }

    if (openPopup.id === "new-card-popup") {
      cardFormValidator.resetValidation();
      cardFormElement.reset();
    }
  }
});
