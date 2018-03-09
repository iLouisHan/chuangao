import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsControlComponent } from './goods-control.component';

describe('GoodsControlComponent', () => {
  let component: GoodsControlComponent;
  let fixture: ComponentFixture<GoodsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
