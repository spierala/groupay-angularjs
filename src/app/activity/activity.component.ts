import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Activity } from '../model/activity';

@Component({
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activity:Activity = new Activity();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dataService: DataService
  ) {}

  goToExpensesPage():void {
    this.router.navigateByUrl('/add-expense');
  }

  goToExpensesOverviewPage():void {
    this.router.navigateByUrl('/overview-expenses');
  }

  ngOnInit() {
    this.dataService.activityUpdatedEvent.subscribe(
      activity => {
        this.activity = activity;
        this.dataService.setCurrentActivity(this.activity);
      }
    );

    this.activatedRoute.params.subscribe(
      params => this.dataService.getActivityById(params['id'])
    );
  }
}
