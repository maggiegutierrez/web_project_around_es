export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_is-active");
  };

  _handleDeleteButton = () => {
    this._element.remove();
  };

  _handleImage = () => {
    this._handleImageClick(this._text, this._link);
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._image.addEventListener("click", this._handleImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._image.src = this._link;
    this._image.alt = this._text;

    const title = this._element.querySelector(".card__title");
    title.textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}
