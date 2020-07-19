window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Timer
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

        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.textContent = dayNumber(timer.hours);
            timerMinutes.textContent = dayNumber(timer.minutes);
            timerSeconds.textContent = dayNumber(timer.seconds);
            if (timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        }
        updateClock();
    }

    countTimer('20 august 2020');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');  
        };
        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };
    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (screen.width > 768) {
                    let opas = 0;
                    popup.style.opacity = opas;
                    popup.style.display = 'block';
                    let anim = setInterval(() => {
                        if (opas < 1) {
                            opas += 0.0125;
                        } else {
                            clearInterval(anim);
                        }
                        popup.style.opacity = opas;
                    }, 10);
                } else {
                    popup.style.display = 'block';
                }

            });
        });
        const funPopupClose = () => {
            if (screen.width > 768) {
                let opas = popup.style.opacity;
                let anim = setInterval(() => {
                    if (opas > 0) {
                        opas -= 0.0125;
                        popup.style.opacity = opas;
                    } else {
                        clearInterval(anim);
                        popup.style = null;
                    }
                }, 10);
            } else {
                popup.style = null;
            }
        };
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {funPopupClose();}
            else {
                target = target.closest('.popup-content');
                if (!target) {
                    funPopupClose();
                }
            }

        });
    };
    togglePopup();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            console.log('target: ', target);
            target = target.closest('.service-header-tab'); //проверяет есть ли такой класс, если нет, то проверяет у родителя и т.д. выше по родителям
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
});

//20:35 - урок 20 практика