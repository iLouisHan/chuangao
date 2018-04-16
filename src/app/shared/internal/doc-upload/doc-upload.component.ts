import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {
  data: any = {};
  form: FormGroup;
  startDate: string;
  endDate: string;
  en: any;
  isChosen = false;
  orgCode: string;
  login: Observable<any> = new Observable<any>();
  page = 0;
  size = 15;
  uploading = false;
  requiredItems = {
    fileName	: '文件名称',
    fileType: '文件类别',
    fileNum: '发文文号',
    fileUnit: '发文单位',
    fileLevel: '文件级别',
    keyWord: '关键字'
  };
  orgList: Array<any>;
  count: number;
  deviceList: Array<any>;
  hasData: boolean;
  updateUrl = `http://119.29.144.125:8080/cgfeesys/User/setUserDetail`;
  cols: Array<any>;
  isAdd: boolean;
  keys: Array<any>;
  file: any;
  level: string;
  filename: string;
  checkMode = 'checkbox';
  selectedUser: string;
  selectionMode = 'checkbox';
  canSeeOrgList: Array<any>;
  searchOrg: Array<any>;
  initForm: any;
  orgType: number;
  orgName: string;
  initOrgName: string;
  param: any = {
    page: this.page,
    size: this.size,
    fileName: ''
  };
  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.form = new FormGroup({
      fileName: new FormControl('', Validators.nullValidator),
      fileType: new FormControl('', Validators.nullValidator),
      fileNum: new FormControl('', Validators.nullValidator),
      fileUnit: new FormControl('', Validators.nullValidator),
      keyWord: new FormControl('', Validators.nullValidator),
      fileLevel: new FormControl('', Validators.nullValidator)
    });
    this.searchOrg = [];
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
    this.cols = [
      { field: 'fileType', header: '文件类型' },
      { field: 'fileName', header: '文件名称' },
      { field: 'fileUnit', header: '发文单位' },
      { field: 'fileNum', header: '发文文号' },
      { field: 'fileLevel', header: '文件级别' },
      { field: 'filePublishTime', header: '发文时间' },
      { field: 'fileOwnerName', header: '发文单位' },
      { field: 'keyWord', header: '关键字' }
    ];
    this.initForm = {
      fileName: '',
      fileUnit: '',
      fileNum: '',
      fileType: '',
      fileLevel: '',
      keyWord: ''
    };
  }

  selectedOrg($event) {
    this.searchOrg = ($event);
  }

  getStaffInfo(staffId) {
    this.deviceList.forEach(item => {
      if (item.id === staffId) {
        this.form.patchValue(item);
        this.endDate = item.filePublishTime;
        this.level = item['orgList'].join(',');
        this.filename = item.filePath.split('ileName=')[1];
      }
    });
  }

  getInfo() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.param.orgCode = this.orgList[0].data;
    this.http.post('http://119.29.144.125:8080/cgfeesys/FileManager/get', JSON.stringify(this.param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                }
                this.deviceList = res.data.fileManagerDataList;
              } else {
                alert(res.message);
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
    this.endDate = '';
    this.file = '';
    this.level = '';
    // this.form.patchValue({orgName: this.orgName});
    this.isChosen = true;
    this.isAdd = true;
  }

  search() {
    if (this.searchOrg && this.searchOrg.length !== 0) {
      this.getInfo();
      this.toFirstPage();
    } else {
      alert('请输入要查询的人员姓名！');
    }
  }

  update() {
    if (this.selectedUser) {
      this.getStaffInfo(this.selectedUser);
      this.isChosen = true;
      this.isAdd = false;
    } else {
      alert('请选择一个文档');
    }
  }

  delete() {
    if (this.selectedUser) {
      this.staffLeave(this.selectedUser);
    } else {
      alert('请选择一个文档');
    }
  }

  select(val) {
    this.selectedUser = val === this.selectedUser ? '' : val;
  }

  check(val) {
    return val === this.selectedUser;
  }

  staffLeave(selectedUser) {
    const leaveDate = this.dateFormat(new Date());
    this.http.get(`http://119.29.144.125:8080/cgfeesys/FileManager/delete?id=${selectedUser}`)
            .map(res => res.json())
            .subscribe(res => {
              alert(res.message);
              if (res.code) {
                this.toFirstPage();
              }
            });
  }

  addDevice() {
    const spaceArr = this.keys.filter(el => !this.form.value[el] && this.form.value[el] !== 0).map(el => this.requiredItems[el]);
    if (spaceArr.length > 0) {
      alert(`${spaceArr.join(',')}为空`);
    } else if (!this.file) {
      alert('请上传文档！');
    } else if (!this.endDate) {
      alert('请选择发文时间');
    } else if (this.searchOrg.length === 0) {
      alert('请选择浏览权限！');
    } else {
      this.uploading = true;
      const myHeaders: Headers = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      this.form.value.filePublishTime = this.dateFormat(this.endDate);
      this.form.value.fileOwner = this.orgList[0].data;
      this.form.value.orgList = this.searchOrg.map(el => el.data);
      this.http.post(`http://119.29.144.125:8080/cgfeesys/FileManager/add`, JSON.stringify(this.form.value), {
                headers: myHeaders
              })
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  this.upload(res.data.id);
                } else {
                  alert(res.message);
                  this.uploading = false;
                }
              });
    }
  }

  updateDevice() {
    const spaceArr = this.keys.filter(el => !this.form.value[el] && this.form.value[el] !== 0).map(el => this.requiredItems[el]);
    if (spaceArr.length > 0) {
      alert(`${spaceArr.join(',')}为空`);
    } else if (!this.endDate) {
      alert('请选择发文时间');
    } else if (this.searchOrg.length === 0) {
      alert('请选择浏览权限！');
    } else {
      this.uploading = true;
      const myHeaders: Headers = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const keys = Object.keys(this.form.value);
      keys.forEach(el => {
        this.data[el] = this.form.value[el];
      });
      this.data.id = this.selectedUser;
      this.data.filePublishTime = this.dateFormat(this.endDate);
      this.data.fileOwner = this.orgList[0].data;
      this.data.orgList = this.searchOrg.map(el => el.data);
      this.http.post(`http://119.29.144.125:8080/cgfeesys/FileManager/update`, JSON.stringify(this.data), {
                headers: myHeaders
              })
              .map(res => res.json())
              .subscribe(res => {
                if (res.code) {
                  if (this.file) {
                    this.upload(this.selectedUser);
                  } else {
                    this.toFirstPage();
                    this.uploading = false;
                  }
                } else {
                  alert(res.message);
                  this.uploading = false;
                }
              }, error => {
                alert('上传失败，请重试！');
                this.uploading = false;
              });
      }
  }

  paginate($event) {
    this.param.page = $event.page;
    this.getInfo();
  }

  submit() {
    if (this.uploading) {
      alert('正在上传中！');
    }else {
      if (this.isAdd) {
        this.addDevice();
      } else {
        this.updateDevice();
      }
    }
  }

  fileChange($event) {
    this.filename = $event.target.files[0].name;
    this.file = $event.target.files[0];
  }

  upload(userId) {
    const formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append('id', userId);
    this.http.post(`http://119.29.144.125:8080/cgfeesys/upload/fileManager`, formdata)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          alert(res.message);
        } else {
          alert(res.message);
        }
        this.toFirstPage();
        this.uploading = false;
      });
  }

  toFirstPage() {
    if (document.getElementsByClassName('ui-paginator-page')[0]) {
      const element = document.getElementsByClassName('ui-paginator-page')[0] as HTMLElement;
      element.click();
    } else {
      this.getInfo();
    }
    this.isChosen = false;
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.isAdmin) {
        this.orgName = res.orgName;
        this.orgType = res.orgType;
        this.initOrgName = res.orgName;
        this.orgList = [{data: res.orgCode, label: res.orgName}];
        this.searchOrg = [{data: res.orgCode, label: res.orgName}];
        this.orgCode = res.orgCode;
        this.param.orgCode = res.orgCode;
        this.initForm.fileUnit = this.orgList[0].label;
        this.getInfo();
      }
    });
  }
}

