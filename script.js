"use strict";

const  chapter = document.querySelectorAll('.book ul'),
book = document.querySelectorAll('.book');

/*1. Восстановить порядок книг */

book[1].after(book[0]);
book[2].after(book[4]);
book[5].after(book[2]);

/*2. Заменить картинку заднего фона на другую из папки image*/

document.querySelector('body').style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

/*3. Исправить заголовок в книге 3*/

let bookA = document.querySelectorAll('.book h2 a');

bookA[2].textContent = 'Книга 3. this и Прототипы Объектов';

/*4. Удалить рекламу со страницы*/

document.querySelector('.adv').style.display = 'none';

/*5. Восстановить порядок глав во второй и пятой книге*/

chapter[0].children[9].after(chapter[0].children[2]);
chapter[0].children[2].after(chapter[0].children[5]);
chapter[0].children[3].after(chapter[0].children[7]);

chapter[5].children[1].after(chapter[5].children[9]);
chapter[5].children[5].after(chapter[5].children[3]);
chapter[5].children[8].after(chapter[5].children[6]);

/*6. в шестой книге добавить главу */

const cloneLi = chapter[2].children[8].cloneNode(true);
cloneLi.textContent = 'Глава 8: За пределами ES6';
chapter[2].children[8].append(cloneLi);