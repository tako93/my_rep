const countriesList = document.getElementById('countries');
let countries;

countriesList.addEventListener('change', (event) => {
    displayCountryInfo(event.target.value);
})


fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err =>  console.error(err));


function initialize(countriesData) {
    countries = countriesData;
    let options = '';
    for (let i = 0; i < countries.length; i++){
        // options += ` <option value="${countries[i].alpha3Code}">${countries[i].name}</option>` //alpha3Code-ი საიტზეა მოცემული ისევე როგორც name
         options += ` <option value="${countries[i].alpha3Code}">${countries[i].name}(+${countries[i].callingCodes[0]})</option>` //alpha3Code-ი საიტზეა მოცემული ისევე როგორც callingCodes[0]
    }
     countriesList.innerHTML = options;
  
    displayCountryInfo('AFG'); // 0 ინდექსზე მყოფი ანუ პირველი ქვეყნის კოდი 
};

function displayCountryInfo(countryByAlphaCode) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlphaCode);
    console.log(countryData);
    document.getElementById('capital').innerHTML = countryData.capital;
    document.getElementById('dialing-code').innerHTML = ` ${countryData.callingCodes[0]}`;
    document.getElementById('population').innerHTML = countryData.population;
    document.getElementById('currencies').innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name}(${c.code})`).join(', ');
    document.getElementById('region').innerHTML = countryData.region;
    document.getElementById('subregion').innerHTML = countryData.subregion;
    document.getElementById('img').src = countryData.flag;
}

