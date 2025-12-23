import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }

  _getInputValues() {
    //Solo recopila datos de los campos de entrada
  }

  setEventListeners() {
    super.setEventListeners();
    //agregar un controlador de eventos submit y el detector de eventos click en el icono para cerrar
  }

  close() {
    super.close();
    //fulano.resetValidation();
  }
}
