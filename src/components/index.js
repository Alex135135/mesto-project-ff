import "../pages/index.css";

import { closePopup, openPopup } from "./modal.js";
import { createCard, remove, calling } from "./card.js";
import { initialCards } from "./cards.js";

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

export const profile = {
  name: document.querySelector(".profile__title"),
  description: document.querySelector(".profile__description"),
};

export const template = document.querySelector("#card-template").content;
export const loadingArea = document.querySelector(".places__list");

export function openPopupForEditingProfile() {
  popupInputName.value = profile.name.textContent;
  popupInputDescription.value = profile.description.textContent;
}

export function editProfile(event) {
  event.preventDefault();
  profile.name.textContent = popupInputName.value;
  profile.description.textContent = popupInputDescription.value;
  closePopup(popupEdit);
}

export function getValuesCreateCard(event) {
  event.preventDefault();

  const card = {
    name: popupInputCardName.value,
    link: popupInputUrl.value,
  };

  createAndAddCard(card);

  closePopup(popupNewCard);
}
calling(initialCards);

export function createAndAddCard(card) {
  const newCard = createCard(card.name, card.link, remove);
  loadingArea.prepend(newCard);
}

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







