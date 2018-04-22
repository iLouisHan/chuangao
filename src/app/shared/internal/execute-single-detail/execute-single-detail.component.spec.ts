import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteSingleDetailComponent } from './execute-single-detail.component';

describe('ExecuteSingleDetailComponent', () => {
  let component: ExecuteSingleDetailComponent;
  let fixture: ComponentFixture<ExecuteSingleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuteSingleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteSingleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
