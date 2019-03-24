import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { CategoriesComponent } from './categories/categories.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'categories', component: CategoriesComponent }
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
