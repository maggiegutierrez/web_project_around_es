import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = popupSelector.querySelector(".popup__image");
    this._caption = popupSelector.querySelector(".popup__caption");
  }

  open(title, link) {
    this._caption.textContent = title;
    this._image.alt = title;
    this._image.src = link;
    super.open();
  }
}
