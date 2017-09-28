import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Activity } from '../model/activity';
import {Member} from "../model/member";
import {Expense} from "../model/expense";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activity:Activity = new Activity();
  currentMember:Member;
  total:number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dataService: DataService
  ) {}

  private getActivity(id) {
    this.dataService.getActivityById(id)
      .subscribe(activity => this.onActivityReceived(activity));
  }

  private onActivityReceived(activity:Activity):void {
    this.activity = activity;
    this.dataService.setCurrentActivity(activity);
    this.getCurrentMember();
  }

  private getCurrentMember():void{
    this.currentMember = this.dataService.getCurrentMember();

    if(this.currentMember == null){
      this.currentMember = this.activity.members[0];
    }

    this.dataService.setCurrentMember(this.currentMember);
  }

  goToExpensesPage():void {
    this.router.navigateByUrl('/add-expense');
  }

  goToExpensesOverviewPage():void {
    this.router.navigateByUrl('/overview-expenses');
  }

  onMemberSelected(member:Member):void{
    this.dataService.setCurrentMember(member);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => this.getActivity(params['id'])
    );
  }
}
