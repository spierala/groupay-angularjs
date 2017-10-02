import {Component, OnInit} from '@angular/core';
import {Member} from "../model/member";
import {Activity} from "../model/activity";
import {DataService} from "../data.service";
import * as _ from "lodash";

@Component({
  selector: 'gp-member-selector',
  templateUrl: './member-selector.component.html',
  styleUrls: ['./member-selector.component.scss']
})
export class MemberSelectorComponent implements OnInit {

  members:Member[];
  currentMember:Member;

  constructor(private dataService: DataService) { }

  private getCurrentMember():Member {
    var currentMember:Member = this.dataService.getCurrentMember();

    if(!currentMember) {
      currentMember = this.members[0]; //set first member as default
    }
    else {
      var memberId:string = currentMember['_id'];
      //always find current member by _id from the members array of the fresh activity object
      //otherwise the currentMember object can not be found in this.activity.members and the <select/> stays empty
      currentMember = _.find(this.members,function(member:Member):boolean{
        return member['_id'] === memberId;
      });
    }
    return currentMember;
  }

  private onActivityAvailable(activity:Activity){
    this.members = activity.members;
    this.currentMember = this.getCurrentMember();
    this.dataService.setCurrentMember(this.currentMember);
  }

  onMemberSelected(member:Member):void {
    this.dataService.setCurrentMember(member);
  }

  ngOnInit() {
    var currentActivity = this.dataService.getCurrentActivity();
    if(currentActivity) {
      this.onActivityAvailable(currentActivity);
    }
    else {
      this.dataService.activityUpdatedEvent.subscribe(
        activity => this.onActivityAvailable(activity)
      );
    }
  }
}
