import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback; //envío del formulario
    //this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const values = {};
  }

  setEventListeners() {
    super.setEventListeners();
    this._callback.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });

    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
    //agregar un controlador de eventos submit y el detector de eventos click en el icono para cerrar
  }

  close() {
    super.close();
    this._popup.reset();
    //this._form.reset();
  }
}
