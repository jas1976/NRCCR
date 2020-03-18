import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IRaceResultDataEntry } from './race-result-data-entry';

@Injectable()
export class RaceResultDataService {

    private _raceResultDataUrl = 'http://localhost:8080/NRCCR/raceresults2018summer?filter={"Race Class" : "4wd", "Race Date": "2018-02-05", "Round or Leg": "F2", "Driver Name": "Jamie Stewart"}';

    constructor(private _http: HttpClient) { }

    getRaceClasses(): Observable<any> {
        return this._http.get("http://localhost:8080/NRCCR/raceresults2018summer/_aggrs/race-classes")
    }

    getRaceWeeks(raceClass:string): Observable<any> {
        return this._http.get("http://localhost:8080/NRCCR/raceresults2018summer/_aggrs/race-dates?avars={'class':'" + raceClass + "'}")
    }

    getRaceHeats(raceClass:string, raceWeek:string): Observable<any> {
        return this._http.get("http://localhost:8080/NRCCR/raceresults2018summer/_aggrs/race-stage?avars={'class':'" + raceClass + "','date':'" + raceWeek +"'}")
    }

    getRaceResultData(raceClass:string, raceWeek:string, raceHeat:string): Observable<any> {
        return this._http.get("http://localhost:8080/NRCCR/raceresults2018summer?filter={'Race Class':'" + raceClass + "', 'Race Date':'" + raceWeek + "', 'Round or Leg':'" + raceHeat + "'}")
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }

}
