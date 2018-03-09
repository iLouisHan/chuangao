import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenHistoryComponent } from './green-history.component';

describe('GreenHistoryComponent', () => {
  let component: GreenHistoryComponent;
  let fixture: ComponentFixture<GreenHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
