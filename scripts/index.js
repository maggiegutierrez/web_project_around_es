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
  .querySelector("#card-template")
  .content.querySelector(".card");

const plusButton = document.querySelector(".profile__add-button");
const plusButtonPopup = document.querySelector("#new-card-popup");
const closePlusButton = plusButtonPopup.querySelector(".popup__close");
const createCardButton = plusButtonPopup.querySelector(".popup__button");

const newPlaceNameInput = plusButtonPopup.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceLinkInput = plusButtonPopup.querySelector(
  ".popup__input_type_url"
);

const imagePopup = document.querySelector("#image-popup");
const closeImagePopup = imagePopup.querySelector(".popup__close");
const cardPopupImage = imagePopup.querySelector(".popup__image");
const cardTitlePopup = imagePopup.querySelector(".popup__caption");

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  console.log(fillProfileForm);
}

function handleOpenEditModal(evt) {
  evt.preventDefault();
  fillProfileForm();
  openModal(editProfilePopup);
}

editProfileButton.addEventListener("click", handleOpenEditModal);

closeProfileButton.addEventListener("click", function () {
  closeModal(editProfilePopup);
});

closeImagePopup.addEventListener("click", function () {
  closeModal(imagePopup);
});

let formElement = document.querySelector("#edit-profile-form");

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

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    openModal(imagePopup);
    cardTitlePopup.textContent = cardTitle.textContent;
    cardPopupImage.alt = cardTitle.textContent;
    cardPopupImage.src = cardImage.src;
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.append(newCard);
}

initialCards.forEach(function (card) {
  console.log(card.name);
  renderCard(card.name, card.link, cardContainer);
});

plusButton.addEventListener("click", function () {
  openModal(plusButtonPopup);
});

closePlusButton.addEventListener("click", function () {
  closeModal(plusButtonPopup);
});

const cardFormElement = document.querySelector("#new-card-form");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = cardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const linkInput = cardFormElement.querySelector(".popup__input_type_url");

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  renderCard(titleValue, linkValue, cardContainer);
  closeModal(plusButtonPopup);
  cardFormElement.reset();
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);

const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-input-error`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-input-error`);
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

function toggleButtonState(form, inputs, button) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !allValid;
}

document.querySelectorAll(".popup__form").forEach((form) => {
  const inputs = form.querySelectorAll(".popup__input");
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }
      toggleButtonState(form, Array.from(inputs), button);
    });
  });

  form.addEventListener("submit", (evt) => {
    let valid = true;

    inputs.forEach((input) => {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
        valid = false;
      }
    });

    if (!valid) evt.preventDefault();
  });
});
