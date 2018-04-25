import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../../service/shared-service.service';

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
  data: any;
  requiredItems = {
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
    latitude: '纬度',
    stationClass: '收费站类别',
    stationUsedName: '曾用名'
  };

  constructor(
    private store: Store<any>,
    private sharedService: SharedService
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      stationCode: new FormControl('', Validators.nullValidator),
      stationName: new FormControl('', Validators.nullValidator),
      stationDirection: new FormControl('', Validators.nullValidator),
      stationType: new FormControl('', Validators.nullValidator),
      belongToRegion: new FormControl('', Validators.nullValidator),
      stationPileNumber: new FormControl('', Validators.nullValidator),
      stationUsedName: new FormControl('', Validators.nullValidator),
      stationClass: new FormControl('', Validators.nullValidator),
      areaCovere: new FormControl('', Validators.nullValidator),
      floorArea: new FormControl('', Validators.nullValidator),
      monitoringRoomArea: new FormControl('', Validators.nullValidator),
      longitude: new FormControl('', Validators.nullValidator),
      latitude: new FormControl('', Validators.nullValidator),
      staffNumber: new FormControl('', Validators.nullValidator)
    });
    this.keys = Object.keys(this.form.value);
  }

  getInfo(orgCode) {
    this.sharedService.get(
      `/BaseInfo/getStationInfo?stationCode=${orgCode}`,
      {
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.data = res.data;
        this.form.patchValue(res.data);
        this.checkItem = res.data.status;
      }
    )
  }

  submit() {
    const spaceArr = this.keys.filter(el => !this.form.value[el] && this.form.value[el] !== 0).map(el => this.requiredItems[el]);
    if (spaceArr.length > 0) {
      this.sharedService.addAlert('警告', `${spaceArr.join(',')}为空`);
    }else {
      this.form.value.status = +this.checkItem;
      this.form.value.longitude = +this.form.value.longitude;
      this.form.value.latitude = +this.form.value.latitude;
      const keys = Object.keys(this.form.value);
      keys.forEach(el => {
        this.data[el] = this.form.value[el];
      });
      this.sharedService.post(
        '/BaseInfo/setDefaultStation',
        JSON.stringify(this.data),
        {
          httpOptions: true,
          successAlert: true,
          animation: true
        }
      ).subscribe()
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
      if (res && res.orgType === 3) {
        this.getInfo(res.orgCode);
      }
    });
    window.scrollTo(0, 0);
  }
}
