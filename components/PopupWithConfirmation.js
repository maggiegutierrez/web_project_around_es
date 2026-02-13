import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = this._popup.querySelector(
      ".popup__button_type_delete",
    );
    this._defaultButtonText = this._confirmationButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (isLoading) {
      this._confirmationButton.textContent = loadingText;
    } else {
      this._confirmationButton.textContent = this._defaultButtonText;
    }
  }

  confirmAction(action) {
    this._handleConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    });
  }
}
