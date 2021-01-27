const userToken = localStorage.getItem(window.USER_TOKEN_KEY); //ეს გადმოვიტანეთ API.js-დან
if (!userToken) {// იმ შემთხვევაში თუ remember me არ მოიპწიჩკა :) ან წაშალა ტოკენი ლოქალ სთორიჯიდან
    navigateToIndex();// თუ ეს ჩანაწერი არ მოიძებნება localStorage-ში მაშინვე გადადის index.html-ზე 
}


const signOutButton = document.getElementById('signOutButton');//როდესაც sign out ღილაკს დააჭერს

// const container = document.querySelector('.container');
// container.classList.remove('invisible');

(async () => {
    const data = await window.API.listUsers(); //listUsers გვიბრუნებს ინფორმაციას. ის მოგვდის ლოქალ სთორიჯში ჩაწერილი ტოკენის საფუძველზე
    const lead = document.querySelector('.lead'); //ავირჩიეთ ელემენტი სადაც ამ ინფორმაციას ჩავსვამთ
   
    lead.innerHTML += `
    page = ${data.page} <br/>
    per_page = ${data.per_page} <br/>
    total = ${data.total} <br/>
    total_pages = ${data.total_pages} <br/>
    `
})();//ფუნქცია რომელიც თავისთავს იძახებს


signOutButton.addEventListener('click', () => {
    localStorage.removeItem(window.USER_TOKEN_KEY);//ლოქალიდან მოგვეხსნება ტოკენი და
    navigateToIndex();//გადადის ინდექსის გვერდზე
});



function navigateToIndex() {
     location.replace('index.html');//გადადის ინდექსის გვერდზე
}
