import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { CategoryModel } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  async query(): Promise<any> {
    const url = environment.baseApiUrl + '/category';
    const data = await this.http.get<any>(url).toPromise();
    for (const d of data) {
      d.isExpanded = true;
    }
    function getTree(list) {
      let temp = {};
      let tree = [];
      for (let i in list) {
        temp[list[i]._id] = list[i];
        
      }
      for (let i in temp) {
        if (temp[i].parentId) {
          if (!temp[temp[i].parentId].children) {
            temp[temp[i].parentId].children = [];
          }
          temp[temp[i].parentId].children.push(temp[i]);
        } else {
          tree.push(temp[i]);
        }
      }
      return tree;
    }
    const d = getTree(data);
    return d;

  }


  async queryById(id: string): Promise<CategoryModel> {
    const url = environment.baseApiUrl + `/category/${id}`;
    return await this.http.get(url).toPromise();
  }

  async del(ids: string[]): Promise<void> {
    const url = environment.baseApiUrl + '/category';
    const p = new HttpParams().set('ids', `${ids}`);
    await this.http.delete(url, { params: p }).toPromise();
  }

  async add(category: CategoryModel, formData: FormData): Promise<CategoryModel> {
    const url = environment.baseApiUrl + '/category';
    let p = this.getParams(category);
    return await this.http.post(url, formData, { params: p }).toPromise();
  }

  async update(category: CategoryModel, formData: FormData): Promise<CategoryModel> {
    const url = environment.baseApiUrl + `/category/${category._id}`;
    let p = this.getParams(category);
    return await this.http.put(url, formData, { params: p }).toPromise();
  }

  getParams(category: CategoryModel): HttpParams {
    let p = new HttpParams();
    if (!!category.name) {
      p = p.append('name', `${category.name}`);
    }
    if (!!category.parentId) {
      p = p.append('parentId', `${category.parentId}`);
    }
    return p;
  }

}


