import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTransferComponent } from './staff-transfer.component';

describe('StaffTransferComponent', () => {
  let component: StaffTransferComponent;
  let fixture: ComponentFixture<StaffTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
