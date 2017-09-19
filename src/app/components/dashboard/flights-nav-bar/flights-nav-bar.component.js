import template from './flights-nav-bar.html';
import controller from './flights-nav-bar.controller';
import './flights-nav-bar.scss';

// flights selection bar
let flightsNavBarComponent = {
	bindings: {
		selectedFlights: '=',	// selected flights array
		openedFlights: '='		// open flights count
	},
	template,
	controller,
	controllerAs: 'tabVm'
};

export default flightsNavBarComponent;
