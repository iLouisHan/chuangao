import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothChooseComponent } from './cloth-choose.component';

describe('ClothChooseComponent', () => {
  let component: ClothChooseComponent;
  let fixture: ComponentFixture<ClothChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
