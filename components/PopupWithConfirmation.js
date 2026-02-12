import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = popupSelector.querySelector(
      ".popup__button_type_delete",
    );
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
