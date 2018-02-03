import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchSearchComponent } from './switch-search.component';

describe('SwitchSearchComponent', () => {
  let component: SwitchSearchComponent;
  let fixture: ComponentFixture<SwitchSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
