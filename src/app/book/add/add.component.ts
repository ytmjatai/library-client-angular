import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DxDropDownBoxComponent } from 'devextreme-angular/ui/drop-down-box';
import dxTreeView from 'devextreme/ui/tree_view';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryModel } from './../../models/category';
import { BookModel } from './../../models/book';
import { DataService } from '../data.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  categorys: CategoryModel[];
  category: CategoryModel;

  files: File[] = [];
  title;

  @ViewChild('dropDownBox')
  private dropDownBox: DxDropDownBoxComponent;
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public book: BookModel,
    private dataSvc: DataService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.title = this.book._id ? '编辑书籍' : '新增书籍';
    this.categorys = await this.dataSvc.queryCategory();
  }

  initTreeView = (treeView: dxTreeView) => {
    try {
      const cate = this.categorys.find(c => c._id === this.book.category[0]._id);
      treeView.selectItem(cate)
    } catch (error) {

    }
  }

  categoryValueChange(value: string) {
    if (!value) {
      this.book.category = null;
    }

  }
  categoryChange(category: CategoryModel) {
    this.book.category = [category];
  }

  itemClick(dropDownBox: DxDropDownBoxComponent) {
    dropDownBox.instance.close();
  }

  async handleSumbit() {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append('stream', file);
    }

    try {
      if (this.book._id) {
        await this.dataSvc.update(this.book, formData);
      } else {
        await this.dataSvc.add(this.book, formData);
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);

      this.snackBar.open(error.error, 'x', {
        duration: 1000
      });
    }
  }

  handleCancel() {
    this.dialogRef.close(false);
  }

  clearCate = () => {
    this.dropDownBox.value = null;

  }


}
