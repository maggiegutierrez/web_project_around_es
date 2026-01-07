//import Card from "./Card.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = popupSelector.querySelector("img");
    this._caption = popupSelector.querySelector("p");
  }

  open(title, link) {
    this._caption.textContent = title;
    this._image.alt = title;
    this._image.src = link;
    super.open();
    //añadir una imagen al popup y su atributo src junto con el name alt
  }
}
