import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { work_post } from '../../../../store/translate';
import { SharedService } from '../../../../service/shared-service.service';

@Component({
  selector: 'app-composit',
  templateUrl: './composit.component.html',
  styleUrls: ['./composit.component.scss']
})
export class CompositComponent implements OnInit {
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  cols: Array<any>;
  page = 0;
  size = 15;
  compositList: Array<any>;
  hasData: boolean;
  view = 0;
  year: number;
  selectedId: string;
  form: FormGroup;
  yearList: Array<number> = [];
  month: number;
  monthList: Array<number> = [];
  staffList: any;
  resultList: any = [];
  _select: any;
  workPost = work_post;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService
  ) {
    this.login = store.select('login');
    this.cols = [
      { field: 'userId', header: '收费员编号' },
      { field: 'userName', header: '收费员名称' },
      { field: 'year', header: '考核年度' },
      { field: 'month', header: '考核月度' },
      { field: 'score', header: '考核分数' }
    ];
    this.form = new FormGroup({
      userId: new FormControl('', Validators.nullValidator),
      year: new FormControl('', Validators.nullValidator),
      month: new FormControl('', Validators.nullValidator),
      score: new FormControl('', Validators.nullValidator)
    });
  }

  getInfo() {
    this.sharedService.post(
      '/Check/getCheckComposit',
      JSON.stringify({
        orgList: [this.orgCode],
        page: this.page,
        size: this.size
      }),
      {
        httpOptions: true,
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => this.compositList = res.data.checkSingleDataList
    );
  }

  add() {
    this.view = 1;
    this.getStaff();
  }

  delete() {
    this.sharedService.get(
      `/Check/deleteCheck?id=${this.selectedId}&type=0`,
      {
        successAlert: true,
        animation: true
      }
    ).subscribe(
      () => this.toFirstPage()
    )
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    if (element) {
      element.click();
    }else {
      this.getInfo();
    }
  }

  updateComposit() {
    this.form.value.id = this._select.id;
    this.form.value.stationCode = this.orgCode;
    this.sharedService.post(
      '/Check/setCheckComposit',
      JSON.stringify(
        [this.form.value]
      ),
      {
        httpOptions: true,
        successAlert: true,
        animation: false
      }
    ).subscribe(
      () => {
        this.view = 0;
        this.toFirstPage();
        this.selectedId = '';
      }
    )
  }

  inputFocus($event) {
    const element = $event.target as HTMLElement;
    console.log($event);
    // element.focus();
  }

  update() {
    if (this.selectedId) {
      this.view = 2;
      this._select = this.compositList.filter(el => el.id === this.selectedId)[0];
      this.form.patchValue(this._select);
    }else {
      this.sharedService.addAlert('警告', '请选择一个记录');
    }
  }

  getStaff() {
    this.sharedService.get(
      `/BaseInfo/getStationUserId?stationCode=${this.orgCode}`,
      {
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.staffList = res.data;
        this.resultList = this.staffList.map(
          el => {
            return {
              userName: el.userName,
              userId: el.userId,
              score: '0.0',
              editable: false
            }
          }
        )
        this.getData();
      }
    )
  }

  getData() {
    this.sharedService.post(
      '/Check/getCheckComposit',
      JSON.stringify({
        orgList: [this.orgCode],
        page: 0,
        size: this.staffList.length,
        year: this.year,
        month: this.month
      }),
      {
        httpOptions: true,
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.resultList.forEach(el => {
          const item = res.data.checkSingleDataList.filter(staff => staff.userId === el.userId);
          if (item.length > 0) {
            el.score = item[0].score;
          }
        });
      }
    );
  }

  check(val) {
    return this.selectedId === val;
  }

  select(id) {
    this.selectedId = id === this.selectedId ? '' : id;
  }

  addComposit() {
    this.sharedService.post(
      '/Check/setCheckComposit',
      JSON.stringify(
        this.resultList.map(el => {
          return {
            userId: el.userId,
            stationCode: this.orgCode,
            year: this.year,
            month: this.month,
            score: el.score
          };
        })
      ),
      {
        httpOptions: true,
        successAlert: true,
        animation: true
      }
    ).subscribe(
      () => this.view = 0
    )
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.orgType === 3) {
        this.orgCode = res.orgCode;
        this.getInfo();
      }
    }).unsubscribe();
    const year = (new Date()).getFullYear();
    for (let i = 0; i < 10; i++) {
      this.yearList[i] = year - i;
    }
    this.year = year;
    const month = (new Date()).getMonth() + 1;
    for (let i = 0; i < 12; i++) {
      this.monthList[i] = i + 1;
    }
    this.month = month;
  }

}
