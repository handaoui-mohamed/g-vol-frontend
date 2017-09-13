import template from './flight-progress.html';
import controller from './flight-progress.controller';
import './flight-progress.scss';

let flightProgressComponent = {
	bindings: {
		flight: "="
	},
	template,
	controller,
	controllerAs: 'fpVm'
};

export default flightProgressComponent;
