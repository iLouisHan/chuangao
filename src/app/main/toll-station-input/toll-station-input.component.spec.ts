import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollStationInputComponent } from './toll-station-input.component';

describe('TollStationInputComponent', () => {
  let component: TollStationInputComponent;
  let fixture: ComponentFixture<TollStationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollStationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollStationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
