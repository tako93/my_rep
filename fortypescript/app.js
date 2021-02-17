//let year = 2021; //explicit
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var userName = "John Doe";
// console.log(userName);
var isAdmin = false;
var numbers = [1, 2, 3, 4, 5, 6];
var listOfNumbers = [1, 2, 3, 4, 5, 5, 6];
numbers.forEach(function (n) {
    console.log("N", n);
});
listOfNumbers.forEach(function (n) {
    console.log("N", n);
});
var myUser = {
    firstname: "John",
    lastname: "Doe"
};
// console.log(myUser.firstname, myUser.lastname);
var obj = {
    text: "adada"
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
var Person = /** @class */ (function () {
    function Person(fName, lName) {
        if (fName === void 0) { fName = ""; }
        if (lName === void 0) { lName = ""; }
        this.age = 0;
        this.firstname = fName;
        this.lastname = lName;
    }
    return Person;
}());
// const person: User = new Person("Thomas", "Edison");
// console.log(person.firstname, person.lastname);
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        this.x += point.x;
        this.y += point.y;
    };
    Point.prototype.create = function (point) {
        var nX = point.x + this.x;
        var nY = point.y + this.y;
        return new Point(nX, nY);
    };
    Point.prototype.print = function () {
        console.log("(x:" + this.x + ",y:" + this.y + ")");
    };
    return Point;
}());
var Point3D = /** @class */ (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        var _this = _super.call(this, x, y) || this;
        _this.z = z;
        return _this;
    }
    Point3D.prototype.create = function (point) {
        var point2d = _super.prototype.create.call(this, point);
        var nZ = this.z + point.z;
        return new Point3D(point2d.x, point2d.y, nZ);
    };
    Point3D.prototype.print = function () {
        console.log("(x:" + this.x + ",y:" + this.y + ",z:" + this.z + ")");
    };
    return Point3D;
}(Point));
var p1 = new Point(10, 14);
var p2 = new Point(-5, 3);
var p3 = new Point(-10, -7);
p1.add(p3);
var p4 = p2.create(p3);
p1.print();
p4.print();
var p3d1 = new Point3D(1, 2, 3);
p3d1.print();
var historyApi = ["Home", "Contact", "Google"];
historyApi.push("MDN");
historyApi.pop();
// LIFO - > Stack [push, pop]
// FIFO - > Queue [shift, unshift]
