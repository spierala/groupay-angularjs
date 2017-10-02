import { Component, OnInit } from '@angular/core';
import {Activity} from "../model/activity";
import {DataService} from "../data.service";
import {Member} from "../model/member";
import {Expense} from "../model/expense";
import {OverviewExpense} from "../model/overviewExpense";

@Component({
  templateUrl: './overview-expenses.component.html',
  styleUrls: ['./overview-expenses.component.scss']
})
export class OverviewExpensesComponent implements OnInit {

  expenses:Expense[];

  constructor(private dataService:DataService) { }

  private getExpensesList(activity:Activity):Expense[]{
    var expenses:OverviewExpense[] = [];
    activity.members.forEach((member:Member) => {
      var memberName:string = member.name;
      member.expenses.forEach((expense:OverviewExpense) => {
        expense.memberName = memberName;
        expenses.push(expense);
      });
    });
    return expenses;
  }

  ngOnInit() {
     var activity:Activity = this.dataService.getCurrentActivity();
     this.expenses = this.getExpensesList(activity); //TODO replace with API call to get all expenses of the Activity
  }
}
