"use strict";
let money = 30000,
    income = 'Фриланс',
    addExpenses = ('Интернет, Такси, Коммуналка, Проезд'),
    deposit = true,
    mission = 50000,
    period = 7;

let showTypeOf = function(data) {
        console.log('data: ', typeof (data));
    };

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

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

function getStatusIncome() {
    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
}

getStatusIncome();

function getExpensesMonth () {
    return Number(amount1) + Number(amount2);
}
console.log('Расходы за месяц: ', getExpensesMonth());

function getAccumulatedMonth () {
    return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = Math.ceil(mission / accumulatedMonth);
console.log('Цель будет достигнута за: ', getTargetMonth);

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);