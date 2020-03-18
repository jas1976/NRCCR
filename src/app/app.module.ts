import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ChampionshipComponent } from './championship/championship.component';
import { WhereToFindUsComponent } from './where-to-find-us/where-to-find-us.component';
import { EventsComponent } from './events/events.component';
import { ChampionshipDataService } from './championship/championship-data.service';
import { CarsAndSetupsComponent } from './cars-and-setups/cars-and-setups.component';
import { RaceResultDataService } from './race-results/race-result-data.service';
import { VideosComponent } from './videos/videos.component';
import { HallofFameComponent } from './hall-of-fame/hall-of-fame.component';


import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    RaceResultsComponent,
    GalleryComponent,
    ChampionshipComponent,
    WhereToFindUsComponent,
    EventsComponent,
    CarsAndSetupsComponent,
    VideosComponent,
    HallofFameComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ModalGalleryModule.forRoot()
  ],
  providers: [
    ChampionshipDataService,
    RaceResultDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
