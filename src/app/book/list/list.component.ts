import { environment } from './../../../environments/environment.prod';
import { AddComponent } from './../add/add.component';
import { BookModel } from './../../models/book';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public defaultThumb = './assets/images/default.png';
  displayedColumns = [
    'select',
    'thumbnail',
    'name',
    'author',
    'category',
    'summary',
    '_id'
  ];
  dataSource: MatTableDataSource<BookModel>;
  selection = new SelectionModel<BookModel>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataSvc: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const books = await this.dataSvc.query();
    this.selection.clear();
    this.dataSource = new MatTableDataSource(books);
    this.dataSource.paginator = this.paginator;

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  async handleDelMany() {
    const ids = [];
    for (const selected of this.selection.selected) {
      ids.push(selected._id);
    }
    await this.dataSvc.del(ids);
    this.loadData();

  }

  async handleDel(book: BookModel) {
    await this.dataSvc.del([book._id]);
    this.loadData();
  }

  handlePageChange(event: PageEvent) {
    console.log(event);
  }

  handleEdit(book) {
    this.openAddDialog(book);
  }

  handleAdd() {
    this.openAddDialog({});
  }

  openAddDialog(book) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      data: { ...book }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

}

