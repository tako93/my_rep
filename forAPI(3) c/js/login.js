

const { StorageService, ApiService, LangService } = window;
const userToken = StorageService.read(window.USER_TOKEN_KEY);

// translated


if (userToken) {
  navigateToDashboard(userToken);
}




const onSubmit = async (event) => {
  event.preventDefault();
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");
  const rememberMe = document.getElementById("remember-me");

  const errors = [];

  if (inputEmail.value === "") {
    errors.push("email is missing");
  }
  if (inputPassword.value === "") {
    errors.push("password is missing");
  }

  if (errors.length) {
    console.error(errors);
    return;
  }

  const loginData = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  const result = await ApiService.login(loginData);
  if (result && result.token) {
    navigateToDashboard(result.token);
  }
};



