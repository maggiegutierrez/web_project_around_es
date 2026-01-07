export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelectorAll(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.forEach((popup) => {
      popup.classList.add("popup_is-opened");
    });
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.forEach((popup) => {
      popup.classList.remove("popup_is-opened");
    });
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });

    // nota: el boton de cerrar (X) lo manejo en index.js para poder agregar cosas como resetValidation
  }
}
