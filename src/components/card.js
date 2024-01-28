import {
    popupImageContainer,
    popupImage,
    cardTitle,
    template,
    loadingArea,
  } from "./index.js";
  import { openPopup } from "./modal.js";
  
  export function createCard(name, link, remove) {
    const card = template.querySelector(".places__item").cloneNode(true);
    const title = card.querySelector(".card__title");
    const image = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like-button");
    title.textContent = name;
    image.setAttribute("alt", name);
    image.setAttribute("src", link);
  
    likeButton.addEventListener("click", (event) => {
      event.target.classList.toggle("card__like-button_is-active");
    });
  
    image.addEventListener("click", (event) => {
      popupImage.src = event.target.src;
      cardTitle.textContent = event.target.alt;
      openPopup(popupImageContainer);
    });
  
    const deleteCard = card
      .querySelector(".card__delete-button")
      .addEventListener("click", function () {
        remove(card);
      });
    return card;
  }
  
  export function remove(card) {
    card.remove();
  }
  
  export function calling(cards) {
    cards.forEach(function (item) {
      const card = createCard(item.name, item.link, remove);
      loadingArea.appendChild(card);
    });
  }
  

  
  