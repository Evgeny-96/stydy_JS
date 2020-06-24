"use strict";

const btnCalc = document.querySelector('#start'),
    btnPlus1 = document.querySelectorAll('button.income_add'),
    btnPlus2 = document.querySelectorAll('button.expenses_add'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    classValue = document.querySelectorAll('[class*="-value"]'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeAmount = document.querySelector('.additional_income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');


