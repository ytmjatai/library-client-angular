import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { BookModel, CategoryModel } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  async query(): Promise<BookModel[]> {
    const url = environment.baseApiUrl + '/books';
    const b = await this.http.get<any>(url).toPromise();
    return b;
  }

  async del(ids: string[]): Promise<void> {
    const url = environment.baseApiUrl + '/books';
    const p = new HttpParams().set('ids', `${ids}`);
    await this.http.delete(url, { params: p }).toPromise();
  }

  async add(book: BookModel, formData: FormData): Promise<BookModel> {
    const url = environment.baseApiUrl + '/books';
    let p = this.getParams(book);
    return await this.http.post(url, formData, { params: p }).toPromise();
  }

  async update(book: BookModel, formData: FormData): Promise<BookModel> {
    const url = environment.baseApiUrl + `/books/${book._id}`;
    let p = this.getParams(book);
    return await this.http.put(url, formData, { params: p }).toPromise();

    // try {
    //   return await this.http.put(url, formData, { params: p }).toPromise();

    // } catch (error) {
    //   console.error(error.error);
    //   return;
    //   alert(error)
    // }
  }

  getParams(book: BookModel): HttpParams {
    let p = new HttpParams();
    if (!!book.ISBN) {
      p = p.append('ISBN', `${book.ISBN}`);
    }
    if (!!book.name) {
      p = p.append('name', `${book.name}`);
    }
    if (!!book.author) {
      p = p.append('author', `${book.author}`);
    }
    if (!!book.category && book.category.length) {
      p = p.append('categoryId', `${book.category[0]._id}`);
    }
    if (!!book.summary) {
      p = p.append('summary', `${book.summary}`);
    }
    return p;
  }

  async queryCategory(): Promise<CategoryModel[]> {
    const url = environment.baseApiUrl + '/category';
    return await this.http.get<CategoryModel[]>(url).toPromise();
  }


}


