import { CategoryModel } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  cates: CategoryModel[];
  private _transformer = (node: TreeModel, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      _id: node._id,
      parentId: node.parentId
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(
    private _dataSvc: DataService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.cates = await this._dataSvc.query();
    this.dataSource.data = this.cates as any;
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


}

export interface TreeModel {
  _id: string;
  parentId: string;
  name: string;
  children?: TreeModel[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
