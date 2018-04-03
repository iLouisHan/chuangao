import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-train-execute-search',
  templateUrl: './train-execute-search.component.html',
  styleUrls: ['./train-execute-search.component.scss']
})
export class TrainExecuteSearchComponent implements OnInit {
  form: FormGroup;
  startTime: string;
  endTime: string;
  count: number;
  staffList: Array<any>;
  planData: any = {};
  doData: any = {};
  selectorgList: Array<any> = [];
  orgList: Array<any>;
  doFilePath: string;
  planFilePath: string;
  trainDoOrgList: Array<any>;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  isChosen: boolean;
  selectionMode = 'single';
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
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      hasDo: new FormControl('-1', Validators.nullValidator),
      trainWay: new FormControl('', Validators.nullValidator),
      trainType: new FormControl('', Validators.nullValidator),
      trainPlanName: new FormControl('', Validators.nullValidator)
    });
    this.login = store.select('login');
    this.doFilePath = '';
    this.planFilePath = '';
    this.isChosen = false;
    this.cols = [
      { field: 'trainPlanName', header: '培训计划名称' },
      { field: 'trainPlanOrgName', header: '发起单位' },
      { field: 'trainDoOrgName', header: '落实单位' },
      { field: 'hasDo', header: '落实状态' },
      { field: 'trainPlanStartDate', header: '计划开始时间' },
      { field: 'trainPlanEndDate', header: '计划结束时间' },
      { field: 'trainWay', header: '培训方式' },
      { field: 'trainType', header: '培训类别' },
      { field: 'trainPlanTeacher', header: '培训讲师' },
      { field: 'trainPlanTimeLong', header: '培训课时' },
      { field: 'trainPlanLoc', header: '培训地点' },
      { field: 'executeTrainTeacher', header: '落实培训讲师' },
      { field: 'executeTrainTime', header: '落实培训课时' },
      { field: 'executeTrainLocation', header: '落实培训地点' },
      { field: 'trainDoStartDate', header: '落实开始时间' },
      { field: 'trainDoEndDate', header: '落实结束时间' }
    ];
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

  selectedOrg($event) {
    this.selectorgList = $event;
  }

  selectedExOrg($event) {
    this.trainDoOrgList = $event;
  }

  submit() {
    if (!this.orgList || this.orgList.length === 0) {
      alert('未选择发起单位');
    } else if (!this.trainDoOrgList || this.trainDoOrgList.length === 0) {
      alert('未选择落实单位');
    } else {
      this.getInfo(this.page, this.size);
    }
  }

  paginate(event) {
    this.getInfo(event.page, this.size);
  }
  download(type) {
    if (type === 'do') {
      window.open(this.doFilePath);
    } else {
      window.open(this.planFilePath);
    }
  }
  getInfo(page: number, size: number) {
    this.form.value.trainStartDate = this.dateFormat(this.startTime);
    this.form.value.trainEndDate = this.dateFormat(this.endTime);
    this.form.value.orgList = [];
    this.form.value.trainDoOrgList = this.trainDoOrgList.map(el => el.data);
    const param = {
      page: page,
      size: size,
    };
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      param[el] = this.form.value[el];
    });
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Train/doGet', JSON.stringify(param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                }
                res.data.trainDoDataList.forEach(item => {
                  item.hasDo = item.hasDo === 0 ? '未落实' : '已落实';
                });
                this.staffList = res.data.trainDoDataList;
              } else {
                alert(res.message);
              }
            });
  }

  detail(id) {
    this.isChosen = true;
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Train/doGetById?id=${id}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.doData = res.data;
                this.doFilePath = res.data.trainDoFile;
              } else {
                alert(res.message);
              }
            });
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Train/planGetById?id=${id}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.planData = res.data;
                this.planFilePath = res.data.trainPlanFile;
              } else {
                alert(res.message);
              }
            });
  }

  check($event) {
    this.checkItem = $event.target.value;
  }

  test(val) {
    return val === +this.checkItem;
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.orgList = [{data: res.orgCode, label: res.orgName}];
        this.trainDoOrgList = [{data: res.orgCode, label: res.orgName}];
        this.form.value.trainPlanName = this.route.snapshot.queryParamMap.get('planName');
        this.getInfo(this.page, this.size);
      }
    });
  }

}
