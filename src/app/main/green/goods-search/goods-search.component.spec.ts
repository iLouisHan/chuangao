import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsSearchComponent } from './goods-search.component';

describe('GoodsSearchComponent', () => {
  let component: GoodsSearchComponent;
  let fixture: ComponentFixture<GoodsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
