import { DevextremeModule } from './../devextreme/devextreme.module';
import { MatModule } from './../mat/mat.module';
import { NgModule } from '@angular/core';



import { BookRoutingModule } from './book-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    MatModule,
    DevextremeModule,
    BookRoutingModule,

  ],
  exports: [
    AddComponent,
  ]
})
export class BookModule { }
