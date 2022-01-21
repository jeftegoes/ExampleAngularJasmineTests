import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoFormComponent } from './04-forms/todo-form.component';

import { AppComponent } from './app.component';
import { VoterComponent } from './07-voter/voter.component';

@NgModule({
  declarations: [AppComponent, TodoFormComponent, VoterComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
