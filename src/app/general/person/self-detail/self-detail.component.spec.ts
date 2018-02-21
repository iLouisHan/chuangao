import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDetailComponent } from './self-detail.component';

describe('SelfDetailComponent', () => {
  let component: SelfDetailComponent;
  let fixture: ComponentFixture<SelfDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
