import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-green-check-detail',
  templateUrl: './green-check-detail.component.html',
  styleUrls: ['./green-check-detail.component.scss']
})
export class GreenCheckDetailComponent implements OnInit {
  id: string;
  data: any = {};
  boxType = ['开放货车', '封闭货车', '帆布货车', '其他货车'];
  carType = ['两轴货车', '三轴货车', '四轴货车', '五轴货车', '六轴货车'];
  shift = ['早班', '晚班'];
  firstCheck = ['未检', '合格', '不合格'];
  dealResult = ['免费放行', '缴费放行'];
  runType = ['正常运输', '超限运输', '装载比例不足', '货品不符', '其他'];
  btnShow: false;

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private router: Router
  ) { }

  getInfo() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Green/getCarHisById?id=${this.id}`)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code) {
            this.data = res.data;
            this.data.boxTypeCN = this.boxType[this.data.boxType];
            this.data.carTypeCN = this.carType[this.data.carType - 1];
            this.data.shiftCN = this.shift[this.data.shift - 1];
            this.data.firstCheckCN = this.firstCheck[this.data.firstCheck];
            this.data.dealResultCN = this.dealResult[this.data.dealResult - 1];
            this.data.runTypeCN = this.dealResult[this.data.dealResult - 1];
          }
        });
  }

  passSubmit() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Green/carCheck?id=${this.id}&check=1`)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code) {
            alert(res.message);
            this.router.navigate(['/main/green/check']);
          }else {
            alert(res.message);
          }
        });
  }

  notpassSubmit() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Green/carCheck?id=${this.id}&check=2`)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code) {
            alert(res.message);
            this.router.navigate(['/main/green/check']);
          }else {
            alert(res.message);
          }
        });
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.getInfo();
  }

}
