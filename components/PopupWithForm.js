import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback; //envío del formulario
    this._form = popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    const values = {};
    const inputList = this._form.querySelectorAll(".popup__input"); //"input" - etiqueta HTML
    inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues()); //Revisar si es mejor hacerlo en dos pasos "const x = this._getInputValues()..." o sí así directo
      this.close();
    });

    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this.close();
      });
    //agregar un controlador de eventos submit y el detector de eventos click en el icono para cerrar
  }

  close() {
    super.close();
    this._form.reset(); //¿O .resetValidation()?
  }
}
