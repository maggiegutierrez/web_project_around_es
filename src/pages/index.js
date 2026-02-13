import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/API.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/*----CALLING API AVATAR & USER----*/
const fillProfileForm = (data) => {
  const apiData = {
    name: data.name,
    about: data.about,
  };
  profileFormPopup.renderLoading(true);
  api
    .patchUserData(apiData)
    .then((dataUpdated) => {
      newUser.setUserInfo(dataUpdated);
      profileFormPopup.close();
    })
    .catch((err) => {
      alert(`ERROR ON SET THE USER INFORMATION: ${err}`);
    })
    .finally(() => {
      profileFormPopup.renderLoading(false);
    });
};

const avatarLink = (data) => {
  const apiData = {
    avatar: data.avatar,
  };
  avatarFormPopup.renderLoading(true);
  api
    .patchAvatar(apiData)
    .then((avatarUpdated) => {
      newUser.setUserInfo(avatarUpdated);
      avatarFormPopup.close();
    })
    .catch((err) => {
      alert(`ERROR ON SET AVATAR: ${err}`);
    })
    .finally(() => {
      avatarFormPopup.renderLoading(false);
    });
};

/*----PROFILE CONSTS----*/
/*FORM BUTTONS*/
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfileButton = editProfilePopup.querySelector(".popup__close");
const profileForm = document.querySelector("#edit-profile-form");

/*PROFILE VIEW*/
const profileTitle = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__about");
const profileImage = document.querySelector(".profile__image");

/*----AVATAR CONSTS----*/
const editAvatarPopup = document.querySelector("#edit-profile-image-popup");
const changeAvatarForm = document.querySelector("#edit-profile-image-form");
const avatarEditButton = document.querySelector(".profile-avatar-edit-button");
const avatarXButton = editAvatarPopup.querySelector(".popup__close");

/*----CARD CONSTS----*/
/*CONTAINER, POPUP & BUTTONS*/
const cardContainer = document.querySelector(".cards__list");
const plusButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#new-card-popup");
const closeCardButton = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector("#new-card-form");
const confirmDeleteCardPopup = document.querySelector("#delete-popup");
const closeDeleteCardPopup =
  confirmDeleteCardPopup.querySelector(".popup__close");

/*CLICK IMAGE & BUTTONS*/
const imageViewPopup = document.querySelector("#image-popup");
const closeImageView = imageViewPopup.querySelector(".popup__close");
const imageClickPopup = imageViewPopup.querySelector(".popup__image");
const cardPopupTitle = imageViewPopup.querySelector(".popup__caption");

/*----USER INFO FUNCTIONS----*/
const newUser = new UserInfo({
  profileTitle,
  profileAbout,
  profileImage,
});

const handleOpenProfileModal = () => {
  return newUser.getUserInfo();
};

/*----FORM VALIDATORS----*/
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);
const avatarFormValidator = new FormValidator(
  validationConfig,
  changeAvatarForm,
);

/*----NEW POPUPS----*/
const avatarFormPopup = new PopupWithForm(
  avatarLink,
  editAvatarPopup,
  handleOpenProfileModal,
);

const profileFormPopup = new PopupWithForm(
  fillProfileForm,
  editProfilePopup,
  handleOpenProfileModal,
);
const cardFormPopup = new PopupWithForm(cardInfoObject, cardPopup);
const imagePopup = new PopupWithImage(imageViewPopup);
const deleteCardPopup = new PopupWithConfirmation(confirmDeleteCardPopup);

/*----CALLING POPUPS LISTENERS----*/
profileFormPopup.setEventListeners();
imagePopup.setEventListeners();
cardFormPopup.setEventListeners();
avatarFormPopup.setEventListeners();
deleteCardPopup.setEventListeners();

/*----LISTENERS TO OPEN----*/
avatarEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  avatarFormValidator.resetValidation();
  avatarFormPopup.open();
});

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

imageClickPopup.addEventListener("click", () => {
  imagePopup.open();
});

/*----LISTENERS TO CLOSE----*/
closeProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileFormValidator.resetValidation();
  profileFormPopup.close();
});

avatarXButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  avatarFormValidator.resetValidation();
  avatarFormPopup.close();
});

closeCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  cardFormPopup.close();
});

closeImageView.addEventListener("click", function () {
  imagePopup.close();
});

closeDeleteCardPopup.addEventListener("click", () => {
  deleteCardPopup.close();
});

/*----CALLING VALIDATOR LISTENERS----*/
profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

/*----CALLING API CARDS----*/
const handleClicks = {
  handleImageClick: (title, link) => {
    cardPopupTitle.textContent = title;
    imageClickPopup.alt = title;
    imageClickPopup.src = link;

    imagePopup.open(title, link);
  },
  handleLikeClick: (card) => {
    api
      .likeCard(card.getId(), card.isLiked())
      .then((updatedCard) => {
        card.updateLike(updatedCard.isLiked);
      })
      .catch((err) => {
        alert(`ERROR HONEY: ${err}`);
      });
  },
  handleDeleteClick: (card) => {
    deleteCardPopup.open();

    deleteCardPopup.confirmAction(() => {
      deleteCardPopup.renderLoading(true);
      api
        .deleteCardData(card.getId())
        .then(() => {
          card.removeCard();
          deleteCardPopup.close();
        })
        .catch((err) => {
          alert(`ERROR ON DELETE CARD: ${err}`);
        })
        .finally(() => {
          deleteCardPopup.renderLoading(false);
        });
    });
  },
};

const defaultCard = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleClicks);
      const cardElement = card.createCard();
      defaultCard.addItem(cardElement);
    },
  },
  cardContainer,
);

function cardInfoObject(formData) {
  cardFormPopup.renderLoading(true, "Creando...");
  api
    .postCardData({ name: formData.placeName, link: formData.link })
    .then((data) => {
      const card = new Card(data, "#card-template", handleClicks);
      const cardElement = card.createCard();
      defaultCard.addItem(cardElement);
      cardFormPopup.close();
    })
    .catch((err) => {
      alert(`ERROR ON POST CARD DATA: ${err}`);
    })
    .finally(() => {
      cardFormPopup.renderLoading(false);
    });
}

api.getWebData().then(([userData, cardsData]) => {
  newUser.setUserInfo(userData);
  defaultCard.rendererItems(cardsData);
});
