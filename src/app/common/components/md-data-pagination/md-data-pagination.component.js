import template from './md-data-pagination.html';
import controller from './md-data-pagination.controller';
import './md-data-pagination.scss';

// component used for table pagination
let mdDataPaginationComponent = {
	bindings: {
		// the total list length
		listLength: "=",
		// query object {page, limit}
		query: "=",
		// an array containing the limit of elements to be shown in one page [10, 15, 20]
		limitOptions: "<",
		// pagination function
		onPaginate: "&"
	},
	template,
	controller
};

export default mdDataPaginationComponent;
