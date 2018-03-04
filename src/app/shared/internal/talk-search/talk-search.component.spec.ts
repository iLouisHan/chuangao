import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkSearchComponent } from './talk-search.component';

describe('TalkSearchComponent', () => {
  let component: TalkSearchComponent;
  let fixture: ComponentFixture<TalkSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
