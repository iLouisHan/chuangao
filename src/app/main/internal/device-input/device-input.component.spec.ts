import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInputComponent } from './device-input.component';

describe('DeviceInputComponent', () => {
  let component: DeviceInputComponent;
  let fixture: ComponentFixture<DeviceInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
