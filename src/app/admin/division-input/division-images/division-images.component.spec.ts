import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionImagesComponent } from './division-images.component';

describe('DivisionImagesComponent', () => {
  let component: DivisionImagesComponent;
  let fixture: ComponentFixture<DivisionImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
