import template from './flight-info.html';
import controller from './flight-info.controller';
import './flight-info.scss';

let flightInfoComponent = {
	bindings: {
		flight: "=",
		toggled: '=',
		notification: "=",
		toggle: "&"
	},
	template,
	controller,
	controllerAs: 'fiVm'
};

export default flightInfoComponent;
