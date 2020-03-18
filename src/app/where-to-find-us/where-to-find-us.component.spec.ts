import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereToFindUsComponent } from './where-to-find-us.component';

describe('AboutUsComponent', () => {
  let component: WhereToFindUsComponent;
  let fixture: ComponentFixture<WhereToFindUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhereToFindUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhereToFindUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
