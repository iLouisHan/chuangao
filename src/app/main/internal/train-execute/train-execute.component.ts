import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormArray } from '@angular/forms/src/model';
@Component({
  selector: 'app-train-execute',
  templateUrl: './train-execute.component.html',
  styleUrls: ['./train-execute.component.scss']
})
export class TrainExecuteComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  trainForm: FormGroup;
  searchForm: FormGroup;
  orgCode: string;
  doStartDate: string;
  doEndDate: string;
  startDate: string;
  endDate: string;
  en: any;
  file: any;
  filename: string;
  isChosen = false;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  count: number;
  doFilePath: string;
  planFilePath: string;
  staffList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  selectedUser = '';
  isAdd: boolean;
  keys: Array<any>;
  selectionMode = 'single';
  searchOrg: Array<any>;
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
      trainPlanName: new FormControl('', Validators.nullValidator),
      trainOrgName: new FormControl('', Validators.nullValidator),
      trainDoOrg: new FormControl('', Validators.nullValidator),
      trainStartDate: new FormControl('', Validators.nullValidator),
      trainTeacher: new FormControl('', Validators.nullValidator),
      trainEndDate: new FormControl('', Validators.nullValidator),
      trainUnit: new FormControl('', Validators.nullValidator),
      trainTimeLong: new FormControl('', Validators.nullValidator),
      trainType: new FormControl('', Validators.nullValidator),
      trainWay: new FormControl('', Validators.nullValidator),
      trainContent: new FormControl('', Validators.nullValidator),
      trainLoc: new FormControl('', Validators.nullValidator)
    });
    this.trainForm = new FormGroup({
      trainPlanName: new FormControl('', Validators.nullValidator),
      trainDoOrgName: new FormControl('', Validators.nullValidator),
      trainDoAddress: new FormControl('', Validators.nullValidator),
      trainDoStartDate: new FormControl('', Validators.nullValidator),
      trainDoEndDate: new FormControl('', Validators.nullValidator),
      trainDoTeacher: new FormControl('', Validators.nullValidator),
      trainDoTimeLong: new FormControl('', Validators.nullValidator),
      trainDoContent: new FormControl('', Validators.nullValidator)
    });
    this.searchForm = new FormGroup({
      hasDo: new FormControl('-1', Validators.nullValidator),
      trainWay: new FormControl('', Validators.nullValidator),
      trainType: new FormControl('', Validators.nullValidator),
      trainPlanName: new FormControl('', Validators.nullValidator),
      trainStartDate: new FormControl('', Validators.nullValidator),
      trainEndDate: new FormControl('', Validators.nullValidator)
    });
    this.doFilePath = '';
    this.planFilePath = '';
    this.orgCode = '';
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
      { field: 'trainPlanName', header: '培训计划名称' },
      { field: 'trainPlanOrgName', header: '发起单位' },
      { field: 'trainDoOrgName', header: '落实单位' },
      { field: 'hasDo', header: '落实状态' },
      { field: 'trainPlanStartDate', header: '开始时间' },
      { field: 'trainPlanEndDate', header: '结束时间' },
      { field: 'trainWay', header: '培训方式' },
      { field: 'trainType', header: '培训类别' },
      { field: 'trainPlanTeacher', header: '培训讲师' },
      { field: 'trainPlanTimeLong', header: '培训课时' },
      { field: 'trainPlanLoc', header: '培训地点' },
      { field: 'trainTeacher', header: '落实培训讲师' },
      { field: 'trainTimeLong', header: '落实培训课时' },
      { field: 'trainAddress', header: '落实培训地点' },
      { field: 'trainDoStartDate', header: '落实起始时间' },
      { field: 'trainDoEndDate', header: '落实结束时间' }
    ];
    // this.initForm = {
    //   trainPlanName: '',
    //   trainPlanOrg: '',
    //   trainStartDate: '',
    //   trainTeacher: '',
    //   trainEndDate: '',
    //   trainUnit: '',
    //   trainTimeLong: '',
    //   trainType: '',
    //   trainWay: '',
    //   trainContent: '',
    //   trainLoc: ''
    // };
  }
  selectedOrg($event) {
    this.searchOrg[0] = ($event);
  }
  getStaffInfo(staffId, planId) {
    this.selectedUser  = staffId;
    this.isChosen = true;
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Train/doGetById?id=${staffId}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
                this.trainForm.patchValue(res.data);
                this.doEndDate = res.data.trainDoEndDate;
                this.doStartDate = res.data.trainDoStartDate;
                this.doFilePath = res.data.trainDoFile;
              } else {
                alert(res.message);
              }
            });
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Train/planGetById?id=${planId}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
                this.form.patchValue(res.data);
                this.planFilePath = res.data.trainPlanFile;
                this.endDate = res.data.trainEndDate;
                this.startDate = res.data.trainStartDate;
              } else {
                alert(res.message);
              }
            });
  }
  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const keys = Object.keys(this.searchForm.value);
    keys.forEach(el => {
      this.param[el] = this.searchForm.value[el];
    });
    this.param.orgList = [this.orgCode];
    this.param.trainDoOrgList = [this.orgCode];
    this.http.post('http://119.29.144.125:8080/cgfeesys/Train/doGet', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  res.data.trainDoDataList.forEach(item => {
                    item.hasDo = item.hasDo === 0 ? '未落实' : '已落实';
                  });
                  this.staffList = res.data.trainDoDataList;
                }
              } else {
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
    } else {
      return '';
    }
  }

  add() {
    this.form.reset();
    this.form.patchValue(this.initForm);
    // this.form.patchValue({orgName: this.orgName});
    this.filename = '';
    this.isChosen = true;
    this.isAdd = true;
  }

  search() {
    this.getInfo();
    this.toFirstPage();
  }

  // update() {
  //   if (this.selectedUser) {
  //     this.getStaffInfo(this.selectedUser);
  //     this.isChosen = true;
  //     this.isAdd = false;
  //   } else {
  //     alert('请选择一个人员');
  //   }
  // }

  // delete() {
  //   if (this.selectedUser) {
  //     this.staffLeave(this.selectedUser);
  //   } else {
  //     alert('请选择一个人员');
  //   }
  // }

  select(val) {
    this.selectedUser = val === this.selectedUser ? '' : val;
  }

  check(val) {
    return val === this.selectedUser;
  }

  // staffLeave(selectedUser) {
  //   const leaveDate = this.dateFormat(new Date());
  //   this.http.get(`http://119.29.144.125:8080/cgfeesys/StaffMag/staffLeave?userId=${selectedUser}&leaveDate=${leaveDate}`)
  //           .map(res => res.json())
  //           .subscribe(res => {
  //             alert(res.message);
  //             if (res.code) {
  //               this.toFirstPage();
  //             }
  //           });
  // }

  addStaff() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.trainForm.value.id = this.selectedUser;
    this.trainForm.value.trainDoStartDate = this.dateFormat(this.doStartDate);
    this.trainForm.value.trainDoEndDate = this.dateFormat(this.doEndDate);
    const tmpObj = {};
    const keys = Object.keys(this.trainForm.value);
    keys.forEach(el => {
      if (el !== 'trainPlanName' && el !== 'trainDoOrgName') {
        tmpObj[el] = this.trainForm.value[el];
      }
    });
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Train/doAdd`, JSON.stringify(tmpObj), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (this.file) {
                  this.upload(this.selectedUser);
                } else {
                  this.toFirstPage();
                }
              } else {
                alert(res.message);
              }
            });
  }

  paginate($event) {
    this.param.page = $event.page;
    this.getInfo();
  }

  submit() {
    this.addStaff();
  }

  upload(userId) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('id', userId);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/trainDo`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
        } else {
          alert(res.message);
        }
        this.toFirstPage();
      });
  }
  downloadFile(type) {
    if (type === 'do') {
      window.open(this.doFilePath);
    } else {
      window.open(this.planFilePath);
    }
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
        this.getInfo();
      }
    });
  }
}

