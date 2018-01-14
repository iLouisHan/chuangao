import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  login: Observable<any>;
  form: FormGroup;
  checkItem: string;
  keys: Array<string>;
  trans = {
    companyCode: '公司编码',
    companyName: '公司名称',
    shortName: '简称',
    organizationCode: '组织机构代码',
    level: '公司级别',
    address: '地址',
    contacts: '联系人',
    phoneNo: '联系电话',
    briefIntro: '公司简介',
    status: '启用状态',
    totalMileage: '所辖路段里程（单位：公里）',
    longitude: '经度',
    latitude: '纬度'
  };

  constructor(
    private http: Http,
    private store: Store<any>,
    private router: Router
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      companyCode: new FormControl('1004', Validators.required),
      companyName: new FormControl('川南公司', Validators.required),
      organizationCode: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contacts: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      briefIntro: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      totalMileage: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required)
    });
    this.keys = Object.keys(this.form.value);
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getCompanyInfo?companyCode=${orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.form.patchValue(res.data);
                this.checkItem = res.data.status;
              }else {
                alert(res.message);
              }
            });
  }

  submit() {
    this.form.value.status = this.checkItem;
    const spaceArr = this.keys.filter(el => !this.form.value[el]).map(el => this.trans[el]);
    if (spaceArr.length > 0) {
      alert(`${spaceArr.join(',')}为空`);
    }else {
      this.form.value.totalMileage = +this.form.value.totalMileage;
      this.form.value.longitude = +this.form.value.longitude;
      this.form.value.latitude = +this.form.value.latitude;
      const myHeaders: Headers = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      this.http.post('http://119.29.144.125:8080/cgfeesys/BaseInfo/setDefaultCompany', JSON.stringify(this.form.value), {
        headers: myHeaders
      }).map(res => res.json())
        .subscribe(res => {
          alert(res.message);
        });
    }
  }

  check($event) {
    this.checkItem = $event.target.value;
  }

  test(val) {
    return val === +this.checkItem;
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.getInfo(res.orgCode);
      }
    });
    window.scrollTo(0, 0);
  }
}
