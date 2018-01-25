import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainPlanSearchComponent } from './train-plan-search.component';

describe('TrainPlanSearchComponent', () => {
  let component: TrainPlanSearchComponent;
  let fixture: ComponentFixture<TrainPlanSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainPlanSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainPlanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
