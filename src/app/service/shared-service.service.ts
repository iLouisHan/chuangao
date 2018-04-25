import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../shared/alert/alert.component';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { Observable } from 'rxjs/Observable';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {
  bsModalRef: BsModalRef;
  loadingModalRef: BsModalRef;

  private ip = `http://119.29.144.125:8080/cgfeesys`;

  constructor(
    private modalService: BsModalService,
    private loadingService: LoadingService,
    private http: Http
  ) {

  }

  addAlert(title: string, message: string): void {
    const initialState = {
      title: title,
      message: message
    };
    this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
    this.bsModalRef.content.submitEmit.subscribe(res => {
      this.bsModalRef.hide();
    })
  }

  addConfirm(title: string, message: string): Observable<any> {
    return Observable.create(obser => {
      const initialState = {
        title: title,
        message: message
      };
      this.bsModalRef = this.modalService.show(ConfirmComponent, {initialState});
      this.bsModalRef.content.confirmEmit.subscribe(res => {
        this.bsModalRef.hide();
        obser.next();
      })
      this.bsModalRef.content.cancelEmit.subscribe(res => {
        this.bsModalRef.hide();
      })
    });
  }

  openLoadingAnimation() {
    this.loadingService.createLoading();
  }

  closeLoadingAnimation() {
    this.loadingService.clearLoading();
  }

  dateFormat(date) {
    if (date) {
      const _date = new Date(date);
      const _month = (_date.getMonth() + 1) <= 9 ? `0${(_date.getMonth() + 1)}` : _date.getMonth();
      const _day = _date.getDate() <= 9 ? `0${_date.getDate()}` : _date.getDate();
      return `${_date.getFullYear()}-${_month}-${_day}`;
    }else {
      return '';
    }
  }

  post(path: string, param: any, options: {
    httpOptions: boolean,
    successAlert?: boolean,
    animation?: boolean
  }) {
    return Observable.create(obser => {
      let httpOptions: any = {};
      if (options.animation) {
        this.openLoadingAnimation();
      }
      if (options.httpOptions) {
        httpOptions = {
          headers: new Headers({'Content-Type': 'application/json'})
        }
      }
      this.http.post(this.ip + path, param, httpOptions)
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  obser.next(res);
                  if (options.animation) {
                    this.closeLoadingAnimation();
                  }
                  if (options.successAlert) {
                    this.addAlert('通知', res.message);
                  }
                }else {
                  this.addAlert('警告', res.message);
                }
              }, error => {
                if (options.animation) {
                  this.closeLoadingAnimation();
                }
                this.addAlert('警告', '网络异常，请重试！');
              })
    })
  }

  get(path: string, options: {
    successAlert: boolean,
    animation?: boolean
  }) {
    return Observable.create(obser => {
      if (options.animation) {
        this.openLoadingAnimation();
      }
      this.http.get(this.ip + path)
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  if (options.animation) {
                    this.closeLoadingAnimation();
                  }
                  if (options.successAlert) {
                    this.addAlert('通知', res.message);
                  }
                  obser.next(res);
                }else {
                  if (options.animation) {
                    this.closeLoadingAnimation();
                  }
                  this.addAlert('警告', res.message);
                }
              }, error => {
                if (options.animation) {
                  this.closeLoadingAnimation();
                }
                this.addAlert('警告', '网络异常，请重试！');
              })
    })
  }
}
