import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleSetComponent } from './team-schedule-set.component';

describe('TeamScheduleSetComponent', () => {
  let component: TeamScheduleSetComponent;
  let fixture: ComponentFixture<TeamScheduleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamScheduleSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamScheduleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
