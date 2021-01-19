import express from 'express'; //1



import mathLib from "./math.js";
// import {add, minus, multiply, devide} from "./math.js";

const app = express(); //2


const port = 3000; //3

app.all('*', (req, res, next) => { //4
    res.header('Access-Control-Allow-Origin', '*');
    next();

});

app.get('/', (req, res) => {
    res.json('hello world');
});
  
app.listen(port, () => { //5
    console.log('server started on port -', port);
});
