import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAndSetupsComponent } from './cars-and-setups.component';

describe('CarsAndSetupsComponent', () => {
  let component: CarsAndSetupsComponent;
  let fixture: ComponentFixture<CarsAndSetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAndSetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAndSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
