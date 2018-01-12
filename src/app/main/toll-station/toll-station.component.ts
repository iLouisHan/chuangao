import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-toll-station',
  templateUrl: './toll-station.component.html',
  styleUrls: ['./toll-station.component.scss']
})
export class TollStationComponent implements OnInit {
  data: any = {};

  constructor(
    private http: Http
  ) { }

  getInfo() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationInfo?stationCode=00200119`)
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
