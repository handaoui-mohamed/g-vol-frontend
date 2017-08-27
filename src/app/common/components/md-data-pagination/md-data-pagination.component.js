import template from './md-data-pagination.html';
import controller from './md-data-pagination.controller';
import './md-data-pagination.scss';

let mdDataPaginationComponent = {
  bindings: {
    listLength: "=",
    query: "=",
    onPaginate: "&",
    limitOptions: "<"
  },
  template,
  controller
};

export default mdDataPaginationComponent;
