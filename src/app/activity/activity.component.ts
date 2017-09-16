import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import {Activity} from "../model/activity";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  activity:Activity = new Activity();

  private getActivity(id) {
     this.dataService.getActivityById(id)
       .subscribe(activity => this.activity = activity);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => this.getActivity(params['id'])
    );
  }
}