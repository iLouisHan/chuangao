import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  updateOptions1: any;
  updateOptions2: any;
  updateOptions3: any;
  updateOptions4: any;
  initOptions1: any;
  initOptions2: any;
  initOptions3: any;
  initOptions4: any;

  constructor() {
    this.initOptions1 = {
      height: '350px'
    };
    this.initOptions2 = {
      height: '350px',
      width: '250px'
    };
    this.initOptions3 = {
      height: '200px',
      width: '500px'
    };
    this.initOptions4 = {
      height: '200px',
      width: '700px'
    };
  }

  ramdomForMonth() {
    const arr: Array<number> = [];
    for (let i = 0; i < 12; i++) {
      arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.options1 = {
      legend: {
        data: ['上年度', '本年度', '计划数'],
        align: 'right',
        width: '100%',
        height: '100%',
        x: 'right',
        y: 'top'
      },
      tooltip: {},
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {},
      series: [{
        name: '上年度',
        type: 'bar',
        data: this.ramdomForMonth()
      }, {
        name: '本年度',
        type: 'bar',
        data: this.ramdomForMonth()
      }, {
        name: '计划数',
        type: 'bar',
        data: this.ramdomForMonth()
      }]
    };

    this.options2 = {
      tooltip : {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {},
      series: [
        {
          name: '完成率',
          type: 'gauge',
          center: ['50%', '50%'],
          detail: {
            formatter: `{value}%`,
            fontSize: 15
          },
          data: [{value: 50, name: '完成率'}],
          axisLine: {
            lineStyle: {
              width: 10 // 这个是修改宽度的属性
            }
          },
          pointer: {
            width: 5
          },
          axisLabel: {
            distance: 0
          },
          axisTick: {
            length: 10
          },
          splitLine: {
            length: 20
          }
        }
      ]
    };

    const years: Array<number> = [];
    const thisYear = new Date();
    const _year = thisYear.getFullYear();
    for (let i = 0; i < 10; i++) {
      years.push(_year - 9 + i);
    }
     this.options3 = {
      legend: {
        data: ['清分收入', '道口收入'],
        x: 'right',
        y: 'top'
      },
      xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: years,
        minInterval: 1
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [{
        name: '清分收入',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10, 11, 11, 15]
      }, {
        name: '道口收入',
        type: 'line',
        data: [1, 2, 2, 5, 3, 2, 0, 2, 5, 3]
      }]
    };

    const monthes: Array<string> = [];
    for (let i = 1; i < 12; i++) {
      monthes.push(i + '月');
    }

    this.options4 = {
      legend: {
        data: ['清分收入', '道口收入'],
        x: 'right',
        y: 'top'
      },
      xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: monthes
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [{
        name: '清分收入',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10, 15, 13, 12, 13, 10]
      }, {
        name: '道口收入',
        type: 'line',
        data: [1, 2, 2, 5, 3, 2, 0, 2, 5, 3, 2, 0]
      }]
    };
  }

}
