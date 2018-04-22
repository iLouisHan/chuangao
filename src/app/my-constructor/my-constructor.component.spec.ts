import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConstructorComponent } from './my-constructor.component';

describe('MyConstructorComponent', () => {
  let component: MyConstructorComponent;
  let fixture: ComponentFixture<MyConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
