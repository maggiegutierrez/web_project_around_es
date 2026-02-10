import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationButton) {
    super(popupSelector);
    this._confirmationButton = confirmationButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._popup.close();
    });
  }
}
