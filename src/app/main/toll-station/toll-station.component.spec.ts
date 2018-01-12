import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollStationComponent } from './toll-station.component';

describe('TollStationComponent', () => {
  let component: TollStationComponent;
  let fixture: ComponentFixture<TollStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
