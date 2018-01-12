import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadCompanyComponent } from './road-company.component';

describe('RoadCompanyComponent', () => {
  let component: RoadCompanyComponent;
  let fixture: ComponentFixture<RoadCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
