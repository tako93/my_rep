window.USER_TOKEN_KEY = 'application:user_token';
window.CARRENT_USER_KEY = 'application:current_user';

class API {
    baseUrl = 'https://reqres.in/api'; // 2. ბაზისი url data-სთან სამუშაოდ
    // static = ''; მეთოდი რომელიც ნიშნავს რომ ის ყოველთვის ხელმისაწვდომი იქნება მიუხედავად იმისა ობიექტის შექმნას const .. = new ჩანაწერით მოვახდენთ თუ პირდაპირ API.-ით. ამ ბოლოს გაამოყენების საშუალება გვეძლევა. 


    constructor() {
        this.userToken = localStorage.getItem(window.USER_TOKEN_KEY); //კლასის შექმნისას ეს ავტომატურად ამოიკითხება USER_TOKEN_KEY-ის საფუძველზე ლოკალ სთორიჯიდან ვკითხულობთ ტოკენს
    }

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


    //კონსტრუქტორი ფუნქციის პარამეტრებში ვწერთ იმას რაც თითოეულ შემთხვევაში ფუნქციის ტანში იწერება properties


    async login(data) { //3. ლოგინის ნაწილზე მზრუნველი ფუნქცია. პარამეტრებში ვუთითებთ იმას რაც login-ისთვის გვჭირდება ასევე ამავე ფუნქციაში ვსაზღვრავთ fetchRequest ფუნქციის პარამეტრებს (params, options = {})-ს რათა აქვე გამოვიძახოთ ეს ფუნქცია. მესამე პარამეტრს(callback) ვიძახებთ მხოლოდ მაშინ როდესაც რეზულტატი მოგვივა*. ეს ტოკენთანაა კავშირში  4. -- ლოგინჯს-ში

        //ამ ფუნქციაშიცც განვსაზღვრეთ params და options buildRequest-ის დახმარებით რომ fetchRequest ფუნქციაში(fetch-ის ბილდერ ფუნქციაში) ჩავსვათ

        try {
            const request = this.buildRequest('login', data);
            const result = await this.fetchRequest(request.params, request.options); // რახან request-ს გადაცემული buildRequest ფუნქციიდან ორი მეთოდი აქვს(იმის პარამეტრები =  params და options = 'login', data) ამიტომ ვწერთ .params და .options. 
            //const result = await res.json() -- *ეს იქნება ჩვენი token

            return result;

        } catch (err) {
            console.error('[API.login]', err);
        }

    }
    async signUp(regData) {
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
            const request = this.buildRequest('register', regData); //buildRequest ფუნქციით ავამუშავეთ პარამეტრები ამ კონკრეტული რექუესთისთვის
            const newUser = await this.fetchRequest(request.params, request.options); // ამ კონკრეტული რექუესთით იუზერის გამომყვანი ფუნქცია
            return newUser;

        } catch (err) {

        }

    }


    async listUsers() { // ეს ფუნქცია იღებს ინფოს window.USER_TOKEN_KEY-დან რომელიც დასაწყისში განვსაზღვრეთ. რაც გადმოგვაქვს იმის შესაბამისად ვცვლით params-ს რახან მისამართში ფიგურირებს ის. ოღონდ თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს. შემდეგ ამ ფუნქციას დაშბოარდ.ჯს-ში ვიყენებთ  


        if (this.userToken) { //თუ ტოკენი არსებობს (მომხმარებელი უკვე ავტორიზებული უნდა იყოს)მხოლოდ იმ შემთხვევაში განვსაზღვრავთ  პარამეტრებს და რექუესთს ვაკეთებთ
            const params = { //განვსაზღვრეთ პარამეტრები
                endpoint: '/users'
            };
            const options = {
                method: 'GET', //მეთოდი რომელიც ამჯერად GET-ია
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.userToken}` //ჰედერში ტოკენი უნდა გავაყოლოთ ( თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს)
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


    async getUser(userId) {
        if (this.userToken && userId) {
            try {
                const request = this.buildRequest('getUser', {
                    userId,
                });
                const response = await this.fetchRequest(request.params, request.options)

                return response;
            } catch (err) {
                console.error(err);
            }
        }
    }

    async listResources(userId) { //შემდეგ ამ ნაწინს ვწერთ იმ გვერდის HTML-ში სადაც გვინდა რომ გამოჩნდეს
        if (this.userToken && userId) {
            try {
                const request = this.buildRequest('listResources', null);
                const response = await this.fetchRequest(request.params, request.options)

                return response;
            } catch (err) {
                console.error(err);
            }
        }
    }

    buildRequest(action, data) { // დავაგენერიროთ ის ობიექტები რომელთა გამეორებაც რამდენჯერმე გვიწევს. action მოგვცემს endpoint-ის method-ის ცვლილების საშუალებას ხოლო data body-ს ცვლილების საშუალებას

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
            params.endpoint = '/register'; //urlში რაც იწერება

        } else if (action === 'listUsers') {
            options.headers['Autorization'] = `Bearer ${this.userToken}`;
        } else if (action === 'getUser') {
            params.endpoint = `/users/${data.userId}`

            options.method = 'GET'
            options.headers.Authorization = `Bearer ${this.userToken}`; //ჰედერში ტოკენი უნდა გავაყოლოთ ( თუ ამ ნაწილს მივადგებით მომხმარებელი უკვე ავტორიზებული უნდა იყოს)
        } else if (action === 'listResources') {
            params.endpoint = '/unknown';
            options.method = 'GET'
        }

        if (data && options.method !== "GET") { //GET-ის დროს ტანი body არ გვჭირდებაო
            options.body = this.stringify(data); //*** 
        }

        return {
            params,
            options,
        };

    };


    stringify(data) {
        return JSON.stringify(data); //***ესეც დრაი პრინციპის დასაცავად
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




class Pagination {

    page = 1
    perpage = 0
    total = 0
    totalPages = 0
    parentNode = null;
    classDisabled = 'disabled'
    cassPageItem = 'page-item';
    classPageLink = 'page-link';
    classPagination = 'pagination pagination-lg';
    nextLinksText = 'Next'; //1. აქ ვქმნით
    prevLinkText = 'Previous';

    paginationEl = null;


    constructor({page = 1, per_page: perPage = 6, total = 0, total_pages: totalPages = 0}) { //გვერდები ობიექტია ამიტომ objectdestracturing-ით ვწერთ ვწერთ
        this.page = page;
        this.perPage = perPage;
        this.total = total;
        this.totalPages = totalPages; 
        this.paginationEl = this.createElement('ul', this.classPagination)
    }


    appendTo(rootEl) {
        this.parentNode = rootEl;
        return this;
    } 

    createElement(tagName, className) {
        const el = document.createElement(tagName);
        el.className = className;
        return el;
    }


    createPageItem() {
        const item = this.createElement('li', this.classPageItem);
        return item;
    }

    createPageLink(text) {
        const link = this.createElement('a', this.classPageLink)
        link.prevLink.setAttribute('href', '#')
        link.prevLink.textContent = this.text; /// 2. აქ ვსაზღვრავთ
      
        return link;

        
    }

    getLinks() {/// 2. აქ ვსაზღვრავთ
        const links = [];
        const prevLi = this.createPageItem();
        pItem.dataset.page = -1;
        prevLi.dataset.action = 'previous';
        const prevLink = this.createPageLink(this.prevLinkText);
    
        prevLi.appendChild(prevLink);
        links.push(prevLi);
        
        for (let i = 0; i < this.totalPages; i++) {
            const pItem = this.createPageItem();
            pItem.dataset.page = i;

            if (i === this.page) {
                pItem.classList.add(this.classDisabled);
            }

            pItem.dataset.action = 'page';
            const aItem = this.createPageLink(i);
            pItem.appendChild(aItem);
            links.push(pItem);
         }
        
        
        
        const nextLi = this.createPageItem;
        pItem.dataset.page = 1;
        prevLi.dataset.action = 'Next';
        const nextLink = this.createPageLink(this.nextLink);
        nextLi.appendChild(nextLi);
  
        links.push(nextLi);

        if (this.page === 1) {
            prevLi.classList.add(this.classDisabled);
        }
        
        else if (this.page === this.totalPages) {
            nextLink.classList.add(this.classDisabled);
        }

        return links;
        
    } 


    handlePageChange(){}



    initEvents() {
        this.paginationEl.add
    }

    render() {
        
        this.parentNode.appendChild(this.paginationEl)
        const links = this.getLinks();
        links.foreach(li => this.paginationEl.appendChild(li))
    //    this.parentNode.innerHTML = null;
    //    this.parentNode.innerHTML = `  <ul class="pagination pagination-lg">
    //         <li class="page-item disabled">
    //           <a class="page-link" href="#">Previous</a>
    //         </li>
    //         <li class="page-item disabled"><a class="page-link" href="#">1</a></li>
    //         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //         <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //       </ul>`
    }

}


