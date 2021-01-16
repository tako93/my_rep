document.getElementById('getToDos').addEventListener('click', getTodos);
document.getElementById('clear').addEventListener('click', clear);



function getTodos () {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((data) => {
      let output = '<h2>ToDos</h2>';
      data.forEach(function (todos) {
        output += `
                 <div>
                 <p>user: ${todos.id}</p>
                <h1> To do:  ${todos.title} </h1>
                
                 <h5>${todos.completed}</h5>
                 <hr>
                </div> 
                `
      });

      document.getElementById('output').innerHTML = output;
    });
};

function clear () {
  output.innerHTML = null;
};
