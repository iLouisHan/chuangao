import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainExecuteSearchComponent } from './train-execute-search.component';

describe('TrainExecuteSearchComponent', () => {
  let component: TrainExecuteSearchComponent;
  let fixture: ComponentFixture<TrainExecuteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainExecuteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainExecuteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
