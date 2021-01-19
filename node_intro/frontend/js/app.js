

const button = document.querySelector('button');


button.addEventListener('click', () => {
    const baseURL = "http://localhost:3000";
    
    fetch(baseURL, { method: 'GET', }).then((response) => response.json()).then((result) => console.log(result));
});

