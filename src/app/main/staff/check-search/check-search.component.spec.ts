import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSearchComponent } from './check-search.component';

describe('CheckSearchComponent', () => {
  let component: CheckSearchComponent;
  let fixture: ComponentFixture<CheckSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
