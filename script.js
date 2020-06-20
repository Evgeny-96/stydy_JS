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
        for (let i = 0; i < 2; i++) {
            let titleExp = prompt('Введите обязательную статью расходов?'),
            dataExp = +prompt('Во сколько это обойдется?');
            while (!isNumber(dataExp)) {
                dataExp = +prompt('Во сколько это обойдется?');
            }
            appData.expenses[titleExp] = dataExp;
        }
        // console.log('appData.expenses: ', appData.expenses);
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        console.log('Расходы за месяц: ', appData.expensesMonth);
    },
    getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        console.log('Бюджет на месяц: ', appData.budgetMonth);

        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        console.log('Бюджет на день: ', appData.budgetDay);
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

console.log('Цель заработать (mission) рублей/долларов/гривен/юани: ', appData.mission);

appData.expensesAmount = appData.asking();
appData.getExpensesMonth();

appData.getBudget();
appData.getStatusIncome();

appData.getTargetMonth = Math.ceil(appData.mission / appData.budgetMonth);
if (appData.getTargetMonth > 0) {
    console.log('Цель будет достигнута за: ' + appData.getTargetMonth + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {    
    console.log('Свойство: ' + key + ' , значение: ' + appData[key]);
}
