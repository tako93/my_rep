const loginForm = document.getElementById('logUpForm');
const { StorageService, ApiService } = window;

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputEmail = document.getElementById('inputEmail'); //1. გადმოვიტანეთ ცვლადები სამუშაო. მეორე ქმედება API.js-ში
    const inputPassword = document.getElementById('inputPassword');
    const rememberMe = document.getElementById('remember-me');



     const errors = []; // 4.ვალიდაციის მეორე დონის ნაწილი. თუ მომხმარებელმა required მოაცილა 

    if (inputEmail.value === '') {
        errors.push('email is missing');
    }
    if (inputPassword.value === '') {
        errors.push('password is missing');
    }
    if (errors.length) {
        console.error(errors);
        return;
    }
    //console.log('login'); 4. end


    const regData = {
        email: inputEmail.value,
        password: inputPassword.value
    }


    const newUser = ApiService.signUp(regData);
    navigateToDasboard(newUser.token);
})

