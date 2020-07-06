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
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    additionalExpenses = document.querySelector('.additional_expenses');

start.disabled = true;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.mandatoryIncome = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
}
AppData.prototype.start = function () {
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
    if (this.textContent === 'Рассчитать') {
        appData.lock();
    } else {
        appData.resetLock();
    }
};
AppData.prototype.showResult = function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();

    periodSelect.addEventListener('input', appData.sevingsPeriod);
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true); //Получение родителя элемента
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus); //вставляем клон перед кнопкой
    expensesItems = document.querySelectorAll('.expenses-items');
    let cashExpenses = document.querySelectorAll('.expenses-amount'),
        itemExpenses = document.querySelectorAll('.expenses-title');
    if (expensesItems.length === 2) {
        cashExpenses[1].placeholder = 'Сумма';
        cashExpenses[1].value = itemExpenses[2].value = '';
        itemExpenses[2].placeholder = 'Наименование';
        appData.searchName();
        appData.searchAmount();
    } else if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
        cashExpenses[2].placeholder = 'Сумма';
        cashExpenses[2].value = itemExpenses[3].value = '';
        itemExpenses[3].placeholder = 'Наименование';
        appData.searchName();
        appData.searchAmount();
    }
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    let itemIncome = document.querySelectorAll('.income-title'),
        cashIncome = document.querySelectorAll('.income-amount');
    if (incomeItems.length === 2) {
        cashIncome[1].placeholder = 'Сумма';
        cashIncome[1].value = itemIncome[2].value = '';
        itemIncome[2].placeholder = 'Наименование';
        appData.searchName();
        appData.searchAmount();
    } else if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
        cashIncome[2].placeholder = 'Сумма';
        cashIncome[2].value = itemIncome[3].value = '';
        itemIncome[3].placeholder = 'Наименование';
        appData.searchName();
        appData.searchAmount();
    }
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(', '); //получаем значение и переводим в массив
    addExpenses.forEach(function (item) {
        item = item.trim(); //убирает пробелы вначале и в конце 
        if (item !== '') {
            appData.addExpenses.push(item);
        }
    });
};
AppData.prototype.getExpenses = function () {
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function () {
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
        }
    });
};
AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            appData.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getIncomeMonth = function () {
    for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
    }
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth + appData.mandatoryIncome - appData.expensesMonth;
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / appData.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
    if (appData.budgetDay > 800) {
        console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 300) {
        console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
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
};
AppData.prototype.calcPeriod = function () {
    return appData.budgetMonth * periodSelect.value;
};
AppData.prototype.slider = function () {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.sevingsPeriod = function () {
    incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
};
AppData.prototype.emptyField = function () {
    if (salaryAmount.value === null || salaryAmount.value === '') {
        start.disabled = true;
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    } else {
        start.disabled = false;
        start.addEventListener('click', appData.start);
    }
};
AppData.prototype.searchAmount = function () {
    let amountField = document.querySelectorAll('[placeholder = "Сумма"]');
    amountField.forEach(function (item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^0-9]/, '');
        });
    });
};
AppData.prototype.searchName = function () {
    let nameField = document.querySelectorAll('[placeholder = "Наименование"]');
    nameField.forEach(function (item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^А-я.,'";:`!?\s]/, '');
        });
    });
};
AppData.prototype.lock = function () {
    /* Блокировка левой части */
    let typeText = document.querySelectorAll('.data [type = "text"]');
    typeText.forEach(function (item) {
        item.disabled = true;
    });
    incomePlus.disabled = true;
    expensesPlus.disabled = true;
    start.textContent = 'Сбросить';
};
AppData.prototype.resetLock = function () {
    /* Сброс в начальное положение */
    let typeText = document.querySelectorAll('[type = "text"]');
    typeText.forEach(function (item) {
        item.disabled = false;
        item.value = null;
    });
    incomePlus.disabled = false;
    expensesPlus.disabled = false;
    start.textContent = 'Рассчитать';
    start.disabled = true;
    salaryAmount.addEventListener('input', appData.emptyField);
    appData.removeBlock();
};
AppData.prototype.removeBlock = function () {
    expensesItems.forEach(function (item, i) {
        if (i > 0) {
            item.remove();
        }
    });
    incomeItems.forEach(function (item, i) {
        if (i > 0) {
            item.remove();
        }
    });
    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';
};

AppData.prototype.eventListeners = function () {
    appData.searchName();
    appData.searchAmount();

    salaryAmount.addEventListener('input', appData.emptyField);

    periodSelect.addEventListener('input', appData.slider);

    incomePlus.addEventListener('click', appData.addIncomeBlock);

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
}

const appData = new AppData();
appData.eventListeners();






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