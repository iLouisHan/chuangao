import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothAddComponent } from './cloth-add.component';

describe('ClothAddComponent', () => {
  let component: ClothAddComponent;
  let fixture: ComponentFixture<ClothAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
