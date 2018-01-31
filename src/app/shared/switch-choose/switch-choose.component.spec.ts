import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchChooseComponent } from './switch-choose.component';

describe('SwitchChooseComponent', () => {
  let component: SwitchChooseComponent;
  let fixture: ComponentFixture<SwitchChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
