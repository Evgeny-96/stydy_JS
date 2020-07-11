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
    this.budget = +salaryAmount.value;
    this.mandatoryIncome = +additionalIncomeAmount.value;

    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    if (this.textContent === 'Рассчитать') {
        this.lock.bind(this);
    } else {
        this.resetLock.bind(this);
    }
};

AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth.bind(this));
    incomePeriodValue.value = this.calcPeriod.bind(this);

    periodSelect.addEventListener('input', this.sevingsPeriod.bind(this));
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
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth + this.mandatoryIncome - this.expensesMonth;
    console.log('this.budgetMonth: ', this.budgetMonth);
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 800) {
        console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay > 300) {
        console.log('У вас средний уровень дохода');
    } else if (this.budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
        this.persentDeposit = prompt('Какой годовой процент?', '10');
        while (!isNumber(this.persentDeposit)) {
            this.persentDeposit = +prompt('Какой годовой процент?');
        }
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while (!isNumber(this.moneyDeposit)) {
            this.moneyDeposit = +prompt('Какая сумма заложена?');
        }
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.slider = function () {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.sevingsPeriod = function () {
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
};
AppData.prototype.emptyField = function () {
    const _this = this;
    if (salaryAmount.value === null || salaryAmount.value === '') {
        start.disabled = true;
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    } else {
        start.disabled = false;
        start.addEventListener('click', this.start.bind(this));
    }
};
AppData.prototype.searchNameAmount = function () {
    let nameField = document.querySelectorAll('[placeholder = "Наименование"]');
    nameField.forEach(function (item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^А-я.,'";:`!?\s]/, '');
        });
    });
    let amountField = document.querySelectorAll('[placeholder = "Сумма"]');
    amountField.forEach(function (item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^0-9]/, '');
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
    salaryAmount.addEventListener('input', this.emptyField.bind(this));
    this.removeBlock.bind(this);
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
    // this.incomePlus.style.display = 'block';
    // this.expensesPlus.style.display = 'block';
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
    } else if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
        cashExpenses[2].placeholder = 'Сумма';
        cashExpenses[2].value = itemExpenses[3].value = '';
        itemExpenses[3].placeholder = 'Наименование';
    }
    this.searchNameAmount();
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
    } else if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
        cashIncome[2].placeholder = 'Сумма';
        cashIncome[2].value = itemIncome[3].value = '';
        itemIncome[3].placeholder = 'Наименование';
    }
    this.searchNameAmount();
};

AppData.prototype.eventListeners = function () {
    this.searchNameAmount();
    
    salaryAmount.addEventListener('input', this.emptyField.bind(this));

    periodSelect.addEventListener('input', this.slider.bind(this));

    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));

    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));

};

const appData = new AppData();
appData.eventListeners();

