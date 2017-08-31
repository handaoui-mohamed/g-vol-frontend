import template from './flights-nav-bar.html';
import controller from './flights-nav-bar.controller';
import './flights-nav-bar.scss';

let flightsNavBarComponent = {
	bindings: {
		selectedFlights: '='
	},
	template,
	controller,
	controllerAs: 'tabVm'
};

export default flightsNavBarComponent;
