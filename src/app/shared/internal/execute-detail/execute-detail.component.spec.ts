import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteDetailComponent } from './execute-detail.component';

describe('ExecuteDetailComponent', () => {
  let component: ExecuteDetailComponent;
  let fixture: ComponentFixture<ExecuteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
