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