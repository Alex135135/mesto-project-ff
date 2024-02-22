export const showError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(options.inputErrorClass);
};

export const hideError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(options.inputErrorClass);
};

export const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    const regex = /^[а-яА-ЯёЁa-zA-Z-\s]+$/;
    if (!regex.test(inputElement.value)) {
      const customErrorMessage = inputElement.dataset.errorMessage;
      showError(formElement, inputElement, customErrorMessage, options);
    } else {
      hideError(formElement, inputElement, options);
    }
  }
};

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

export const setEventListener = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

export const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, options);
  });
};

export function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, options);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

export function clearValidation(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, options);
  });

  disableButton(buttonElement, options);
}

function disableButton(button, options) {
  button.classList.add(options.inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
}
