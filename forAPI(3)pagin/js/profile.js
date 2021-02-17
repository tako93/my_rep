const {
    StorageService,
    ApiService
} = window; //ყოველ ჯერზე  window.-ის დაწერა რომ არ მოგვიწიოს

const {
    CURRENT_USER_KEY
} = window;


protectedRoute();



(async () => {

    const userName = document.getElementById('userName');
    const avatar = document.getElementById('avatar');
    const email = document.getElementById('email');

    const paginationRoot = document.getElementById('pagination');
    const userId = StorageService.read(CURRENT_USER_KEY); //stored is read
    const {
        data: user
    } = await ApiService.getUser(userId); // data არის იუზერი. არის data იუზერ ცვლადით

    const {
        data: colorList,
        ...rest //ეს პარამეტრი შეისრუტავს ყველა დანარჩენ თვისებას ობიექტისა 
    } = await ApiService.ListResources(userId); //service-ში ჩაწერილი ApiService ფუნქცია და მისი ListResources მეთოდი პლიუს userId პარამეტრი


    avatar.setAttribute('src', user.avatar);
    userName.textContent = `${user.first_name}${user.last_name}` //ეს თვისებები იმ აპის მოყვება რასაც ვიყენებთ

    email.textContent = user.email;

    colorListView.innerHTML = null;
    colorList.forEach((color) => {
        colorListView.innerHTML += cardTemplate(color);
    });

    //pagination
    const colorsPagination = new Pagination(rest);

    colorsPagination.appendTo(paginationRoot).render(); // ებმება HTML ელემენტს და რენდერდება 

})();

function cardTemplate(item) { //გაადმოგვაქვს ობჯექთებიდან
    return `
       <div class="card text-white  mb-3 col-4" style="max-width: 18rem; background-color:${item.color}">
          <div class="card-header">${item.name}</div>
          <div class="card-body">
            <h5 class="card-title">Primary card title</h5>
            <p class="card-text">
             panton Value - ${item.pantone_value}
            </p>
          </div>
        </div>`
} //