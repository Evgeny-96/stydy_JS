"use strict";
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
    };

start();

/* Доработать 7 пункт */

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            appData.expenses[i] = prompt('Введите обязательную статью расходов?');
            sum += +prompt('Во сколько это обойдется?');
            while (!isNumber(sum)) {
                sum += +prompt('Во сколько это обойдется?');
            }
        }
        console.log(appData.expenses);
        return sum;
    },
    getExpensesMonth: function () {
        // let sum = 0;
        // for (let i = 0; i < 2; i++) {
        //     appData.expenses[i] = prompt('Введите обязательную статью расходов?');
        //     sum += +prompt('Во сколько это обойдется?');
        //     while (!isNumber(sum)) {
        //         sum += +prompt('Во сколько это обойдется?');
        //     }
        // }
        // console.log(appData.expenses);
        // return sum;
    },
    getAccumulatedMonth: function() {
        return money - appData.expensesAmount;
    },
    getTargetMonth: 0,
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }
    }
};

// appData.asking();

console.log('Длина строки addExpenses: ', appData.addExpenses.length);
console.log('Период равен (period) месяцев: ', appData.period);
console.log('Цель заработать (mission) рублей/долларов/гривен/юани: ', appData.mission);

appData.budgetDay = money / 30;
console.log('budgetDay: ', appData.budgetDay);

// appData.expensesAmount = appData.getExpensesMonth();
appData.expensesAmount = appData.asking();
console.log('Расходы за месяц: ', appData.expensesAmount);

appData.getStatusIncome();

let accumulatedMonth = appData.getAccumulatedMonth();

appData.getTargetMonth = Math.ceil(appData.mission / accumulatedMonth);
if (appData.getTargetMonth > 0) {
    console.log('Цель будет достигнута за: ', appData.getTargetMonth);
} else {
    console.log('Цель не будет достигнута');
}

appData.budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', appData.budgetDay);