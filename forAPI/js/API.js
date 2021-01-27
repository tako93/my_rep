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

    async login(email, password) { //3. ლოგინის ნაწილზე მზრუნველი ფუნქცია. პარამეტრებში ვუთითებთ იმას რაც login-ისთვის გვჭირდება ასევე ამავე ფუნქციაში ვსაზღვრავთ fetchRequest ფუნქციის პარამეტრებს (params, options = {})-ს რათა აქვე გამოვიძახოთ ეს ფუნქცია. მესამე პარამეტრს(callback) ვიძახებთ მხოლოდ მაშინ როდესაც რეზულტატი მოგვივა*. ეს ტოკენთანაა კავშირში  4. -- ლოგინჯს-ში
        const params = {
            endpoint: '/login'
        };
        const options = {
            method: 'POST', //მეთოდი რომელიც ამჯერად POST-ია
            headers: {
                'Content-Type': 'application/json', //ჰედერსი 
            },
            body: JSON.stringify({
                email,
                password,
            })
        };


        try {
            const result = await this.fetchRequest(params, options) //აქვე ვიძახებთ fetchRequest ფუნქციას და ვაწერთ .then-ებს ისე როგორც fetch-ის წესია 
            //const result = await res.json() -- *ეს იქნება ჩვენი token

            return result;

        } catch (err) {
            console.error('[API.login]', err);
        }

    }
    async register() {}


    async listUsers() { // ეს ფუნქცია იღებს ინფოს window.USER_TOKEN_KEY-დან რომელიც დასაწყისში განვსაზღვრეთ. რაც გადმოგვაქვს იმის შესაბამისად ვცვლით params-ს რახან მისამართში ფიგურირებს ის. ოღონდ თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს. შემდეგ ამ ფუნქციას დაშბოარდ.ჯს-ში ვიყენებთ  
        const userToken = localStorage.getItem(window.USER_TOKEN_KEY);//USER_TOKEN_KEY-ის საფუძველზე ლოკალ სთორიჯიდან ვკითხულობთ ტოკენს

        if (userToken) {//თუ ტოკენი არსებობს რექუესთს ვაკეთებთ
            const params = {
                endpoint: '/users'
            };
            const options = {
                method: 'GET', //მეთოდი რომელიც ამჯერად GET-ია
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}` //ჰედერში ტოკენი უნდა გავაყოლოთ ( თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს)
                },

            };
            try {
                const result = await this.fetchRequest(params, options) //აქვე ვიძახებთ fetchRequest ფუნქციას და ვაწერთ .then-ებს ისე როგორც fetch-ის წესია 
                
                return result;

            } catch (err) {
                console.error('[API.login]', err);
            }

        }
        return; //თუარადა არცარაფერი ხდება
    }

  
};

window.API = new API() // აქ ქმნის თავისთავს..:) ვუკავშირდებით სხვა ჯს ფაილებს. ამ ჯავასკრიპტის ფაილის ჩატვირთვისთანავე შეიქმნება API ფროფერთი  ამიტომ მეორე ჯს ფაილში აღარ მოგვიწევს ამ ფროფერთის შექმნა არამედ იქ უკვე ამას მივწვდებით window.API-ით 