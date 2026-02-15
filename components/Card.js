export default class Card {
  constructor(data, templateSelector, handleClicks) {
    this._title = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;

    this._templateSelector = templateSelector;

    this._handleImageClick = handleClicks.handleImageClick;
    this._handleLikeClick = handleClicks.handleLikeClick;
    this._handleDeleteClick = handleClicks.handleDeleteClick;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  updateLike(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._title, this._link);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    this.updateLike(this._isLiked);

    this._setEventListeners();

    return this._element;
  }
}
