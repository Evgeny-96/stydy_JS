"use strict";

let start = document.querySelector('#start'),
    incomePlus = document.querySelector('button.income_add'),
    expensesPlus = document.querySelector('button.expenses_add'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    classValue = document.querySelectorAll('[class*="-value"]'),
    salaryAmount = document.querySelector('.salary-amount'),
    additionalIncomeAmount = document.querySelector('.additional_income-amount'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    additionalExpenses = document.querySelector('.additional_expenses'),
    incomeItems = document.querySelectorAll('.income-items');

start.disabled = true;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    mandatoryIncome: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = +salaryAmount.value;
        appData.mandatoryIncome = +additionalIncomeAmount.value;

        appData.getIncome();
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        
        periodSelect.addEventListener('input', appData.sevingsPeriod);
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true); //Получение родителя элемента
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus); //вставляем клон перед кнопкой
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(', '); //получаем значение и переводим в массив
        addExpenses.forEach(function (item) {
            item = item.trim(); //убирает пробелы вначале и в конце 
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }   
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getIncomeMonth: function() {
        for( let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth + appData.mandatoryIncome - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 300) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay > 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    slider: function() {
        periodAmount.textContent = periodSelect.value;
    },
    sevingsPeriod: function() {
        incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
    },emptyField: function() {
        if(salaryAmount.value === null || salaryAmount.value === '') {
            start.disabled = true; 
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        } else {
            start.disabled = false;
            start.addEventListener('click', appData.start);
        }
    }
};

salaryAmount.addEventListener('input', appData.emptyField);

periodSelect.addEventListener('input', appData.slider);
 
incomePlus.addEventListener('click', appData.addIncomeBlock);

expensesPlus.addEventListener('click', appData.addExpensesBlock);



// appData.getStatusIncome();

// if (appData.getTargetMonth > 0) {
//     console.log('Цель будет достигнута за: ' + appData.getTargetMonth + ' месяца');
// } else {
//     console.log('Цель не будет достигнута');
// }

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//     console.log('Свойство: ' + key + ' , значение: ' + appData[key]);
// }

// appData.getInfoDeposit();
// for (let i = 0; i < appData.addExpenses.length; i++) {
//     let word = appData.addExpenses[i],
//         res = '';
//     res += word[0].toUpperCase() + word.slice(1);
//     appData.addExpenses[i] = res;
// }

// console.log('appData.addExpenses: ', appData.addExpenses.join(', '));
