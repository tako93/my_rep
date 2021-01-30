const loginForm = document.getElementById('signUpForm');
const { StorageService, ApiService } = window;


class Validation {
    errors = [];

    check(element) {
        if (element) {
            if (element.value === '') {
                this.errors.push(`${element.name} is missing`); //`${element.name} თვისება არის ინფუთის name = password...
            }
        }
    }
    isValid() { //არის თუარა ვალიდური ანუ არის თუარა რაიმე ვალიუში შეყვანილი 
        return !!this.errors.length; // !! -- თუ ლენგსი არის ნული ერთი ძახილის ნიშნით ახდებოდა თრუ  მეორე ძახილის ნიშნით მისი უარყოფა მოხდება 
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputEmail = document.getElementById('inputEmail'); //1. გადმოვიტანეთ ცვლადები სამუშაო. 
    const inputPassword = document.getElementById('inputPassword');
    const rememberMe = document.getElementById('remember-me');



    //  const errors = []; // 4.ვალიდაციის მეორე დონის ნაწილი. თუ მომხმარებელმა required მოაცილა 

    // if (inputEmail.value === '') {
    //     errors.push('email is missing');
    // }
    // if (inputPassword.value === '') {
    //     errors.push('password is missing');
    // }
    // if (errors.length) {
    //     console.error(errors);
    //     return;
    // }
    // if (errors.length) {
    //     console.error(errors);
    //     return;
    // }

    //console.log('login'); 4. end

    const validation = new Validation();
    validation.check(inputEmail);
    validation.check(inputPassword);
    if (validation.isValid()) {
        console.log(validation.errors);
        return;
    }

   
    const regData = {
        email: inputEmail.value,
        password: inputPassword.value
    }


    const newUser = await ApiService.signUp(regData);
    navigateToDasboard(newUser.token);
});

