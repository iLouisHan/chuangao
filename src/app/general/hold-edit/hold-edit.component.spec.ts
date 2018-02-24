import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldEditComponent } from './hold-edit.component';

describe('HoldEditComponent', () => {
  let component: HoldEditComponent;
  let fixture: ComponentFixture<HoldEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
