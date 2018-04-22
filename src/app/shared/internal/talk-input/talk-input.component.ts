import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-talk-input',
  templateUrl: './talk-input.component.html',
  styleUrls: ['./talk-input.component.scss']
})
export class TalkInputComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  startDate: string;
  endDate: string;
  orgName: string;
  en: any;
  isChosen = false;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  orgList: Array<any>;
  org: string;
  uploading = false;
  orgType: number;
  count: number;
  deviceList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  staffList: Array<any>;
  isAdd: boolean;
  keys: Array<any>;
  file: any;
  initstaff: string;
  filename: string;
  selectedDevice: string;
  selectionMode = 'checkbox';
  selectionStaffMode = 'checkbox';
  searchOrg: Array<any>;
  initForm: any;
  param: any = {
    page: this.page,
    size: this.size
  };
  bsModalRef: BsModalRef;

  constructor(
    private http: Http,
    private store: Store<any>,
    private modalService: BsModalService
  ) {
    this.form = new FormGroup({
      chatLeader: new FormControl('', Validators.nullValidator),
      chatLoc: new FormControl('', Validators.nullValidator),
      chatType: new FormControl('0', Validators.nullValidator),
      chatPersonList: new FormControl('', Validators.nullValidator),
      chatContent: new FormControl('', Validators.nullValidator)
    });
    this.orgList = [];
    this.staffList = [];
    this.keys = Object.keys(this.form.value);
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
    this.login = store.select('login');
    this.initstaff = '';
    this.cols = [
      { field: 'orgName', header: '单位名称' },
      { field: 'chatType', header: '谈心类型' },
      { field: 'chatLeader', header: '谈心人员' },
      { field: 'chatUserName', header: '谈心对象' },
      { field: 'chatLoc', header: '谈心地点' },
      { field: 'chatDate', header: '谈心时间' },
      { field: 'chatContent', header: '概要内容' }
    ];
    this.initForm = {
      chatLeader: '',
      chatLoc: '',
      chatType: '',
      chatContent: '',
      chatPersonList: ''
    };
  }

  showConfirm() {
    if (this.selectedDevice) {
      const initialState = {
        title: '警告',
        message: '确认删除该记录？'
      };
      this.bsModalRef = this.modalService.show(ConfirmComponent, {initialState});
      this.bsModalRef.content.confirmEmit.subscribe(res => {
        this.staffLeave(this.selectedDevice);
        this.bsModalRef.hide();
      })
      this.bsModalRef.content.cancelEmit.subscribe(res => {
        this.bsModalRef.hide();
      })
    }else {
      const initialState = {
        title: '警告',
        message: '请选择一条记录！'
      };
      this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
      this.bsModalRef.content.submitEmit.subscribe(res => {
        this.bsModalRef.hide();
      })
    }
  }

  selectedOrg($event) {
    this.orgList = ($event);
  }
  selectedSearchOrg($event) {
    this.searchOrg = ($event);
  }
  selectedStaff($event) {
    this.staffList = ($event);
  }
  getStaffInfo(staffId) {
    this.deviceList.forEach(item => {
      if (item.id === staffId) {
        if (item.chatType === '一般谈心') {
          item.chatType = '0';
        } else {
          item.chatType = '1';
        }
        this.form.patchValue(item);
        this.initstaff = item.chatUserName;
        this.startDate = item.chatDate;
        if (item.chatContent) {
          this.filename = item.chatContent.split('fileName=')[1];
        } else {
          this.filename = '';
        }
        this.org = item.orgName;
      }
    });
  }
  getInfo() {
    if (this.searchOrg.length !== 0) {
      this.param.orgList = this.searchOrg.map(el => el.data);
    }
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Chat/get', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                }
                res.data.chatDataList.forEach(item => {
                  if (item.chatType === 0) {
                    item.chatType = '一般谈心';
                  } else {
                    item.chatType = '重要谈心';
                  }
                });
                this.deviceList = res.data.chatDataList;
              } else {
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

  dateFormat(date) {
    if (date) {
      const _date = new Date(date);
      const _month = (_date.getMonth() + 1) <= 9 ? `0${(_date.getMonth() + 1)}` : _date.getMonth();
      const _day = _date.getDate() <= 9 ? `0${_date.getDate()}` : _date.getDate();
      return `${_date.getFullYear()}-${_month}-${_day}`;
    } else {
      return '';
    }
  }

  add() {
    this.form.reset();
    this.form.patchValue(this.initForm);
    // this.form.patchValue({orgName: this.orgName});
    this.isChosen = true;
    this.isAdd = true;
  }

  search() {
    this.getInfo();
    this.toFirstPage();
  }

  update() {
    if (this.selectedDevice) {
      this.getStaffInfo(this.selectedDevice);
      this.isChosen = true;
      this.isAdd = false;
    } else {
      const initialState = {
        title: '警告',
        message: '请选择一个谈心记录！'
      };
      this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
      this.bsModalRef.content.submitEmit.subscribe(res => {
        this.bsModalRef.hide();
      })
    }
  }

  delete() {
    this.showConfirm();
  }

  select(val) {
    this.selectedDevice = val === this.selectedDevice ? '' : val;
  }

  check(val) {
    return val === this.selectedDevice;
  }

  staffLeave(selectedUser) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Chat/delete?id=${selectedUser}`)
            .map(res => res.json())
            .subscribe(res => {
              const initialState = {
                title: '通知',
                message: res.message
              };
              this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
              this.bsModalRef.content.submitEmit.subscribe(res => {
                this.bsModalRef.hide();
              })
              if (res.code) {
                this.toFirstPage();
              }
            });
  }

  addDevice() {
    this.uploading = true;
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.form.value.chatDate = this.dateFormat(this.startDate);
    this.form.value.orgCode = this.orgList[0].data;
    this.form.value.chatPersonList = this.staffList.map(el => el.data);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Chat/add`, JSON.stringify(this.form.value), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (this.file) {
                  this.upload(res.data.id);
                } else {
                  this.toFirstPage();
                  this.uploading = false;
                }
              } else {
                const initialState = {
                  title: '警告',
                  message: res.message
                };
                this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
                this.bsModalRef.content.submitEmit.subscribe(res => {
                  this.bsModalRef.hide();
                })
                this.uploading = false;
              }
            });
  }

  updateDevice() {
    this.uploading = true;
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.data.id = this.selectedDevice;
    this.data.chatDate = this.dateFormat(this.startDate);
    this.data.orgCode = this.orgList[0].data;
    this.data.chatPersonList = this.staffList.map(el => el.data);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/Chat/update`, JSON.stringify(this.data), {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                if (this.file) {
                  this.upload(this.selectedDevice);
                } else {
                  this.toFirstPage();
                  this.uploading = false;
                  const initialState = {
                    title: '通知',
                    message: res.message
                  };
                  this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
                  this.bsModalRef.content.submitEmit.subscribe(res => {
                    this.bsModalRef.hide();
                  })
                }
              } else {
                const initialState = {
                  title: '警告',
                  message: res.message
                };
                this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
                this.bsModalRef.content.submitEmit.subscribe(res => {
                  this.bsModalRef.hide();
                })
                this.uploading = false;
              }
            });
  }

  paginate($event) {
    this.param.page = $event.page;
    this.getInfo();
  }

  submit() {
    if (this.isAdd) {
      this.addDevice();
    } else {
      this.updateDevice();
    }
  }

  toFirstPage() {
    const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
    this.isChosen = false;
    element.click();
  }
  fileChange($event) {
    this.filename = $event.target.files[0].name;
    this.file = $event.target.files[0];
  }

  upload(userId) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('id', userId);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/chat`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          const initialState = {
            title: '通知',
            message: res.message
          };
          this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
          this.bsModalRef.content.submitEmit.subscribe(res => {
            this.bsModalRef.hide();
          })
        } else {
          const initialState = {
            title: '警告',
            message: res.message
          };
          this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
          this.bsModalRef.content.submitEmit.subscribe(res => {
            this.bsModalRef.hide();
          })
        }
        this.toFirstPage();
        this.uploading = false;
      }, error => {
        const initialState = {
          title: '警告',
          message: '上传失败，请重试！'
        };
        this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
        this.bsModalRef.content.submitEmit.subscribe(res => {
          this.bsModalRef.hide();
        })
        this.uploading = false;
      });
  }
  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.orgType = res.orgType;
        this.searchOrg = [{data: res.orgCode, label: res.orgName}];
        this.orgList = [{data: res.orgCode}];
        this.orgName = res.orgName;
        this.getInfo();
      }
    });
  }
}
