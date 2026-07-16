const startButton = document.querySelector("[data-start-button]");
const mainNav = document.querySelector("#main-nav");

if (startButton && mainNav) {
  startButton.addEventListener("click", () => {
    const open = mainNav.getAttribute("data-open") === "true";
    mainNav.setAttribute("data-open", String(!open));
    startButton.setAttribute("aria-expanded", String(!open));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 800px)").matches) {
      mainNav.setAttribute("data-open", "false");
      startButton.setAttribute("aria-expanded", "false");
    }
  });
}
