import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleModComponent } from './team-schedule-mod.component';

describe('TeamScheduleModComponent', () => {
  let component: TeamScheduleModComponent;
  let fixture: ComponentFixture<TeamScheduleModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamScheduleModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamScheduleModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
