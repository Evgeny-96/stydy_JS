function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        };
    }

    function dayNumber(data) {
        if (data < 10) {
            return '0' + data;
        } else {
            return data;
        }
    }

    let interv = setInterval(() => {
        let timer = getTimeRemaining();

        timerHours.textContent = dayNumber(timer.hours);
        timerMinutes.textContent = dayNumber(timer.minutes);
        timerSeconds.textContent = dayNumber(timer.seconds);
        if (timer.timeRemaining < 0) {

            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            clearInterval(interv);
        }
    }, 1000);
}

export default countTimer;