const {
    StorageService,
    ApiService
} = window; //ყოველ ჯერზე რომ window.-ის დაწერა რომ არ მოგვიწიოს

const userToken = StorageService.read(window.USER_TOKEN_KEY); //ეს გადმოვიტანეთ API.js-დან
if (!userToken) { // იმ შემთხვევაში თუ remember me არ მოიპწიჩკა :) ან წაშალა ტოკენი ლოქალ სთორიჯიდან
    navigateToIndex(); // თუ ეს ჩანაწერი არ მოიძებნება localStorage-ში მაშინვე გადადის index.html-ზე 
}


const signOutButton = document.getElementById('signOutButton'); //როდესაც sign out ღილაკს დააჭერს





// const container = document.querySelector('.container');
// container.classList.remove('invisible');



signOutButton.addEventListener('click', () => {
    StorageService.delete(window.USER_TOKEN_KEY); //ლოქალიდან მოგვეხსნება ტოკენი და
    navigateToIndex(); //გადადის ინდექსის გვერდზე
});



// function navigateToIndex() {
//      location.replace('index.html');//გადადის ინდექსის გვერდზე
// }


//ქარდბილდერი


class CardBuilder {
    constructor(tagName = 'div') { //=div ანუ თუ ამ პარამეტრს მნიშვნელობა არ მიენიოჭება ის მექანიკურად დივს გაუტოლდება
        this.card = document.createElement(tagName); //მშობელი დივი
        this.card.className = 'card mt-2 mb-2 col-4';
        this.card.style.width = '18rem';

        this.cardBody = null; //მშობელი დივის შვილობილი დივები
        this.cardTitle = null;
        this.cardImage = null;
        this.cardText = null;
        this.cardLink = null;
    };
    addImage(src) {
        this.cardImage = document.createElement('img')
        this.cardImage.className = 'card-img-top';
        this.cardImage.setAttribute('src', src);
        this.card.appendChild(this.cardImage);


        return this; //მიმდინარე ობიექტის დაბრუნება ანუ ამ ფუნქციით ნაგენერირები ობიექტის დაბრუნება
    }


    addCardBody() {
        this.cardBody = document.createElement('div')
        this.cardBody.className = 'card-body';
        this.card.appendChild(this.cardBody);
        return this;

    }

    addCardTitle(title) {
        if (!this.cardBody) {
            this.addCardBody()
        }
        this.cardTitle = document.createElement('h5');
        this.cardTitle.textContent = title;

        this.cardBody.appendChild(this.cardTitle);

        return this;
    };


    addCardText(text) {
        if (!this.cardBody) {
            this.addCardBody();
        }
        this.cardText = document.createElement('p');
        this.cardText.textContent = text;
        this.cardBody.appendChild(this.cardText);

        return this;
    }

    render() {
        return this.card; //მშობელი დივის დამაბრუნებელი/გამომჩენი
    }


}

const cardList = document.getElementById('cardList');

const card = new CardBuilder('div');



(async () => {
    const response = await ApiService.listUsers(); //listUsers გვიბრუნებს ინფორმაციას. ის მოგვდის ლოქალ სთორიჯში ჩაწერილი ტოკენის საფუძველზე
    const cardList = document.getElementById('cardList');
    const lead = document.querySelector('.lead'); //ავირჩიეთ ელემენტი სადაც ამ ინფორმაციას ჩავსვამთ




    lead.innerHTML += `
    page = ${response.page} <br/>
    per_page = ${response.per_page} <br/>
    total = ${response.total} <br/>
    total_pages = ${response.total_pages} <br/>
    `;

    // const card = new CardBuilder('div');

    response.data.forEach((user) => {
        const card = new CardBuilder();
        card
            .addCardTitle(`${user.first_name}${user.last_name}`)
            .addImage(user.avatar)
            .addCardText(user.email);
  
        cardList.appendChild(card.render());
  
    });




})(); //ფუნქცია რომელიც თავისთავს იძახებს

// const url = "https://reqres.in/img/faces/2-image.jpg"

// card  //ქარდის გამომჩენი ჯაჭვური გამოძახება. ეს შესაძლებელია რადგან return უწერია ყველას
//     .addImage(url)
//     .addCardBody()
//     .addCardTitle("Card Title")
//     .addCardText("hello");


cardList.appendChild(card.render());