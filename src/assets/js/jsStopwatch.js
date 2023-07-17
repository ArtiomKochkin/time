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