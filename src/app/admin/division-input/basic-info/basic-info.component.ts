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
  requiredItems: any = {
    pileInfo: '管辖范围描述（起止桩号集合）',
    totalMileage: '所辖路段里程（单位：公里）',
    address: '地址',
    contacts: '联系人',
    phoneNo: '联系电话',
    longitude: '经度',
    latitude: '纬度',
    briefIntro: '公司简介',
    historyHonour: '管理处历史荣誉'
  };

  constructor(
    private http: Http,
    private store: Store<any>,
    private router: Router
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      divisionCode: new FormControl('', Validators.nullValidator),
      divisionName: new FormControl('', Validators.nullValidator),
      pileInfo: new FormControl('', Validators.nullValidator),
      historyHonour: new FormControl('', Validators.nullValidator),
      address: new FormControl('', Validators.nullValidator),
      contacts: new FormControl('', Validators.nullValidator),
      phoneNo: new FormControl('', Validators.nullValidator),
      briefIntro: new FormControl('', Validators.nullValidator),
      status: new FormControl('', Validators.nullValidator),
      totalMileage: new FormControl('', Validators.nullValidator),
      longitude: new FormControl('', Validators.nullValidator),
      latitude: new FormControl('', Validators.nullValidator)
    });
    this.keys = Object.keys(this.form.value);
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getDefaultDivision?divisionCode=${orgCode}`)
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
    this.form.value.status = +this.checkItem;
    // const spaceArr = this.keys.filter(el => !this.form.value[el]).map(el => this.trans[el]);
    // if (spaceArr.length > 0) {
    //   alert(`${spaceArr.join(',')}为空`);
    // }else {
      const myHeaders: Headers = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      this.http.post('http://119.29.144.125:8080/cgfeesys/BaseInfo/setDefaultDivision', JSON.stringify(this.form.value), {
        headers: myHeaders
      }).map(res => res.json())
        .subscribe(res => {
          alert(res.message);
        });
    // }
  }

  check($event) {
    this.checkItem = $event.target.value;
  }

  test(val) {
    return val === +this.checkItem;
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.orgType === 2) {
        this.getInfo(res.orgCode);
      }
    });
    window.scrollTo(0, 0);
  }
}
