class DashboardController {
	constructor($rootScope) {
		'ngInject';
		$rootScope.hideTopBG = true;
	}

	$onInit() {
		this.selectedFlights = [];
		this.openedFlights = 0;
	}
}

export default DashboardController;
