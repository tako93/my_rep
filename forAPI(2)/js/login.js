
const loginForm = document.getElementById('loginForm'); //sign in ღილაკის id-ის მაგივრად გადმოგვაქვს ფორმის id
const { StorageService, ApiService } = window;//ყოველ ჯერზე რომ window.-ის დაწერა რომ არ მოგვიწიოს
const userToken = StorageService.read(window.USER_TOKEN_KEY); //ეს გადმოვიტანეთ API.js-დან window.-ის დაწერა არ მოგვიწევს
if (userToken) { // იმ შემთხვევაში თუ remember me მოიპწიჩკა :)
    navigateToDasboard(userToken);//თუ ეს ჩანაწერი მოიძებნება localStorage-ში მაშინვე გადადის dashboard.html-ზე 
}





const onSubmit = async (event) => { //1. ცვლადები შეიქმნება submitის დროს და მემორი აღარ გადაიტვირთება
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


    const loginData = { //ფასვორდს და იმეილს ახალ ერთ ცვლადში ვწერთ ცალცალკე რომარ ვწეროთ 
        email: inputEmail.value,
        password: inputPassword.value
    };
    const result = await ApiService.login(loginData) //5. ვიყენებთ ლოგინის იმ პარამეტრებს რაც მეორე ჯს ფაილში განვსაზღვრეთ. window.API. ით მივწვდით login-ს ანუ იმ ფაილში განსაზღვრულ ფუნქციას და მივანიჭეთ შესაბამისი პარამეტრები. ამით მივიღეთ ტოკენი რომელიც შეინახა ლოქალ სთორიჯში
    if (result && result.token) {

        navigateToDasboard(result.token);

    }
};


// function navigateToDasboard(token) {
//     // location.replace('dashboard.html');  როდესაც login წარმატებით გაიარა მომხმარებელი გადამისამართდება შემდეგ გვერდზე 
//     // window.USER_AUTHED = true; //უზერის ავტორიზაციის სტატუსი არის true
//     // window.USER_TOKEN = token;
//     StorageService.store(window.USER_TOKEN_KEY, token)
//     location.replace('dashboard.html'); // თუ ეს ჩანაწერი მოიძებნება localStorage-ში მაშინვე გადადის dashboard.html-ზე 
// }


loginForm.addEventListener('submit', onSubmit); //1.(2)