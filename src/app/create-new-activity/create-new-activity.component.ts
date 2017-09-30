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

  onSubmit():void {
    var validMembers:Member[] = [];
    this.activity.members.forEach((member:Member) => {
      if(!this.isBlank(member.name)){
        validMembers.push(member);
      }
    });
    this.activity.members = validMembers;
    this.dataService.createActivity(this.activity)
      .subscribe(
        activity => this.onActivityCreated(activity)
      );
  }

  addMember():void {
    this.activity.members.push(new Member());
  }

  private onActivityCreated(activity):void {
    this.navigateToActivityPage(activity);
  }

  private navigateToActivityPage(activity:Activity):void {
    this.router.navigate(['activity', activity['_id']]); //TODO make models real Mongoose models to avoid dirty fix for accessing id via activity['_id']
  }

  private isBlank(str):boolean {
    return (!str || /^\s*$/.test(str));
  }

  ngOnInit() {
    this.activity = this.dataService.getCurrentActivity();
    if(this.activity == null) {
      this.activity = new Activity();
      this.activity.members = [new Member(), new Member()];
    }
  }
}
