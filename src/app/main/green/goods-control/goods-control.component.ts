import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../../service/shared-service.service';

@Component({
  selector: 'app-goods-control',
  templateUrl: './goods-control.component.html',
  styleUrls: ['./goods-control.component.scss']
})
export class GoodsControlComponent implements OnInit {
  dataArr: any;
  selectedFiles2: any;
  treeNodes: Array<any> = [];
  form: FormGroup;
  selected: any;
  initForm: any;
  view = 0;

  constructor(
    private sharedService: SharedService
  ) {
    this.form = new FormGroup({
      pCode: new FormControl('', Validators.nullValidator),
      pName: new FormControl('', Validators.nullValidator),
      code: new FormControl('', Validators.nullValidator),
      name: new FormControl('', Validators.nullValidator),
      sort: new FormControl('', Validators.nullValidator),
      upperName: new FormControl('', Validators.nullValidator),
      itemDetail: new FormControl('', Validators.nullValidator),
      freeItem: new FormControl('', Validators.nullValidator),
      noFreeItem: new FormControl('', Validators.nullValidator),
      remark: new FormControl('', Validators.nullValidator)
    });
    this.initForm = this.form.value;
  }

  getBaseGoods() {
    this.sharedService.get(
      '/Green/getBaseGoods',
      {
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.dataArr = res.data;
        this.getDetailGoods();
      }
    )
  }

  getDetailGoods() {
    this.sharedService.get(
      '/Green/getDetailGoods',
      {
        successAlert: false,
        animation: true
      }
    ).subscribe(
      res => {
        this.dataArr.forEach(el => {
          el.level = 1;
          el.label = el.name;
          el.data = el.id;
          el.expanded = true;
          el.children = res.data.filter(item => item.pCode === el.code);
          el.children.forEach(child => {
            child.label = child.name;
            child.data = child.code;
            child.level = 2;
            child.expanded = true;
            child.children = child.itemDetail.split(';').map(item => {
              return {
                label: item,
                expanded: true,
                selectable: false
              };
            });
          });
        });
        this.treeNodes = this.dataArr;
      }
    )
  }

  nodeSelect($event) {
    this.form.patchValue($event.node);
    this.selected = $event.node;
    if (this.selected.level === 2) {
      this.view = 1;
    }else {
      this.view = 0;
    }
  }

  add() {
    if (this.selected && this.selected.level === 1) {
      this.form.patchValue(this.initForm);
      this.form.patchValue({
        pCode: this.selected.code,
        pName: this.selected.name
      });
      this.view = 1;
    }else {
      this.sharedService.addAlert('警告', '请选择一个大类！');
    }
  }

  delete() {
    if (this.selected.level === 2) {
      this.sharedService.get(
        `/Green/deleteDetailGoods?id=${this.selected.id}`,
        {
          successAlert: true,
          animation: true
        }
      ).subscribe(
        () => {
          this.getBaseGoods();
          this.view = 0;
        }
      )
    }else {
      this.sharedService.addAlert('警告', '请选择一个小类！');
    }
  }

  submit() {
    if (this.selected.level === 2) {
      this.form.value.id = this.selected.id;
    }
    this.sharedService.post(
      '/Green/addDetailGoods',
      JSON.stringify(this.form.value),
      {
        httpOptions: true,
        successAlert: false,
        animation: true
      }
    ).subscribe(
      () => {
        this.getBaseGoods();
        this.view = 0;
      }
    )
  }

  ngOnInit() {
    this.getBaseGoods();
  }

}
