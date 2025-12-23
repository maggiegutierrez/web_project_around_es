import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
    //añadir una imagen al popup y su atributo src junto con el name alt
  }
}
