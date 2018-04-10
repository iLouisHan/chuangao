import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-train-plan',
  templateUrl: './train-plan.component.html',
  styleUrls: ['./train-plan.component.scss']
})
export class TrainPlanComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  startDate: string;
  endDate: string;
  en: any;
  file: any;
  checkMode = 'checkbox';
  filename: string;
  isChosen = false;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  count: number;
  exOrg: Array<any>;
  DoOrg: string;
  planOrg: string;
  staffList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  selectedUser = '';
  isAdd: boolean;
  keys: Array<any>;
  orgList: Array<any>;
  selectionMode = 'single';
  searchOrg: Array<any>;
  initForm: any;
  param: any = {
    page: this.page,
    size: this.size,
    hasDo: -1,
    trainWay: '',
    trainType: '',
    trainPlanName: '',
    trainStartDate: '',
    trainEndDate: ''
  };
  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      trainPlanName: new FormControl('', Validators.nullValidator),
      trainStartDate: new FormControl('', Validators.nullValidator),
      trainTeacher: new FormControl('', Validators.nullValidator),
      trainDoOrg: new FormControl('', Validators.nullValidator),
      trainPlanOrg: new FormControl('', Validators.nullValidator),
      trainEndDate: new FormControl('', Validators.nullValidator),
      trainUnit: new FormControl('', Validators.nullValidator),
      trainTimeLong: new FormControl('', Validators.nullValidator),
      trainTimeNumber: new FormControl('', Validators.nullValidator),
      trainType: new FormControl('', Validators.nullValidator),
      trainWay: new FormControl('', Validators.nullValidator),
      trainContent: new FormControl('', Validators.nullValidator),
      trainLoc: new FormControl('', Validators.nullValidator)
    });
    this.searchOrg = [];
    this.exOrg = [];
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
      { field: 'trainName', header: '培训计划名称' },
      { field: 'trainDoOrgName', header: '落实单位' },
      { field: 'trainStartDate', header: '开始时间' },
      { field: 'trainEndDate', header: '结束时间' },
      { field: 'trainWay', header: '培训方式' },
      { field: 'trainType', header: '培训类别' },
      { field: 'trainTeacher', header: '培训讲师' },
      { field: 'trainTimeLong', header: '培训课时' },
      { field: 'trainLoc', header: '培训地点' },
      { field: 'trainContent', header: '培训内容' }
    ];
    this.initForm = {
      trainPlanOrg: '',
      trainPlanName: '',
      trainStartDate: '',
      trainTeacher: '',
      trainEndDate: '',
      trainUnit: '',
      trainTimeLong: '',
      trainTimeNumber: '',
      trainType: '',
      trainWay: '',
      trainContent: '',
      trainLoc: ''
    };
  }

  trainTimerChanged($event){
    $event.target.value = this.form.value.trainTimeNumber * 0.5;
    this.form.value.trainTimeLong = $event.target.value;
  }
  // selectedOrg($event) {
  //   console.log($event);
  //   this.planOrg = ($event)[0].data;
  // }
  selectedEXOrg($event) {
    console.log($event);
    this.exOrg = ($event);
  }
  selectedSearchOrg($event) {
    console.log($event);
    this.searchOrg = ($event);
  }
  getStaffInfo(staffId) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Train/planGetById?id=${staffId}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
                this.form.patchValue(res.data);
                this.form.patchValue({trainPlanName: res.data.trainName});
                this.DoOrg = res.data.trainDoOrgName;
                this.startDate = res.data.trainStartDate;
                this.endDate = res.data.trainEndDate;
              } else {
                alert(res.message);
              }
            });
  }
  getInfo() {
    if (this.searchOrg.length !== 0) {
      this.param.orgList = this.searchOrg.map(el => el.data);
    }
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Train/planGet', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                }
                this.staffList = [];
                this.staffList = res.data.trainPlanDataList;
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
    this.form.patchValue({trainPlanOrg: this.orgList[0].label});
    this.filename = '';
    this.isChosen = true;
    this.isAdd = true;
  }

  search() {
    if (this.searchOrg && this.searchOrg.length !== 0) {
      this.getInfo();
      this.toFirstPage();
    } else {
      alert('请输入要查询的组织！');
    }
  }

  update() {
    if (this.selectedUser) {
      this.getStaffInfo(this.selectedUser);
      this.isChosen = true;
      this.isAdd = false;
    } else {
      alert('请选择一个计划');
    }
  }

  delete() {
    if (this.selectedUser) {
      this.deletePlan(this.selectedUser);
    } else {
      alert('请选择一个计划');
    }
  }

  select(val) {
    this.selectedUser = val === this.selectedUser ? '' : val;
  }

  check(val) {
    return val === this.selectedUser;
  }

  deletePlan(selectedUser) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Train/planDelete?id=${selectedUser}`)
            .map(res => res.json())
            .subscribe(res => {
              alert(res.message);
              if (res.code) {
                this.toFirstPage();
              }
            });
  }

  addStaff() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.trainStartDate = this.dateFormat(this.startDate);
    this.form.value.trainEndDate = this.dateFormat(this.endDate);
    this.form.value.trainTimeLong = this.form.value.trainTimeNumber * 0.5;
    // this.form.value.orgType = +this.orgType;
    if (this.exOrg.length !== 0) {
      this.form.value.trainDoOrg = this.exOrg.map(el => el.data);
    } else {
      alert('请选择落实单位！');
      return false;
    }
    this.form.value.trainPlanOrg = this.orgList[0].data;

    // this.form.value.politicalStatus = +this.form.value.politicalStatus;
    // this.form.value.positionalTitle = +this.form.value.positionalTitle;
    // this.form.value.userId = '' + Math.round(1000 * Math.random());
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Train/planAdd`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (this.file) {
                  const tmpArr = res.data;
                  tmpArr.forEach(item => {
                    this.upload(item);
                  });
                } else {
                  this.toFirstPage();
                }
              } else {
                alert(res.message);
              }
            });
  }

  updateStaff() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.trainPlanOrg = '' + this.planOrg;
    this.form.value.trainDoOrg = '' + this.exOrg;
    this.form.value.trainTimeLong = this.form.value.trainTimeNumber * 0.5;
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.data.id = this.selectedUser;
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Train/planUpdate`, JSON.stringify(this.data), {
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
    if (this.isAdd) {
      this.addStaff();
    } else {
      this.updateStaff();
    }
  }

  upload(userId) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('id', userId);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/trainPlan`, formdata)
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

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    this.selectedUser = '';
    this.isChosen = false;
    element.click();
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.searchOrg = [{data: res.orgCode, label: res.orgName}];
        this.orgList = [{data: res.orgCode, label: res.orgName}];
        this.planOrg = this.orgList[0].label;
        this.getInfo();
      }
    });
  }
}
