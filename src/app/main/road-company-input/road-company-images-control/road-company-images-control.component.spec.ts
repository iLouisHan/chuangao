import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadCompanyImagesControlComponent } from './road-company-images-control.component';

describe('ImageControlComponent', () => {
  let component: RoadCompanyImagesControlComponent;
  let fixture: ComponentFixture<RoadCompanyImagesControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadCompanyImagesControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadCompanyImagesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
