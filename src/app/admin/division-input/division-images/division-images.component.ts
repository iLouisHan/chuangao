import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-division-images',
  templateUrl: './division-images.component.html',
  styleUrls: ['./division-images.component.scss']
})
export class DivisionImagesComponent implements OnInit {
  login: Observable<any>;
  imgArr: Array<any> = [];
  orgCode: string;
  uploading = false;

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
    this.uploading = true;
    const formdata = new FormData();
    formdata.append('file', $event.target.files[0]);
    formdata.append('orgCode', this.orgCode);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/baseInfo`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
          this.getImages(this.orgCode);
          this.uploading = false;
        }else {
          alert(res.message);
          this.uploading = false;
        }
      }, error => {
        alert('上传失败，请重试！');
        this.uploading = false;
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
      if (res && res.orgType === 2) {
        this.orgCode = res.orgCode;
        this.getImages(res.orgCode);
      }
    });
  }

}
