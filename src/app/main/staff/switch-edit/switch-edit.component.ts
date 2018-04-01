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
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  page = 0;
  size = 15;
  count: number;
  selectedSwitchId: string;
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
  applyDate: string;
  applyDateEnd: string;
  applyTeams: string;
  applyUserId: string;
  applyUserName: string;
  backTeams: string;
  backUserName: string;
  backUserId: string;
  applyInfo: any;
  backInfo: any;
  applyChangeType = 1;
  notUpdate = true;
  userId: string;
  shiftChangeDataList: Array<any>;
  returnDate: string;
  _returnDate: string;
  _returnShift: string;
  backDate: string;
  selectedSwitch: any = {};
  view = 0;
  checkItem = 1;
  _select: any;
  applyChangeTypeCN = {
    1: '调班',
    2: '顶班'
  };

  loadingStaffs = false;
  loadingBackStaff = false;

  requiredItems: any;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      remark: new FormControl('', Validators.nullValidator),
      applyTeams: new FormControl('', Validators.nullValidator),
      backTeams: new FormControl('', Validators.nullValidator),
      backShift: new FormControl('', Validators.nullValidator),
      returnShift: new FormControl('', Validators.nullValidator)
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
      { field: 'applyTeamsCN', header: '换/顶班班组' },
      { field: 'applyDate', header: '换/顶班日期' },
      { field: 'applyShiftCN', header: '换/顶班班次' },
      { field: 'applyChangeTypeCN', header: '排班类型' },
      { field: 'backUserName', header: '替班收费员' },
      { field: 'backTeamsCN', header: '替班班组' },
      { field: 'backDate', header: '替班日期' },
      { field: 'backShiftCN', header: '替班班次' },
      { field: 'returnDate', header: '还班日期' },
      { field: 'returnShiftCN', header: '还班班次' },
      { field: 'remark', header: '备注' }
    ];
    this.initForm = {
      applyTeams: 0,
      backTeams: 0,
      returnShift: 0,
      backShift: 0,
      remark: ''
    };
  }

  getSwitchInfo(leaveId) {
    this.data = this.shiftChangeDataList.filter(el => el.id === leaveId)[0];
    this.view = 1;
    this.applyTeams = this.data.applyTeams;
    this.applyUserName = this.data.applyUserName;
    this.backUserName = this.data.backUserName;
    this.backTeams = this.data.backTeams;
    this.applyUserId = this.data.applyUserId;
    this.backUserId = this.data.backUserId;
    this.backDate = this.data.backDate;
    this.returnDate = this.data.returnDate;
    this.form.patchValue(this.data);
    this.form.patchValue({applyUserId: this.data.userId});
    this.applyInfo = {
      scheduleDate: this.data.applyDate,
      shiftId: this.data.applyShift
    };
    this.getStaff(this.applyTeams, 1);
    this.notUpdate = false;
    if (this.backTeams) {
      this.getStaff(this.backTeams, 2);
      this.checkItem = 1;
    }else {
      this.checkItem = 2;
    }
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
                    el.applyTeamsCN = this.list_group[el.applyTeams];
                    el.backTeamsCN = this.list_group[el.backTeams];
                    el.applyShiftCN = this.shiftId[el.applyShift];
                    el.backShiftCN = this.shiftId[el.backShift];
                    el.returnShiftCN = this.shiftId[el.returnShift];
                    el.applyChangeTypeCN = this.applyChangeTypeCN[el.applyChangeType];
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

  returnSubmit() {
    this._select.returnDate = this.dateFormat(this._returnDate);
    this._select.returnShift = +this._returnShift;
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/ShiftChange/update`, JSON.stringify(this._select), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                alert(res.message);
                this.toFirstPage();
                this._select = '';
              }else {
                alert(res.message);
              }
            });
  }

  add() {
    this.form.patchValue(this.initForm);
    this.view = 1;
    this.isAdd = true;
    this.notUpdate = true;
  }

  backUserChoose(id) {
    this.backUserId = id;
    this.form.value.backUserId = id;
  }

  applyUserChoose(id) {
    this.applyUserId = id;
    this.form.value.applyUserId = id;
  }

  test(val) {
    return val === +this.checkItem;
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
    if (this.selectedSwitchId && !this.selectedSwitch.overDeadline) {
      this.getSwitchInfo(this.selectedSwitchId);
      this.view = 1;
      this.isAdd = false;
    }else if (!this.selectedSwitchId) {
      alert('请选择一个换班信息！');
    }else if (this.selectedSwitch.overDeadline) {
      alert('该信息已超过15天可修改期限！');
    }
  }

  delete() {
    if (this.selectedSwitchId) {
      this.deleteLeave(this.selectedSwitchId);
    }else {
      alert('请选择一个人员');
    }
  }

  return() {
    if (this.selectedSwitchId) {
      this._select = this.shiftChangeDataList.filter(el => el.id === this.selectedSwitchId)[0];
      if (this._select.backDate) {
        alert('该记录为替班！');
      }else if (this._select.returnStatus) {
        alert('该记录已有还班记录！');
      }else {
        this.view = 2;
      }
    }
  }

  select(item) {
    if (item.id === this.selectedSwitchId) {
      this.selectedSwitchId = '';
      this.selectedSwitch = {};
    }else {
      this.selectedSwitchId = item.id;
      this.selectedSwitch = item;
    }
  }

  check(val) {
    return val === this.selectedSwitchId;
  }

  checkType($event) {
    this.checkItem = +$event.target.value;
  }

  deleteLeave(selectedSwitchId) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/delete?id=${selectedSwitchId}`)
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
    this.form.value.stationCode = this.orgCode;
    if (this.applyInfo) {
      this.form.value.applyDate = this.applyInfo.scheduleDate;
      this.form.value.applyShift = this.applyInfo.shiftId;
    }
    if (this.applyUserId) {
      this.form.value.applyUserId = this.applyUserId;
    }
    if (this.form.value.applyTeams) {
      this.form.value.applyTeams = +this.form.value.applyTeams;
    }
    this.form.value.applyChangeType = this.applyChangeType;
    if (this.checkItem === 1) {
      if (this.backInfo) {
        this.form.value.backDate = this.backInfo.scheduleDate;
        this.form.value.backShift = this.backInfo.shiftId;
      }
      if (this.backUserId) {
        this.form.value.backUserId = this.backUserId;
      }
      if (this.form.value.backTeams) {
        this.form.value.backTeams = +this.form.value.backTeams;
      }
      this.requiredItems = {
        backTeams: '替班人所在班组',
        backUserId: '替班人姓名',
        backDate: '替班信息',
        applyTeams: '换班人所在班组',
        applyUserId: '换班申请人',
        applyDate: '换班信息'
      };
      const keys = Object.keys(this.requiredItems);
      const param: any = {};
      const spaceArr = keys.filter(el => !this.form.value[el]).map(el => this.requiredItems[el]);
      if (spaceArr.length > 0) {
        alert(`${spaceArr.join(',')}为空`);
      }else {
        param.backTeams = this.form.value.backTeams;
        param.backUserId = this.form.value.backUserId;
        param.backDate = this.form.value.backDate;
        param.applyTeams = this.form.value.applyTeams;
        param.applyUserId = this.form.value.applyUserId;
        param.applyDate = this.form.value.applyDate;
        param.applyShift = this.form.value.applyShift;
        param.backShift = this.form.value.backShift;
        param.stationCode = this.orgCode;
        param.applyChangeType = this.applyChangeType;
        param.remark = this.form.value.remark;
        param.checkUserId = this.userId;
        this.postHttp(param);
      }
    }else {
      this.form.value.returnShift = +this.form.value.returnShift;
      this.form.value.returnDate = this.dateFormat(this.returnDate);
      this.requiredItems = {
        applyTeams: '换班人所在班组',
        applyUserId: '换班申请人',
        applyDate: '换班信息'
      };
      const keys = Object.keys(this.requiredItems);
      const param: any = {};
      const spaceArr = keys.filter(el => !this.form.value[el]).map(el => this.requiredItems[el]);
      if (spaceArr.length > 0) {
        alert(`${spaceArr.join(',')}为空`);
      }else {
        param.applyTeams = this.form.value.applyTeams;
        param.applyUserId = this.form.value.applyUserId;
        param.applyDate = this.form.value.applyDate;
        param.applyShift = this.form.value.applyShift;
        param.stationCode = this.orgCode;
        param.applyChangeType = this.applyChangeType;
        param.remark = this.form.value.remark;
        param.checkUserId = this.userId;
        this.postHttp(param);
      }
    }
  }

  postHttp(param) {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/ShiftChange/set`, JSON.stringify(param), {
      headers: myHeaders
    })
    .map(res => res.json())
    .subscribe(res => {
      if (res.code) {
        alert(res.message);
        this.view = 0;
        this.toFirstPage();
      }else {
        alert(res.message);
      }
      this.applyInfo = undefined;
      this.backInfo = undefined;
    });
  }

  updateLeave() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.applyDate = this.applyInfo.scheduleDate;
    this.form.value.applyShift = this.applyInfo.shiftId;
    this.form.value.applyTeams = +this.form.value.applyTeams;
    this.form.value.applyChangeType = this.applyChangeType;
    this.form.value.backTeams = +this.form.value.backTeams;
    this.form.value.checkUserId = this.userId;
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
      // this.applyInfo = {};
      // this.returnDate = '';
      // this.backDate = '';
    }else {
      this.updateLeave();
    }
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    if (element) {
      this.view = 0;
      element.click();
    }else {
      this.getInfo();
    }
  }

  getStaff(teams, val) {
    if (1 === val) {
      this.loadingStaffs = true;
    }else if (2 === val) {
      this.loadingBackStaff = true;
    }
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/getUserByTeams?stationCode=${this.orgCode}&teams=${teams}`)
    .map(res => res.json())
    .subscribe(res => {
      this.loadingBackStaff = false;
      this.loadingStaffs = false;
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
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/check?id=${id}&checkResult=${type}&userId=${this.userId}`).map(res => res.json())
    .subscribe(res => {
      if (res.code) {
        alert(res.message);
        this.toFirstPage();
      }else {
        alert(res.message);
      }
    });
  }

  changeReturnStatus(id, type) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/ShiftChange/returnCheck?id=${id}&checkResult=${type}&userId=${this.userId}`)
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

  applyTeamsChange($event) {
    this.applyTeams = $event.target.value;
    this.applyUserName = '';
    if (this.applyTeams !== '-1') {
      this.getStaff(this.applyTeams, 1);
    }else {
      this.applyStaffList = [];
    }
  }

  backTeamsChange($event) {
    this.backTeams = $event.target.value;
    this.backUserName = '';
    if (this.backTeams !== '-1') {
      this.getStaff(this.backTeams, 2);
    }else {
      this.backStaffList = [];
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
