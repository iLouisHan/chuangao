import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-drop-org-tree',
  templateUrl: './drop-org-tree.component.html',
  styleUrls: ['./drop-org-tree.component.scss']
})
export class DropOrgTreeComponent implements OnInit {
  login: Observable<any>;
  treeNodes: Array<any> = [];
  selectedFiles2: any;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  toTreeNode(arr) {
    for (let i = 1; i <= 3; i++) {
      const _arr = arr.filter(el => el.orgType === i);
      _arr.forEach(el => {
        if (el.pid) {

        }else {
          this.treeNodes.push({
            label: el.orgName,
            data: el.orgCode
          });
          console.log(this.treeNodes);
        }
      });
    }
  }

  getOrgInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getOrgRelation?orgCode=${orgCode}`)
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  this.toTreeNode(res.data);
                }else {
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
