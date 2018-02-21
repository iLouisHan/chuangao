import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkCountComponent } from './talk-count.component';

describe('TalkCountComponent', () => {
  let component: TalkCountComponent;
  let fixture: ComponentFixture<TalkCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
