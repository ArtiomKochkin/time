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