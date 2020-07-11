"use strict";

const start = document.querySelector('#start'),
	cancel = document.querySelector('#cancel'),
	incomePlus = document.getElementsByTagName('button')[0],
	expensesPlus = document.getElementsByTagName('button')[1],
	checkBox = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	additionalIncomeValue = document.querySelector('.additional_income-value'),
	budgetMonthValue = document.querySelector('.budget_month-value'),
	budgetDayValue = document.querySelector('.budget_day-value'),
	expensesMonthValue = document.querySelector('.expenses_month-value'),
	additionalExpensesValue = document.querySelector('.additional_expenses-value'),
	incomePeriodValue = document.querySelector('.income_period-value'),
	targetMonthValue = document.querySelector('.target_month-value'),
	salaryAmount = document.querySelector('.salary-amount'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
	incomeItems = document.querySelectorAll('.income-items');



const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
	constructor() {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.persentDeposit = 0;
		this.moneyDeposit = 0;
	}
	start() {

		// если да, присвоить значение
		this.budget = +salaryAmount.value;
	
	
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.inputRange();
		this.showResult();
	
		const leftSide = document.querySelector('.data');
		leftSide.querySelectorAll('input[type="text"]').forEach(elem => {
			elem.disabled = true;
		});
	
		start.style.display = `none`;
		cancel.style.display = `block`;
	
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcPeriod();
	
		// менять значения "накопления за период" динамически
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = this.calcPeriod();
		});
	}

	startDisabled () {
		// делаем кнопку недоступной пока не введен месячный доход
		const amount = document.querySelector('.salary-amount');
		const start = document.querySelector('#start');
		start.disabled = true;
		amount.addEventListener('input', () => {
			start.disabled = amount.value === '';
		});
	}
	addExpensesBlock () {
	
		// создаем клон и делаем его глубоким за счет тру
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		// заново вызываем инпуты
		expensesItems = document.querySelectorAll('.expenses-items');
		// скрываем кнопку если больше 3 длина блока с инпутами
		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	}
	addIncomeBlock () {
	
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			incomePlus.style.display = 'none';
		}
	}
	getExpenses () {
		expensesItems.forEach(item => {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = +cashExpenses;
			}
		});
	}
	getIncome () {
		incomeItems.forEach(item => {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		});
	
	}
	getAddExpenses () {
		const addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}
	getAddIncome () {
		additionalIncomeItem.forEach(item => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	}
	inputRange () {
		periodAmount.innerHTML = periodSelect.value;
	}
	getExpensesMonth () {
	
		for (const key in this.expenses) {
			this.expensesMonth += this.expenses[key];
		}
	}
	getBudget () {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.round(this.budgetMonth / 30);
	}
	getTargetMonth () {
		return +Math.ceil(targetAmount.value / this.budgetMonth);
	}
	getStatusIncome () {
		if (this.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		} else if (this.budgetDay >= 600) {
			return ('У вас средний уровень дохода');
		} else if (this.budgetDay < 600 && this.budgetDay > 0) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else if (this.budgetDay <= 0) {
			return ('Что то пошло не так');
		}
	}
	getInfoDeposit () {
		if (this.deposit) {
			do {
				this.persentDeposit = prompt('Какой годовой процент?', '6');
			} while (!isNumber(this.persentDeposit));
			do {
				this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
			}
			while (!isNumber(this.moneyDeposit));
		}
	}
	calcPeriod () {
		return this.budgetMonth * periodSelect.value;
	}
	getFromArr () {
		const arr = this.addExpenses.split(','); // создаем массив из простой строки
		this.addExpenses = [];
		for (let i = 0; i < arr.length; i++) {
			this.addExpenses.push(arr[i].trim()[0].toUpperCase() + arr[i].trim().slice(1).toLowerCase());
			// trim убирает пробелы, первая буква верхний регистр + начиная с 2ой буквы нижний регистр
		} // пушим все это в массив addExpenses
	}
	reset () {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.persentDeposit = 0;
		this.moneyDeposit = 0;
	
		expensesItems = document.querySelectorAll('.expenses-items');
		incomeItems = document.querySelectorAll('.income-items');
	
		expensesItems.forEach((item, i) => {
			if (i > 0) {
				item.parentNode.removeChild(item);
			}
		});
		incomeItems.forEach((item, i) => {
			if (i > 0) {
				item.parentNode.removeChild(item);
			}
		});
	
		incomePlus.style.display = `block`;
		expensesPlus.style.display = `block`;
		checkBox.checked = false;
		periodSelect.value = 1;
		periodAmount.innerHTML = periodSelect.value;
	
		const leftSide = document.querySelector('.data');
		leftSide.querySelectorAll('input[type="text"]').forEach(elem => {
			elem.disabled = false;
		});
	
		document.querySelectorAll('input[type="text"]').forEach(elem => {
			elem.value = '';
		});
	}
	
	eventListeners () {
		this.startDisabled();
		// навешиваем прослушиватьель событий на кнопку Рассчитать
		start.addEventListener('click', this.start.bind(this));
		// навешиваем прослушиватьель событий на кнопку Сбросить
		cancel.addEventListener('click', this.reset.bind(this));
		// навешиваем прослушиватель событий на кнопку плюс
		expensesPlus.addEventListener('click', this.addExpensesBlock);
		// по клику будет вызываться функция appData.addIncomeBlock
		incomePlus.addEventListener('click', this.addIncomeBlock);
		// вешаем обработчик на перемещение бегунка
		periodSelect.addEventListener('click', this.inputRange.bind(this));
	}
}

const appData = new AppData();
appData.eventListeners();
