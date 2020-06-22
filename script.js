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
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такусую');
            while (isNumber(itemIncome)) {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
            }
            let cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            while (!isNumber(cashIncome)) {
                cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?');
            }
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', "Кино");
        appData.addExpenses = addExpenses.toLowerCase().split(', ');

       
        // appData.addExpenses = addExpenses[0].toUpperCase() + addExpenses.slice(1);
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let titleExp = prompt('Введите обязательную статью расходов?', 'Садик');
            while (isNumber(titleExp)) {
                titleExp = prompt('Введите обязательную статью расходов?');
            }
            let dataExp = +prompt('Во сколько это обойдется?', '900');
            while (!isNumber(dataExp)) {
                dataExp = +prompt('Во сколько это обойдется?');
            }
            appData.expenses[titleExp] = dataExp;
        }
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
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.persentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.persentDeposit)) {
                appData.persentDeposit = +prompt('Какой годовой процент?');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = +prompt('Какая сумма заложена?');
            }
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
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

appData.getInfoDeposit();
for ( let i = 0; i < appData.addExpenses.length; i++) {
    let word = appData.addExpenses[i], res = '';
    res += word[0].toUpperCase() + word.slice(1);
    appData.addExpenses[i] = res;
}

console.log('appData.addExpenses: ', appData.addExpenses.join(', '));