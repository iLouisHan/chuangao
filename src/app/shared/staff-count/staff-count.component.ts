import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-staff-count',
  templateUrl: './staff-count.component.html',
  styleUrls: ['./staff-count.component.scss']
})
export class StaffCountComponent implements OnInit {
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  updateOptions1: any;
  updateOptions2: any;
  updateOptions3: any;
  updateOptions4: any;
  login: Observable<any> = new Observable<any>();
  orgType: number;
  orgCode: string;
  cols: any;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/StaffMag/staffStatistics?orgCode=${orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.updateOptions1 = {
                  series: [{
                    name: '男',
                    type: 'bar',
                    stack: 'one',
                    data: res.data.mans
                  }, {
                    name: '女',
                    type: 'bar',
                    stack: 'one',
                    data: res.data.womem
                  }]
                };
                this.updateOptions2 = {
                  series: {
                    type: 'pie',
                    radius: [30, 110],
                    roseType: 'area',
                    data: [
                      { value: res.data.educational[0], name: '研究生'},
                      { value: res.data.educational[1], name: '本科'},
                      { value: res.data.educational[2], name: '专科'},
                      { value: res.data.educational[3], name: '中专'},
                      { value: res.data.educational[4], name: '高中'}
                    ]
                  }
                };
                const data3 = [];
                const keys = Object.keys(res.data.workAge);
                keys.forEach(el => {
                  data3[+el] = res.data.workAge[+el];
                });
                for (let i = 0; i < data3.length; i++) {
                  data3[i] =  data3[i] || 0;
                }
                this.updateOptions3 = {
                  series: {
                    type: 'bar',
                    data: data3
                  }
                };
                this.updateOptions4 = {
                  series: {
                    type: 'pie',
                    // data:
                  }
                };
              }
            });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgType = res.orgType;
        this.orgCode = res.orgCode;
        this.getInfo(this.orgCode);
      }
    });

    const xAxisData: any = [];

    this.options1 = {
      title: {
        text: '年龄结构图',
        x: 'center',
        y: 'bottom'
      },
      legend: {
        data: ['男', '女'],
        align: 'right',
        width: '100%',
        height: '100%'
      },
      tooltip: {},
      xAxis: {
        data: ['18以下', '18-21', '22-25', '26-29', '30-33', '34-37', '38-41', '42-45', '46-49', '50-53', '54以上'],
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [{
        name: '男',
        type: 'bar',
        stack: 'one'
      }, {
        name: '女',
        type: 'bar',
        stack: 'one'
      }]
    };

    this.options2 = {
      title: {
        text: '学历展示图',
        x: 'center',
        y: 'bottom'
      },
      legend: {
        data: ['研究生', '本科', '专科', '中专', '高中'],
        orient: 'vertical',
        x: 'right',
        y: 'center'
      },
      tooltip: {
        formatter: '{c}'
      },
      series: {
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [
          { value: 0, name: '研究生'},
          { value: 0, name: '本科'},
          { value: 0, name: '专科'},
          { value: 0, name: '中专'},
          { value: 0, name: '高中'}
        ]
      }
    };

    this.options3 = {
      title: {
        text: '工龄分布图',
        x: 'center',
        y: 'bottom'
      },
      yAxis: {
        name: '年',
        data: ['', '', '', '4年', '', '', '', '8年', '', '', '', '12年', '', '', '', '16年']
      },
      xAxis: {
        name: '人数',
        minInterval: 3
      }
    };

    this.options4 = {
      title: {
        text: '岗位统计图',
        x: 'center',
        y: 'bottom'
      },
      legend: {
        type: 'scroll',
        data: ['收费站站长', '收费站副站长', '收费员', '管理处中级管理员', '管理处一般管理人员', '营运公司中级管理人员', '营运公司一般管理人员', '收费班长', '收费副班长']
      }
    };
  }

}
