import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropStaffTreeComponent } from './drop-staff-tree.component';

describe('DropStaffTreeComponent', () => {
  let component: DropStaffTreeComponent;
  let fixture: ComponentFixture<DropStaffTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropStaffTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropStaffTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
