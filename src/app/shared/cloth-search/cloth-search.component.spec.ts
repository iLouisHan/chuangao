import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothSearchComponent } from './cloth-search.component';

describe('ClothSearchComponent', () => {
  let component: ClothSearchComponent;
  let fixture: ComponentFixture<ClothSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
