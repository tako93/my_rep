
function RTclock() {
    let clock = new Date();
    let hours = clock.getHours();
    let minutes = clock.getMinutes();
    let seconds = clock.getSeconds();


    let amPm = (hours < 12) ? "AM" : "PM";
    hours = (hours > 12) ? hours - 12 : hours;
    hours = ("0" + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);

    document.getElementById('clock').innerHTML = hours + ' : ' + minutes + ' : ' + seconds + ' ' + amPm;
    let l = setTimeout(RTclock, 500);
};