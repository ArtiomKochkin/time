const menu = document.querySelector(".header__burger");
const sidebar = document.getElementById("sidebar");
const sidebarItems = document.querySelectorAll(".sidebar__item");

switch (title) {
    case "Время": 
        sidebarItems[0].classList.add("active");
    break;
    case "Секундомер": 
        sidebarItems[1].classList.add("active");
    break;
    case "Таймер": 
        sidebarItems[2].classList.add("active");
    break;
    case "Будильник": 
        sidebarItems[3].classList.add("active");
    break;
}

menu.addEventListener("click", function() {
    if(!menu.classList.contains("close")) {
        menu.classList.add("close");
        sidebar.style.transform = "translateX(0%)";
    } else {
        menu.classList.remove("close");
        sidebar.style.transform = "translateX(-100%)";
    }
});