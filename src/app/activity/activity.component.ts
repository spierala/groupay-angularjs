import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Activity } from '../model/activity';
import { Member } from "../model/member";
import * as _ from "lodash";

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
    this.dataService.getActivityById(id)
      .subscribe(activity => {
        this.activity = activity;
        this.dataService.setCurrentActivity(this.activity);
        this.currentMember = this.getCurrentMember()
        this.dataService.setCurrentMember(this.currentMember);
      });
  }

  private getCurrentMember():Member{
    var currentMember:Member = this.dataService.getCurrentMember();

    if(!currentMember){
      currentMember = this.activity.members[0]; //set first member as default
    }
    else {
      var memberId:string = currentMember['_id'];
      //always find current member by _id from the members array of the fresh activity object
      //otherwise the currentMember object can not be found in this.activity.members and the <select/> stays empty
      currentMember = _.find(this.activity.members,function(member:Member):boolean{
        return member['_id'] === memberId;
      });
    }
    return currentMember;
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
