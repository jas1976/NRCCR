import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ChampionshipComponent } from './championship/championship.component';
import { ChampionshipDataService } from './championship/championship-data.service';
import { WhereToFindUsComponent } from './where-to-find-us/where-to-find-us.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { EventsComponent } from './events/events.component';
import { CarsAndSetupsComponent } from './cars-and-setups/cars-and-setups.component';
import { RaceResultDataService } from './race-results/race-result-data.service';
import { VideosComponent } from './videos/videos.component';
import { HallofFameComponent } from './hall-of-fame/hall-of-fame.component';

const routes: Routes =[
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'race-results',   component: RaceResultsComponent },
    { path: 'gallery',        component: GalleryComponent },
    { path: 'championship',   component: ChampionshipComponent },
    { path: 'where-to-find-us',       component: WhereToFindUsComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'events',         component: EventsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'cars-and-setups',       component: CarsAndSetupsComponent },
    { path: 'hall-of-fame',        component: HallofFameComponent },
    { path: 'videos',        component: VideosComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
