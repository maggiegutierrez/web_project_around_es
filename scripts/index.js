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

initialCards.forEach(function (card) {
  console.log(card.name);
});

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfileButton = editProfilePopup.querySelector(".popup__close");

const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const descriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

let formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".popup__input_type_name");
  let jobInput = formElement.querySelector(".popup__input_type_description");

  const nameUpdated = nameInput.value;
  const jobUpdated = jobInput.value;

  profileTitle.textContent = nameUpdated;
  profileDescription.textContent = jobUpdated;

  closeModal(editProfilePopup);

  formElement.addEventListener("submit", handleProfileFormSubmit);
}
