import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainExecuteComponent } from './train-execute.component';

describe('TrainExecuteComponent', () => {
  let component: TrainExecuteComponent;
  let fixture: ComponentFixture<TrainExecuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainExecuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
