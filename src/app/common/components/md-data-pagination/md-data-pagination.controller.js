class MdDataPaginationController {
	$onInit() {
		// initilize the limitOptions
		this.limitOptions = this.limitOptions || [10, 15, 20];
		// this.pages contain all pages already loaded/visited
		this.pages = [1];
	}

	// return the the last element index shown in the table
	max() {
		return this.query.limit * this.query.page;
	}

	// return the real first element index in the current page of the table
	min() {
		return this.query.limit * (this.query.page - 1) + 1;
	}

	// go to the first page when changing the number of elements in one page
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
		this.onPaginate();
		// if the next page was not visited, add it the pages array
		if (!this.pages.includes(this.query.page))
			this.pages.push(this.query.page);
	}
}

export default MdDataPaginationController;
