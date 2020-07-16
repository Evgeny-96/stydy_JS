window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function countTimer() {
        let greeting = document.querySelector('.greeting'),
            today = document.querySelector('.today'),
            nowHours = document.querySelector('.now-hours'),
            nowMinutes = document.querySelector('.now-minutes'),
            nowSeconds = document.querySelector('.now-seconds'),
            timeBeforeAfter = document.querySelector('.time-before-after'),
            newYear = document.querySelector('.new-year');

            function dayNumber(data) {
                if (data < 10) {
                    return '0' + data;
                } else {
                    return data;
                }
            }

        function getTimeNow() {
            let dateNow = new Date(),
                dayName = dateNow.toLocaleDateString('ru', {
                    weekday: 'long'
                }),
                seconds = dateNow.getSeconds(),
                minutes = dateNow.getMinutes(),
                hours = dateNow.getHours(),
                year = dateNow.getFullYear(),
                newYearCount = new Date(`31 december` + year),
                countDay = Math.ceil(Math.abs(newYearCount - dateNow) / (1000 * 3600 * 24)),
                amPm = hours >= 12 ? 'PM' : 'AM',
                timeDate = () => {
                    if (hours < 6) {return 'Доброй ночи';}
                    else if (hours < 12) {return 'Доброе утро';}
                    else if (hours < 18) {return 'Добрый день';}
                    else {return 'Добрый вечер';}
                };
            return {dayName, seconds, minutes, hours, amPm, timeDate, countDay};
        }
        function clock() {
            let timer = getTimeNow();

            greeting.textContent = timer.timeDate();
            today.textContent = timer.dayName;
            nowHours.textContent = dayNumber(timer.hours/2);
            nowMinutes.textContent = dayNumber(timer.minutes);
            nowSeconds.textContent = dayNumber(timer.seconds);
            timeBeforeAfter.textContent = timer.amPm;
            newYear.textContent = timer.countDay;
            setInterval(clock, 1000);
        }
        clock();
    }
    countTimer();
});