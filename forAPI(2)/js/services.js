window.USER_TOKEN_KEY = 'user_token';

class API {
    baseUrl = 'https://reqres.in/api'; // 2. ბაზისი url data-სთან სამუშაოდ
    // static = ''; მეთოდი რომელიც ნიშნავს რომ ის ყოველთვის ხელმისაწვდომი იქნება მიუხედავად იმისა ობიექტის შექმნას const .. = new ჩანაწერით მოვახდენთ თუ პირდაპირ API.-ით. ამ ბოლოს გაამოყენების საშუალება გვეძლევა. 

    async fetchRequest(params, options = {}) { //ესაა ფეჩის ბილდერი რომელიც პარამეტრებით კონფიგურირდება. login ფუნქციაში გამოსაძახებელი ფუნქცია. options სადაც ვწერთ მეთოდს და ჰედერს ასევე ბოდის რაც დაგვჭირდება fetch-ისთვის. 

        try {
            const res = await fetch(`${this.baseUrl}${params.endpoint}`, options) // params - ის რასაც ვახორციელებთ(ამ შემთხვევაში login) და მისამართში იწერება endpoint - ჩვენ ვქმნით   // აქვე ვიძახებთ fetchRequest ფუნქციას და ვაწერთ .then-ებს ისე როგორც fetch-ის წესია 
            const result = await res.json() // -- *ეს იქნება ჩვენი token

            return result;

        } catch (err) {
            console.error('[API.login]', err);
            return;
        }

    }

    async login(data) { //3. ლოგინის ნაწილზე მზრუნველი ფუნქცია. პარამეტრებში ვუთითებთ იმას რაც login-ისთვის გვჭირდება ასევე ამავე ფუნქციაში ვსაზღვრავთ fetchRequest ფუნქციის პარამეტრებს (params, options = {})-ს რათა აქვე გამოვიძახოთ ეს ფუნქცია. მესამე პარამეტრს(callback) ვიძახებთ მხოლოდ მაშინ როდესაც რეზულტატი მოგვივა*. ეს ტოკენთანაა კავშირში  4. -- ლოგინჯს-ში
     const request = this.buildRequest('login', data)
        //ამ ფუნქციაშიცც განვსაზღვრეთ params და options რომ fetchRequest ფუნქციაში(fetch-ის ბილდერ ფუნქციაში) ჩავსვათ

        try {
            const result = await this.fetchRequest(request.params, request.options) // რახან request-ს გადაცემული buildRequest ფუნქციიდან ორი მეთოდი აქვს(იმის პარამეტრები) ამიტომ ვწერთ .params და .options. აქვე ვიძახებთ fetchRequest ფუნქციას და ვაწერთ .then-ებს ისე როგორც fetch-ის წესია 
            //const result = await res.json() -- *ეს იქნება ჩვენი token

            return result;

        } catch (err) {
            console.error('[API.login]', err);
        }

    }
    async signUp(reqData) {
        // const params = {
        //     endpoint: '/register' //რასაც ვააკეთებთ იმის მიხედვით იცვლება
        // };
        // const options = {
        //     method: 'POST', //მეთოდი რომელიც ამჯერად POST-ია
        //     headers: {
        //         'Content-Type': 'application/json', //ჰედერსი 
        //     },
        //     body: this.stringify(reqData) //აქ მაილისა და ფასვორდის მაგივრად პარამეტრს ვანიჭებთ და ის ობიექტად გარდაიქმნება
        // };
        //ამ ფუნქციაშიცც განვსაზღვრეთ params და options რომ fetchRequest ფუნქციაში(fetch-ის ბილდერ ფუნქციაში) ჩავსვათ

        try {
            const request = this.buildRequest('register', regData);
            const newUser = await this.fetchRequest(request.params, request.options);
            return newUser;

        } catch (err) {

        }

    }


