import { Injectable } from '@angular/core';
import { IBarber } from './barber';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class BarberService {
    private _barberUrl = 'api/barbers/barbers.json';

    constructor(private _http: Http) { }
   
  getBarbers (): Observable<IBarber[]> {
    return this._http.get(this._barberUrl)
                    .map((response: Response) => <IBarber[]>response.json())
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}