import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getActivityById = function(id) {
    return this.http.get('/api/activity/' + id).map((res:Response) => res.json());
  }

  createActivity = function(newActivity) {
    return this.http.post('/api/activity', newActivity).map((res:Response) => res.json());
  }
}
