import FlightSelectionDialogController from '../dialogs/flight-selection/flight-selection.controller';
import dialogTemplate from '../dialogs/flight-selection/flight-selection.html';

class FlightsNavBarController {
	constructor($scope, $mdDialog, SocketService, FlightTeamService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.socket = SocketService.io;
		this.flightTeamService = FlightTeamService;
		this.$scope = $scope;
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
		})
			.then((selectedFlights) => {
				this.selectedFlights = selectedFlights;
				this.selectedFlights.forEach((flight) => {
					this.flightTeamService.save({ flightId: flight._id }, {}, (team) => {
						flight.team = this.convertTeamArrayToObject(team);
						this.joinFlight(flight._id);
					});
				})
			});
	}

	joinFlight(flightId) {
		this.socket.emit('flightId', flightId)
	}

	convertTeamArrayToObject(flightTeam) {
		let team = {};
		flightTeam.forEach((account) => {
			team[account._id] = account;
		});
		return team;
	}
}

export default FlightsNavBarController;