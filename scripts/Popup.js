export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {}

  close() {}

  _handleEscClose() {
    //Cerrar popup con ESC
  }

  setEventListeners() {
    //Click para cerrar el popup de al clickar fondo y la X
  }
}
