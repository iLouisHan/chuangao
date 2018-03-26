import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.scss']
})
export class SuperComponent implements OnInit {
  dataArr: any;
  selectedFiles2: any;
  treeNodes: Array<any> = [];
  login: Observable<any>;
  form: FormGroup;
  selected: any = {};
  initForm: any;
  expanded: true;
  view = 0;
  orgCode: string;
  staffList: any = {};

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      orgName: new FormControl('', Validators.nullValidator),
      orgCode: new FormControl('', Validators.nullValidator),
      orgType: new FormControl('-1', Validators.nullValidator),
      adminName: new FormControl('', Validators.nullValidator),
      pOrgCode: new FormControl('', Validators.nullValidator)
    });
    this.initForm = this.form.value;
  }

  nodeSelect($event) {
    this.form.patchValue($event.node);
    this.selected = $event.node;
    this.getStaff($event.node.data);
  }

  getStaff(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Super/getAllUserInfo?orgCode=${orgCode}`)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code) {
            this.staffList = res.data;
            this.view = 2;
          }
        });
  }

  changeIsAdmin(index) {
    this.staffList[index].isAdmin = 1 - this.staffList[index].isAdmin;
  }

  add() {
    if (this.selected.orgType === 3) {
      alert('不能为收费站添加子机构！');
    }else {
      const orgType = this.selected.orgType || 0;
      this.view = 1;
      this.form.patchValue(this.initForm);
      this.form.patchValue({
        pOrgCode: this.selected.data,
        orgType: orgType + 1
      });
    }
  }

  addAdmin() {
    const param = this.staffList.map(el => {
      return {
        userId: el.adminCode,
        isAdmin: el.isAdmin
      };
    });
    if (param.filter(el => el.isAdmin).length > 0) {
      this.http.post(`http://119.29.144.125:8080/cgfeesys/Super/setManager`, JSON.stringify(param), {
        headers: new Headers({'Content-Type': 'application/json'})
      }).map(res => res.json())
      .subscribe(res => {
        alert(res.message);
        if (res.code) {
          this.getOrgInfo();
          this.view = 0;
        }
      });
    }else {
      alert('至少选择一个管理员！');
    }
  }

  delete() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Super/deleteOrg?orgCode=${this.selected.data}&orgType=${this.selected.orgType}`)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.message);
          if (res.code) {
            this.view = 0;
            this.getOrgInfo();
          }
        });
  }

  addChild(arr, node) {
    if (arr.id === node.pid) {
      arr.children.push({
        label: node.orgName,
        data: node.orgCode,
        id: node.id,
        orgType: node.orgType,
        children: [],
        expanded: true,
        adminDataList: node.adminDataList
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
            children: [],
            expanded: true,
            adminDataList: el.adminDataList
          });
        }
      });
    }
  }

  getOrgInfo() {
    this.treeNodes = [];
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Super/getAllOrgInfo`)
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  this.toTreeNode(res.data);
                } else {
                  alert(res.message);
                }
              });
  }

  submit() {
    this.form.value.orgType = +this.form.value.orgType;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Super/addOrg`, JSON.stringify(this.form.value), {
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .map(res => res.json())
    .subscribe(res => {
      alert(res.message);
      if (res.code) {
        this.view = 0;
        this.getOrgInfo();
      }
    });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgCode = res.orgCode;
        this.getOrgInfo();
      }
    });
  }

}
