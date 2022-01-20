import { HttpClient } from '@angular/common/http';
import { from, throwError, empty } from 'rxjs';
import { TodosComponent } from './todo.component';
import { TodoService } from './todo.service';

import { Component, Injector } from '@angular/core';

export let InjectorInstance: Injector;

export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}

describe('TodoComponent', () => {
  let todosComponent: TodosComponent;
  let todoService: TodoService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = InjectorInstance.get<HttpClient>(HttpClient);
    todoService = new TodoService(httpClient);
    todosComponent = new TodosComponent(todoService);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos: any[] = [1, 2, 3];

    spyOn(todoService, 'getTodos').and.callFake(() => {
      return from([todos]);
    });

    todosComponent.ngOnInit();

    expect(todosComponent.todos).toBe(todos);
  });

  it('should call the server to sabe the changes when a new todo item is added', () => {
    let spy = spyOn(todoService, 'add').and.callFake((t) => {
      return empty();
    });

    todosComponent.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 };
    let spy = spyOn(todoService, 'add').and.returnValue(from([todo]));

    todosComponent.add();

    expect(todosComponent.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error when adding a new todo', () => {
    let error = 'error from the server';
    let spy = spyOn(todoService, 'add').and.returnValue(throwError(error));

    todosComponent.add();

    expect(todosComponent.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(todoService, 'delete').and.returnValue(empty());

    todosComponent.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(todoService, 'delete').and.returnValue(empty());

    todosComponent.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});
