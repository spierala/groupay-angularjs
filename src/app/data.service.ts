import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Member} from "./model/member";
import {Activity} from "./model/activity";

@Injectable()
export class DataService {
  private currentMember:Member;
  private currentActivity:Activity;
  private headers = new Headers({'Content-Type': 'application/json'});

  getCurrentMember(): Member {
    return this.currentMember;
  }

  setCurrentMember(value: Member) {
    this.currentMember = value;
  }

  getCurrentActivity(): Activity {
    return this.currentActivity;
  }

  setCurrentActivity(value: Activity) {
    this.currentActivity = value;
  }

  constructor(private http: Http) { }

  getActivityById = function(id) {
    return this.http.get('/api/activity/' + id).map((res:Response) => res.json());
  }

  createActivity = function(activity) {
    return this.http.post('/api/activity', activity).map((res:Response) => res.json());
  }

  updateCurrentActivity = function() {
    let options = new RequestOptions({headers: this.headers});
    return this.http.put('/api/activity', JSON.stringify(this.currentActivity), options)
      .toPromise()
      .then((activity) => this.activity = activity)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
