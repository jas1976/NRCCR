import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { IChampionshipDataEntry } from '../championship/championship-data-entry';
import { ChampionshipDataService } from '../championship/championship-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  championshipPointsData = [];
  championshipPointsDataTC = [];
  championshipPointsData4wd = [];
  championshipPointsData2wd = [];
  errorMessage: string;

  constructor(private _championshipDataService: ChampionshipDataService) { }

  ngOnInit(): void {
    console.log("Getting TC data")
    this._championshipDataService.getChampionshipPointsDataTC()
      .subscribe(championshipPointsData => {
        console.log("Got TC data")
        this.championshipPointsDataTC = championshipPointsData._embedded;
        this.championshipPointsDataTC.sort((a, b) => b['Series Points'] - a['Series Points'])
      },
        error => this.errorMessage = <any>error);

    console.log("Getting 4wd data")
    this._championshipDataService.getChampionshipPointsData4wd()
      .subscribe(championshipPointsData => {
        console.log("Got 4wd data")
        this.championshipPointsData4wd = championshipPointsData._embedded;
        this.championshipPointsData4wd.sort((a, b) => b['Series Points'] - a['Series Points'])
      },
        error => this.errorMessage = <any>error);

    console.log("Getting 2wd data")
    this._championshipDataService.getChampionshipPointsData2wd()
      .subscribe(championshipPointsData => {
        console.log("Got 2wd data")
        this.championshipPointsData2wd = championshipPointsData._embedded;
        this.championshipPointsData2wd.sort((a, b) => b['Series Points'] - a['Series Points'])
      },
        error => this.errorMessage = <any>error);
  }

}
