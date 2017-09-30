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
  title:string;
  amount:number;

  constructor(private dataService:DataService) { }

  onSubmit() {
    var expense:Expense = new Expense();
    expense.title = this.title;
    expense.amount = Number(this.amount);
    this.currentMember.expenses.push(expense);
    this.dataService.updateCurrentActivity();
    this.title = undefined;
    this.amount = undefined;
  }

  ngOnInit() {
    this.currentMember = this.dataService.getCurrentMember();
  }
}
