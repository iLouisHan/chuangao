import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositComponent } from './composit.component';

describe('CompositComponent', () => {
  let component: CompositComponent;
  let fixture: ComponentFixture<CompositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
