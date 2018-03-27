import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkStaticComponent } from './talk-static.component';

describe('TalkStaticComponent', () => {
  let component: TalkStaticComponent;
  let fixture: ComponentFixture<TalkStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
