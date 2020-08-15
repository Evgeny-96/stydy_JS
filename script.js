"use strict";

const canvas = document.getElementById('canvas'),
  selectNumber = document.getElementById('select_number');

const angle = (degress = 360) => (Math.PI / 180) * degress;

if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  const circle = (x, y, start, end, col, bool, t = 1) => {
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.lineWidth = t;
    ctx.arc(x, y, 50, angle(start), angle(end), bool);
    ctx.stroke();

  };

  //черный
  circle(220, 175, 125, 330, '#000000', false);
  //синий
  circle(100, 175, 40, 330, '#0000CD', false);
  //коричневый
  circle(160, 225, 0, 360, '#D2691E', false);
  //черный
  circle(220, 175, 126, 39, '#000000', true);
  //красный
  circle(340, 175, 125, 60, '#FF0000', false);
  //зеленый
  circle(280, 225, 0, 360, '#008000', false);
  //красный
  circle(340, 175, 125, 60, '#FF0000', true);
  //черный
  circle(220, 175, 40, 329, '#000000', true);
  //синий
  circle(100, 175, 45, 330, '#0000CD', true);


  selectNumber.addEventListener('change', (elem) => {
    const width = canvas.width,
          height = canvas.height;
          
    ctx.clearRect(0, 0, width, height);

    const target = elem.target.value;
    //черный
    circle(220, 175, 125, 330, '#000000', false, target);
    //синий
    circle(100, 175, 40, 330, '#0000CD', false, target);
    //коричневый
    circle(160, 225, 0, 360, '#D2691E', false, target);
    //черный
    circle(220, 175, 126, 39, '#000000', true, target);
    //красный
    circle(340, 175, 125, 60, '#FF0000', false, target);
    //зеленый
    circle(280, 225, 0, 360, '#008000', false, target);
    //красный
    circle(340, 175, 125, 60, '#FF0000', true, target);
    //черный
    circle(220, 175, 40, 329, '#000000', true, target);
    //синий
    circle(100, 175, 45, 330, '#0000CD', true, target);
  });

} else {
  console.error('Объект canvas не поддерживается');
}