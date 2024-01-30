import {
  popupImageContainer,
  popupImage,
  cardTitle,
  template,
  loadingArea,
} from "./index.js";
import { openPopup } from "./modal.js";

export function createCard(name, link, remove, handleLike, handleClickImage) {
  const card = template.querySelector(".places__item").cloneNode(true);
  const title = card.querySelector(".card__title");
  const image = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__like-button");
  title.textContent = name;
  image.setAttribute("alt", name);
  image.setAttribute("src", link);

  likeButton.addEventListener("click", (event) => {
    handleLike(event);
  });

  image.addEventListener("click", (event) => {
    handleClickImage(event);
  });

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      remove(card);
    });
  return card;
}

export function remove(card) {
  card.remove();
}

// Функция обработки лайка
export function handleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

// Функция обработки клика по изображению
export function handleClickImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  cardTitle.textContent = event.target.alt;
  openPopup(popupImageContainer);
}
  

  
  