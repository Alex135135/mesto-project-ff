import {
  popupImageContainer,
  popupImage,
  cardTitle,
  template,
  loadingArea,
  handleClickImage,
} from "./index.js";
import { openPopup } from "./modal.js";
import { sendLike, deleteLike, deleteCard } from "./api.js";

export function createCard(
  card,
  user,
  deleteCardHandler,
  changeLikeHandler,
  handleClickImage
) {
  const cardTemplate = template.querySelector(".places__item").cloneNode(true);
  const title = cardTemplate.querySelector(".card__title");
  const image = cardTemplate.querySelector(".card__image");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  const trashButton = cardTemplate.querySelector(".card__delete-button");
  const likes = cardTemplate.querySelector(".card__likes");

  likes.textContent = card.likes.length;

  image.alt = card.name;
  image.src = card.link;

  title.textContent = card.name;

  const isLiked = card.likes.find((_user) => _user._id === user._id);
  if (isLiked) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  const isOwner = card.owner._id === user._id;
  if (isOwner) {
    trashButton.style.setProperty("display", "block");
    trashButton.addEventListener("click", (event) =>
      deleteCardHandler(event, card)
    );
  } else {
    trashButton.style.setProperty("display", "none");
  }
  likeButton.addEventListener("click", (event) =>
    changeLikeHandler(event, card, likes)
  );
  image.addEventListener("click", handleClickImage);

  return cardTemplate;
}

export function deleteCardHandler(event, card) {
  deleteCard(card._id)
    .then((response) => {
      console.log(response);
      event.target.closest(".places__item").remove();
    })
    .catch((error) => console.log(error));
}

export function changeLikeHandler(event, card, likes) {
  const isLiked = event.target.classList.contains(
    "card__like-button_is-active"
  );

  const likeMethod = isLiked ? deleteLike : sendLike;

  likeMethod(card._id)
    .then((card) => {
      likes.textContent = card.likes.length;
      event.target.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => console.log(error));
}

// export function handleClickImage(event) {
//   popupImage.src = event.target.src;
//   popupImage.alt = event.target.alt;
//   cardTitle.textContent = event.target.alt;
//   openPopup(popupImageContainer);
// }
