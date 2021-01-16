let plus = document.querySelector('.plus');
let minus = document.querySelector('.minus');
let number = document.querySelector('.number');

let integer = 0;

plus.addEventListener('click', () => {
    integer += 1;
    number.innerHTML = integer;
});
minus.addEventListener('click', () => {
    integer -= 1;
    number.innerHTML = integer;
});





minus.addEventListener('click', () => {

    let image2 = document.querySelector('.image');
    if (image2.classList.contains('noimage')) {
        image2.classList.remove('noimage');
        image2.classList.add('yesimage');
    }
    let image1 = document.querySelector('.image1');
    if (image1.classList.contains('yesimage')) {
        image1.classList.remove('yesimage');
        image1.classList.add('noimage');
    }

});

plus.addEventListener('click', () => {

    let image2 = document.querySelector('.image');
    if (image2.classList.contains('noimage')) {
        image2.classList.remove('noimage');
        image2.classList.add('yesimage');
    }
    let image1 = document.querySelector('.image1');
    if (image1.classList.contains('yesimage')) {
        image1.classList.remove('yesimage');
        image1.classList.add('noimage');
    }
});