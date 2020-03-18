import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'championship', title: 'Championship',  icon:'looks_one', class: '' },
    { path: 'race-results', title: 'Race Results',  icon:'flag', class: '' },
    { path: 'events', title: 'Events',  icon:'event', class: '' },
    { path: 'where-to-find-us', title: 'Where to find us',  icon:'explore', class: '' },
    { path: 'hall-of-fame', title: 'Hall of Fame',  icon:'stars', class: '' },
    { path: 'gallery', title: 'Gallery',  icon:'camera_alt', class: '' },
    { path: 'videos', title: 'Videos',  icon:'ondemand_video', class: '' },
    { path: 'cars-and-setups', title: 'Cars & Setups',  icon:'directions_car', class: '' },
    { path: 'contact-us', title: 'Contact us',  icon:'speaker_notes', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
