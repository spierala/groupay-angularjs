import { Component, OnInit } from '@angular/core';
import {Member} from "../model/member";
import {DataService} from "../data.service";
import {Expense} from "../model/expense";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  currentMember:Member;
  expense:Expense = new Expense();

  constructor(private dataService:DataService) { }

  addExpense() {
    this.currentMember.expenses.push(this.expense);
    this.dataService.updateCurrentActivity();
    this.expense = new Expense();
  }

  ngOnInit() {
    this.currentMember = this.dataService.getCurrentMember();
  }
}
