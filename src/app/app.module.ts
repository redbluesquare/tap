import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { CategoriesComponent } from './categories/categories.component';
import { AppRoutingModule } from './/app-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PlannerComponent} from './planner/planner.component';
import { TaskReportsComponent } from './task-reports/task-reports.component';
import { RuntaskComponent } from './runtask/runtask.component';
import { StockCompComponent } from './stock-comp/stock-comp.component';
import { InvoicesComponent } from './invoices/invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    CategoriesComponent,
    ToolbarComponent,
    PlannerComponent,
    FilterPipe,
    TaskReportsComponent,
    RuntaskComponent,
    StockCompComponent,
    InvoicesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    DragDropModule
  ],
  exports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
