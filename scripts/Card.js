class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._title = data.name;
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

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_is-active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._title, this._link);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button"); //<button>
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button"); //button

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
