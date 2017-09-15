class DashboardController {
	constructor($rootScope) {
		'ngInject';
		$rootScope.hideTopBG = true;
	}

	$onInit() {
		this.selectedFlights = [];
		this.openedFlights = 0;
	}

	openFlights() {
		return this.selectedFlights.filter(flight => flight.opened);
	}
}

export default DashboardController;
