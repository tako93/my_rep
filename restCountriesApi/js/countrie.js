// const {
//     StorageService,
//     ApiService
// } = window; //ყოველ ჯერზე  window.-ის დაწერა რომ არ მოგვიწიოს

// const {
//     CURRENT_USER_KEY
// } = window;


// protectedRoute();



// (async () => {

//     const userName = document.getElementById('countryName');
//     const avatar = document.getElementById('avatar');
//     // const email = document.getElementById('email');

//     // const paginationRoot = document.getElementById('pagination');
//     // const userId = StorageService.read(CURRENT_USER_KEY); //stored is read
//     // const {
//     //     data: user
//     // } = await ApiService.getUser(userId); // data არის იუზერი. არის data იუზერ ცვლადით

//     // const {
//     //     data: colorList,
//     //     ...rest //ეს პარამეტრი შეისრუტავს ყველა დანარჩენ თვისებას ობიექტისა 
//     // } = await ApiService.ListResources(userId); //service-ში ჩაწერილი ApiService ფუნქცია და მისი ListResources მეთოდი პლიუს userId პარამეტრი


//     avatar.setAttribute('src', countr.flag);
//     userName.textContent = `${countries.callingCodes}${countries.name}` //ეს თვისებები იმ აპის მოყვება რასაც ვიყენებთ

//     // email.textContent = user.email;

//     // colorListView.innerHTML = null;
//     // colorList.forEach((color) => {
//     //     colorListView.innerHTML += cardTemplate(color);
//     // });

//     //pagination
//     // const colorsPagination = new Pagination(rest);

//     // colorsPagination.appendTo(paginationRoot).render(); // ებმება HTML ელემენტს და რენდერდება 

// })();

// function cardTemplate(item) { //გაადმოგვაქვს ობჯექთებიდან
//     return `
//        <div class="card text-white  mb-3 col-4" style="max-width: 18rem; background-color:${item.color}">
//           <div class="card-header">${item.name}</div>
      
//             <h5 class="card-title">Primary card title</h5>
//             <p class="card-text">
//              panton Value - ${item.pantone_value}
//             </p>
//           </div>
//         </div>`
// } //


const countriesList = document.getElementById('countries');
let countries;



fetch(`https://restcountries.eu/rest/v2/all`)
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err =>  console.error(err));

countriesList.addEventListener('change', (event) => {
    displayCountryInfo(event.target.value);
})
function initialize(countryData) {
    countries = countryData;
    let div = '';
    for (let i = 0; i < countries.length; i++){
        // options += ` <option value="${countries[i].alpha3Code}">${countries[i].name}</option>` //alpha3Code-ი საიტზეა მოცემული ისევე როგორც name
         div += ` <div>${countries[i].name}(+${countries[i].callingCodes[0]})</div>` //alpha3Code-ი საიტზეა მოცემული ისევე როგორც callingCodes[0]
    }
     countries.innerHTML = div;
  
    displayCountryInfo(); // 0 ინდექსზე მყოფი ანუ პირველი ქვეყნის კოდი 
};

function displayCountryInfo(countryByAlphaCode) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlphaCode);
   
    document.getElementById('capital').innerHTML = countryData.capital;
    // document.getElementById('dialing-code').innerHTML = ` ${countryData.callingCodes[0]}`;
    // document.getElementById('population').innerHTML = countryData.population;
    // document.getElementById('currencies').innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name}(${c.code})`).join(', ');
    // document.getElementById('region').innerHTML = countryData.region;
    // document.getElementById('subregion').innerHTML = countryData.subregion;
    // document.getElementById('img').src = countryData.flag;
}
