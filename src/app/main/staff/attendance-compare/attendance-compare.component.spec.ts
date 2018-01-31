import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCompareComponent } from './attendance-compare.component';

describe('AttendanceCompareComponent', () => {
  let component: AttendanceCompareComponent;
  let fixture: ComponentFixture<AttendanceCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
