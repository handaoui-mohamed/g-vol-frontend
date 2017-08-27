import template from './filter-menu.html';
import controller from './filter-menu.controller';
import './filter-menu.scss';

let filterMenuComponent = {
  bindings: {
    ngModel: "=",
    menuWidth: "<",
    menuItems: "<",
    menuOffset: "<",
    menuType: "@",
    onFilter: "&",
  },
  template,
  controller
};

export default filterMenuComponent;
