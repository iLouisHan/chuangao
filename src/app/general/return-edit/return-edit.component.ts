import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { applyType, shiftId, list_group } from '../../store/translate';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-return-edit',
  templateUrl: './return-edit.component.html',
  styleUrls: ['./return-edit.component.scss']
})
export class ReturnEditComponent implements OnInit {
  login: Observable<any> = new Observable<any>();
  en: any;
  form: FormGroup;
  cols: any;
  orgCode: string;
  userId: string;
  param: any = {
    page: 0,
    size: 15
  };
  _returnDate: string;
  _returnShift: string;
  count: number;
  hasData = false;
  shiftChangeDataList: any;
  list_group = list_group;
  shiftId = shiftId;
  selectedSwitch: string;
  view = 0;
  _select: any;
  returnStatus = ['未还班', '已还班', '已过期'];
  checkResult = ['未审核', '已通过', '未通过'];
  bsModalRef: BsModalRef;

  constructor(
    private http: Http,
    private store: Store<any>,
    private modalService: BsModalService
  ) {
    this.login = store.select('login');
    this.cols = [
      { field: 'orgName', header: '组织名称' },
      { field: 'applyUserName', header: '换/顶班申请人' },
      { field: 'applyTeamsCN', header: '换/顶班班组' },
      { field: 'applyDate', header: '换/顶班日期' },
      { field: 'applyShiftCN', header: '换/顶班班次' },
      { field: 'returnDate', header: '还班日期' },
      { field: 'returnShiftCN', header: '还班班次' },
      { field: 'remark', header: '备注' },
      { field: 'returnStatusCN', header: '还班状态' },
      { field: 'checkResultCN', header: '换班审核状态' },
      { field: 'returnCheckCN', header: '还班审核状态' }
    ];
    this.form = new FormGroup({
      remark: new FormControl('', Validators.nullValidator),
      applyTeams: new FormControl('', Validators.nullValidator),
      backTeams: new FormControl('', Validators.nullValidator),
      backShift: new FormControl('', Validators.nullValidator),
      returnShift: new FormControl('', Validators.nullValidator)
    });
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
  }

  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/ShiftChange/get', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.shiftChangeDataList = res.data.shiftChangeDataList;
                  this.shiftChangeDataList.forEach(el => {
                    el.applyTeamsCN = this.list_group[el.applyTeams];
                    el.applyShiftCN = this.shiftId[el.applyShift];
                    el.returnStatusCN = this.returnStatus[el.returnStatus];
                    el.checkResultCN = this.checkResult[el.checkResult];
                    el.returnCheckCN = this.checkResult[el.returnCheck];
                    el.returnShiftCN = this.shiftId[el.returnShift];
                  });
                }
              }else {
                const initialState = {
                  title: '通知',
                  message: res.message
                };
                this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
                this.bsModalRef.content.submitEmit.subscribe(res => {
                  this.bsModalRef.hide();
                })
              }
            });
  }

  select(val) {
    this.selectedSwitch = val === this.selectedSwitch ? '' : val;
  }

  check(val) {
    return val === this.selectedSwitch;
  }

  return() {
    if (this.selectedSwitch) {
      this._select = this.shiftChangeDataList.filter(el => el.id === this.selectedSwitch)[0];
      if (this._select.returnStatus === 1) {
        const initialState = {
          title: '通知',
          message: '此记录已还班'
        };
        this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
        this.bsModalRef.content.submitEmit.subscribe(res => {
          this.bsModalRef.hide();
        })
      }else if (this._select.returnStatus === 2) {
        const initialState = {
          title: '通知',
          message: '此记录已超过可修改期限！'
        };
        this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
        this.bsModalRef.content.submitEmit.subscribe(res => {
          this.bsModalRef.hide();
        })
      }else {
        this.view = 1;
      }
    }else {
      const initialState = {
        title: '通知',
        message: '请选择换班记录！'
      };
      this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
      this.bsModalRef.content.submitEmit.subscribe(res => {
        this.bsModalRef.hide();
      })
    }
  }

  paginate($event) {
    this.param.page = $event.page;
    this.getInfo();
  }

  returnSubmit() {
    this._select.returnDate = this.dateFormat(this._returnDate);
    this._select.returnShift = +this._returnShift;
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post(`http://119.29.144.125:8080/cgfeesys/ShiftChange/update`, JSON.stringify(this._select), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                const initialState = {
                  title: '通知',
                  message: '还班信息申请提交成功！'
                };
                this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
                this.bsModalRef.content.submitEmit.subscribe(res => {
                  this.bsModalRef.hide();
                })
                this.toFirstPage();
                this._select = '';
                this.view = 0;
              }else {
                const initialState = {
                  title: '警告',
                  message: res.message
                };
                this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
                this.bsModalRef.content.submitEmit.subscribe(res => {
                  this.bsModalRef.hide();
                })
              }
            });
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    if (element) {
      this.view = 0;
      element.click();
    }else {
      this.getInfo();
    }
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

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgCode = res.orgCode;
        this.userId = res.userId;
        this.param.orgList = [res.orgCode];
        this.param.applyUserId = res.userId;
        this.param.applyChangeType = 1;
        this.param.back = 1;
        this.getInfo();
      }
    });
  }

}
