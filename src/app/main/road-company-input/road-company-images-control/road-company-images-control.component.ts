import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image-control',
  templateUrl: './road-company-images-control.component.html',
  styleUrls: ['./road-company-images-control.component.scss']
})
export class RoadCompanyImagesControlComponent implements OnInit {
  login: Observable<any>;
  imgArr: Array<any> = [];
  orgCode: string;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  getImages(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getOrgPicPath?orgCode=${orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.imgArr = res.data;
              }
            });
  }

  upload($event) {
    const formdata = new FormData();
    formdata.append('file', $event.target.files[0]);
    formdata.append('orgCode', this.orgCode);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/baseInfo`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
          this.getImages(this.orgCode);
        }else {
          alert(res.message);
        }
      });
  }

  delete(id) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/deleteOrgPic?fileId=${id}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                alert(res.message);
                this.getImages(this.orgCode);
              } else {
                alert(res.message);
              }
            });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      this.orgCode = res.orgCode;
      this.getImages(res.orgCode);
    });
  }

}
