import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from '../../../service/shared-service.service';

@Component({
  selector: 'app-train-plan-search',
  templateUrl: './train-plan-search.component.html',
  styleUrls: ['./train-plan-search.component.scss']
})
export class TrainPlanSearchComponent implements OnInit {
  form: FormGroup;
  count: number;
  orgList: Array<any>;
  planList: Array<any>;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  orgType: string;
  planData: any;
  orgName: string;
  hasData = false;
  isChosen: boolean;
  selectionMode = 'single';
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
  trainStartDate: string;
  trainEndDate: string;

  constructor(
    private router: Router,
    private store: Store<any>,
    private sharedService: SharedService
  ) {
    this.form = new FormGroup({
      trainWay: new FormControl('', Validators.nullValidator),
      trainType: new FormControl('', Validators.nullValidator),
      trainPlanName: new FormControl('', Validators.nullValidator)
    });
    this.isChosen = false;
    this.login = store.select('login');
    this.cols = [
      { field: 'trainName', header: '培训计划名称' },
      { field: 'trainOrgName', header: '发起单位' },
      { field: 'trainStartDate', header: '计划开始时间' },
      { field: 'trainEndDate', header: '计划结束时间' },
      { field: 'trainWay', header: '培训方式' },
      { field: 'trainType', header: '培训类别' },
      { field: 'trainTeacher', header: '培训讲师' },
      { field: 'trainTimeLong', header: '培训课时' },
      { field: 'trainLoc', header: '培训地点' }
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
    this.orgList = $event;
  }

  submit() {
    if (!this.orgList || this.orgList.length === 0) {
      this.sharedService.addAlert('警告', '未选择机构');
    } else {
      this.getInfo(this.page, this.size);
    }
  }

  paginate(event) {
    this.getInfo(event.page, this.size);
  }

  getInfo(page: number, size: number) {
    this.form.value.trainStartDate = this.dateFormat(this.trainStartDate);
    this.form.value.trainEndDate = this.dateFormat(this.trainEndDate);
    this.form.value.orgList = this.orgList.map(el => el.data);
    const param = {
      page: page,
      size: size,
      trainWay: '',
      trainType: '',
      trainPlanName: '',
      trainStartDate: '',
      trainEndDate: ''
    };
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      if (this.form.value[el] || this.form.value[el] === 0) {
        param[el] = this.form.value[el];
      }
    });
    this.sharedService.post('s/Train/planGet', JSON.stringify(param) , {
              httpOptions: true
            })
            .subscribe(res => {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                }
                this.planList = res.data.trainPlanDataList;
            });
  }

  select(obj) {
    this.planData = obj;
    this.isChosen = true;
  }

  test(val) {
    return val === +this.checkItem;
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgType = res.orgType;
        this.orgList = [{data: res.orgCode, label: res.orgName}];
        this.orgName = res.orgName;
        this.getInfo(this.page, this.size);
      }
    });
  }

}
