

// const button = document.querySelector('button');


// button.addEventListener('click', () => {
//     const baseURL = "http://localhost:3000";
    
//     fetch(baseURL, { method: 'GET', }).then((response) => response.json()).then((result) => console.log(result));
// });

// const myObject = {
//     name: "Jano Bokuchava",
//     birthYear: 1995,
//     isAdmin: false,
// };

// const myNum = new Number('10');


const mainForm = document.getElementById('mainForm');
mainForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { target } = event;
    
    const baseURL = "http://localhost:3000";
    

    fetch(`${baseURL}/calculate`, {
        method: 'POST',

        body: JSON.stringify({
            number_one: target.number_one.value,
            number_two: target.number_one.value,
            operation: target.operation.value
        })
    })
        .then((response) => response.json())
        .then((result) => { const resultText = document.getElementById('result'); resultText.textContent = data.text });
})

