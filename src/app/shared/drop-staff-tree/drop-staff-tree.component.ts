import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-drop-staff-tree',
  templateUrl: './drop-staff-tree.component.html',
  styleUrls: ['./drop-staff-tree.component.scss']
})
export class DropStaffTreeComponent implements OnInit {
  @Output()
  selectedOrg: EventEmitter<any> = new EventEmitter();
  @Input()
  selectionMode: string;

  login: Observable<any>;
  treeNodes: Array<any> = [];
  selectedFiles2: any;
  isShow = false;
  selected: string;

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
        children: []
      });
    } else if (arr.children.length > 0) {
      arr.children.forEach(el => {
        this.addChild(el, node);
      });
    }
  }

  toTreeNode(arr) {
    arr.forEach(el => {
      this.treeNodes.push({
        label: el.userName,
        data: el.userId
      });
    });
  }

  tab() {
    this.isShow = !this.isShow;
  }

  nodeSelect($event) {
    if (this.selectionMode === 'checkbox') {
      this.selected = this.selectedFiles2.map(el => el.label).join(', ');
    } else {
      this.selectedFiles2 = [$event.node];
      this.selected = this.selectedFiles2[0].userId;
    }
    this.selectedOrg.emit(this.selectedFiles2);
  }

  getOrgInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationUserId?stationCode=${orgCode}`)
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
  }

}
