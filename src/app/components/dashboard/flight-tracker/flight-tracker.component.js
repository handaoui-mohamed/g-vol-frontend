import template from './flight-tracker.html';
import controller from './flight-tracker.controller';
import './flight-tracker.scss';

let flightTrackerComponent = {
	bindings: {},
	template,
	controller,
	controllerAs: 'flight'
};

export default flightTrackerComponent;
