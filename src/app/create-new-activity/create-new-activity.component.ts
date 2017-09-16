import { Component, OnInit } from '@angular/core';
import {Activity} from "../model/activity";
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-new-activity',
  templateUrl: './create-new-activity.component.html',
  styleUrls: ['./create-new-activity.component.scss']
})
export class CreateNewActivityComponent implements OnInit {

  activity:Activity = new Activity();

  constructor(private dataService: DataService) { }

  createActivity() {
    this.dataService.createActivity(this.activity)
      .subscribe(activity => this.activity = activity);
  }

  ngOnInit() {
  }

}
