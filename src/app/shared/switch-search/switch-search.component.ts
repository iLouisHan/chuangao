import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { work_post, politics, educational } from '../../store/translate';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-switch-search',
  templateUrl: './switch-search.component.html',
  styleUrls: ['./switch-search.component.scss']
})
export class SwitchSearchComponent implements OnInit {
  form: FormGroup;
  startDate: string;
  endDate: string;
  count: number;
  shiftChangeDataList: Array<any>;
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
  checkItem = -1;
  param: any = {
    page: this.page,
    size: this.size
  };
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
      listGroup: new FormControl('', Validators.nullValidator),
      userName: new FormControl('', Validators.nullValidator)
    });
    this.cols = [
      { field: 'orgName', header: '组织名称' },
      { field: 'applyUserName', header: '换/顶班申请人' },
      { field: 'applyTeams', header: '换/顶班班组' },
      { field: 'applyDate', header: '换/顶班日期' },
      { field: 'applyShift', header: '换/顶班班次' },
      { field: 'applyChangeType', header: '排班类型' },
      { field: 'backUserName', header: '替班收费员' },
      { field: 'backTeams', header: '替班班组' },
      { field: 'backDate', header: '替班日期' },
      { field: 'backShift', header: '替班班次' },
      { field: 'remark', header: '备注' }
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
    }else if (this.orgList.filter(el => el.orgType !== 3).length > 0) {
      alert('请选择收费站');
    }else {
      this.paginate({page: 0});
    }
  }

  paginate(event) {
    this.param.page = event.page;
    this.getInfo();
  }

  getInfo() {
    this.form.value.startDate = this.dateFormat(this.startDate);
    this.form.value.endDate = this.dateFormat(this.endDate);
    this.form.value.orgList = this.orgList.map(el => el.data);
    this.param.applyChangeType = this.checkItem;
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      if (this.form.value[el] || this.form.value[el] === 0) {
        this.param[el] = this.form.value[el];
      }
    });
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/ShiftChange/get', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.shiftChangeDataList = res.data.shiftChangeDataList;
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
          data: res.orgCode
        }];
      }
    })
  }

}
