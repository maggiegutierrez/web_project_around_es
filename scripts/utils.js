function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function resetFormErrors(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-input-error`);
    input.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  });

  if (button) {
    button.disabled = true;
  }
}

export { openModal, closeModal, resetFormErrors };
