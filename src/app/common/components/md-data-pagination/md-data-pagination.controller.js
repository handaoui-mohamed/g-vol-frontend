class MdDataPaginationController {
  $onInit() {
    this.limitOptions = this.limitOptions || [10, 15, 20];
    this.pages = [1];
  }

  max() {
    return this.query.limit * this.query.page;
  }

  min() {
    return this.query.limit * (this.query.page - 1) + 1;
  }

  refresh() {
    this.query.page = 1;
    this.pages = [1];
    this.onPaginate();
  }

  previous() {
    this.query.page--;
    this.onPaginate();
  }

  next() {
    this.query.page++;
    this.pages.push(this.query.page);
    this.onPaginate();
  }
}

export default MdDataPaginationController;
