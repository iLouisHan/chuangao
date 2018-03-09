import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Actions from '../../../store/cacheStore.actions';

@Component({
  selector: 'app-green-search',
  templateUrl: './green-search.component.html',
  styleUrls: ['./green-search.component.scss']
})
export class GreenSearchComponent implements OnInit {
  en: any;
  cols: any;
  orgName: string;
  orgCode: string;
  login: Observable<any> = new Observable<any>();
  form: FormGroup;
  dateTime: string;
  param: any = {
    page: 0,
    size: 15
  };
  carCheckHisDataList: any;
  hasData: boolean;

  boxType = ['开放货车', '封闭货车', '帆布货车', '其他货车'];
  carType = ['两轴货车', '三轴货车', '四轴货车', '五轴货车', '六轴货车'];
  shift = ['早班', '晚班'];
  firstCheck = ['未检', '合格', '不合格'];
  dealResult = ['免费放行', '缴费放行'];

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
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
      { field: 'carNo', header: '车牌号' },
      { field: 'boxTypeCN', header: '车型' },
      { field: 'carTypeCN', header: '轴型' },
      { field: 'goods', header: '货物' },
      { field: 'entryName', header: '入口路段' },
      { field: 'entryStation', header: '入口站' },
      { field: 'exportName', header: '出口路段' },
      { field: 'exportStation', header: '出口站' },
      { field: 'shiftCN', header: '班次' },
      { field: 'firstCheckCN', header: '初检结果' },
      { field: 'dealResultCN', header: '放行方式' },
      { field: 'money', header: '免/缴金额(元)' },
      { field: 'shiftCar', header: '出口车道' }
    ];
    this.form = new FormGroup({
      shift: new FormControl('-1', Validators.nullValidator),
      firstCheck: new FormControl('-1', Validators.nullValidator),
      carNo: new FormControl('', Validators.nullValidator),
      carType: new FormControl('-1', Validators.nullValidator)
    });
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

  getInfo() {
    if (this.form.value.shift !== '-1') {
      this.param.shift = +this.form.value.shift;
    }
    if (this.form.value.firstCheck !== '-1') {
      this.param.firstCheck = +this.form.value.firstCheck;
    }
    if (this.form.value.carType !== '-1') {
      this.param.carType = +this.form.value.carType;
    }
    if (this.form.value.carNo !== '') {
      this.param.carNo = +this.form.value.carNo;
    }
    if (this.dateTime) {
      this.param.dateTime = this.dateFormat(this.dateTime);
    }
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Green/getCarCheckHis`, JSON.stringify(this.param), {
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .map(res => res.json())
    .subscribe(res => {
      if (res.code) {
        this.carCheckHisDataList = res.data.carCheckHisDataList;
        this.carCheckHisDataList.forEach(el => {
          el.boxTypeCN = this.boxType[el.boxType];
          el.carTypeCN = this.carType[el.carType - 1];
          el.shiftCN = this.shift[el.shift - 1];
          el.firstCheckCN = this.firstCheck[el.firstCheck];
          el.dealResultCN = this.dealResult[el.dealResult - 1];
        });
        if (res.data.count) {
          this.hasData = true;
        }else {
          this.hasData = false;
        }
      }
    });
  }

  paginate($event) {
    this.param.page = $event.page;
    this.getInfo();
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgName = res.orgName;
        this.orgCode = res.orgCode;
        this.param.stationCode = res.orgCode;
        this.getInfo();
      }
    });
  }

}
