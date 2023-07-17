const modalBtn = document.querySelectorAll("[data-modal]");
const modal = document.querySelectorAll(".modal");
const modalStart = document.querySelectorAll(".modal--start");
const modalClose = document.querySelectorAll(".close");
const body = document.body;

modalBtn.forEach(item => {
    item.addEventListener("click", event => {
        let $this = event.currentTarget;
        let modalID = $this.getAttribute("data-modal");
        let modal = document.getElementById(modalID);
        let modalContent = modal.querySelector(".modal__content");

        modalContent.addEventListener("click", event => {
            event.stopPropagation();
        });

        modal.classList.add("show");
        body.classList.add("no-scroll");

        setTimeout(function() {
            modalContent.style.transform = "none";
            modalContent.style.opacity = "1";
        }, 1);
    });
});

function closeModal(currentModal) {
    let modalContent = currentModal.querySelector(".modal__content");
    let fields = currentModal.querySelectorAll("input");
    let modalError = document.querySelectorAll(".modal__error");
    let errorItem = document.querySelectorAll(".modal__error-item");
    
    fields.forEach(item => {
        item.value = "0";
    });
    modalError.forEach(item => {
        item.classList.remove("show");
    });
    errorItem.forEach(item => {
        item.innerHTML = "";
    });

    modalContent.removeAttribute("style");
    setTimeout(function() {
        currentModal.classList.remove("show");
        body.classList.remove("no-scroll");
    }, 500);
}

modalClose.forEach(item => {
    item.addEventListener("click", event => {
        let currentModal = event.currentTarget.closest(".modal");
        closeModal(currentModal);
    });
});

modalStart.forEach(item => {
    item.addEventListener("click",event => {
        let currentModal = event.currentTarget;
        closeModal(currentModal);
    });
});
