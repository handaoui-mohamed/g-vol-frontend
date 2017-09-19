import template from './nav-bar.html';
import controller from './nav-bar.controller';
import './nav-bar.scss';

// Top navigation bar
let navBarComponent = {
	bindings: {},
	template,
	controller,
	controllerAs: "navVm"
};

export default navBarComponent;
