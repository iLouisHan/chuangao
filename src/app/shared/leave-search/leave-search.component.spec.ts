import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSearchComponent } from './leave-search.component';

describe('LeaveSearchComponent', () => {
  let component: LeaveSearchComponent;
  let fixture: ComponentFixture<LeaveSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
