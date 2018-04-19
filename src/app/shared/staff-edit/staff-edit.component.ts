import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { work_post, politics, educational } from '../../store/translate';
import { ConfirmComponent } from '../../shared/confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  staffId: string;
  hireDate: string;
  birthday: string;
  en: any;
  changeTime: string;
  file: any;
  filename: string;
  isChosen = false;
  uploading = false;
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  page = 0;
  size = 15;
  count: number;
  staffList: Array<any>;
  hasData: boolean;
  work_post = work_post;
  politics = politics;
  educational = educational;
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
    private store: Store<any>,
    private dialogService: DialogService
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
      { field: 'orgName', header: '组织名称' },
      { field: 'userId', header: '人员编码' },
      { field: 'userName', header: '姓名' },
      { field: 'userSex', header: '性别' },
      { field: 'userTel', header: '手机号码' },
      { field: 'userMail', header: '邮箱' },
      { field: 'politicalStatus', header: '政治面貌' },
      { field: 'workPost', header: '岗位' },
      { field: 'birthday', header: '出生日期' },
      { field: 'hireDate', header: '入职时间' },
      { field: 'educational', header: '学历' },
      { field: 'practitionerCertificate', header: '从业证书' },
      { field: 'collectionSysId', header: '系统工号' },
      { field: 'workLicense', header: '上岗证编号' },
      { field: 'listGroup', header: '班组' },
      { field: 'changeTime', header: '变更时间' },
      { field: 'emergencyContact', header: '紧急联系人' },
      { field: 'emergencyPhone', header: '紧急联系电话' }
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

  showConfirm() {
    if (this.selectedUser) {
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'确认删除人员？',
        message:'Confirm message'})
        .subscribe((isConfirmed)=>{
          if(isConfirmed) {
            this.staffLeave(this.selectedUser);
          }
        });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(()=>{
          disposable.unsubscribe();
        },10000);
    }else {
      alert('请选择一个人员');
    }
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
                this.filename = res.data.fileName;
              }else {
                alert(res.message);
              }
            });
  }

  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/StaffMag/getStaff', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.staffList = res.data.staffDataList.map(el => {
                    el.politicalStatus = this.politics[el.politicalStatus];
                    el.workPost = this.work_post[el.workPost];
                    el.educational = this.educational[el.educational];
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
              if (res.code) {
                this.toFirstPage();
              }
            });
  }

  addStaff() {
    this.uploading = true;
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.hireDate = this.dateFormat(this.hireDate);
    this.form.value.birthday = this.dateFormat(this.birthday);
    this.form.value.changeTime = this.dateFormat(this.changeTime);
    this.form.value.workPost = +this.form.value.workPost;
    this.form.value.educational = +this.form.value.educational;
    this.form.value.listGroup = +this.form.value.listGroup;
    this.form.value.orgType = +this.orgType;
    this.form.value.orgCode = this.orgCode;
    this.form.value.politicalStatus = +this.form.value.politicalStatus;
    this.form.value.positionalTitle = +this.form.value.positionalTitle;
    if (this.orgType !== 3) {
      delete this.form.value.listGroup;
    }
    this.http.post(`http://119.29.144.125:8080/cgfeesys/StaffMag/addStaff`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (this.file) {
                  this.upload(res.data.userId);
                }else {
                  alert('人员录入成功！');
                  this.toFirstPage();
                  this.uploading = false;
                }
              }else {
                alert(res.message);
              }
            });
  }

  updateStaff() {
    this.uploading = true;
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
                  this.uploading = false;
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
    if (this.uploading) {
      alert('正在发送请求中，请等待完成！');
    }else {
      if (this.isAdd) {
        this.addStaff();
      }else {
        this.updateStaff();
      }
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
            this.file = null;
            this.filename = '';
        }else {
          alert(res.message);
        }
        this.uploading = false;
        this.toFirstPage();
      });
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    this.selectedUser = '';
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
