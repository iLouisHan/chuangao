import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionInputComponent } from './division-input.component';

describe('DivisionInputComponent', () => {
  let component: DivisionInputComponent;
  let fixture: ComponentFixture<DivisionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
