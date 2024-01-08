import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Todo, TodoService } from '../services/todo.service';

@Component({
  selector: 'app-newtodo',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './newtodo.component.html',
  styleUrl: './newtodo.component.scss',
})
export class NewtodoComponent {
  @Output() onComplete = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<string>();

  todoName = '';
  todoBody = '';
  isCompleted = false;

  constructor(@Inject(TodoService) private todoService: TodoService) {}

  save() {
    let instance = new Todo(this.todoName, this.todoBody, this.isCompleted);
    this.todoService.set(instance);
    console.log('Inserted', instance);
    this.onComplete.emit();
    this.onSave.emit(this.todoName);
    this.todoName = this.todoBody = '';
    this.isCompleted = false;
  }

  cancel() {
    this.onComplete.emit();
  }
}
