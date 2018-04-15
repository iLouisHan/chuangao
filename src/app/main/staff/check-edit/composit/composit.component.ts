import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { work_post } from '../../../../store/translate';

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
    private http: Http,
    private store: Store<any>
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
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Check/getCheckComposit`, JSON.stringify({
      orgList: [this.orgCode],
      page: this.page,
      size: this.size
    }), {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          this.compositList = res.data.checkSingleDataList;
        }
      });
  }

  add() {
    this.view = 1;
    this.getStaff();
  }

  delete() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Check/deleteCheck?id=${this.selectedId}&type=0`)
      .map(res => res.json())
      .subscribe(res => {
        alert(res.message);
        if (res.code) {
          this.toFirstPage();
        }
      });
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
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Check/setCheckComposit', JSON.stringify(
      [this.form.value]
    ), {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
          this.view = 0;
          this.toFirstPage();
          this.selectedId = '';
        }else {
          alert(res.message);
        }
      });
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
      alert('请选择一个记录');
    }
  }

  getStaff() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationUserId?stationCode=${this.orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.staffList = res.data;
                this.resultList = this.staffList.map(el => {
                  return {
                    userName: el.userName,
                    userId: el.userId,
                    score: '0.0',
                    editable: false
                  };
                });
                this.getData();
              }else {
                alert(res.message);
              }
            });
  }

  getData() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Check/getCheckComposit`, JSON.stringify({
      orgList: [this.orgCode],
      page: 0,
      size: this.staffList.length,
      year: this.year,
      month: this.month
    }), {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          this.resultList.forEach(el => {
            const item = res.data.checkSingleDataList.filter(staff => staff.userId === el.userId);
            if (item.length > 0) {
              el.score = item[0].score;
            }
          });
        }
      });
  }

  check(val) {
    return this.selectedId === val;
  }

  select(id) {
    this.selectedId = id === this.selectedId ? '' : id;
  }

  addComposit() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Check/setCheckComposit', JSON.stringify(
      this.resultList.map(el => {
        return {
          userId: el.userId,
          stationCode: this.orgCode,
          year: this.year,
          month: this.month,
          score: el.score
        };
      })
    ), {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
          this.view = 0;
        }else {
          alert(res.message);
        }
      });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.orgType === 3) {
        this.orgCode = res.orgCode;
        this.getInfo();
      }
    });
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
