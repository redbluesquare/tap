import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RuntaskComponent } from './runtask/runtask.component';
import { TasksComponent } from './tasks/tasks.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlannerComponent } from './planner/planner.component';
import { TaskReportsComponent } from './task-reports/task-reports.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'runtask', component: RuntaskComponent },
  { path: 'runtask/:id', component: RuntaskComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'planner', component: PlannerComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'reports', component: TaskReportsComponent }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
