document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        fetch('./cars.json'
        //, {
        //     method: 'GET', // по умолчанию
        //     mode: 'same-origin', // успешно выполняется только в одном домене
        //     cache: 'default', //режим кэширования
        //     credentials: 'same-origin',//можно ли передавать данные вместе с запросом
        //     headers: { //заголовки
        //         'Content-Type': 'application/json'
        //     },
        //     redirect: 'follow',
        //     refferer: 'client', //позволяет узнать откуда пришел запрос
        //     body: JSON.stringify(data) //передаем данные
        // }
        )
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                return response.json();
            })
            .then((data) => {
                console.log('data: ', data);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                                            Цена: ${price}$`;
                    }
                });
            })
            .catch((error) => console.error(error));
    });
});