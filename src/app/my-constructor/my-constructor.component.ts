import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../service/shared-service.service';

@Component({
  selector: 'app-my-constructor',
  templateUrl: './my-constructor.component.html',
  styleUrls: ['./my-constructor.component.scss'],
})
export class MyConstructorComponent implements OnInit {

  constructor(
    private sharedService: SharedService
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
    this.sharedService.addAlert(title, message);
  }

  addConfirm(title: string, message: string, ): Observable<string> {
    return Observable.create(obser => {
      this.sharedService.addConfirm(title, message);
    });
  }

  ngOnInit() {
    console.log('继承成功！');
  }

}
