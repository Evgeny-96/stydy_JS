const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (screen.width > 768) {
                let opas = 0;
                popup.style.opacity = opas;
                popup.style.display = 'block';
                let anim = setInterval(() => {
                    if (opas < 1) {
                        opas += 0.0125;
                    } else {
                        clearInterval(anim);
                    }
                    popup.style.opacity = opas;
                }, 10);
                popup.style.display = 'block';
            } else {
                popup.style.display = 'block';
            }

        });
    });
    const funPopupClose = () => {
        if (screen.width > 768) {
            let opas = popup.style.opacity;
            let anim = setInterval(() => {
                if (opas > 0) {
                    opas -= 0.0125;
                    popup.style.opacity = opas;
                } else {
                    clearInterval(anim);
                    popup.style = null;
                }
            }, 10);
        } else {
            popup.style = null;
        }
    };
    popup.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
            funPopupClose();
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                funPopupClose();
            }
        }

    });
};

export default togglePopup;