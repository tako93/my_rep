
fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => renderUserList(data))
    .catch(err =>  console.error(err));

class CardBuilder {
  constructor(tagName = "div") {
    this.card = document.createElement(tagName);
    this.card.className = "card mt-2 mb-2 col-4 p-2";
    this.card.style.width = "18rem";

    this.cardBody = null;
    this.cardTitle = null;
    this.cardImage = null;
    this.cardText = null;
    this.catrLink = null;
  }

  addImage(src) {
    this.cardImage = document.createElement("img");
    this.cardImage.className = "card-img-top img-thumbnail";
    this.cardImage.style.cursor = "pointer";
    this.cardImage.setAttribute("src", src);
    this.card.appendChild(this.cardImage);

    return this;
  }

  addCardBody() {
    this.cardBody = document.createElement("div");
    this.cardBody.className = "card-body";
    this.card.appendChild(this.cardBody);

    return this;
  }

  addCardTitle(title) {
    if (!this.cardBody) {
      this.addCardBody();
    }
    this.cardTitle = document.createElement("h5");
    this.cardTitle.textContent = title;

    this.cardBody.appendChild(this.cardTitle);
    return this;
  }

  addCardText(text) {
    if (!this.cardBody) {
      this.addCardBody();
    }
    this.cardText = document.createElement("p");
    this.cardText.textContent = text;

    this.cardBody.appendChild(this.cardText);

    return this;
  }

  attachData(data) {
    
    if (!this.cardImage) {
      return;
    }

    for (let key of Object.keys(data)) {
      //key = countriesName -- userId
      this.cardImage.dataset[key] = data[key];
    }
//  console.log(data)
    return this;
    
  }

  render() {
    return this.card;
  }
}



function renderUserList(response) {
  const cardList = document.getElementById("countriesdiv");    
   countries = response;
  countries.forEach((countries) => {
    const card = new CardBuilder();
    card
      .addCardTitle(`${countries.name} (+${countries.callingCodes})`)
      .addImage(countries.flag)
      .attachData({
        name: countries.name,
      })
    cardList.appendChild(card.render());
  });

}


class Storage { //კონსტრუქტორი ფუნქცია არის ფუნქცია რომელიც ინიციალიზაციის მომენტში ქმნის ობიექტს
    constructor() {
        this.storage = localStorage;
    }
    store(key, value) {
        this.storage.setItem(key, JSON.stringify(value)) //ყოველ შენახვაზე სწორ ფორმატში რომ შეინახოს 
    }
    read(key) {
        return JSON.parse(this.storage.getItem(key));
    }
    delete(key) {
        this.storage.removeItem(key);
    }
    clear() {
        this.storage.clear();
    }
} //ლოქალ სთორიჯთან სამუშაოდ

window.StorageService = new Storage()

  const {
    StorageService
} = window;

const {
    CURRENT_USER_KEY
} = window;

function navigateToProfile() {
    location.replace('countrie.html');
}

  

function displayCountryInfo(countryByAlphaCode) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlphaCode);
    console.log(countryData);
    document.getElementById('capital').innerHTML = countryData.capital;
    // document.getElementById('dialing-code').innerHTML = ` ${countryData.callingCodes[0]}`;
    // document.getElementById('population').innerHTML = countryData.population;
    // document.getElementById('currencies').innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name}(${c.code})`).join(', ');
    // document.getElementById('region').innerHTML = countryData.region;
    // document.getElementById('subregion').innerHTML = countryData.subregion;
    // document.getElementById('img').src = countryData.flag;
}


(function storage ()  {
  const cardList = document.getElementById("countriesdiv"); 

  cardList.addEventListener('click', ({ target }) => {
  if (target.tagName.toLowerCase().match('img')) { //თუ იმიჯს დაეჭირა
    const name = target.dataset.name ;//გამოჩნდება დაჭერილი იმიჯის დათა
    if (name) {
      StorageService.store(CURRENT_USER_KEY, name) //დავსვით ახალი სთორიჯი
      navigateToProfile();  //გადასვლა მოხდებაა იმ კონკრეტული დაწკაპული იუზერის პროფილის გვერდზე   

      
    displayCountryInfo('AFG'); // 0 ინდექსზე მყოფი ანუ პირველი ქვეყნის კოდი 

    }
  }
})

})();



