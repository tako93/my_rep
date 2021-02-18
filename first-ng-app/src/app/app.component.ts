import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'first-ng-app';
  number1: number = 17;
  number2: number = 20;
  counter: number = 0;




  onClick(event: Event) {
    this.title = "changed"
    this.counter = 0
  }


  onIncrement(value: number) { 
    this.counter += value;
  }
  onDecrement(value: number) { 
    this.counter += value;
  }
  



}



