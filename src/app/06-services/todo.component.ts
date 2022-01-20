import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  template: '',
})
export class TodosComponent {
  todos: any[] = [];
  message: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((t) => (this.todos = t));
  }

  add() {
    let newTodo = { title: '' };
    this.todoService.add(newTodo).subscribe(
      (t) => this.todos.push(t),
      (err) => (this.message = err)
    );
  }

  delete(id: number) {
    if (confirm('Are you sure?')) this.todoService.delete(id).subscribe();
  }
}
