import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  /// Does both creation and updation.
  set(todo: Todo) {
    if (todo.id == null) {
      todo.id = uuid();
      localStorage.setItem(todo.id, todo.serialize());
    }
    localStorage.setItem(todo.id, todo.serialize());
  }

  delete(todo: Todo) {
    if (todo.id == null) return;
    localStorage.removeItem(todo.id);
  }

  get(ids?: string[]): Todo[] {
    let todos: Todo[] = [];
    if (ids == null) {
      let i = 0;
      let itemKey: string | null;
      do {
        itemKey = localStorage.key(i++);
        if (itemKey != null) {
          todos.push(this.getOne(itemKey));
        }
      } while (itemKey != null);
    } else {
      for (let id of ids) {
        todos.push(this.getOne(id));
      }
    }
    return todos;
  }

  getOne(id: string): Todo {
    let localData = localStorage.getItem(id) ?? '';
    return Todo.deserialize(localData);
  }
}

export class Todo {
  constructor(
    public title: string,
    public body: string,
    public isDone: boolean,
    public id?: string
  ) {
    id ??= uuid();
  }

  serialize(): string {
    return JSON.stringify({
      title: this.title,
      body: this.body,
      isDone: this.isDone,
      id: this.id,
    });
  }

  static deserialize(data: string): Todo {
    const parsedData = JSON.parse(data);
    return new Todo(
      parsedData.title,
      parsedData.body,
      parsedData.isDone,
      parsedData.id
    );
  }

  copy(): Todo {
    return new Todo(this.title, this.body, this.isDone, this.id);
  }
}
