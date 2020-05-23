import { CategoryModel } from './../../models/category';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataSvc: DataService
  ) { }

  category: CategoryModel = {};
  ngOnInit(): void {

    this._router.events.subscribe(
      val => {
        if (val instanceof NavigationEnd) {
          let id = this._route.snapshot.paramMap.get('id');
          this.loadData(id);
        }
      }
    );


    let id = this._route.snapshot.paramMap.get('id');
    this.loadData(id);



  }

  async loadData(id: string) {
    this.category =await this._dataSvc.queryById(id);
  }

}
