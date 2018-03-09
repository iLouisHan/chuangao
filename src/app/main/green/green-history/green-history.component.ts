import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-green-history',
  templateUrl: './green-history.component.html',
  styleUrls: ['./green-history.component.scss']
})
export class GreenHistoryComponent implements OnInit {
  carNo: string;
  startDate: string;
  endDate: string;
  en: any;
  data: any = {};

  constructor(
    private http: Http
  ) {
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
  }

  getInfo() {
    const param: any = {};
    if (this.carNo) {
      param.carNo = this.carNo;
    }
    if (this.startDate) {
      param.startDate = this.startDate;
    }
    if (this.endDate) {
      param.endDate = this.endDate;
    }
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Green/getCarCheckStatistics`, JSON.stringify(param), {
      headers: new Headers({'Content-Type': 'application/json'})
    }).map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          console.log(res);
          this.data = res.data;
        }
      });
  }

  ngOnInit() {
  }

}
