"use strict";
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


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

let start = function() {
    money = prompt('Ваш месячный доход?');

    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

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

let expenses = [];

function getExpensesMonth () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        sum += +prompt('Во сколько это обойдется?');
        while (!isNumber(sum)) {
            sum += +prompt('Во сколько это обойдется?');
        }
    }
    console.log(expenses);

    return sum;
}

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ', expensesAmount);

function getAccumulatedMonth () {
    return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = Math.ceil(mission / accumulatedMonth);
if (getTargetMonth > 0) {
    console.log('Цель будет достигнута за: ', getTargetMonth);
} else {
    console.log('Цель не будет достигнута');
}

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);