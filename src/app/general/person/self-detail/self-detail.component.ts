import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { work_post } from '../../../store/translate';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-self-detail',
  templateUrl: './self-detail.component.html',
  styleUrls: ['./self-detail.component.scss']
})
export class SelfDetailComponent implements OnInit {
  data: any = {};
  educational = ['研究生', '本科', '专科', '中专', '高中'];
  work_post = work_post;
  now_date = new Date();
  login: Observable<any> = new Observable<any>();

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  age(val) {
    return this.now_date.getFullYear() - (new Date(val)).getFullYear() || 0;
  }

  getInfo(staffId) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/User/getUserDetail?userId=${staffId}`)
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
      if (res) {
        this.getInfo(res.userId);
      }
    });
  }
}
