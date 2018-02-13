import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-station-search',
  templateUrl: './station-search.component.html',
  styleUrls: ['./station-search.component.scss']
})
export class StationSearchComponent implements OnInit {
  form: FormGroup;
  startDate: string;
  endDate: string;
  count: number;
  isChosen: boolean;
  doData: any = {};
  doFilePath: string;
  orgList: Array<any>;
  planList: Array<any>;
  page = 0;
  size = 15;
  hasData = false;
  selectionMode = 'single';
  en = {
    firstDayOfWeek: 0,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  };
  cols: any;
  checkItem: number;

  constructor(
    private http: Http
  ) {
    this.form = new FormGroup({
      meetingName: new FormControl('', Validators.nullValidator)
    });
    this.isChosen = false;
    this.cols = [
      { field: 'meetingName', header: '会议名称' },
      { field: 'meetingPlace', header: '会议地点' },
      { field: 'trainHasDo', header: '所属机构' },
      { field: 'meetingDate', header: '会议时间' },
      { field: 'meetingHost', header: '主持人' },
      { field: 'meetingNote', header: '记录人' },
      { field: 'meetingJoinPeople', header: '参与人员' },
      { field: 'meetingContent', header: '会议内容' }
    ];
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

  selectedOrg($event) {
    this.orgList = $event;
  }

  submit() {
    if (!this.orgList || this.orgList.length === 0) {
      alert('未选择机构');
    } else {
      this.getInfo(this.page, this.size);
    }
  }

  paginate(event) {
    this.getInfo(event.page, this.size);
  }

  getInfo(page: number, size: number) {
    this.form.value.startDate = this.dateFormat(this.startDate);
    this.form.value.endDate = this.dateFormat(this.endDate);
    this.form.value.orgList = this.orgList.map(el => el.data);
    const param = {
      page: page,
      size: size,
    };
    const keys = Object.keys(this.form.value);
    keys.forEach(el => {
      param[el] = this.form.value[el];
    });
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/StationMeeting/get', JSON.stringify(param) , {
              headers: myHeaders
            })
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.count = res.data.count;
                if (res.data.count > 0) {
                  this.hasData = true;
                  this.planList = res.data.stationMeetingDataList;
                }
              } else {
                alert(res.message);
              }
            });
  }

  check($event) {
    this.checkItem = $event.target.value;
  }

  test(val) {
    return val === +this.checkItem;
  }

  detail(id) {
    this.isChosen = true;
    this.planList.forEach(item => {
      if (item.id === id) {
        this.doData = item;
        this.doFilePath = item.fileId;
      }
    });
  }
  download(type) {
    if (type === 'do') {
      window.open(this.doFilePath);
    }
  }
  ngOnInit() {
  }

}
