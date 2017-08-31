import template from './flight-tracker.html';
import controller from './flight-tracker.controller';
import './flight-tracker.scss';

let flightTrackerComponent = {
	bindings: {
		flight: "="
	},
	template,
	controller,
	controllerAs: 'ftVm'
};

export default flightTrackerComponent;
