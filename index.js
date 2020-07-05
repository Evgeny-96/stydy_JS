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
};

AppData.prototype.start = function () {
    const _this = this;
    _this.budget = +salaryAmount.value;
    _this.mandatoryIncome = +additionalIncomeAmount.value;

    AppData.prototype.getIncome();
    AppData.prototype.getExpenses();
    AppData.prototype.getExpensesMonth();
    AppData.prototype.getIncomeMonth();
    AppData.prototype.getAddExpenses();
    AppData.prototype.getAddIncome();
    AppData.prototype.getBudget();

    AppData.prototype.showResult();
    if (this.textContent === 'Рассчитать') {
        AppData.prototype.lock();
    } else {
        AppData.prototype.resetLock();
    }
};

AppData.prototype.showResult = function () {
    // const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', this.sevingsPeriod);
};
AppData.prototype.addExpensesBlock = function () {
    const _this = this;
    let cloneExpensesItem = expensesItems[0].cloneNode(true); //Получение родителя элемента
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus); //вставляем клон перед кнопкой
    expensesItems = document.querySelectorAll('.expenses-items');
    let cashExpenses = document.querySelectorAll('.expenses-amount'),
        itemExpenses = document.querySelectorAll('.expenses-title');
    if (expensesItems.length === 2) {
        cashExpenses[1].placeholder = 'Сумма';
        cashExpenses[1].value = itemExpenses[2].value = '';
        itemExpenses[2].placeholder = 'Наименование';
        AppData.prototype.searchName();
        AppData.prototype.searchAmount();
    } else if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
        cashExpenses[2].placeholder = 'Сумма';
        cashExpenses[2].value = itemExpenses[3].value = '';
        itemExpenses[3].placeholder = 'Наименование';
        AppData.prototype.searchName();
        AppData.prototype.searchAmount();
    }
};
AppData.prototype.addIncomeBlock = function () {
    const _this = this;
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    let itemIncome = document.querySelectorAll('.income-title'),
        cashIncome = document.querySelectorAll('.income-amount');
    if (incomeItems.length === 2) {
        cashIncome[1].placeholder = 'Сумма';
        cashIncome[1].value = itemIncome[2].value = '';
        itemIncome[2].placeholder = 'Наименование';
        AppData.prototype.searchName();
        AppData.prototype.searchAmount();
    } else if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
        cashIncome[2].placeholder = 'Сумма';
        cashIncome[2].value = itemIncome[3].value = '';
        itemIncome[3].placeholder = 'Наименование';
        AppData.prototype.searchName();
        AppData.prototype.searchAmount();
    }
};
AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(', '); //получаем значение и переводим в массив
    addExpenses.forEach(function (item) {
        item = item.trim(); //убирает пробелы вначале и в конце 
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
};
AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getIncomeMonth = function () {
    const _this = this;
    for (let key in _this.income) {
        _this.incomeMonth += +_this.income[key];
    }
};
AppData.prototype.getExpensesMonth = function () {
    const _this = this;
    for (let key in _this.expenses) {
        _this.expensesMonth += +_this.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    const _this = this;
    _this.budgetMonth = _this.budget + _this.incomeMonth + _this.mandatoryIncome - _this.expensesMonth;
    _this.budgetDay = Math.ceil(_this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    const _this = this;
    return targetAmount.value / _this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
    const _this = this;
    if (_this.budgetDay > 800) {
        console.log('У вас высокий уровень дохода');
    } else if (_this.budgetDay > 300) {
        console.log('У вас средний уровень дохода');
    } else if (_this.budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
    const _this = this;
    _this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (_this.deposit) {
        _this.persentDeposit = prompt('Какой годовой процент?', '10');
        while (!isNumber(_this.persentDeposit)) {
            _this.persentDeposit = +prompt('Какой годовой процент?');
        }
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while (!isNumber(_this.moneyDeposit)) {
            _this.moneyDeposit = +prompt('Какая сумма заложена?');
        }
    }
};
AppData.prototype.calcPeriod = function () {
    const _this = this;
    return _this.budgetMonth * periodSelect.value;
};
AppData.prototype.slider = function () {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.sevingsPeriod = function () {
    const _this = this;
    incomePeriodValue.value = _this.budgetMonth * periodSelect.value;
};
AppData.prototype.emptyField = function () {
    const _this = this;
    if (salaryAmount.value === null || salaryAmount.value === '') {
        start.disabled = true;
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    } else {
        start.disabled = false;
        start.addEventListener('click', appData.start);
    }
};
AppData.prototype.searchAmount = function () {
    const _this = this;
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
    const _this = this;
    let typeText = document.querySelectorAll('[type = "text"]');
    typeText.forEach(function (item) {
        item.disabled = false;
        item.value = null;
    });
    incomePlus.disabled = false;
    expensesPlus.disabled = false;
    start.textContent = 'Рассчитать';
    start.disabled = true;
    salaryAmount.addEventListener('input', _this.emptyField);
    _this.removeBlock();
};
AppData.prototype.removeBlock = function () {
    expensesItems.forEach(function (item, i) {
        if( i > 0 ) {
            item.remove();
        }            
    });
    incomeItems.forEach(function (item, i) {
        if( i > 0 ) {
            item.remove();
        }  
    });
    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';
};

AppData.prototype.eventListeners = function() {
    const _this = this;
    _this.searchName();
    _this.searchAmount();
    
    salaryAmount.addEventListener('input', _this.emptyField);    
    periodSelect.addEventListener('input', _this.slider);    
    incomePlus.addEventListener('click', _this.addIncomeBlock);    
    expensesPlus.addEventListener('click', _this.addExpensesBlock);
};

const appData = new AppData();
console.log('appData: ', appData);

appData.eventListeners();



