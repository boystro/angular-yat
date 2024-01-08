import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { Button, ButtonModule } from 'primeng/button';

import { Todo, TodoService } from '../services/todo.service';

@Component({
  selector: 'app-viewtodo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './viewtodo.component.html',
  styleUrl: './viewtodo.component.scss',
})
export class ViewtodoComponent implements OnInit {
  @Input({ required: true }) todo: Todo = new Todo('Invalid', 'invalid', false);
  @Output() onDelete = new EventEmitter<string>();

  componentState = _ComponentState.normal;

  updateValue = this.todo;

  constructor(@Inject(TodoService) private _todoService: TodoService) {}

  ngOnInit(): void {
    this.updateValue = this.todo.copy();
  }

  print(object: any) {
    console.log(object);
  }

  update() {
    this.todo = this.updateValue;
    this._todoService.set(this.todo);
  }

  delete() {
    this._todoService.delete(this.todo);
    this.onDelete.emit(this.todo.title);
  }
}

enum _ComponentState {
  normal = 0,
  edit = 1,
  delete = 2,
}
