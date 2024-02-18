const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "c8791baf-3ecb-428c-8774-0a22dbd688c4",
    "Content-Type": "application/json",
  },
};

export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

export function getUserInfo() {
  return fetch(config.baseUrl + "/users/me", config)
    .then(checkResponse)
    .then((data) => data);
}

export function getCards() {
  return fetch(config.baseUrl + "/cards", config)
    .then(checkResponse)
    .then((data) => data);
}

export function createCardApi({ name, link }) {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
    .then((data) => data);
}

export function editUserInfo({ name, about }) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
    .then((data) => data);
}

export function updateAvatar(avatar) {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then(checkResponse)
    .then((data) => data);
}

export function sendLike(cardId) {
  return fetch(config.baseUrl + "/cards/likes/" + cardId, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .then((data) => data);
}

export function deleteLike(cardId) {
  return fetch(config.baseUrl + "/cards/likes/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .then((data) => data);
}

export function deleteCard(cardId) {
  return fetch(config.baseUrl + "/cards/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .then((data) => data);
}
