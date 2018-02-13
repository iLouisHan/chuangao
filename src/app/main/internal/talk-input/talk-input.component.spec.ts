import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkInputComponent } from './talk-input.component';

describe('TalkInputComponent', () => {
  let component: TalkInputComponent;
  let fixture: ComponentFixture<TalkInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
