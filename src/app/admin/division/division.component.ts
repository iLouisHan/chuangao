import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {
  data: any = {};
  login: Observable<any>;

  constructor(
    private http: Http,
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.login = store.select('login');
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getDivisionInfo?divisionCode=${orgCode}`)
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
      if (res && res.orgType === 2) {
        this.getInfo(res.orgCode);
      }else if (res && res.orgType === 1 && /division/.test(this.router.url)) {
        this.getInfo(this.route.snapshot.queryParams['orgCode']);
      }
    });
    window.scrollTo(0, 0);
  }

}
