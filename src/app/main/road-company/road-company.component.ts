import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-road-company',
  templateUrl: './road-company.component.html',
  styleUrls: ['./road-company.component.scss']
})
export class RoadCompanyComponent implements OnInit {
  data: Object = {};

  constructor(
    private http: Http
  ) { }

  getInfo() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getCompanyInfo?companyCode=10004`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
              }else {
                alert(res.message);
              }
            });
  }

  ngOnInit() {
    this.getInfo();
  }

}
