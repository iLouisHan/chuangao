import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { work_post, politics, educational } from '../../../store/translate';

@Component({
  selector: 'app-team-schedule-search',
  templateUrl: './team-schedule-search.component.html',
  styleUrls: ['./team-schedule-search.component.scss']
})
export class TeamScheduleSearchComponent implements OnInit {
  form: FormGroup;
  startTime: string;
  endTime: string;
  count: number;
  staffList: Array<any>;
  orgList: Array<any>;
  page = 0;
  size = 15;
  hasData = false;
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

  constructor(
    private http: Http
  ) {
    this.form = new FormGroup({
      listGroup: new FormControl('', Validators.nullValidator),
      teamsGroup: new FormControl('', Validators.nullValidator),
      shiftId: new FormControl('', Validators.nullValidator),
      userId: new FormControl('', Validators.nullValidator)
    });
    this.cols = [
      { field: 'userName', header: '姓名' },
      { field: 'userSex', header: '性别' },
      { field: 'politicalStatus', header: '政治面貌' },
      { field: 'userTel', header: '手机号码' },
      { field: 'userMail', header: '邮箱' },
      { field: 'workPost', header: '岗位' },
      { field: 'educational', header: '学历' },
      { field: 'listGroup', header: '班组' },
      { field: 'orgName', header: '组织名称' }
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
      this.getInfo(this.page, this.size);
    }
  }

  paginate(event) {
    this.getInfo(event.page, this.size);
  }

  getInfo(page: number, size: number) {
    this.form.value.startTime = this.dateFormat(this.startTime);
    this.form.value.endTime = this.dateFormat(this.endTime);
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
    this.http.post('http://119.29.144.125:8080/cgfeesys/StaffMag/getStaff', JSON.stringify(param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.staffList = res.data.staffDataList;
                }
              }else {
                alert(res.message);
              }
            });
  }

  teamChange($event) {
    if (this.orgList.length > 0 && $event.target.length !== -1) {
      this.getStaffs($event.target.value, this.orgList[0].id);
    }
  }

  getStaffs(teams, orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/getUserByTeams?teams=${teams}&stationCode=${orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              console.log(res);
            });
  }

  check($event) {
    this.checkItem = $event.target.value;
  }

  test(val) {
    return val === +this.checkItem;
  }

  ngOnInit() {
  }

}
