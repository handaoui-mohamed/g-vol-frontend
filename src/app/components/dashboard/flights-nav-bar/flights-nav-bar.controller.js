import FlightSelectionDialogController from '../dialogs/flight-selection/flight-selection.controller';
import dialogTemplate from '../dialogs/flight-selection/flight-selection.html';

class FlightsNavBarController {
	constructor($scope, $mdDialog, SocketService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
	}

	$onInit() {
		this.socket.on("joined", (data) => {
			data = JSON.parse(data);
			let flight = this.selectedFlights.find(selecteFlight => data.flightId === selecteFlight._id);
			if (flight) {
				this.$scope.$apply(() => {
					flight.team[data.account._id] = data.account;
				});
			}
		});
	}

	toggleFlight(flight) {
		flight.opened = !flight.opened;
		if (flight.opened) this.openedFlights++;
		else this.openedFlights--;
	}

	openFlightSelectionDialog(ev) {
		this.$mdDialog.show({
			controller: FlightSelectionDialogController,
			controllerAs: 'fldVm',
			template: dialogTemplate,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: true,
			locals: {
				SelectedFlights: this.selectedFlights
			}
		}).then((selectedFlights) => {
			this.selectedFlights = angular.copy(selectedFlights || []);
		}, (msg) => { });
	}
}

export default FlightsNavBarController;