import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { list_group } from '../../../store/translate';

@Component({
  selector: 'app-team-schedule-mod',
  templateUrl: './team-schedule-mod.component.html',
  styleUrls: ['./team-schedule-mod.component.scss']
})
export class TeamScheduleModComponent implements OnInit {
  form: FormGroup;
  startTime: string;
  endTime: string;
  count: number;
  modList: Array<any>;
  login: Observable<any> = new Observable<any>();
  selectionMode = 'single';
  orgCode: string;
  modDetail: Array<any>;
  list_group = list_group;
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
  addMod = false;
  col: Array<any>;
  shiftList = {
    1: '早班',
    2: '夜班',
    3: '中班'
  };

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      scheduleTypeDesc	: new FormControl('', Validators.nullValidator),
      scheduleDays: new FormControl('', Validators.nullValidator)
    });
    this.login = this.store.select('login');
    this.cols = [
      { field: 'cycleDay', header: '排班第几天' },
      { field: 'shiftId', header: '班次' }
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

  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Schedule/getScheduleMould?stationCode=${this.orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.modList = res.data;
              }else {
                alert(res.message);
              }
            });
  }

  modChange() {
    const days = this.form.value.scheduleDays;
    this.modDetail = [];
    for (let i = 1; i <= 2 * days; i++) {
      const shiftId = i % 2 === 1 ? 1 : 2;
      this.modDetail.push({
        shiftId: shiftId,
        cycleDay: Math.ceil(i / 2),
        teamsGroup: -1
      });
    }
  }

  submit() {
    if (this.form.value.scheduleDays && this.form.value.scheduleDays > 0) {
      this.modDetail.forEach(el => {
        el.teamsGroup = +el.teamsGroup;
      });
      const valid = this.modDetail.filter(el => el.teamsGroup === -1).length === 0;
      if (valid) {
        const myHeaders: Headers = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        this.http.post(`http://119.29.144.125:8080/cgfeesys/Schedule/setScheduleMould`, JSON.stringify({
            stationCode: this.orgCode,
            scheduleTypeDesc: this.form.value.scheduleTypeDesc,
            scheduleDays: this.form.value.scheduleDays,
            mouldLists: this.modDetail
          }), {
            headers: myHeaders
          })
          .map(res => res.json())
          .subscribe(res => {
            if (res.code) {
              alert(res.message);
              this.getInfo();
              this.addMod = false;
              this.modDetail = [];
            }
          });
      }else {
        alert('请在所有班次选择班组！');
      }
    }else {
      alert('请填写正确周期');
    }
  }

  test(val) {
    return val === this.checkItem;
  }

  searchModDetail(id) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Schedule/getScheduleMouldList?scheduleType=${id}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.modDetail = res.data;
              }else {
                alert(res.message);
              }
            });
  }

  add() {
    this.addMod = true;
    this.modDetail = [];
  }

  deleteMod() {
    if (this.checkItem) {
      this.http.get(`http://119.29.144.125:8080/cgfeesys/Schedule/deleteScheduleMould?scheduleType=${this.checkItem}`)
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  this.getInfo();
                }else {
                  alert(res.message);
                }
              });
    }else {
      alert('请选择一个模板！');
    }
  }

  chooseMod(id) {
    this.checkItem = this.checkItem === id ? '' : id;
    console.log(this.checkItem);
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgCode = res.orgCode;
        this.getInfo();
      }
    });
  }

}
