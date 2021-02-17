const signOutButton = document.getElementById('signOutButton'); //როდესაც sign out ღილაკს დააჭერს

const {
    StorageService,
    ApiService
} = window; //ყოველ ჯერზე  window.-ის დაწერა რომ არ მოგვიწიოს

const { CURRENT_USER_KEY, USER_TOKEN_KEY } = window;

protectedRoute();



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
        this.card.className = 'card mt-2 mb-2 col-4 p-2 ';
        this.card.style.width = '18rem';

        this.cardBody = null; //მშობელი დივის შვილობილი დივები
        this.cardTitle = null;
        this.cardImage = null;
        this.cardText = null;
        this.cardLink = null;
    }; //1.ჯერ კონსტრუქტორში შევქმენით ყველაფერი რისი დამატებაც გვინდა ქარდისთვის. შემდეგ 
    addImage(src) {
        this.cardImage = document.createElement('img'); //2. ყველა ამ ელემენტს ვსაზღვრავთ და ვქმნით 
        this.cardImage.className = 'card-img-top img-thumbnail';
        this.cardImage.style.cursor = 'pointer'; //როდესაც იმიჯზე მიიტან კურსორს ის თითით შეიცვლება.
        this.cardImage.setAttribute('src', src);
        this.card.appendChild(this.cardImage); //3.ვაბამთ მშობელს


        return this; //4.მიმდინარე ობიექტის დაბრუნება ანუ ამ ფუნქციით ნაგენერირები ობიექტის დაბრუნება
    }


    addCardBody() {
        this.cardBody = document.createElement('div')
        this.cardBody.className = 'card-body';
        this.card.appendChild(this.cardBody);
        return this;

    }

    addCardTitle(title) {
        if (!this.cardBody) {
            this.addCardBody();
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

    attachData(data) { //სურათს რომ მივანიჭოთ აიდი
        if (!this.cardImage) {
            return;
        }
        for (let key of Object.keys(data)) {
            
            this.cardImage.dataset[key] = data[key];
            
            console.log(key, data[key]); //user id - ის აბსტრაქტული ზოგადი ვერსია, არ ვიცით რას დაწერს მომხმარებელი ამიტომ ზოგადი სიტყვებით ავღწერეთ ფუნქცია
        } //-- key === userId ამ მასივის key-ები, რამდენი key-ც ექნება ამ ობიექტს იმდენჯერ დატრიალდება ეს ციკლი 
        return this;
    }

    render() {
        return this.card; //მშობელი დივის დამაბრუნებელი/გამომჩენი
    }


};

// const cardList = document.getElementById('cardList');

// const card = new CardBuilder('div');



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
        const card = new CardBuilder(); //შევქმენით ახალი ცვლადი და გავუტოლეთ CardBuilder ფუნქციას
        card
            .addCardTitle(`${user.first_name}${user.last_name}`)
            .addImage(user.avatar)
            .addCardText(user.email) //CardBuilder ფუნქციის მეთოდებს მივანიჭეთ პარამეტრები
            .attachData({
                id: user.id //-- ებმება ქარდს ყოველ ჯერზე როცა ის იქმნება. უფროსწორედ სურათს რადგან ქლიქი მასზეა. ამ ფუნქციით იქმნება ობიექტი 
            });
        cardList.appendChild(card.render());
  
    });



    cardList.addEventListener('click', ({target}) => {
        if (target.tagName.toLowerCase().match('img')) { //თუ იმიჯს დაეჭირა
            const userId = target.dataset.userId;//გამოჩნდება დაჭერილი იმიჯის დათა
            if (userId) {
                StorageService.store(CURRENT_USER_KEY, userId) //დავსვით ახალი სთორიჯი
            
                navigateToProfile();//გადასვლა მოხდებაა იმ კონკრეტული დაწკაპული იუზერის პროფილის გვერდზე
            
            } 
        }
    })

})(); //ფუნქცია რომელიც თავისთავს იძახებს

// const url = "https://reqres.in/img/faces/2-image.jpg"

// card  //ქარდის გამომჩენი ჯაჭვური გამოძახება. ეს შესაძლებელია რადგან return უწერია ყველას
//     .addImage(url)
//     .addCardBody()
//     .addCardTitle("Card Title")
//     .addCardText("hello");


