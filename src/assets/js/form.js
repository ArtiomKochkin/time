const hourTimer = document.getElementById("hourTimer");
const minuteTimer = document.getElementById("minuteTimer");
const secondTimer = document.getElementById("secondTimer");
const hourAlarmclock = document.getElementById("hourAlarmclock");
const minuteAlarmclock = document.getElementById("minuteAlarmclock");
const secondAlarmclock = document.getElementById("secondAlarmclock");

const startBtn = document.querySelectorAll(".start");
let fields = [hourTimer, minuteTimer, secondTimer, hourAlarmclock, minuteAlarmclock, secondAlarmclock];

fields.forEach(item => {
    item.addEventListener("click", function() {
        if (item.value == 0) {
            item.value = "";
        }
    });
});

startBtn.forEach(function(item) {
    item.addEventListener("click", event => {
        let currentModalContent = event.currentTarget.closest(".modal__content");
        let modalError = currentModalContent.querySelector(".modal__error");
        let modalErrorItem = currentModalContent.querySelector(".modal__error-item");
        let inputs = currentModalContent.querySelectorAll(".modal__input");
        let error = "";
        inputs.forEach(function(input) {
            let max = 59;
            let min = 0;
            let value = input.value;
            switch (input.id) {
                case "hourTimer" :
                case "hourAlarmclock" : 
                    max = 23;
                break;
            }

            if (value == "") {
                error = "Введите какое-либо значение в поле формы";
            }
            if (value > max || value < min) {
                error = `Введите корректное значение в поле формы от ${min} до ${max}`;
            }
            if (value.length > 2) {
                error = "Введите корректное значение в поле формы. Число не может иметь больше двух знаков";
            }
            
        });
        if (error != "") {
            modalError.classList.add("show");
            modalErrorItem.innerHTML = error;
        } else {
            modalError.classList.remove("show");
            modalErrorItem.innerHTML = "";
        }
    });
});