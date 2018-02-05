import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talk-count',
  templateUrl: './talk-count.component.html',
  styleUrls: ['./talk-count.component.scss']
})
export class TalkCountComponent implements OnInit {
  cols: Array<any>;


  constructor() { }

  search() {

  }

  ngOnInit() {
    this.cols = [
      { field: 'orgName', header: '系列' },
      { field: 'orgName', header: '一月' },
      { field: 'userName', header: '二月' },
      { field: 'applyTypeCN', header: '三月' },
      { field: 'applyDate', header: '四月' },
      { field: 'applyDateEnd', header: '五月' },
      { field: 'remark', header: '六月' },
      { field: 'remark', header: '七月' },
      { field: 'remark', header: '八月' },
      { field: 'remark', header: '九月' },
      { field: 'remark', header: '十月' },
      { field: 'remark', header: '十一月' },
      { field: 'remark', header: '十二月' }
    ];
  }

}
