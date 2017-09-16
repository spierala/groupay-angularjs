import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewActivityComponent } from './create-new-activity/create-new-activity.component';


const appRoutes: Routes = [
  {
    path: 'new',
    component: CreateNewActivityComponent,
    data: { title: 'Create a new Activity' }
  },
  { path: '**', redirectTo: '/new' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateNewActivityComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule, HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
