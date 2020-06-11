let money = 30000,
    income = 'Фриланс',    
    addExpenses = ('Интернет, Такси, Коммуналка, Проезд'),
    deposit = true,    
    mission = 50000,
    period = 7;

    console.log('money: ', typeof(money));
    console.log('income: ', typeof(income));
    console.log('deposit: ', typeof(deposit));
    console.log('Длина строки addExpenses: ', addExpenses.length);
    console.log('Период равен (period) месяцев: ', period);
    console.log('Цель заработать (mission) рублей/долларов/гривен/юани: ', mission);
    console.log('Вывод массива addExpenses в нижнем регистре: ', addExpenses.toLowerCase().split(', '));
    
    let budgetDay = money/30;
    console.log('budgetDay: ', budgetDay);
