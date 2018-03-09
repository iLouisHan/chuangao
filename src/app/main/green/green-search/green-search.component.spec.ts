import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenSearchComponent } from './green-search.component';

describe('GreenSearchComponent', () => {
  let component: GreenSearchComponent;
  let fixture: ComponentFixture<GreenSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
