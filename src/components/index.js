import "../pages/index.css";

import { closePopup, openPopup } from "./modal.js";
import { createCard } from "./card.js";
import { initialCards } from "./cards.js";
import { clearValidation, disableButton } from "./utils.js";
import { enableValidation } from "./validate.js";
import {
  getUserInfo,
  getCards,
  editUserInfo,
  createCardApi,
  updateAvatar,
} from "./api.js";

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupFormEdit = document.querySelector(".popup__form_type_edit");
export const popupFormNewCard = document.querySelector(
  ".popup__form_type_new-card"
);
export const popupInputName = document.querySelector(".popup__input_type_name");
export const popupInputDescription = document.querySelector(
  ".popup__input_type_description"
);
export const popupInputCardName = document.querySelector(
  ".popup__input_type_card-name"
);
export const popupInputUrl = document.querySelector(".popup__input_type_url");
export const popupCloseButton = document.querySelectorAll(".popup__close");
export const popupImageContainer = document.querySelector(".popup_type_image");
export const popupImage = document.querySelector(".popup__image");
export const cardTitle = document.querySelector(".popup__caption");
export const popupAvatar = document.querySelector(".popup__avatar");
export const popupAvatarEdit = document.querySelector(
  ".profile__avatar-button"
);
export const formAvatar = document.querySelector("#edit-avatar");
export const inputAvatar = document.querySelector("#avatar-edit");

export const profile = {
  avatar: document.querySelector(".profile__avatar"),
  name: document.querySelector(".profile__title"),
  description: document.querySelector(".profile__description"),
};

export const template = document.querySelector("#card-template").content;
export const loadingArea = document.querySelector(".places__list");

let user = null;
const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    initializeUser(user);
    cards.reverse().forEach((card) => {
      loadingArea.prepend(createCard(card, user));
    });
  })
  .catch((error) => console.log(error))
  .finally(() => null);

function initializeUser(_user) {
  user = _user;
  profile.avatar.style.setProperty("background-image", `url(${_user.avatar})`);
  profile.name.textContent = _user.name;
  profile.description.textContent = _user.about;
}

export function openPopupForEditingProfile() {
  popupInputName.value = profile.name.textContent;
  popupInputDescription.value = profile.description.textContent;
}

export function editProfile(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";

  const newUserInfo = {
    name: popupInputName.value,
    about: popupInputDescription.value,
  };

  editUserInfo(newUserInfo)
    .then((user) => {
      profile.name.textContent = user.name;
      profile.description.textContent = user.about;
      closePopup(popupEdit);
      disableButton(event.submitter, options);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
}

export function getValuesCreateCard(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";

  const card = {
    name: popupInputCardName.value,
    link: popupInputUrl.value,
  };

  createCardApi(card)
    .then((card) => {
      clearValidation(popupInputCardName, popupInputUrl);
      loadingArea.prepend(createCard(card, user));
      closePopup(popupNewCard);
      disableButton(event.submitter, options);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
}

function renderInitialCards() {
  getCards()
    .then((cards) => {
      cards.forEach((card) => {
        const cardElement = createCard(card, user);
        loadingArea.appendChild(cardElement);
      });
    })
    .catch((error) => console.error(error));
}

formAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";

  updateAvatar(inputAvatar.value)
    .then((user) => {
      profile.avatar.style.setProperty(
        "background-image",
        `url(${user.avatar})`
      );
      closePopup(popupAvatar);
      disableButton(event.submitter, options);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
});

popupFormNewCard.addEventListener("submit", getValuesCreateCard);

popupFormEdit.addEventListener("submit", editProfile);

profileEditButton.addEventListener("click", () => {
  openPopup(popupEdit);
  openPopupForEditingProfile();
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

popupCloseButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

popupAvatarEdit.addEventListener("click", function (event) {
  openPopup(popupAvatar);
});

enableValidation(options);
