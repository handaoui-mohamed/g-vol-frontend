import template from './clock.html';
import controller from './clock.controller';
import './clock.scss';

// clock component used in the middle of the navbar
let clockComponent = {
	bindings: {},
	template,
	controller,
	controllerAs: "clock"
};

export default clockComponent;
