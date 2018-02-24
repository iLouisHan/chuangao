import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
  yearList: Array<number> = [];
  month: number;
  monthList: Array<number> = [];
  staffList: any;
  resultList: any = [];

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

  }

  update() {

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
            const item = res.data.checkSingleDataList.filter(staff => staff.userId = el.userId);
            if (item.length > 0) {
              el.score = item.score;
            }
          });
        }
      });
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
      if (res) {
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
    for (let i = 1; i <= 12; i++) {
      this.monthList[i] = i;
    }
    this.month = month;
  }

}
