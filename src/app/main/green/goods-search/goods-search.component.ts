import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-goods-search',
  templateUrl: './goods-search.component.html',
  styleUrls: ['./goods-search.component.scss']
})
export class GoodsSearchComponent implements OnInit {
  goodsDetail: any;
  dataArr: any;
  cols: any;

  constructor(
    private http: Http
  ) {
    this.cols = ['name', 'itemDetail', 'freeItem', 'noFreeItem', 'remark'];
  }

  getBaseGoods() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Green/getBaseGoods`)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code) {
            this.dataArr = res.data.sort((a, b) => a.code - b.code);
            this.getDetailGoods();
          }
        });
  }

  getDetailGoods() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Green/getDetailGoods`)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code) {
            this.goodsDetail = res.data.sort((a, b) => a.pCode - b.pCode);
            this.dataArr.forEach(el => {
              el.children = res.data.filter(item => item.pCode === el.code);
            });
          }
          console.log(this.dataArr);
        });
  }

  ngOnInit() {
    this.getBaseGoods();
  }

}
