import template from './flight-progress.html';
import controller from './flight-progress.controller';
import './flight-progress.scss';

let flightProgressComponent = {
	bindings: {
		flight: "=",
		timeLeft: "=",
		documents: "="
	},
	template,
	controller,
	controllerAs: 'fpVm'
};

export default flightProgressComponent;
