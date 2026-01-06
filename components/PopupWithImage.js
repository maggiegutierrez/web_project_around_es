//import Card from "./Card.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  open() {
    this._caption.textContent = this._description;
    super.open();
    //añadir una imagen al popup y su atributo src junto con el name alt
  }
}
