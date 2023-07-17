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