
export function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
  }
  
export function openPopup(popup) {
    popup.classList.add("popup_is-opened");
  }
  

document.addEventListener("keydown", (event) => {
    const popup = document.querySelector(".popup_is-opened");
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
  
document.addEventListener("click", (event) => {
    const popup = document.querySelector(".popup_is-opened");
    if (event.target === popup) {
      closePopup(popup);
    }
  });
  