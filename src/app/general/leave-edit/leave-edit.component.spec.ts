import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveEditComponent } from './leave-edit.component';

describe('LeaveEditComponent', () => {
  let component: LeaveEditComponent;
  let fixture: ComponentFixture<LeaveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
