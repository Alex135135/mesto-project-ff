export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapePress);
  document.removeEventListener("click", closePopupByOverlay);
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapePress);
  document.addEventListener("click", closePopupByOverlay);
}

export function handleEscapePress(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

export function closePopupByOverlay(event) {
  const popup = document.querySelector(".popup_is-opened");
  if (event.target === popup) {
    closePopup(popup);
  }
}
