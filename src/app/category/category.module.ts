import { MatModule } from './../mat/mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { SideComponent } from './side/side.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [SideComponent, AddComponent, HomeComponent],
  imports: [
    CommonModule,
    MatModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
