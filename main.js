"use strict";

const start = document.querySelector('#start'),
	cancel = document.querySelector('#cancel'),
	incomePlus = document.getElementsByTagName('button')[0],
	expensesPlus = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
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
	periodAmount = document.querySelector('.period-amount'),
	additionalIncomeAmount = document.querySelector('.additional_income-amount'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');

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
		this.mandatoryIncome = 0;
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
		this.mandatoryIncome = +additionalIncomeAmount.value;

		this.getExpInc();
		this.getAddExpenses();
		this.getAddIncome();
		this.getInfoDeposit();
		this.getBudget();
		this.getStatusIncome();
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

	startDisabled() {
		// делаем кнопку недоступной пока не введен месячный доход
		const amount = document.querySelector('.salary-amount');
		const start = document.querySelector('#start');
		start.disabled = true;
		amount.addEventListener('input', () => {
			start.disabled = amount.value === '';
		});
	}

	addExpIncBlock(item) {
		const cloneBlock = item.path[1].childNodes[3].cloneNode(true),
			btn = item.path[0];
		item.path[1].childNodes[3].parentNode.insertBefore(cloneBlock, btn);
		const nameOfClass = item.path[1].childNodes[3].className;
		const itemBlock = document.querySelectorAll(`.${nameOfClass}`);
		for (let i = 0; i < cloneBlock.childNodes.length; i++) {
			cloneBlock.childNodes[i].value = '';
		}
		if (itemBlock.length === 3) {
			btn.style.display = 'none';
		}

	}

	getExpInc() {
		const count = item => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = itemAmount;
			}
		};
		incomeItems.forEach(count);
		expensesItems.forEach(count);

		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
		for (const key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}

	getAddExpenses() {
		const addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}
	getAddIncome() {
		additionalIncomeItem.forEach(item => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	}

	inputRange() {
		periodAmount.innerHTML = periodSelect.value;
	}

	getInfoDeposit() {
		if (!this.deposit) {
			do {
				this.persentDeposit = depositPercent.value;
			} while (!isNumber(this.persentDeposit));
			do {
				this.moneyDeposit = depositAmount.value;
			}
			while (!isNumber(this.moneyDeposit));
		}
	}

	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + this.mandatoryIncome + monthDeposit;
		this.budgetDay = Math.round(this.budgetMonth / 30);
	}
	getTargetMonth() {
		return +Math.ceil(targetAmount.value / this.budgetMonth);
	}
	getStatusIncome() {
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

	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}
	getFromArr() {
		const arr = this.addExpenses.split(','); // создаем массив из простой строки
		this.addExpenses = [];
		for (let i = 0; i < arr.length; i++) {
			this.addExpenses.push(arr[i].trim()[0].toUpperCase() + arr[i].trim().slice(1).toLowerCase());
			// trim убирает пробелы, первая буква верхний регистр + начиная с 2ой буквы нижний регистр
		} // пушим все это в массив addExpenses
	}
	reset() {
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
		depositBank.style.display = 'none';
		depositBank.value = '';
		depositAmount.style.display = 'none';
		depositPercent.style.display = 'none';

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
		depositCheck.checked = false;
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

	changePersent() {
		const valueSelect = this.value;
		if (valueSelect === 'other') {
			depositPercent.style.display = 'inline-block';
			depositPercent.addEventListener('input', () => {
				if (depositPercent.value === depositPercent.value.replace(/[0-9]/, '')) {
					alert('Введено не число');
					depositPercent.value = '';
				} else if (depositPercent.value > 100) {
					alert('Введено число не в диаппазоне от 1 до 100');
					depositPercent.value = '';
				} else {
					depositPercent.value = depositPercent.value.replace(/[^0-9]/, '');
				}
			});
		} else {
			depositPercent.value = valueSelect;
			depositPercent.style.display = 'none';
		}
	}

	depositHandler() {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			depositAmount.addEventListener('input', () => {
				depositAmount.value = depositAmount.value.replace(/[^0-9]/, '');
			});			
			// this.deposit = true;
			depositBank.addEventListener('change', this.changePersent);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePersent);
		}
	}

	eventListeners() {
		this.startDisabled();
		// навешиваем прослушиватьель событий на кнопку Рассчитать
		start.addEventListener('click', this.start.bind(this));
		// навешиваем прослушиватьель событий на кнопку Сбросить
		cancel.addEventListener('click', this.reset.bind(this));
		// навешиваем прослушиватель событий на кнопку плюс		
		expensesPlus.addEventListener('click', this.addExpIncBlock.bind(this));
		// по клику будет вызываться функция appData.addIncomeBlock
		incomePlus.addEventListener('click', this.addExpIncBlock.bind(this));
		// вешаем обработчик на перемещение бегунка
		periodSelect.addEventListener('click', this.inputRange.bind(this));
		//обработчик события на чекбокс депозит
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
	}
}

const appData = new AppData();
appData.eventListeners();
