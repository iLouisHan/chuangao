import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../shared/alert/alert.component';
import { Http } from '@angular/http';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-constructor',
  templateUrl: './my-constructor.component.html',
  styleUrls: ['./my-constructor.component.scss'],
  providers: [BsModalService]
})
export class MyConstructorComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(
    public modalService: BsModalService,
  ) {

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

  addConfirm(title: string, message: string, ): Observable<string> {
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

  ngOnInit() {
    console.log('继承成功！');
  }

}
