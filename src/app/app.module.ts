import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { CategoriesComponent } from './categories/categories.component';
import { AppRoutingModule } from './/app-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    CategoriesComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
