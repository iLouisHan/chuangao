import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothHistoryComponent } from './cloth-history.component';

describe('ClothHistoryComponent', () => {
  let component: ClothHistoryComponent;
  let fixture: ComponentFixture<ClothHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
