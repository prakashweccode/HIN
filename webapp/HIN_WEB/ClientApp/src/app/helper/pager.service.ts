

export class PagerService {
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    startPage = 1;
    endPage = totalPages;
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = this.createArray(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
  createArray(startIndex, endIndex) {
    var intArray = [];
    for (var i = startIndex; i <= endIndex-1; i++) {
      intArray.push(i);
    }
    return intArray;
  }
}
