import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateNewActivityComponent } from './create-new-activity/create-new-activity.component';
import { ActivityComponent } from './activity/activity.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { OverviewExpensesComponent } from './overview-expenses/overview-expenses.component';


const appRoutes: Routes = [
  {
    path: 'new',
    component: CreateNewActivityComponent,
    data: { title: 'Create a new Activity' }
  },
  {
    path: 'activity/:id',
    component: ActivityComponent,
    data: { title: 'Activity' }
  },
  {
    path: 'add-expense',
    component: AddExpenseComponent,
    data: { title: 'Add Expense' }
  },
  {
    path: 'overview-expenses',
    component: OverviewExpensesComponent,
    data: { title: 'Overview Expenses' }
  },
  { path: '**', redirectTo: '/new' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateNewActivityComponent,
    ActivityComponent,
    AddExpenseComponent,
    OverviewExpensesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
