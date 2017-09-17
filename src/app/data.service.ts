import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getActivityById = function(id) {
    return this.http.get('/api/activity/' + id).map((res:Response) => res.json());
  }

  createActivity = function(activity) {
    return this.http.post('/api/activity', activity).map((res:Response) => res.json());
  }

  // updateActivity = function(activity) {
  //   return this.http.put('/api/activity', activity).map((res:Response) => res.json());
  // }
}
