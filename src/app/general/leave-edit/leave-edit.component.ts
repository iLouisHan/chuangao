import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../service/shared-service.service';

@Component({
  selector: 'app-leave-edit',
  templateUrl: './leave-edit.component.html',
  styleUrls: ['./leave-edit.component.scss']
})
export class LeaveEditComponent implements OnInit {
  login: Observable<any> = new Observable<any>();
  applyDate: string;
  applyDateEnd: string;
  form: FormGroup;
  en: any;
  filename: string;
  file: any;
  orgCode: string;
  applyUserId: string;
  size = 15;
  page = 0;
  count: number;
  leaveDataList: any;
  hasData: boolean;
  leaveType: any = {
    1: '事假',
    2: '年休',
    3: '补休',
    4: '病假',
    5: '产假',
    6: '婚假',
    7: '其他'
  };
  cols: any;
  checkResult = ['未审核', '通过', '未通过'];
  initForm: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      applyType: new FormControl('', Validators.nullValidator),
      remark: new FormControl('', Validators.nullValidator)
    });
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
    this.cols = [
      { field: 'orgName', header: '组织机构' },
      { field: 'userName', header: '请假人' },
      { field: 'applyTypeCN', header: '请假类型' },
      { field: 'applyDate', header: '开始请假时间' },
      { field: 'applyDateEnd', header: '结束请假时间' },
      { field: 'remark', header: '请假理由' },
      { field: 'leaveTipDownload', header: '请假条下载' },
      { field: 'checkResultCN', header: '请假审核状态' }
    ];
    this.initForm = this.form.value;
  }

  fileChange($event) {
    this.filename = $event.target.files[0].name;
    this.file = $event.target.files[0];
  }

  submit() {
    this.addStaffLeave();
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

  addStaffLeave() {
    this.form.value.applyDate = this.dateFormat(this.applyDate);
    this.form.value.applyDateEnd = this.dateFormat(this.applyDateEnd);
    this.form.value.stationCode = this.orgCode;
    this.form.value.applyUserId = this.applyUserId;
    this.form.value.applyType = +this.form.value.applyType;
    this.sharedService.post(
      '/Leave/staffLeave',
      JSON.stringify(this.form.value),
      {
        httpOptions: true,
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        if (this.file) {
          this.upload(res.data.id);
        }
      }
    )
  }

  upload(id) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('id', id);
    this.sharedService.post(
      '/upload/leaveInfo',
      formdata,
      {
        httpOptions: false,
        successAlert: true,
        animation: true
      }
    ).subscribe(
      () => {
        this.file = null;
        this.filename = '';
      }
    )
  }

  getInfo(page, size) {
    const param: any = {
      page: page,
      size: size,
      orgList: [this.orgCode],
      userId: this.applyUserId
    };
    this.sharedService.post(
      '/Leave/getLeave',
      JSON.stringify(param),
      {
        httpOptions: true,
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.count = res.data.count;
        res.data.leaveDataList.forEach(el => {
          el.applyTypeCN = this.leaveType[el.applyType];
          el.checkResultCN = this.checkResult[el.checkResult];
        });
        this.leaveDataList = res.data.leaveDataList;
        if (res.data.count > 0) {
          this.hasData = true;
        }
      }
    )
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgCode = res.orgCode;
        this.applyUserId = res.userId;
        this.getInfo(this.page, this.size);
      }
    }).unsubscribe();
  }

}
