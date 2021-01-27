import express from 'express'; //1



import mathLib from "./math.js";
// import {add, minus, multiply, devide} from "./math.js";

const app = express(); //2


const port = 3000; //3

app.use(express.json({type: '*/*'}));

app.all('*', (req, res, next) => { //4
    res.header('Access-Control-Allow-Origin', '*');
    next();

});

app.get('/', (req, res) => {
    
    res.json({message: 'hello world'});
});


app.post('/calculate', (req, res) => {
    // console.log(req.query.number_two);
    // console.log(req.query.number_one);
    let { number_one, number_two, operation } = req.body;


    number_one = parseFloat(number_one);
    number_two = parseFloat(number_two);

    let result = 0;
    let text = 'Result text';
    if (operation === '+') {
        result = add(number_1, number_2); 
    } else if(operation === '-') {
        result = minus(number_1, number_2);
    } else if(operation === '/') {
        result = devide(number_1, number_2);
    } else if(operation === '*') {
        result = multiply(number_1, number_2);
    }

    result = result.toFixed(3);
    if (operation) {
   text = `${number_one} ${operation} ${number_two}`;
    };


  

    res.json({
        result: result,
        text: text
    });
});
  
app.listen(port, () => { //5
    console.log('server started on port -', port);
});
