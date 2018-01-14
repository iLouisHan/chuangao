import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollStationImagesComponent } from './toll-station-images.component';

describe('TollStationImagesComponent', () => {
  let component: TollStationImagesComponent;
  let fixture: ComponentFixture<TollStationImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollStationImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollStationImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
