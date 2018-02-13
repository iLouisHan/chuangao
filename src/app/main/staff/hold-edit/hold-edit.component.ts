import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { applyType } from '../../../store/translate';

@Component({
  selector: 'app-hold-edit',
  templateUrl: './hold-edit.component.html',
  styleUrls: ['./hold-edit.component.scss']
})
export class HoldEditComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  staffId: string;
  applyType = applyType;
  applyDate: string;
  applyDateEnd: string;
  checkUserId: string;
  en: any;
  changeTime: string;
  file: any;
  filename: string;
  isChosen = false;
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  page = 0;
  size = 15;
  count: number;
  holdList: Array<any>;
  staffList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  selectedLeave = '';
  isAdd: boolean;
  keys: Array<any>;
  searchName: string;
  orgType: number;
  initForm: any;
  param: any = {
    page: this.page,
    size: this.size,
    applyChangeType: 2
  };

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      applyUserId: new FormControl('', Validators.nullValidator),
      applyTeams: new FormControl('', Validators.nullValidator),
      shiftId: new FormControl('', Validators.nullValidator),
      remark: new FormControl('', Validators.nullValidator)
    });
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
      { field: 'orgName', header: '组织名称' },
      { field: 'applyUserName', header: '顶班申请人' },
      { field: 'applyTeams', header: '顶板班组' },
      { field: 'applyDate', header: '顶板日期' }
    ];
    this.initForm = {
      applyUserId: '',
      applyTeams: '-1',
      shiftId: '',
      remark: ''
    };
  }

  getLeaveInfo(leaveId) {
    this.data = this.holdList.filter(el => el.id === leaveId)[0];
    this.isChosen = true;
    this.form.patchValue(this.data);
    this.form.patchValue({applyUserId: this.data.userId});
    this.applyDate = this.data.applyDate;
    this.filename = this.data.picName;
  }

  getInfo() {
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
                  this.holdList = res.data.shiftChangeDataList;
                }
              }else {
                alert(res.message);
              }
            });
  }

  fileChange($event) {
    this.filename = $event.target.files[0].name;
    this.file = $event.target.files[0];
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

  add() {
    this.form.reset();
    this.form.patchValue(this.initForm);
    this.filename = '';
    this.isChosen = true;
    this.isAdd = true;
  }

  search() {
    if (this.searchName && this.searchName.trim()) {
      this.param.userName = this.searchName;
      this.toFirstPage();
    }else {
      alert('请输入要查询的人员姓名！');
    }
  }

  update() {
    if (this.selectedLeave) {
      this.getLeaveInfo(this.selectedLeave);
      this.isChosen = true;
      this.isAdd = false;
    }else {
      alert('请选择一个请假信息！');
    }
  }

  delete() {
    if (this.selectedLeave) {
      this.deleteLeave(this.selectedLeave);
    }else {
      alert('请选择一个人员');
    }
  }

  select(val) {
    this.selectedLeave = val === this.selectedLeave ? '' : val;
  }

  check(val) {
    return val === this.selectedLeave;
  }

  deleteLeave(selectedLeave) {
    const leaveDate = this.dateFormat(new Date());
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Leave/deleteLeave?id=${selectedLeave}`)
            .map(res => res.json())
            .subscribe(res => {
              alert(res.message);
              if (res.code) {
                this.hasData = false;
                this.toFirstPage();
              }
            });
  }

  addHold() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.applyDate = this.dateFormat(this.applyDate);
    this.form.value.stationCode = this.orgCode;
    this.form.value.checkUserId = this.checkUserId;
    this.form.value.applyChangeType = 2;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/ShiftChange/set`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.toFirstPage();
              }else {
                alert(res.message);
              }
            });
  }

  updateLeave() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.data.applyDate = this.dateFormat(this.applyDate);
    this.data.applyDateEnd = this.dateFormat(this.applyDateEnd);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Leave/updateLeave`, JSON.stringify(this.data), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.toFirstPage();
              }else {
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
      this.addHold();
    }else {
      this.updateLeave();
    }
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    if (element) {
      this.isChosen = false;
      element.click();
    }else {
      this.getInfo();
    }
  }

  getStaff() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationUserId?stationCode=${this.orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.staffList = res.data;
              }else {
                alert(res.message);
              }
            });
  }

  changeCheckStatus(id, type) {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Leave/checkLeave`, JSON.stringify({
      id: id,
      checkUserId: this.checkUserId,
      checkType: type
    }), {
      headers: myHeaders
    }).map(res => res.json())
    .subscribe(res => {
      if (res.code) {
        alert(res.message);
        this.toFirstPage();
      }else {
        alert(res.message);
      }
    });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.checkUserId = res.userId;
        this.orgCode = res.orgCode;
        this.orgType = res.orgType;
        this.param.orgList = [res.orgCode];
        this.form.value.orgName = res.orgName;
        this.getInfo();
        this.getStaff();
      }
    });
  }

}

