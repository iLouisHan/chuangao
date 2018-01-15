import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { work_post } from '../../store/translate';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toll-station',
  templateUrl: './toll-station.component.html',
  styleUrls: ['./toll-station.component.scss']
})
export class TollStationComponent implements OnInit {
  data: any = {};
  login: Observable<any>;
  workTrans = work_post;

  constructor(
    private http: Http,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.login = store.select('login');
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationInfo?stationCode=${orgCode}`)
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
      if (res && res.orgType === 3) {
        this.getInfo(res.orgCode);
      }else if (res && res.orgType !== 3 && /tollStation/.test(this.router.url)) {
        this.getInfo(this.route.snapshot.queryParams['orgCode']);
      }
    });
  }

}
