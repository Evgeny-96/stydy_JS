const onlyNumbersInput = () => {
    let inputCalcItem = document.querySelectorAll('input.calc-item');
    inputCalcItem.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/g, '');

        });
    });
};

export default onlyNumbersInput;