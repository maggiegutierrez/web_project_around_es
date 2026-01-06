import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback; //envío del formulario
    this._form = this._popup.querySelector(".popup__form");
    this._nameInput = popupSelector.nameInput;
    this._descriptionInput = popupSelector.descriptionInput;
    this._titleInput = popupSelector.titleInput;
    this._linkInput = popupSelector.linkInput;
  }

  _getInputValues() {
    return {
      name: this._nameInput.value,
      description: this._descriptionInput.value,
      title: this._titleInput.value,
      link: this._linkInput.value,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._callback.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });
    //agregar un controlador de eventos submit y el detector de eventos click en el icono para cerrar
  }

  close() {
    super.close();
    this._form.reset();
    //X.reset();
  }
}
