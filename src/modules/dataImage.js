const dataImage = () => {
    let commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((elem) => {
        let pic;
        elem.addEventListener('mouseenter', (picture) => {
            pic = picture.target.src;
            picture.target.src = picture.target.dataset.img;
        });
        elem.addEventListener('mouseleave', (picture) => {
            picture.target.src = pic;
        });
    });
};

export default dataImage;