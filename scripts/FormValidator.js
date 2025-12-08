export default class FormValidator {
  constructor(selectors, validatorElement) {
    this._selectors = selectors;
    this._form = validatorElement;
    this._inputs = Array.from(
      this._form.querySelectorAll(this._selectors.inputSelector)
    );
    this._button = this._form.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`);
    input.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`);
    input.classList.remove(this._selectors.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._selectors.errorClass);
  }

  _checkInput(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButton() {
    const allValid = this._inputs.every((input) => input.validity.valid);
    this._button.disabled = !allValid;
  }

  _setListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInput(input);
        this._toggleButton();
      });
    });
  }

  setEventListeners() {
    this._setListeners();
  }
}
