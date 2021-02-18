import { Component, OnInit } from '@angular/core';


interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'first-ng-app';
  number1: number = 17;
  number2: number = 20;
  counter: number = 0;
  currentTodo?: Todo;


  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json: Todo) => {
        this.currentTodo = json;
      });
  }


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




