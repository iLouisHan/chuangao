import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  cols: Array<any>;
  page = 0;
  size = 15;
  compositList: Array<any>;
  hasData: boolean;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
    this.cols = [
      { field: 'userId', header: '收费员编号' },
      { field: 'userName', header: '收费员名称' },
      { field: 'year', header: '考核年度' },
      { field: 'score', header: '考核得分' }
    ];
  }

  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Check/getCheckStar`, JSON.stringify({
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

  }

  delete() {

  }

  update() {

  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgCode = res.orgCode;
        this.getInfo();
      }
    });
  }

}
