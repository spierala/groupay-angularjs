import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Member} from "./model/member";
import {Activity} from "./model/activity";
import * as _ from "lodash";

@Injectable()
export class DataService {
  activityUpdatedEvent: EventEmitter<any> = new EventEmitter();
  memberUpdatedEvent: EventEmitter<any> = new EventEmitter();

  private currentMember:Member;
  private currentActivity:Activity;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getCurrentMember = function():Member {
    return this.currentMember;
  };

  setCurrentMemberById = function(memberId: string) {
    //always find current member by _id in the members array of the currentActivity object
    //to make sure that the currentMember object reference belongs to the this.currentActivity.members array - also after the activity was fetched again
    //otherwise updating the activity via updateCurrentActivity fn does not update the current member information correctly
    this.currentMember = _.find(this.currentActivity.members, (member:Member):boolean => {
      return member['_id'] === memberId;
    });
    this.memberUpdatedEvent.emit();
  };

  getCurrentActivity = function():Activity {
    return this.currentActivity;
  };

  setCurrentActivity = function(value: Activity):void {
    this.currentActivity = value;
  };

  getActivityById = function(id) {
    this.http.get('/api/activity/' + id).map((res:Response) => res.json())
    .subscribe(response =>
        this.activityUpdatedEvent.emit(response)
    );
  };

  createActivity = function(activity) {
    return this.http.post('/api/activity', activity).map((res:Response) => res.json());
  };

  updateCurrentActivity = function() {
    let options = new RequestOptions({headers: this.headers});
    return this.http.put('/api/activity', JSON.stringify(this.currentActivity), options)
      .toPromise()
      .then((activity) => this.activity = activity)
      .catch(this.handleError);
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
