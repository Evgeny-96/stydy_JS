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
                    popup.style.display = 'block';
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
            target = target.closest('.service-header-tab'); //проверяет есть ли такой класс, 
                                                            //если нет, то проверяет у родителя
                                                            //и т.д. выше по родителям
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

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = slider.querySelector('.portfolio-dots');

        const funDot = () => {         
            for (let i = 0; i < slide.length; i++) {
                const newDot = document.createElement('li'); 
                newDot.classList.add('dot');
                if (i === 0) {
                    newDot.classList.add('dot-active');
                }
                portfolioDots.append(newDot);
                portfolioDots.append(newDot);
            }
        };
        funDot();

        const dot = document.querySelectorAll('.dot');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    };

    slider();

    //картинки при наведении

    const dataImage = () => {
        let commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach((elem) => {
            let pic;
            elem.addEventListener('mouseenter', (picture) => {
                pic = picture.target.src;
                picture.target.src = picture.target.dataset.img;
            });
            elem.addEventListener('mouseleave', (picture) => {
                picture.target.src = pic;
            });        
        });
    };

    dataImage();

    //только цифры в калькуляторе

    const onlyNumbersInput = () => {
        let inputCalcItem = document.querySelectorAll('input.calc-item');
        inputCalcItem.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/\D/g, '');
                
            });
        });
    };

    onlyNumbersInput();

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

            const countSum = () => {
                let total = 0,
                    countValue = 1,
                    dayValue = 1;
                const typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;

                if (calcCount.value > 1) {
                    countValue += (calcCount.value - 1) / 10;
                }

                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }
                
                if (typeValue && squareValue) {
                    total = price * typeValue * squareValue * countValue * dayValue;
                }
                
                totalValue.textContent = total;
            };

            calcBlock.addEventListener('change', (event) => {
                const target = event.target;
                if (target === calcType || target === calcSquare ||
                    target === calcDay || target === calcCount) {
                        countSum();
                    }
            });
    };

    calc(100);

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMesage = 'Спасибо! Мы скоро с вами свяжемся!';

        // const form = document.getElementById('form*');
        const form = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php'); //отправка данных на сервер методом POST
            request.setRequestHeader('Content-Type', 'application/json'); 
            //заголовок и значение => данные из формы
            request.send(JSON.stringify(body));
        };

        form.forEach(elem => {
            elem.addEventListener('submit', (event) => {
                event.preventDefault(); //отмена функции нажатия кнопки
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
    
                const formData = new FormData(elem); //считывает со всей формы все объекты с атрибутом name
                let body ={};
    
                // for(let val of formData.entries()) { //вытаскиваем значения с пом-ю entries
                //     body[val[0]] = val[1];
                // }
    
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, 
                () => {
                    statusMessage.textContent = successMesage;
                    const input = elem.querySelectorAll('input');
                    input.forEach(e => {
                        e.value = '';
                    });
                },
                (error) => {
                    statusMessage.textContent = errorMessage;
                    const input = elem.querySelectorAll('input');
                    input.forEach(e => {
                        e.value = '';
                    });
                });
                
                
            });
        });

         
    };

    sendForm();
});