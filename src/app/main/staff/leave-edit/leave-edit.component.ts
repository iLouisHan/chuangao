import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { applyType } from '../../../store/translate';

@Component({
  selector: 'app-leave-edit',
  templateUrl: './leave-edit.component.html',
  styleUrls: ['./leave-edit.component.scss']
})
export class LeaveEditComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  staffId: string;
  applyType = applyType;
  hireDate: string;
  birthday: string;
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
  staffList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  selectedUser = '';
  isAdd: boolean;
  keys: Array<any>;
  searchName: string;
  orgName: string;
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
      orgName: new FormControl('', Validators.nullValidator),
      userName: new FormControl('', Validators.nullValidator),
      userSex: new FormControl('', Validators.nullValidator),
      educational: new FormControl('', Validators.nullValidator),
      practitionerCertificate: new FormControl('', Validators.nullValidator),
      userTel: new FormControl('', Validators.nullValidator),
      workPost: new FormControl('', Validators.nullValidator),
      politicalStatus: new FormControl('', Validators.nullValidator),
      positionalTitle: new FormControl('', Validators.nullValidator),
      emergencyContact: new FormControl('', Validators.nullValidator),
      emergencyPhone: new FormControl('', Validators.nullValidator),
      userMail: new FormControl('', Validators.nullValidator),
      jobDetail: new FormControl('', Validators.nullValidator),
      listGroup: new FormControl('', Validators.nullValidator),
      awardDetail: new FormControl('', Validators.nullValidator),
      specialSkill: new FormControl('', Validators.nullValidator)
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
      { field: 'orgName', header: '组织机构' },
      { field: 'userName', header: '请假人' },
      { field: 'applyType', header: '请假类型' },
      { field: 'applyDate', header: '开始请假时间' },
      { field: 'applyDateEnd', header: '结束请假时间' },
      { field: 'remark', header: '请假理由' },
      { field: 'leaveTipDownload', header: '请假条下载' }
    ];
    this.initForm = {
      orgName: '',
      userName: '',
      userSex: '',
      educational: '',
      practitionerCertificate: '',
      userTel: '',
      workPost: '',
      politicalStatus: '',
      positionalTitle: '',
      emergencyContact: '',
      emergencyPhone: '',
      userMail: '',
      jobDetail: '',
      listGroup: '',
      awardDetail: '',
      specialSkill: '',
      hireDate: '',
      birthday: '',
      changeTime: ''
    };
  }

  getStaffInfo(staffId) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/User/getUserDetail?userId=${staffId}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
                this.form.patchValue(res.data);
                this.hireDate = res.data.hireDate;
                this.birthday = res.data.birthday;
                this.changeTime = res.data.changeTime;
              }else {
                alert(res.message);
              }
            });
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
                  this.staffList = res.data.staffDataList.map(el => {
                    el.applyType = this.applyType[el.applyType];
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
    this.form.patchValue({orgName: this.orgName});
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
    if (this.selectedUser) {
      this.getStaffInfo(this.selectedUser);
      this.isChosen = true;
      this.isAdd = false;
    }else {
      alert('请选择一个人员');
    }
  }

  delete() {
    if (this.selectedUser) {
      this.staffLeave(this.selectedUser);
    }else {
      alert('请选择一个人员');
    }
  }

  select(val) {
    this.selectedUser = val === this.selectedUser ? '' : val;
  }

  check(val) {
    return val === this.selectedUser;
  }

  staffLeave(selectedUser) {
    const leaveDate = this.dateFormat(new Date());
    this.http.get(`http://119.29.144.125:8080/cgfeesys/StaffMag/staffLeave?userId=${selectedUser}&leaveDate=${leaveDate}`)
            .map(res => res.json())
            .subscribe(res => {
              alert(res.message);
            });
  }

  addStaff() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.hireDate = this.dateFormat(this.hireDate);
    this.form.value.birthday = this.dateFormat(this.birthday);
    this.form.value.changeTime = this.dateFormat(this.changeTime);
    this.form.value.workPost = +this.form.value.workPost;
    this.form.value.educational = +this.form.value.educational;
    this.form.value.listGroup = +this.form.value.listGroup;
    this.form.value.orgType = +this.orgType;
    this.form.value.orgCode = +this.orgCode;
    this.form.value.politicalStatus = +this.form.value.politicalStatus;
    this.form.value.positionalTitle = +this.form.value.positionalTitle;
    this.form.value.userId = '' + Math.round(1000 * Math.random());
    this.http.post(`http://119.29.144.125:8080/cgfeesys/StaffMag/addStaff`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.upload(res.data.userId);
              }else {
                alert(res.message);
              }
            });
  }

  updateStaff() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.data.hireDate = this.dateFormat(this.hireDate);
    this.data.birthday = this.dateFormat(this.birthday);
    this.data.changeTime = this.dateFormat(this.changeTime);
    this.data.politics = this.data.politics ? this.data.politics : 0;
    this.data.positionalTitle = this.data.positionalTitle ? this.data.positionalTitle : 0;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/User/setUserDetail`, JSON.stringify(this.data), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (this.file) {
                  this.upload(this.data.userId);
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
      this.addStaff();
    }else {
      this.updateStaff();
    }
  }

  upload(userId) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('userId', userId);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/userInfo`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
        }else {
          alert(res.message);
        }
        this.toFirstPage();
      });
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    this.isChosen = false;
    element.click();
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.orgCode = res.orgCode;
        this.orgName = res.orgName;
        this.orgType = res.orgType;
        this.param.orgList = [res.orgCode];
        this.form.value.orgName = res.orgName;
        this.getInfo();
      }
    });
  }

}
