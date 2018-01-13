import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadCompanyInputComponent } from './road-company-input.component';

describe('RoadCompanyInputComponent', () => {
  let component: RoadCompanyInputComponent;
  let fixture: ComponentFixture<RoadCompanyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadCompanyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadCompanyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
