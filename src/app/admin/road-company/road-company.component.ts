import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { work_post } from '../../store/translate';

@Component({
  selector: 'app-road-company',
  templateUrl: './road-company.component.html',
  styleUrls: ['./road-company.component.scss']
})
export class RoadCompanyComponent implements OnInit {
  data: any = {};
  login: Observable<any>;
  workTrans = work_post;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getCompanyInfo?companyCode=${orgCode}`)
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
    this.login.subscribe(res => {
      if (res && res.orgType === 1) {
        this.getInfo(res.orgCode);
      }
    });
    window.scrollTo(0, 0);
  }

}
