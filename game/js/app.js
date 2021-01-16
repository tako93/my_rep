const numberInput = document.getElementById('number');
const hiddenNumber = document.getElementById('hidden-number');
const playButton = document.getElementById('play');
const message = document.getElementById('message');
const MAX_TRY = 3;

const prise = 900;
const playAgainBtn = document.getElementById('playagain'); //1.გავამზადეთ დასარესტარტებელი ღილაკი
const winnerBox = document.querySelector('.winner')


const userTries = document.getElementById('userTryes');


const generateNumber = () => Math.round(Math.random() * 10);//ჩაიწერება ნებისმიერი დამრგვაებული რანდომ რიცხვი ათის ფარგლებში    
let guessNumber = generateNumber(); 

hiddenNumber.textContent = `try - ${MAX_TRY}`;



let userTryCount = 0;
playButton.addEventListener('click', () => {
    const userNumber = parseInt(numberInput.value); // შეყვანილი მნიშვნელობის ტიპი გამოვა არა სტრინგი არამედ რიცხვი
    
    if (message.classList.contains('invisible')) {
        message.classList.remove('invisible');
    }
    
    if (userTryCount === MAX_TRY) { //თუ ლიმიტს გადააჭარბებს და რიცხვი ვერ მოარტყა
        message.textContent = 'You lose :(';
        message.classList.remove('alert-info') 
        message.classList.add('alert-danger');
        winnerBox.setAttribute('hidden');
    } else {
          if (userNumber === guessNumber) { // თუ ლიმიტს არ გადააჭარბებს და რიცხვიც მოარტყა
              message.textContent = 'nice';
              message.classList.remove('alert-info'); 
              message.classList.add('alert-success');
              winnerBox.removeAttribute('hidden');

              const timerId = setTimeout(() => {
                  winnerBox.setAttribute('hidden', true);
                  clearTimeout(timerId); // removeEventListener ნაირი
              }, 3000)


    } else if (userNumber > guessNumber) {
        message.textContent = 'Try less!';
    } else {
        message.textContent = 'Try more!';
    }
        userTryCount++;
        
        userTries.textContent = `try - ${userTryCount}, point - ${prise / userTryCount}` ;
    };

 
});

const restartGame = () => {  //2.გავამზადეთ დასარესტარტებელი ღილაკისთვის მისანიჭებელი ფუნქცია

    guessNumber = generateNumber();
    userTryCount = 0;
    userTries.textContent = null;
    numberInput.value = null;

    message.classList.add('alert-info') 
    message.classList.remove('alert-danger');    
    message.classList.remove('alert-success');
    message.classList.add('invisible');
    message.textContent = null;
  
}

playAgainBtn.addEventListener('click', restartGame); // 3.მივანიჭეთ ღილაკს ივენთლისენერი ფუნქციითურთ
