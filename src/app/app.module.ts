import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoFormComponent } from './04-forms/todo-form.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, TodoFormComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