    async listUsers() { // ეს ფუნქცია იღებს ინფოს window.USER_TOKEN_KEY-დან რომელიც დასაწყისში განვსაზღვრეთ. რაც გადმოგვაქვს იმის შესაბამისად ვცვლით params-ს რახან მისამართში ფიგურირებს ის. ოღონდ თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს. შემდეგ ამ ფუნქციას დაშბოარდ.ჯს-ში ვიყენებთ  
        const userToken = localStorage.getItem(window.USER_TOKEN_KEY); //USER_TOKEN_KEY-ის საფუძველზე ლოკალ სთორიჯიდან ვკითხულობთ ტოკენს

        if (userToken) { //თუ ტოკენი არსებობს მხოლოდ იმ შემთხვევაში განვსაზღვრავთ  პარამეტრებს და რექუესთს ვაკეთებთ
            const params = { //განვსაზღვრეთ პარამეტრები
                endpoint: '/users'
            };
            const options = {
                method: 'GET', //მეთოდი რომელიც ამჯერად GET-ია
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}` //ჰედერში ტოკენი უნდა გავაყოლოთ ( თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს)
                },

            };
            try { //გავაკეთეთ რექუესთი
                const result = await this.fetchRequest(params, options) //აქვე ვიძახებთ fetchRequest ფუნქციას და ვაწერთ .then-ებს ისე როგორც fetch-ის წესია 

                return result;

            } catch (err) {
                console.error('[API.login]', err);
            }

        }
        return; //თუარადა არცარაფერი ხდება
    }

    buildRequest(action, data) { // დავაგენერიროთ ის ობიექტები რომელთა გამეორებაც რამდენჯერმე გვიწევს. action მოგვცემს endpoint-ის method-ის ცვლილების საშუალებას ხოლო data ცვლილების საშუალებას

        const params = {
            endpoint: '', //რასაც action პარამეტრს ვანიჭებთ იმის მიხედვით იცვლება
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //ჰედერსი 
            },
            body: null, //აქ მაილისა და ფასვორდის მაგივრად პარამეტრს ვანიჭებთ და ის ობიექტად გარდაიქმნება
        };


        if (action === 'login') {
            params.endpoint = '/login';
        } else if (action === 'register') {
            params.endpoint = '/register';
        
        } else if (action === 'listUsers') {
            options.headers('Autorization') = 'Bearer token';
        }




        if (data) {
            options.body = this.stringify(data);
        }

        return {
            params,
            options,
        };

    };


    stringify(data) {
        return JSON.stringify(data); //ესეც დრაი პრინციპის დასაცავად
    }

};







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


function navigateToIndex() {
    location.replace('index.html'); //გადადის ინდექსის გვერდზე
}

function navigateToDasboard(token) {
    // location.replace('dashboard.html');  როდესაც login წარმატებით გაიარა მომხმარებელი გადამისამართდება შემდეგ გვერდზე 
    // window.USER_AUTHED = true; //უზერის ავტორიზაციის სტატუსი არის true
    // window.USER_TOKEN = token;
    StorageService.store(window.USER_TOKEN_KEY, token)
    location.replace('dashboard.html'); // თუ ეს ჩანაწერი მოიძებნება localStorage-ში მაშინვე გადადის dashboard.html-ზე 
}



window.ApiService = new API() // აქ ქმნის თავისთავს..:) ვუკავშირდებით სხვა ჯს ფაილებს. ამ ჯავასკრიპტის ფაილის ჩატვირთვისთანავე შეიქმნება API ფროფერთი  ამიტომ მეორე ჯს ფაილში აღარ მოგვიწევს ამ ფროფერთის შექმნა არამედ იქ უკვე ამას მივწვდებით window.API-ით 
window.StorageService = new Storage(); //ვინდოუს ფროფერთი როგორც სთორიჯი გააკეთებს იმას რომ მთლიანად აპლიკაციისთვის ანუ ჩვენი ტაბებისთვის ერთიდაიგივე სთორიჯის ობიექტი იქნება შექმნილი. როცა გვერდი ჩაიტვირთება მხოლოდ ერთხელ მოხდებაეს მოქმედება