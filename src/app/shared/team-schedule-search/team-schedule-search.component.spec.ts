import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleSearchComponent } from './team-schedule-search.component';

describe('TeamScheduleSearchComponent', () => {
  let component: TeamScheduleSearchComponent;
  let fixture: ComponentFixture<TeamScheduleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamScheduleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamScheduleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
