import template from './side-nav.html';
import controller from './side-nav.controller';
import './side-nav.scss';

let sideNavComponent = {
	bindings: {},
	template,
	controller,
	controllerAs: "sideVm"
};

export default sideNavComponent;
