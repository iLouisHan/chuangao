import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-toll-station',
  templateUrl: './toll-station.component.html',
  styleUrls: ['./toll-station.component.scss']
})
export class TollStationComponent implements OnInit {
  data: any = {};
  login: Observable<any>;

  constructor(
    private http: Http,
    private store: Store<any>
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
      }
    });
  }

}
