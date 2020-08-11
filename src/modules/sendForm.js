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
            let body = {};

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

export default sendForm;