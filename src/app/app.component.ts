import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Activity } from './model/activity';
import {Member} from "./model/member";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activity: Activity;

  constructor(private dataService: DataService) { }


  ngOnInit() {

    var member:Member = new Member();
    member.name = "Flosen";
    member.email = "spierala@gmx.de";

    var activity:Activity = new Activity();
    activity.title = "My Activity";
    activity.members = [member];

    this.dataService.createActivity(activity)
      .subscribe(activity => this.activity = activity);

    // this.dataService.getActivityById("59b153be5ea2bb000099f403")
    //   .subscribe(activity => this.activity = activity);
  }
}
