'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import dataImage from './modules/dataImage';
import onlyNumbersInput from './modules/onlyNumbersInput';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer    
countTimer('20 august 2020');
//Menu
toggleMenu();
//popup
togglePopup();
//табы
tabs();
//слайдер
slider();
//картинки при наведении
dataImage();
//только цифры в калькуляторе
onlyNumbersInput();
calc(100);
//send-ajax-form
sendForm();