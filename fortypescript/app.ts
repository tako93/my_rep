 //let year = 2021; //explicit

 
const userName: string = "John Doe";
// console.log(userName);
const isAdmin: boolean = false;

const numbers: number[] = [1, 2, 3, 4, 5, 6];
const listOfNumbers: Array<number> = [1, 2, 3, 4, 5, 5, 6];

numbers.forEach((n) => {
  console.log("N", n);
});

listOfNumbers.forEach((n) => {
  console.log("N", n);
});

interface User {
  firstname: string;
  lastname: string;
}

const myUser: User = {
  firstname: "John",
  lastname: "Doe",
};

// console.log(myUser.firstname, myUser.lastname);

const obj = {
  text: "adada",
};

// const totalSum = listOfNumbers.reduce((acc, next) => {
//   return add(acc, next);
// }, 0);

// console.log(totalSum);
// printUser(myUser);

// functions

// function printUser(user: User): void {
//   console.log(user.firstname, user.lastname);
// }
// function add(x: number, y: number): number {
//   return x + y;
// }

class Person {
  firstname: string;
  lastname: string;
  age: number = 0;
  constructor(fName: string = "", lName: string = "") {
    this.firstname = fName;
    this.lastname = lName;
  }
}

// const person: User = new Person("Thomas", "Edison");
// console.log(person.firstname, person.lastname);

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: Point): void {
    this.x += point.x;
    this.y += point.y;
  }
  create(point: Point): Point {
    const nX = point.x + this.x;
    const nY = point.y + this.y;
    return new Point(nX, nY);
  }
  print(): void {
    console.log(`(x:${this.x},y:${this.y})`);
  }
}

class Point3D extends Point {
  z: number;
  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }

  create(point: Point3D): Point3D {
    const point2d = super.create(point);
    const nZ = this.z + point.z;
    return new Point3D(point2d.x, point2d.y, nZ);
  }
  print(): void {
    console.log(`(x:${this.x},y:${this.y},z:${this.z})`);
  }
}

const p1 = new Point(10, 14);
const p2 = new Point(-5, 3);
const p3 = new Point(-10, -7);

p1.add(p3);
const p4 = p2.create(p3);
p1.print();
p4.print();

const p3d1: Point3D = new Point3D(1, 2, 3);
p3d1.print();

const historyApi = ["Home", "Contact", "Google"];
historyApi.push("MDN");

historyApi.pop();
// LIFO - > Stack [push, pop]

// FIFO - > Queue [shift, unshift]