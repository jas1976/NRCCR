import { Component, OnInit } from '@angular/core';

import {
  AccessibilityConfig, Action, AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy, ButtonType, Description, DescriptionStrategy,
  DotsConfig, GridLayout, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  images: any;
  plainGalleryGrid: PlainGalleryConfig;

// #JSTE# http://plnkr.co/edit/Z6WLd9QDOd3EYkNX3rk0?p=preview should help

  ngOnInit() {
    this.images = [
      new Image(0, {
        img: '/assets/gallery/61.jpg'
      }),
      new Image(1, {
        img: '/assets/gallery/60.jpg'
      }),
      new Image(2, {
        img: '/assets/gallery/59.jpg'
      }),
      new Image(3, {
        img: '/assets/gallery/58.jpg'
      }),
      new Image(4, {
        img: '/assets/gallery/57.jpg'
      }),
      new Image(5, {
        img: '/assets/gallery/56.jpg'
      }),
      new Image(6, {
        img: '/assets/gallery/55.jpg'
      }),
      new Image(7, {
        img: '/assets/gallery/54.jpg'
      }),
      new Image(8, {
        img: '/assets/gallery/53.jpg'
      }),
      new Image(9, {
        img: '/assets/gallery/52.jpg'
      }),
      new Image(10, {
        img: '/assets/gallery/51.jpg'
      }),
      new Image(11, {
        img: '/assets/gallery/50.jpg'
      }),
      new Image(12, {
        img: '/assets/gallery/49.jpg'
      }),
      new Image(13, {
        img: '/assets/gallery/48.jpg'
      }),
      new Image(14, {
        img: '/assets/gallery/47.jpg'
      }),
      new Image(15, {
        img: '/assets/gallery/46.jpg'
      }),
      new Image(16, {
        img: '/assets/gallery/45.jpg'
      }),
      new Image(17, {
        img: '/assets/gallery/44.jpg'
      }),
      new Image(18, {
        img: '/assets/gallery/43.jpg'
      }),
      new Image(19, {
        img: '/assets/gallery/42.jpg'
      }),
      new Image(20, {
        img: '/assets/gallery/41.jpg'
      }),
      new Image(21, {
        img: '/assets/gallery/40.jpg'
      }),
      new Image(22, {
        img: '/assets/gallery/39.jpg'
      }),
      new Image(23, {
        img: '/assets/gallery/38.jpg'
      }),
      new Image(24, {
        img: '/assets/gallery/37.jpg'
      }),
      new Image(25, {
        img: '/assets/gallery/36.jpg'
      }),
      new Image(26, {
        img: '/assets/gallery/35.jpg'
      }),
      new Image(27, {
        img: '/assets/gallery/34.jpg'
      }),
      new Image(28, {
        img: '/assets/gallery/33.jpg'
      }),
      new Image(29, {
        img: '/assets/gallery/32.jpg'
      }),
      new Image(30, {
        img: '/assets/gallery/31.jpg'
      }),
      new Image(31, {
        img: '/assets/gallery/30.jpg'
      })
    ];

    this.plainGalleryGrid = {
      strategy: PlainGalleryStrategy.GRID,
      layout: new GridLayout({ width: '200px', height: 'auto' }, { length: 6, wrap: true })
    };
  }

  

}
