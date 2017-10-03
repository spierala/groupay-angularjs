import {Component, OnInit} from '@angular/core';
import {Member} from "../model/member";
import {Activity} from "../model/activity";
import {DataService} from "../data.service";

@Component({
  selector: 'gp-member-selector',
  templateUrl: './member-selector.component.html',
  styleUrls: ['./member-selector.component.scss']
})
export class MemberSelectorComponent implements OnInit {

  members:Member[];
  currentMember:Member;

  constructor(private dataService: DataService) { }

  private onActivityAvailable(activity:Activity){
    this.members = activity.members;
    this.currentMember = this.dataService.getCurrentMember();
    if(!this.currentMember) {
      this.currentMember = this.members[0]; //set first member as default
    }
    this.dataService.setCurrentMemberById(this.currentMember['_id']);
  }

  onMemberSelected(member:Member):void {
    this.dataService.setCurrentMemberById(member['_id']);
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