function protectedRoute() {
    const userToken = StorageService.read(window.USER_TOKEN_KEY); //ეს გადმოვიტანეთ services.js-დან  read(key) {
    //   return JSON.parse(this.storage.getItem(key)); StorageService-სს ენიჭება Storage-ის მეთოდი read
    // }
    if (!userToken) { // იმ შემთხვევაში თუ remember me არ მოიპწიჩკა :) ან წაშალა ტოკენი ლოქალ სთორიჯიდან
        navigateToIndex(); // თუ ეს ჩანაწერი არ მოიძებნება localStorage-ში მაშინვე გადადის index.html-ზე 
    }

}


function navigateToIndex() {
    location.replace('index.html'); //გადადის ინდექსის გვერდზე
}

function navigateToDasboard(token) {
    StorageService.store(window.USER_TOKEN_KEY, token);
    location.replace('dashboard.html'); // თუ ეს ჩანაწერი მოიძებნება localStorage-ში მაშინვე გადადის dashboard.html-ზე 
}

function navigateToProfile() {
    location.replace('profile.html');
}
window.ApiService = new API() // აქ ქმნის თავისთავს..:) ვუკავშირდებით სხვა ჯს ფაილებს. ამ ჯავასკრიპტის ფაილის ჩატვირთვისთანავე შეიქმნება API ფროფერთი  ამიტომ მეორე ჯს ფაილში აღარ მოგვიწევს ამ ფროფერთის შექმნა არამედ იქ უკვე ამას მივწვდებით window.API-ით 
window.StorageService = new Storage(); //ვინდოუს ფროფერთი როგორც სთორიჯი გააკეთებს იმას რომ მთლიანად აპლიკაციისთვის ანუ ჩვენი ტაბებისთვის ერთიდაიგივე სთორიჯის ობიექტი იქნება შექმნილი. როცა გვერდი ჩაიტვირთება მხოლოდ ერთხელ მოხდებაეს მოქმედება
