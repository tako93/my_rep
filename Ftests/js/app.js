// let baseSalary = 30_000;
// let overtime = 10;
// let rate = 20;

// function getWage(baseSalary, overtime, rate) {
//     return baseSalary + (overtime * rate)
// };

// let employee = {
//   baseSalary = 30_000;
//   overtime = 10;
//   rate = 20;
//   getWage: function(){
//       return this.baseSalary + (this.overtime * this.rate)
//   }
// }
// const circle = {
//     radius: 2,
//     location: {
//         x: 2,
//         y: 2
//  }
//  };

//Factory function
// function createCircle(radius){
//     return {
//         radius,
//         draw: function(){
//         console.log('draw');
//       }
//   };
// }

// const circle = createCircle(1);

// console.log(circle);


//Constractor function
// function Circle(radius) {
//      this.radius = radius;
//      this.draw = function(){
//          console.log('draw');
//      }
// }

// const circle = new Circle(1);

// for (let key in circle) {
//     if (typeof circle[key] !== 'function')
//     console.log(key, circle[key]);
// }

// const keys = Object.keys(circle);
// console.log(keys);

// if('radius' in circle) {
//     console.log('Circle is in radius');
// }

// function Circle(radius) {

//     this.radius = radius;
//     let defaultLocation = {x: 0, y: 0};
//     let computeOptimumLocation = function (){

//     }
//     this.draw = function() {

//         computeOptimumLocation();
//         console.log('draw');
//     }
// }

// function Stopwatch() {
//    let startTime, endTime, running, duration = 0;
   
//    this.start = function () {
//       if(running)
//       throw new Error('Stop');
//       running = true;
//       startTime = new Date();
//    };

//    this.stop = function() {

//    };

//    this.reset = function() {

//    };

//    Object.defineProperty(this, 'duration', {get: function() {return duration;}});
    

// }



