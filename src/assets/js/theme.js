const btn = document.querySelector(".header__theme");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const elements = [body, header, footer, sidebar];

elements.forEach(function(item) {
    changeTheme(item);
});

function changeTheme(item) {
  let currentTheme = localStorage.getItem("theme");
  
  if (currentTheme) {
    item.classList.add(currentTheme);
  }

  btn.addEventListener("click", () => {
    item.classList.toggle("light-theme");

    let theme = item.classList.contains("light-theme") ? "light-theme" : "";
    localStorage.setItem("theme", theme);
  });
}