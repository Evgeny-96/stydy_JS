"use strict";

const output = document.getElementById('output');

const getData = (url) => {

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const responce = JSON.parse(request.responseText);
                resolve(responce);
            } else {
                reject(request.statusText);
            }
        });
        request.send();
    });
};

const outputPhotos = (data) => {
    data.forEach(item => {
        output.insertAdjacentHTML('beforebegin', `<h4>${item.title}</h4>
    <img src="${item.thumbnailUrl}" alt="${item.title}">`);
    });
    
};

const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
      twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

Promise.all([oneImg, twoImg])
    .then(outputPhotos)
    .catch(error => console.error(error));