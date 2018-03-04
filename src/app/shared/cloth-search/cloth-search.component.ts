import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cloth-search',
  templateUrl: './cloth-search.component.html',
  styleUrls: ['./cloth-search.component.scss']
})
export class ClothSearchComponent implements OnInit {
  form: FormGroup;
  clothesChangeStartDate: string;
  clothesChangeEndDate: string;
  count: number;
  leaveDataList: Array<any>;
  orgList: Array<any>;
  page = 0;
  size = 15;
  hasData = false;
  selectionMode = 'checkbox';
  en = {
    firstDayOfWeek: 0,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  };
  cols: any;
  checkItem: number;
  orgType: number;
  orgCode: string;
  orgName: string;
  login: Observable<any> = new Observable<any>();

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      clothesType: new FormControl('', Validators.nullValidator),
      clothesClassification: new FormControl('', Validators.nullValidator),
      clothesSex: new FormControl('', Validators.nullValidator)
    });
    this.cols = [
      { field: 'userName', header: '收费员名称' },
      { field: 'clothesType', header: '服装类型' },
      { field: 'clothesClassification', header: '服装类别' },
      { field: 'clothesDate', header: '领用日期' },
      { field: 'clothesChangeDate', header: '到期日期' },
      { field: 'clothesSex', header: '性别' },
      { field: 'clothesNum', header: '数量' },
      { field: 'stationName', header: '收费站' }
    ];
  }

  dateFormat(date) {
    if (date) {
      const _date = new Date(date);
      const _month = (_date.getMonth() + 1) <= 9 ? `0${(_date.getMonth() + 1)}` : _date.getMonth();
      const _day = _date.getDate() <= 9 ? `0${_date.getDate()}` : _date.getDate();
      return `${_date.getFullYear()}-${_month}-${_day}`;
    }else {
      return '';
    }
  }

  selectedOrg($event) {
    this.orgList = $event;
  }

  submit() {
    if (!this.orgList || this.orgList.length === 0) {
      alert('未选择机构');
    }else {
      this.getInfo(this.page, this.size);
    }
  }

  paginate(event) {
    this.getInfo(event.page, this.size);
  }

  getInfo(page: number, size: number) {
    this.form.value.clothesChangeStartDate = this.dateFormat(this.clothesChangeStartDate);
    this.form.value.clothesChangeEndDate = this.dateFormat(this.clothesChangeEndDate);
    this.form.value.orgList = this.orgList.map(el => el.data);
    const param = {
      page: page,
      size: size,
    };
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      if (this.form.value[el] || this.form.value[el] === 0) {
        param[el] = this.form.value[el];
      }
    });
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Clothes/get', JSON.stringify(param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                this.leaveDataList = res.data.leaveDataList;
                if (res.data.count > 0) {
                  this.hasData = true;
                }
              }else {
                alert(res.message);
              }
            });
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
        this.orgType = res.orgType;
        this.orgCode = res.orgCode;
        this.orgName = res.orgName;
        this.orgList = [{
          data: res.orgCode,
          orgType: this.orgType
        }];
      }
    });
  }

}
