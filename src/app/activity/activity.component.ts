import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Activity } from '../model/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activity:Activity = new Activity();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

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
