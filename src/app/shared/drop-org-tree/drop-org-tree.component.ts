import { Component, OnInit, EventEmitter, Output, Input, DoCheck } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-drop-org-tree',
  templateUrl: './drop-org-tree.component.html',
  styleUrls: ['./drop-org-tree.component.scss']
})
export class DropOrgTreeComponent implements OnInit, DoCheck {
  @Output()
  selectedOrg: EventEmitter<any> = new EventEmitter();
  @Input()
  selectionMode: string;
  @Input()
  initOrgName: string;

  login: Observable<any>;
  treeNodes: Array<any> = [];
  selectedFiles2: any;
  isShow = false;
  selected: string;
  hasClicked = false;
  initArr: Array<string> = [];

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  addChild(arr, node) {
    if (arr.id === node.pid) {
      arr.children.push({
        label: node.orgName,
        data: node.orgCode,
        id: node.id,
        orgType: node.orgType,
        expanded: true,
        children: []
      });
    } else if (arr.children.length > 0) {
      arr.children.forEach(el => {
        this.addChild(el, node);
      });
    }
  }

  toTreeNode(arr) {
    for (let i = 1; i <= 3; i++) {
      const _arr = arr.filter(el => el.orgType === i);
      _arr.forEach(el => {
        if (el.pid) {
          this.treeNodes.forEach(element => {
            this.addChild(element, el);
          });
        } else {
          this.treeNodes.push({
            label: el.orgName,
            data: el.orgCode,
            id: el.id,
            orgType: el.orgType,
            expanded: true,
            children: []
          });
        }
      });
    }
  }

  tab() {
    this.isShow = !this.isShow;
  }

  nodeSelect($event) {
    if (this.selectionMode === 'checkbox') {
      this.selected = this.selectedFiles2.map(el => el.label).join(', ');
    } else {
      this.selectedFiles2 = [$event.node];
      this.selected = this.selectedFiles2[0].label;
      this.isShow = false;
    }
    this.selectedOrg.emit(this.selectedFiles2);
  }

  getOrgInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getOrgRelation?orgCode=${orgCode}`)
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  this.toTreeNode(res.data);
                } else {
                  alert(res.message);
                }
              });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.getOrgInfo(res.orgCode);
      }
    });
    this.selected = this.initOrgName || '';
    this.initArr = this.selected.split(',');
  }

  ngDoCheck() {
    if (!this.hasClicked && this.initArr.length && this.selectionMode === 'checkbox') {
      Array.from(document.getElementsByClassName('ui-treenode-label'))
          .filter(item => this.initArr.includes(item.getElementsByClassName('ng-star-inserted')[0].innerHTML))
          .forEach(item => {
            const dom = item as HTMLElement;
            dom.click();
            this.hasClicked = true;
          });
    }
  }
}
