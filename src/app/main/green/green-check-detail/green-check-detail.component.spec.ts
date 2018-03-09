import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCheckDetailComponent } from './green-check-detail.component';

describe('GreenCheckDetailComponent', () => {
  let component: GreenCheckDetailComponent;
  let fixture: ComponentFixture<GreenCheckDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenCheckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCheckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
