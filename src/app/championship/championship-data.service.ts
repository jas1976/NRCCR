import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IChampionshipDataEntry } from './championship-data-entry';

@Injectable()
export class ChampionshipDataService {

    private _championshipDataUrlTC = 'http://localhost:8080/NRCCR/championship2018spring?filter={"Race Class" : "Touring"}';
    private _championshipDataUrl4wd = 'http://localhost:8080/NRCCR/championship2018spring?filter={"Race Class" : "4WD"}';
    private _championshipDataUrl2wd = 'http://localhost:8080/NRCCR/championship2018spring?filter={"Race Class" : "2WD"}';
    private _championshipDataUrlYearsandSeasons = 'http://localhost:8080/NRCCR/yearsandseasons';

    private _raceClassChampionshipDataUrl ='';

    constructor(private _http: HttpClient) { }

    getChampionshipPointsDataTC(): Observable<any> {
        return this._http.get(this._championshipDataUrlTC)
    }

    getChampionshipPointsData4wd(): Observable<any> {
        return this._http.get(this._championshipDataUrl4wd)
    }

    getChampionshipPointsData2wd(): Observable<any> {
        return this._http.get(this._championshipDataUrl2wd)
    }

    getChampionshipYearsandSeasons(): Observable<any> {
        return this._http.get(this._championshipDataUrlYearsandSeasons)
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

/*
@Injectable()
export class NrccrDbCollectionDataService {

    private _nrccrDbUrl = 'http://localhost:8080/NRCCR';

    constructor(private _http: HttpClient) { }

    getNrccrDbCollectionData(): Observable<any> {
        return this._http.get(this._nrccrDbUrl)
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
*/