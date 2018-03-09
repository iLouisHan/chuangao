import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCheckComponent } from './green-check.component';

describe('GreenCheckComponent', () => {
  let component: GreenCheckComponent;
  let fixture: ComponentFixture<GreenCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
