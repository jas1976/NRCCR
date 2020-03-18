import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChampionshipDataEntry } from './championship-data-entry';
import { ChampionshipDataService } from './championship-data.service';

@Component({
  selector: 'app-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.scss']
})
export class ChampionshipComponent implements OnInit {

  championshipPointsData = [];
  championshipPointsDataTC = [];
  championshipPointsData4wd = [];
  championshipPointsData2wd = [];
  championshipYearsAndSeasons = [];

  errorMessage: string;

  // List values for drop down filters
  champYears = [];
  champSeasons = [];

  // The selected item from each filter
  theChampYear = "";
  theChampSeason = "";

  constructor(private _championshipDataService: ChampionshipDataService) { }

  onChampYearSelected() {
    console.log("Year Changed to: ", this.theChampYear)
    console.log("Year Changed - Getting Championship Points data")
    //*** THE LINE BELOW COMMENTED OUT AS REALLY CHANGING YEAR SHOULD FORCE A SELECT THE SEASON TOO ***//
    //*** HOW DO WE CLEAR THE SCREEN ON SELECTED YEAR ***//
    //this.getChampionshipPointsData();
    // NEED SOME ERROR HANDLING...?
    // THIS IS WHERE WE SHOULD SET THE SEASONS i.e. champSeasons
    //*** NEED TO DO THIS FOR THE CURRENT YEAR ONLY i.e. only get the seasons available for that year ***//
    //*** SHOULD BE ABLE TO USE A FILTER FUNCTION TO CHECK THAT WE GET THE SEASONS FOR THE ARRAY ENTRIES ***//
    //*** WHERE THE YEAR MATCHES THE YEAR SELECTED IN THE SCREEN ***//
    this.championshipPointsDataTC = [];
    this.championshipPointsData4wd = [];
    this.championshipPointsData2wd = [];
    this.championshipYearsAndSeasons.forEach(yearAndSeason => {
      console.log(this.championshipYearsAndSeasons);
      if (this.champSeasons.indexOf(yearAndSeason.season) === -1) {
        this.champSeasons.push(yearAndSeason.season);
        console.log("adding: " + yearAndSeason.season);
      }
    });
  }

  onChampSeasonSelected() {
    console.log("Season Changed to: ", this.theChampSeason)
    console.log("Season Changed - Getting Championship Points data")
    this.getChampionshipPointsData();
    // NEED SOME ERROR HANDLING...?
  }

  // Generic function to get the Championship Points Data - called in three places
  private getChampionshipPointsData() {
    console.log("Getting TC data")
    this._championshipDataService.getChampionshipPointsDataTC()
      .subscribe(championshipPointsData => {
        console.log("Got TC data")
        this.championshipPointsDataTC = championshipPointsData._embedded;
        this.championshipPointsDataTC.sort((a, b) => b['Series Points'] - a['Series Points'])
        console.log(this.championshipPointsDataTC)
      },
      error => this.errorMessage = <any>error);

    console.log("Getting 4wd data")
    this._championshipDataService.getChampionshipPointsData4wd()
      .subscribe(championshipPointsData => {
        console.log("Got 4wd data")
        this.championshipPointsData4wd = championshipPointsData._embedded;
        this.championshipPointsData4wd.sort((a, b) => b['Series Points'] - a['Series Points'])
        console.log(this.championshipPointsData4wd)
      },
      error => this.errorMessage = <any>error);

    console.log("Getting 2wd data")
    this._championshipDataService.getChampionshipPointsData2wd()
      .subscribe(championshipPointsData => {
        console.log("Got 2wd data")
        this.championshipPointsData2wd = championshipPointsData._embedded;
        this.championshipPointsData2wd.sort((a, b) => b['Series Points'] - a['Series Points'])
        console.log(this.championshipPointsData2wd)
      },
      error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    
    console.log("Page Loading - Getting Years and Seasons data")
    this._championshipDataService.getChampionshipYearsandSeasons()
      .subscribe(championshipYearsandSeasonsData => {
        this.championshipYearsAndSeasons = championshipYearsandSeasonsData._embedded
        console.log(this.championshipYearsAndSeasons);
        this.championshipYearsAndSeasons.forEach(yearAndSeason => {
          if (this.champYears.indexOf(yearAndSeason.year) === -1) {
            this.champYears.push(yearAndSeason.year);
            console.log("adding: " + yearAndSeason.year);
            console.log(yearAndSeason.year)
          }
          this.champYears.sort();
          this.champYears.reverse();
          console.log(this.champYears);
        });
        //*** NEED TO DO THIS FOR THE CURRENT YEAR ONLY i.e. only get the seasons available for that year ***//
        //*** SHOULD BE ABLE TO USE A FILTER FUNCTION TO CHECK THAT A VALUE IS 0 OF THE YEAR ARRAY i.e. latest or in this case current (as pre-selecting) ***//
        this.championshipYearsAndSeasons.forEach(yearAndSeason => {
          console.log(this.championshipYearsAndSeasons);
          if (this.champSeasons.indexOf(yearAndSeason.season) === -1) {
            this.champSeasons.push(yearAndSeason.season);
            console.log("adding: " + yearAndSeason.season);
          }
        });
        //*** NEED TO SORT SEASONS THE RIGHT WAY EVERY TIME REGARDLESS OF THE NUMBER OF ENTRIES e.g. 2019 may only have Spring to start with ***//
        //const ref = { winter: 0, autumn: 1, summer: 2, spring: 3 };
        //const ref = { spring: 0, summer: 1, autumn: 2, winter: 3 };
        //this.champSeasons.sort((a, b) => ref[a.season]- ref[b.season]);
        console.log(this.champSeasons);
      },
      error => this.errorMessage = <any>error);

    console.log("Page Loading - Getting Championship Points data")
    this.getChampionshipPointsData();
    // NEED SOME ERROR HANDLING...?

  }

}
