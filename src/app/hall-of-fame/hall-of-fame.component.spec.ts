import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallofFameComponent } from './hall-of-fame.component';

describe('HallofFameComponent', () => {
  let component: HallofFameComponent;
  let fixture: ComponentFixture<HallofFameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallofFameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallofFameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
