import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector, callbackOpen) {
    super(popupSelector);
    this._callback = callback;
    this._callbackOpen = callbackOpen;
    this._form = popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    const values = {};
    const inputList = this._form.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("FORM SUBMITTED");
      this._callback(this._getInputValues());
    });
  }

  open() {
    super.open();
    if (this._callbackOpen) {
      let inputData = this._callbackOpen();
      const inputList = this._form.querySelectorAll(".popup__input");
      inputList.forEach((input) => {
        input.value = inputData[input.name];
      });
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
