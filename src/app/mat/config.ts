import { MatPaginatorIntl } from '@angular/material/paginator';

export class Config extends MatPaginatorIntl {

  static getPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    const rangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 共:${length}`; }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} 总计: ${length}`;
    }

    paginatorIntl.itemsPerPageLabel = '每页:';
    paginatorIntl.nextPageLabel = '下一页';
    paginatorIntl.previousPageLabel = '上一页';
    paginatorIntl.firstPageLabel = '首页';
    paginatorIntl.lastPageLabel = '末页';
    paginatorIntl.getRangeLabel = rangeLabel;

    return paginatorIntl;
  }

}