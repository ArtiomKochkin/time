let head = document.head;
let title = head.querySelector("title").innerHTML;

switch (title) {
    case "Время": 
        currentTime();
    break;
    case "Секундомер": 
        stopwatch();
    break;
    case "Таймер": 
        timer();
    break;
    case "Будильник": 
        currentTime();
        alarm();
    break;
}
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
function alarm() {
    const alarmclockStart = document.getElementById("alarmclock-start");
    const alarmclockFinish = document.getElementById("alarmclock-finish");
    const boxAlarmclock = document.querySelector(".time__alarmclock");
    const currentAlarmclock = document.getElementById("currentAlarmclock");
    const timeAlarmclockFinish = document.getElementById("timeAlarmclockFinish");
    const modalContentFinish = alarmclockFinish.querySelector(".modal__content--finish");
    const modalClose = document.querySelectorAll(".close");

    const btnSetAlarmclock = document.getElementById("btnSetAlarmclock");
    const btnAlarmclock = document.getElementById("btnAlarmclock");
    const btnOffAlarmclock = document.getElementById("btnOffAlarmclock");
    const btnOffSound = document.getElementById("btnOffSound");
    const btnChangeAlarmClock = document.getElementById("btnChangeAlarmClock");

    const hourAlarmclock = document.getElementById("hourAlarmclock");
    const minuteAlarmclock = document.getElementById("minuteAlarmclock");
    const secondAlarmclock = document.getElementById("secondAlarmclock");
    const sound = document.getElementById("sound");
    let fieldsAlarmclock = [hourAlarmclock, minuteAlarmclock, secondAlarmclock];
    let alarm = new Date();
    let hhmmss;

    btnAlarmclock.addEventListener("click", () => {
        let error = alarmclockStart.querySelector(".modal__error-item");
        if (error.innerHTML == "") {
            setAlarmclock();
        }
    });
    btnOffAlarmclock.addEventListener("click", offAlarmclock);
    btnChangeAlarmClock.addEventListener("click", changeAlarmclock);
    let alarmclock = setInterval(playSound, 1000);

    function setAlarmclock() {
        let hours = hourAlarmclock.value;
        let minutes = minuteAlarmclock.value;
        let seconds = secondAlarmclock.value;
        let regExp = /0[0-9]/;
        hours = (hours < 10 && hours.match(regExp) == null) ? "0" + hours : hours;
        minutes = (minutes < 10 && minutes.match(regExp) == null) ? "0" + minutes : minutes;
        seconds = (seconds < 10 && seconds.match(regExp) == null) ? "0" + seconds : seconds;
        let result = hours + " : " + minutes  + " : " + seconds;
        hhmmss = result;

        boxAlarmclock.classList.add("show");
        alarmclockStart.classList.remove("show");
        document.body.classList.remove("no-scroll");
        btnSetAlarmclock.disabled = true;
        currentAlarmclock.innerHTML = result;
    }

    function offAlarmclock() {
        hourAlarmclock.value = "0";
        minuteAlarmclock.value = "0";
        secondAlarmclock.value = "0";
        btnSetAlarmclock.disabled = false;
        boxAlarmclock.classList.remove("show");
        currentAlarmclock.innerHTML = "";
        timeAlarmclockFinish.innerHTML = "";
    }

    function playSound() {
        alarm = new Date();
        let nowHours = (alarm.getHours() < 10) ? "0" + alarm.getHours() : alarm.getHours();
        let nowMinutes = (alarm.getMinutes() < 10) ? "0" + alarm.getMinutes() : alarm.getMinutes();
        let nowSeconds = (alarm.getSeconds() < 10) ? "0" + alarm.getSeconds() : alarm.getSeconds();
        let nowResult = nowHours + " : " + nowMinutes  + " : " + nowSeconds;
        
        if (nowResult == hhmmss) {
            alarmclockFinish.classList.add("show");
            modalContentFinish.style.transform = "none";
            modalContentFinish.style.opacity = "1";
            timeAlarmclockFinish.innerHTML = hhmmss;
            sound.loop = true;
            sound.play(); 
        }
    }

    modalClose.forEach(function(item) {
        item.addEventListener("click", function() {
            offAlarmclock();
            sound.pause();
            sound.currentTime = 0;
        });
    });

    function changeAlarmclock() {
        btnAlarmclock.disabled = false;
        sound.pause();
        sound.currentTime = 0;
        alarmclockFinish.classList.remove("show");
    }
}
function stopwatch() {
    const hourStopwatch = document.querySelector(".stopwatch__hours");
    const minuteStopwatch = document.querySelector(".stopwatch__minutes");
    const secondStopwatch = document.querySelector(".stopwatch__seconds");
    const millisecondStopwatch = document.querySelector(".stopwatch__milliseconds");
    const btnStartStopwatch = document.getElementById("stopwatchStart");
    const btnStopStopwatch = document.getElementById("stopwatchStop");
    const btnResetStopwatch = document.getElementById("stopwatchReset");
    const btnLapStopwatch = document.getElementById("stopwatchLap");
    const lap = document.querySelector(".lap");
    let stopwatch, intervalLap, intervalResult;
    let total = 0;
    let intermediate = 0;
    let countLap = 0;
    let ms = 0;
    let sec = 0;
    let min = 0;
    let h = 0;

    btnStartStopwatch.addEventListener("click", setStopwatch);
    btnLapStopwatch.addEventListener("click", addLap);
    btnResetStopwatch.addEventListener("click", () => {
        resetStopwatch(stopwatch);
    });
    btnStopStopwatch.addEventListener("click", () => {
        stopStopwatch(stopwatch);
    });

    function setStopwatch() {
        stopwatch = setInterval(function() {
            let milliseconds = Math.trunc(total % 100);
            let seconds = Math.trunc(total / 100 % 60);
            let minutes = Math.trunc(total / 100 / 60 % 60);
            let hours = Math.trunc(total / 100 / 60 / 60 % 60);

            hours = String(hours);
            minutes = String(minutes);
            seconds = String(seconds);
            milliseconds = String(milliseconds);
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10 ) ? "0" + minutes : minutes;
            seconds = (seconds < 10 ) ? "0" + seconds : seconds;
            milliseconds = (milliseconds < 10 ) ? "0" + milliseconds : milliseconds;
            millisecondStopwatch.innerHTML = milliseconds;
            hourStopwatch.innerHTML = hours;
            minuteStopwatch.innerHTML = minutes;
            secondStopwatch.innerHTML = seconds;

            total++;
        }, 10);

        btnStartStopwatch.disabled = true;
        btnStopStopwatch.disabled = false;
        btnResetStopwatch.disabled = false;
        btnLapStopwatch.disabled = false;
    }

    function resetStopwatch(interval) {
        let lapItems = document.querySelectorAll(".lap__item");
        lapItems.forEach(function(item) {
            item.remove();
        });

        total = 0;
        intermediate = 0;
        countLap = 0;
        clearInterval(interval);
        clearInterval(intervalLap);
        lap.classList.remove("show");
        hourStopwatch.innerHTML = "00";
        minuteStopwatch.innerHTML = "00";
        secondStopwatch.innerHTML = "00";
        millisecondStopwatch.innerHTML = "00";
        btnStartStopwatch.disabled = false;
        btnStopStopwatch.disabled = true;
        btnResetStopwatch.disabled = true;
        btnLapStopwatch.disabled = true;
    }

    function stopStopwatch(interval) {
        clearInterval(interval);
        clearInterval(intervalLap);
        btnStartStopwatch.disabled = false;
        btnStopStopwatch.disabled = true;
        btnLapStopwatch.disabled = true;
    }

    function addLap() {
        countLap++;
        countLapItem();
        let lapItem = document.createElement("tr");
        let lapNumber = document.createElement("td");
        let lapTime = document.createElement("td");
        let lapTotalTime = document.createElement("td");
        let textLapNumber = document.createTextNode(countLap);
        let textLapTime = document.createTextNode(intervalResult);
        let textLapTotalTime = document.createTextNode(hourStopwatch.innerHTML + " : " + minuteStopwatch.innerHTML + " : " + secondStopwatch.innerHTML + " . " +  millisecondStopwatch.innerHTML);

        lap.classList.add("show");
        lapItem.className = "lap__item";
        lapNumber.className = "lap__measurement";
        lapTime.className = "lap__measurement";
        lapTotalTime.className = "lap__measurement";

        lapNumber.appendChild(textLapNumber);
        lapTime.appendChild(textLapTime);
        lapTotalTime.appendChild(textLapTotalTime);
        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTime);
        lapItem.appendChild(lapTotalTime);
        lap.appendChild(lapItem);

        function countLapItem() {
            if (countLap == 1) {
                intervalResult = hourStopwatch.innerHTML + " : " + minuteStopwatch.innerHTML + " : " + secondStopwatch.innerHTML + " . " + millisecondStopwatch.innerHTML;

                intervalLap = setInterval(function() {
                    ms = Math.trunc(intermediate % 100);
                    sec = Math.trunc(intermediate / 100 % 60);
                    min = Math.trunc(intermediate / 100 / 60 % 60);
                    h = Math.trunc(intermediate  / 100 / 60 / 60 % 60);
            
                    h = String(h);
                    min = String(min);
                    sec = String(sec);
                    ms = String(ms);
                    h = (h < 10) ? "0" + h : h;
                    min = (min < 10 ) ? "0" + min : min;
                    sec = (sec < 10 ) ? "0" + sec : sec;
                    ms = (ms < 10 ) ? "0" + ms : ms;
            
                    intermediate++;
                }, 10);
            } else {
                clearInterval(intervalLap);
                intermediate = 0;
                intervalResult = h + " : " + min + " : " + sec + " . " + ms;

                intervalLap = setInterval(function() {
                    ms = Math.trunc(intermediate % 100);
                    sec = Math.trunc(intermediate / 100 % 60);
                    min = Math.trunc(intermediate / 100 / 60 % 60);
                    h = Math.trunc(intermediate  / 100 / 60 / 60 % 60);
            
                    h = String(h);
                    min = String(min);
                    sec = String(sec);
                    ms = String(ms);
                    h = (h < 10) ? "0" + h : h;
                    min = (min < 10 ) ? "0" + min : min;
                    sec = (sec < 10 ) ? "0" + sec : sec;
                    ms = (ms < 10 ) ? "0" + ms : ms;
            
                    intermediate++;
                }, 10);
            }
        }
    }
}
function timer() {
    const timerHour = document.querySelector(".timer__hours");
    const timerMinute = document.querySelector(".timer__minutes");
    const timerSecond = document.querySelector(".timer__seconds");
    const hourInput = document.getElementById("hourTimer");
    const minuteInput = document.getElementById("minuteTimer");
    const secondInput = document.getElementById("secondTimer");
    const btnStartTimer = document.getElementById("startTimer");
    const btnStartTimerModal = document.getElementById("startTimerModal");
    const btnStopTimer = document.getElementById("stopTimer");
    const btnResetTimer = document.getElementById("resetTimer");
    const btnChangeTimer = document.getElementById("changeTimer");
    const modalTimerStart = document.getElementById("timer-start");
    const modalTimerFinish = document.getElementById("timer-finish");
    const modalTimerContentStart = document.querySelector(".modal__content--start");
    const modalTimerContentFinish = document.querySelector(".modal__content--finish");
    const btnsCloseTimer = modalTimerFinish.querySelectorAll(".close");
    const sound = document.getElementById("sound");

    let timer, result, hour, min, sec;

    btnStartTimer.addEventListener("click", function() {
        hour = timerHour.innerHTML;
        min = timerMinute.innerHTML;
        sec = timerSecond.innerHTML;
        result = (+hour * 60 * 60) + (+min * 60) + +sec;
        countdown(result);
    });

    btnStartTimerModal.addEventListener("click", function() {
        let error = modalTimerContentStart.querySelector(".modal__error-item");

        if (error.innerHTML == "") {
            changeTimer();
            result = (+hour * 60 * 60) + (+min * 60) + +sec;
            countdown(result);
        }
    });

    function changeTimer() {
        hour = hourInput.value;
        min = minuteInput.value;
        sec = secondInput.value;
        hour = (hour < 10) ? "0" + hour : hour;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        
        timerHour.innerHTML = hour;
        timerMinute.innerHTML = min;
        timerSecond.innerHTML = sec;
        document.body.classList.remove("no-scroll");
        modalTimerStart.classList.remove("show");
    }

    function resetTimer() {
        timerHour.innerHTML = "00";
        timerMinute.innerHTML = "00";
        timerSecond.innerHTML = "00";
        btnStartTimer.disabled = true;
        btnStopTimer.disabled = true;
        btnResetTimer.disabled = true;
    }

    function stopTimer(interval) {
        clearInterval(interval);
        btnStartTimer.disabled = false;
        btnStopTimer.disabled = true;
    }

    function countdown(total) {
        clearInterval(timer);
        timer = setInterval(function() {
            let seconds = Math.trunc(total % 60);
            let minutes = Math.trunc(total / 60 % 60);
            let hours = Math.trunc(total / 60 / 60 % 60);
            if (total == 0) {
                clearInterval(timer);
                resetTimer();
                modalTimerFinish.classList.add("show");
                modalTimerContentFinish.style.transform = "none";
                modalTimerContentFinish.style.opacity = "1";
                sound.loop = true;
                sound.play();
                btnsCloseTimer.forEach(function(item) {
                    item.addEventListener("click", () => {
                        sound.pause();
                        sound.currentTime = 0;
                        modalTimerFinish.classList.remove("show");
                        modalTimerContentFinish.style.opacity = "0";
                    });
                });
            } else {
                hours = String(hours);
                minutes = String(minutes);
                seconds = String(seconds);
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
                timerHour.innerHTML = hours;
                timerMinute.innerHTML = minutes;
                timerSecond.innerHTML = seconds;
            }
            total--;
        }, 1000);

        btnStartTimer.disabled = true;
        btnStopTimer.disabled = false;
        btnResetTimer.disabled = false;

        btnResetTimer.addEventListener("click", () => {
            resetTimer();
            clearInterval(timer);
        });

        btnStopTimer.addEventListener("click", () => {
            stopTimer(timer);
        });
    }
}
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

function currentTime() {
    const textTime = document.querySelectorAll(".nowTime");
    const textDay = document.querySelectorAll(".nowTimeDay");
    const textDate = document.querySelectorAll(".nowTimeDDMMYYYY");
    let nameOfDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let nameOfMonth = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let now = new Date();

    let time = setInterval(nowTime, 1000);

    function nowTime() {
        now = new Date();
        let hours = (now.getHours() < 10) ? "0" + now.getHours() : now.getHours();
        let minutes = (now.getMinutes() < 10) ? "0" + now.getMinutes() : now.getMinutes();
        let seconds = (now.getSeconds() < 10) ? "0" + now.getSeconds() : now.getSeconds();
        let dayOfWeek = now.getDay();
        let day = (now.getDate() < 10) ? "0" + now.getDate() : now.getDate();
        let month = now.getMonth();
        let year = now.getFullYear();

        let nowTime = hours + " : " + minutes + " : " + seconds;
        let nowDate = day + " " + nameOfMonth[month] + " " + year


        insertText(textTime, nowTime);
        insertText(textDay, nameOfDays[dayOfWeek]);
        insertText(textDate, nowDate);

        function insertText(element, time) {
            element.forEach(function(item) {
                item.innerHTML = time;
            });
        }
    }
}
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