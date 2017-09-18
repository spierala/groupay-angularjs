import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../model/activity';
import { Member } from '../model/member';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-new-activity',
  templateUrl: './create-new-activity.component.html',
  styleUrls: ['./create-new-activity.component.scss']
})
export class CreateNewActivityComponent implements OnInit {

  activity:Activity;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  createActivity() {
    this.dataService.createActivity(this.activity)
      .subscribe(
        activity => this.onActivityCreated(activity)
      );
  }

  addMember() {
    this.activity.members.push(new Member());
  }

  private onActivityCreated(activity) {
    this.navigateToActivityPage(activity);
  }

  private navigateToActivityPage(activity:Activity) {
    this.router.navigate(['activity', activity['_id']]); //TODO make models real Mongoose models to avoid dirty fix for accessing id via activity['_id']
  }

  ngOnInit() {
    this.activity = new Activity();
    this.activity.members = [new Member(), new Member()];
  }
}
