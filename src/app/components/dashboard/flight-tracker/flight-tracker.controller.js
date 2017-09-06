import FlightTeamDialog from './components/team-dialog/team-dialog.controller';
import dialogTemplate from './components/team-dialog/team-dialog.html';

class FlightTrackerController {
	constructor($mdDialog, DocumentsService, SocketService, FlightTeamService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.socket = SocketService.io;
		this.flightTeamService = FlightTeamService;
		this.documentsService = DocumentsService;
	}

	$onInit() {
		this.flight.formattedSta = this.insert(this.flight.sta, 2, ':');
		this.flight.formattedStd = this.insert(this.flight.std, 2, ':');
		if (this.flight.status !== "new") {
			this.joinFlight();
			this.flight.queryDocuments = true;
		}
	}

	initFlight() {
		if (this.flight.status === "new") {
			this.documentsService.save({ flightId: this.flight._id }, {}, (updatedFlight) => {
				for (var key in updatedFlight) {
					if (updatedFlight.hasOwnProperty(key)) {
						this.flight[key] = updatedFlight[key];
					}
				}
				this.joinFlight();
			});
		}
	}

	joinFlight() {
		this.flightTeamService.save({ flightId: this.flight._id }, {}, (team) => {
			this.flight.team = this.convertTeamArrayToObject(team);
			this.socket.emit('flightId', this.flight._id);
			this.flight.initilized = true;
		});
	}

	convertTeamArrayToObject(flightTeam) {
		let team = {};
		flightTeam.forEach((account) => {
			team[account._id] = account;
		});
		return team;
	}

	reducePanel() {
		this.flight.opened = false;
		this.openedFlights--;
	}

	insert(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
	}

	openFlightTeam(ev) {
		this.$mdDialog.show({
			controller: FlightTeamDialog,
			controllerAs: 'teamVm',
			template: dialogTemplate,
			parent: angular.element(document.querySelector('#flight-' + this.flight._id)),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: true,
			locals: {
				Team: this.flight.team,
				FlightId: this.flight._id
			}
		}).then((team) => { }, (msg) => { });
	}
}

export default FlightTrackerController;