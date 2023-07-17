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