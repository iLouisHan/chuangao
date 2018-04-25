import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../service/shared-service.service';

@Component({
  selector: 'app-green-history',
  templateUrl: './green-history.component.html',
  styleUrls: ['./green-history.component.scss']
})
export class GreenHistoryComponent implements OnInit {
  carNo: string;
  startDate: string;
  endDate: string;
  en: any;
  data: any = {};
  options: any;
  updateOptions: any;
  initOptions: any;

  constructor(
    private sharedService: SharedService
  ) {
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
    this.initOptions = {
      height: '250px'
    };
  }

  getInfo() {
    const param: any = {};
    if (this.carNo) {
      param.carNo = this.carNo;
    }
    if (this.startDate) {
      param.startDate = this.startDate;
    }
    if (this.endDate) {
      param.endDate = this.endDate;
    }
    this.sharedService.post(
      '/Green/getCarCheckStatistics',
      JSON.stringify(param),
      {
        httpOptions: true,
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.data = res.data;
        this.updateOptions = {
          series: {
            type: 'pie',
            radius: [30, 50],
            roseType: 'radius',
            data: [
              { value: res.data.normalCount, name: '违章'},
              { value: res.data.peccancyCount, name: '正常运输'}
            ]
          }
        };
      }
    )
  }

  getWidth(width) {
    const length = Math.max(...this.data.commonGoodsCount);
    return width / length * 100 + '%';
  }

  getWeightWidth(width) {
    const length = Math.max(...this.data.commonWeight);
    return width / length * 100 + '%';
  }

  ngOnInit() {
    this.options = {
      legend: {
        data: ['违章', '正常运输'],
        align: 'right'
      },
      tooltip: {
        formatter: '{c}'
      },
      series: {
        type: 'pie',
        radius: [30, 50],
        roseType: 'radius',
        data: [
          { value: 0, name: '违章'},
          { value: 0, name: '正常运输'}
        ]
      }
    };
  }

}
