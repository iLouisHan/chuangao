import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropOrgTreeComponent } from './drop-org-tree.component';

describe('DropOrgTreeComponent', () => {
  let component: DropOrgTreeComponent;
  let fixture: ComponentFixture<DropOrgTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropOrgTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropOrgTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
