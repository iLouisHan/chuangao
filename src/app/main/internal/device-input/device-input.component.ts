import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-device-input',
  templateUrl: './device-input.component.html',
  styleUrls: ['./device-input.component.scss']
})
export class DeviceInputComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  startDate: string;
  endDate: string;
  en: any;
  isChosen = false;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  orgList: Array<any>;
  count: number;
  deviceList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  isAdd: boolean;
  keys: Array<any>;
  selectedDevice: string;
  selectionMode = 'single';
  searchOrg: Array<any>;
  initForm: any;
  param: any = {
    page: this.page,
    size: this.size
  };
  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      assetName: new FormControl('', Validators.nullValidator),
      assetType: new FormControl('', Validators.nullValidator),
      assetState: new FormControl('', Validators.nullValidator),
      useOrg: new FormControl('', Validators.nullValidator),
      buyDate: new FormControl('', Validators.nullValidator),
      buyNum: new FormControl('', Validators.nullValidator),
      assetLife: new FormControl('', Validators.nullValidator),
      assetModel: new FormControl('', Validators.nullValidator),
      assetNo: new FormControl('', Validators.nullValidator),
      assetUser: new FormControl('', Validators.nullValidator),
      scrapDate: new FormControl('', Validators.nullValidator)
    });
    this.searchOrg = [];
    this.keys = Object.keys(this.form.value);
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
    this.login = store.select('login');
    this.cols = [
      { field: 'assetState', header: '设备类型' },
      { field: 'assetName', header: '设备名称' },
      { field: 'useOrg', header: '资产单位' },
      { field: 'buyNum', header: '购置数量' },
      { field: 'assetLife', header: '设备理论年限' },
      { field: 'buyDate', header: '购置日起' },
      { field: 'scrapDate', header: '报废日期' }
    ];
    this.initForm = {
      assetName: '',
      assetType: '',
      assetState: '',
      useOrg: '',
      buyDate: '',
      buyNum: '',
      assetLife: '',
      assetModel: '',
      assetNo: '',
      assetUser: '',
      scrapDate: ''
    };
  }
  selectedOrg($event) {
    console.log($event[0].data);
    this.orgList = ($event);
  }

  selectedSearchOrg($event) {
    console.log($event);
    this.searchOrg[0] = ($event);
  }
  getStaffInfo(staffId) {
    this.deviceList.forEach(item => {
      if (item.id === staffId) {
        this.form.patchValue(item);
        this.endDate = item.scrapDate;
        this.startDate = item.buyDate;
      }
    });
  }
  getInfo() {
    if (this.searchOrg.length !== 0) {
      this.param.orgList = this.searchOrg.map(el => el.data);
    } else {
      this.param.orgList = ['00200119'];
    }
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/FixedAsset/get', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.deviceList = res.data.fixedAssetDataList;
                }
              } else {
                alert(res.message);
              }
            });
  }

  dateFormat(date) {
    if (date) {
      const _date = new Date(date);
      const _month = (_date.getMonth() + 1) <= 9 ? `0${(_date.getMonth() + 1)}` : _date.getMonth();
      const _day = _date.getDate() <= 9 ? `0${_date.getDate()}` : _date.getDate();
      return `${_date.getFullYear()}-${_month}-${_day}`;
    } else {
      return '';
    }
  }

  add() {
    this.form.reset();
    this.form.patchValue(this.initForm);
    // this.form.patchValue({orgName: this.orgName});
    this.isChosen = true;
    this.isAdd = true;
  }

  search() {
    if (this.searchOrg && this.searchOrg.length !== 0) {
      this.getInfo();
      this.toFirstPage();
    } else {
      alert('请输入要查询的设备！');
    }
  }

  update() {
    if (this.selectedDevice) {
      this.getStaffInfo(this.selectedDevice);
      this.isChosen = true;
      this.isAdd = false;
    } else {
      alert('请选择一个设备');
    }
  }

  delete() {
    if (this.selectedDevice) {
      this.staffLeave(this.selectedDevice);
    } else {
      alert('请选择一个设备');
    }
  }

  select(val) {
    this.selectedDevice = val === this.selectedDevice ? '' : val;
  }

  check(val) {
    return val === this.selectedDevice;
  }

  staffLeave(selectedUser) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/FixedAsset/delete?id=${selectedUser}`)
            .map(res => res.json())
            .subscribe(res => {
              alert(res.message);
              if (res.code) {
                this.toFirstPage();
              }
            });
  }

  addDevice() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.buyDate = this.dateFormat(this.startDate);
    this.form.value.scrapDate = this.dateFormat(this.endDate);
    this.form.value.useOrg = this.orgList[0].data;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/FixedAsset/add`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                // this.deviceList.push(this.form.value);
                this.toFirstPage();
              } else {
                alert(res.message);
              }
            });
  }

  updateDevice() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.data.id = this.selectedDevice;
    this.data.buyDate = this.dateFormat(this.startDate);
    this.data.scrapDate = this.dateFormat(this.endDate);
    this.data.useOrg = this.orgList[0].data;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/FixedAsset/update`, JSON.stringify(this.data), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.toFirstPage();
              } else {
                alert(res.message);
              }
            });
  }

  paginate($event) {
    this.param.page = $event.page;
    this.getInfo();
  }

  submit() {
    if (this.isAdd) {
      this.addDevice();
    } else {
      this.updateDevice();
    }
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    this.isChosen = false;
    element.click();
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.getInfo();
      }
    });
  }
}

