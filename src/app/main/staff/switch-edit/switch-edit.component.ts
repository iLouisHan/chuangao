import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { applyType, shiftId, list_group } from '../../../store/translate';

@Component({
  selector: 'app-switch-edit',
  templateUrl: './switch-edit.component.html',
  styleUrls: ['./switch-edit.component.scss']
})
export class SwitchEditComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  applyType = applyType;
  list_group = list_group;
  shiftId = shiftId;
  adminId: string;
  en: any;
  file: any;
  isChosen = false;
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  page = 0;
  size = 15;
  count: number;
  selectedSwitch: string;
  applyStaffList: Array<any>;
  backStaffList: Array<any>;
  hasData: boolean;
  cols: Array<any>;
  isAdd: boolean;
  searchName: string;
  orgType: number;
  initForm: any;
  param: any = {
    page: this.page,
    size: this.size
  };
  applyTeams: string;
  applyUserId: string;
  applyUserName: string;
  backTeams: string;
  backUserName: string;
  backUserId: string;
  applyInfo: any;
  backInfo: any;
  applyChangeType = 1;
  userId: string;
  shiftChangeDataList: Array<any>;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      applyUserId: new FormControl('', Validators.nullValidator),
      backUserId: new FormControl('', Validators.nullValidator),
      remark: new FormControl('', Validators.nullValidator),
      applyTeams: new FormControl('', Validators.nullValidator),
      backTeams: new FormControl('', Validators.nullValidator)
    });
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
    this.initForm = {
      applyUserId: '-1',
      applyTeams: '-1',
      backUserId: '-1',
      backTeams: '-1'
    };
  }

  getSwitchInfo(leaveId) {
    this.data = this.shiftChangeDataList.filter(el => el.id === leaveId)[0];
    this.isChosen = true;
    this.applyTeams = this.data.applyTeams;
    this.applyUserName = this.data.applyUserName;
    this.backUserName = this.data.backUserName;
    this.backTeams = this.data.backTeams;
    this.applyUserId = this.data.applyUserId;
    this.backUserId = this.data.backUserId;
    this.form.patchValue(this.data);
    this.form.patchValue({applyUserId: this.data.userId});
    this.applyInfo = {
      scheduleDate: this.data.applyDate,
      shiftId: this.data.applyShift
    };
    this.backInfo = {
      scheduleDate: this.data.backDate,
      shiftId: this.data.backShift
    };
    this.getStaff(this.applyTeams, 1);
    this.getStaff(this.backTeams, 2);
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
                  this.shiftChangeDataList = res.data.shiftChangeDataList;
                  this.shiftChangeDataList.forEach(el => {
                    el.applyTeams = this.list_group[el.applyTeams];
                    el.backTeams = this.list_group[el.backTeams];
                    el.applyShift = this.shiftId[el.applyShift];
                    el.backShift = this.shiftId[el.backShift];
                  });
                }
              }else {
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
    }else {
      return '';
    }
  }

  add() {
    this.form.patchValue(this.initForm);
    this.isChosen = true;
    this.isAdd = true;
  }

  backUserChoose(id) {
    this.backUserId = id;
    this.form.value.backUserId = id;
  }

  applyUserChoose(id) {
    this.applyUserId = id;
    this.form.value.applyUserId = id;
  }

  search() {
    // if (this.searchName && this.searchName.trim()) {
    //   this.param.userName = this.searchName;
    //   this.toFirstPage();
    // }else {
    //   alert('请输入要查询的人员姓名！');
    // }
  }

  update() {
    if (this.selectedSwitch) {
      this.getSwitchInfo(this.selectedSwitch);
      this.isChosen = true;
      this.isAdd = false;
    }else {
      alert('请选择一个请假信息！');
    }
  }

  delete() {
    if (this.selectedSwitch) {
      this.deleteLeave(this.selectedSwitch);
    }else {
      alert('请选择一个人员');
    }
  }

  select(val) {
    this.selectedSwitch = val === this.selectedSwitch ? '' : val;
  }

  check(val) {
    // return val === this.selectedLeave;
  }

  deleteLeave(selectedSwitch) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/delete?id=${selectedSwitch}`)
            .map(res => res.json())
            .subscribe(res => {
              alert(res.message);
              if (res.code) {
                this.hasData = false;
                this.toFirstPage();
              }
            });
  }

  addSwitch() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.stationCode = this.orgCode;
    this.form.value.applyDate = this.applyInfo.scheduleDate;
    this.form.value.applyShift = this.applyInfo.shiftId;
    this.form.value.applyTeams = +this.form.value.applyTeams;
    this.form.value.applyChangeType = this.applyChangeType;
    this.form.value.backShift = this.backInfo.shiftId;
    this.form.value.backDate = this.backInfo.scheduleDate;
    this.form.value.backTeams = +this.form.value.backTeams;
    this.form.value.checkUserId = this.userId;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/ShiftChange/set`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                alert(res.message);
                this.isChosen = false;
                this.toFirstPage();
              }else {
                alert(res.message);
              }
            });
  }

  updateLeave() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.applyDate = this.applyInfo.scheduleDate;
    this.form.value.applyShift = this.applyInfo.shiftId;
    this.form.value.applyTeams = +this.form.value.applyTeams;
    this.form.value.applyChangeType = this.applyChangeType;
    this.form.value.backShift = this.backInfo.shiftId;
    this.form.value.backDate = this.backInfo.scheduleDate;
    this.form.value.backTeams = +this.form.value.backTeams;
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.http.post(`http://119.29.144.125:8080/cgfeesys/ShiftChange/update`, JSON.stringify(this.data), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                alert(res.message);
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
      this.addSwitch();
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

  getStaff(teams, val) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/getUserByTeams?stationCode=${this.orgCode}&teams=${teams}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (val === 1) {
                  this.applyStaffList = res.data;
                }else if (val === 2) {
                  this.backStaffList = res.data;
                }
              }else {
                alert(res.message);
              }
            });
  }

  chooseApplySchedule($event) {
    this.applyInfo = $event;
  }

  chooseBackSchedule($event) {
    this.backInfo = $event;
  }

  changeCheckStatus(id, type) {
    // const myHeaders: Headers = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // this.http.post(`http://119.29.144.125:8080/cgfeesys/Leave/checkLeave`, JSON.stringify({
    //   id: id,
    //   checkUserId: this.adminId,
    //   checkType: type
    // }), {
    //   headers: myHeaders
    // }).map(res => res.json())
    // .subscribe(res => {
    //   if (res.code) {
    //     alert(res.message);
    //     this.toFirstPage();
    //   }else {
    //     alert(res.message);
    //   }
    // });
  }

  applyTeamsChange($event) {
    this.applyTeams = $event.target.value;
    if (this.applyTeams !== '-1') {
      this.getStaff(this.applyTeams, 1);
    }
  }

  backTeamsChange($event) {
    this.backTeams = $event.target.value;
    if (this.backTeams !== '-1') {
      this.getStaff(this.backTeams, 2);
    }
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.orgCode = res.orgCode;
        this.userId = res.userId;
        this.param.orgList = [res.orgCode];
        this.getInfo();
      }
    });
  }

}
