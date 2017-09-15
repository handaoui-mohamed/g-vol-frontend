import template from './filter-menu.html';
import controller from './filter-menu.controller';
import './filter-menu.scss';

// menu filter button, used in material design table only in this project
let filterMenuComponent = {
	bindings: {
		// is an array for multiselect, or an object "{start, end}" for dates
		ngModel: "=",
		// the width of the popup menu
		menuWidth: "<",
		// offset the menu ("top right")
		menuOffset: "<",
		// menu type, set this value to "date" only for date filtering 
		menuType: "@",
		// if the filter is a multiselect, we provide an array [{tranlate, value}] of the items to be shown
		menuItems: "<",
		// filter function
		onFilter: "&",
	},
	template,
	controller
};

export default filterMenuComponent;
