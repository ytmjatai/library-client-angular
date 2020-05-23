import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxFileUploaderModule,
  ],
  exports: [
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxFileUploaderModule,
  ]

})
export class DevextremeModule { }
