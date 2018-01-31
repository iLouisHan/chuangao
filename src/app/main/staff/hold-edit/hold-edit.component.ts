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
  adminId: string;
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
  leaveList: Array<any>;
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
    size: this.size
  };

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      applyUserId: new FormControl('', Validators.nullValidator),
      applyType: new FormControl('', Validators.nullValidator),
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
      { field: 'userName', header: '顶班申请人' },
      { field: 'applyTypeCN', header: '顶板班组' },
      { field: 'applyDate', header: '顶板日期' },
      { field: 'applyDateEnd', header: '顶板班次' },
      { field: 'remark', header: '创建人' },
      { field: 'remark', header: '创建时间' },
      { field: 'remark', header: '修改人' },
      { field: 'remark', header: '修改时间' }
    ];
    this.initForm = {
      userId: '',
      leaveType: '-1'
    };
  }

  getLeaveInfo(leaveId) {
    this.data = this.leaveList.filter(el => el.id === leaveId)[0];
    this.isChosen = true;
    this.form.patchValue(this.data);
    this.form.patchValue({applyUserId: this.data.userId});
    this.applyDate = this.data.applyDate;
    this.applyDateEnd = this.data.applyDateEnd;
    this.filename = this.data.picName;
  }

  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Leave/getLeave', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.leaveList = res.data.leaveDataList.map(el => {
                    el.applyTypeCN = this.applyType[el.applyType];
                    return el;
                  });
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

  addStaffLeave() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.applyDate = this.dateFormat(this.applyDate);
    this.form.value.applyDateEnd = this.dateFormat(this.applyDateEnd);
    this.form.value.stationCode = this.orgCode;
    this.form.value.adminId = this.adminId;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Leave/staffLeaveByAdmin`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.upload(res.data.id);
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
                if (this.file) {
                  this.upload(this.data.id);
                }else {
                  this.toFirstPage();
                }
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
      this.addStaffLeave();
    }else {
      this.updateLeave();
    }
  }

  upload(id) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('id', id);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/leaveInfo`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
        }else {
          alert(res.message);
        }
        this.isChosen = false;
        this.toFirstPage();
      });
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
      checkUserId: this.adminId,
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
        this.adminId = res.userId;
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

