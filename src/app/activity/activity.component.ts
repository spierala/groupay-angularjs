import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Activity } from '../model/activity';
import {Member} from "../model/member";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activity:Activity = new Activity();
  currentMember:Member;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dataService: DataService
  ) {}

  private getActivity(id) {
    this.activity = this.dataService.getCurrentActivity();
    if(this.activity == null) {
      this.dataService.getActivityById(id)
        .subscribe(activity => this.onActivityReceived(activity));
    }
  }

  private onActivityReceived(activity:Activity) {
    this.activity = activity;
    this.dataService.setCurrentActivity(activity);
    this.currentMember = this.dataService.getCurrentMember();
  }

  selectMember(member) {
    this.dataService.setCurrentMember(member);
    this.currentMember = member;
  }

  goToExpensesPage() {
    this.router.navigateByUrl('/add-expense');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => this.getActivity(params['id'])
    );
  }
}
