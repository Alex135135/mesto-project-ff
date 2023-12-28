// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const template = document.querySelector('#card-template').content;
const loadingArea = document.querySelector('.places__list');
function createCard(name, link, remove) {
    const card = template.querySelector('.places__item').cloneNode(true);
    const title = card.querySelector('.card__title');
    const image = card.querySelector('.card__image');
      title.textContent = name;
      image.setAttribute('alt', name);
      image.setAttribute("src", link);

const deleteCard = card.querySelector('.card__delete-button').addEventListener('click', function () {remove(card)});
return card;
}

function remove(card) {
    card.remove();
}

function calling(cards) {
  cards.forEach(function (item) {
const card = createCard(item.name, item.link, remove);
loadingArea.appendChild(card);
});
}

calling(initialCards);
