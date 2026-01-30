import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/API.js";

/*const initialCards = [
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
];*/

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/*----PROFILE CONSTS----*/
/*FORM BUTTONS*/
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfileButton = editProfilePopup.querySelector(".popup__close");
const profileForm = document.querySelector("#edit-profile-form");

/*PROFILE VIEW*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const fillProfileForm = (profileData) => {
  const newUser = new UserInfo({ profileTitle, profileDescription });
  newUser.setUserInfo(profileData);
};

/*----CARD CONSTS----*/
/*CONTAINER, POPUP & BUTTONS*/
//const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector(".cards__list");
const plusButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#new-card-popup");
const closeCardButton = cardPopup.querySelector(".popup__close");
const createCardButton = cardPopup.querySelector(".popup__button");
const cardForm = cardPopup.querySelector("#new-card-form");
const cardTitleInput = cardForm.querySelector(".popup__input_type_card-name");
const cardCaptionInput = cardForm.querySelector(".popup__input_type_url");
/*CLICK IMAGE & BUTTONS*/
const imageViewPopup = document.querySelector("#image-popup");
const closeimageViewPopup = imageViewPopup.querySelector(".popup__close");
const imageClickPopup = imageViewPopup.querySelector(".popup__image");
const cardPopupTitle = imageViewPopup.querySelector(".popup__caption");

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

const handleOpenProfileModal = () => {
  const newUser = new UserInfo({ profileTitle, profileDescription });
  return newUser.getUserInfo();
};

const profileFormPopup = new PopupWithForm(
  fillProfileForm,
  editProfilePopup,
  handleOpenProfileModal,
);
const cardFormPopup = new PopupWithForm(cardInfoObject, cardPopup);
const imagePopup = new PopupWithImage(imageViewPopup);

imagePopup.setEventListeners();
cardFormPopup.setEventListeners();
profileFormPopup.setEventListeners();

editProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileFormValidator.resetValidation();
  profileFormPopup.open();
});

plusButton.addEventListener("click", function () {
  cardFormValidator.resetValidation();
  cardForm.reset();
  cardFormPopup.open();
});

const handleImageClick = (title, link) => {
  cardPopupTitle.textContent = title;
  imageClickPopup.alt = title;
  imageClickPopup.src = link;

  imagePopup.open(title, link);
};

closeProfileButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  profileFormPopup.close();
});

closeCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  cardFormPopup.close();
});

closeimageViewPopup.addEventListener("click", function () {
  imagePopup.close();
});

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

imageClickPopup.addEventListener("click", () => {
  imagePopup.open();
});

api
  .getUserData()
  .then((data) => {
    profileTitle.textContent = data.name;
    profileImage.alt = data.name;
    profileImage.src = data.avatar;
    profileDescription.textContent = data.about;
  })
  .catch((err) => {
    console.error("Error al cargar usuario:", err);
  });

let defaultCard;

api.getCardsData().then((data) => {
  console.log(data);
  defaultCard = new Section(
    {
      items: data,
      renderer: (item) => {
        const card = new Card(item, "#card-template", handleImageClick);
        const cardElement = card.createCard();
        defaultCard.addItem(cardElement);
      },
    },
    cardContainer,
  );

  defaultCard.renderer();
});

function cardInfoObject(formData) {
  console.log(formData);
  api
    .postCardData({
      name: formData["place-name"],
      link: formData.link,
    })
    .then((data) => {
      const card = new Card(data, "#card-template", handleImageClick);
      const cardElement = card.createCard();
      defaultCard.addItem(cardElement);
      console.log(defaultCard);
    });
}
