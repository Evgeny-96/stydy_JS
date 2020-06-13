"use strict";
let money = 30000,
    income = 'Фриланс',
    addExpenses = ('Интернет, Такси, Коммуналка, Проезд'),
    deposit = true,
    mission = 50000,
    period = 7;

console.log('money: ', typeof (money));
console.log('income: ', typeof (income));
console.log('deposit: ', typeof (deposit));
console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен (period) месяцев: ', period);
console.log('Цель заработать (mission) рублей/долларов/гривен/юани: ', mission);
console.log('Вывод массива addExpenses в нижнем регистре: ', addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1, expenses2, amount1,amount2;

for(let i = 0; i < 2; i++) {
    if (i === 0) {
        expenses1 = prompt('Введите обязательную статью расходов?');
        amount1 = prompt('Во сколько это обойдется?');
    } else {
        expenses2 = prompt('Введите обязательную статью расходов?');
        amount2 = prompt('Во сколько это обойдется?');
    }
}

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута:', Math.ceil(mission / budgetMonth), 'месяцев');