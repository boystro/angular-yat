import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';

import { NewtodoComponent } from './newtodo/newtodo.component';
import { Todo, TodoService } from './services/todo.service';
import { ViewtodoComponent } from './viewtodo/viewtodo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Angular Components
    CommonModule,
    RouterOutlet,
    FormsModule,
    // Prime NG Components
    InputTextModule,
    ButtonModule,
    OverlayPanelModule,
    ToastModule,
    // Project Components
    NewtodoComponent,
    ViewtodoComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'YAT | Yet Another Todo';
  searchValue = '';

  todos: Todo[] = [];

  constructor(
    @Inject(TodoService) private _todoService: TodoService,
    @Inject(MessageService) private _messageService: MessageService
  ) {
    this.refresh();
  }

  refresh() {
    this.todos = this._todoService.get();
  }

  get filteredTodos() {
    return this.todos.filter((item) =>
      item.title.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  showSavedMessage(message: string) {
    this._messageService.add({
      severity: 'info',
      summary: 'Todo Created',
      detail: message,
    });
  }

  showDeletedMessage(message: string) {
    this._messageService.add({
      severity: 'info',
      summary: 'Todo Deleted',
      detail: message,
    });
  }
}
