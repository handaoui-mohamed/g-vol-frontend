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
		this.status = [{
			translate: 'FLIGHT.STATUS.NEW',
			value: 'new'
		}, {
			translate: 'FLIGHT.STATUS.INPROGRESS',
			value: 'inprogress'
		}, {
			translate: 'FLIGHT.STATUS.DONE',
			value: 'done'
		}];

		this.flight.formattedSta = this.insert(this.flight.sta, 2, ':');
		this.flight.formattedStd = this.insert(this.flight.std, 2, ':');
		if (this.flight.status !== "new") {
			this.joinFlight();
			this.flight.queryDocuments = true;
		}
	}

	initFlight() {
		if (this.flight.status === "new") {
			this.joinFlight(() => {
				this.documentsService.save({ flightId: this.flight._id }, {}, (updatedFlight) => {
					for (var key in updatedFlight) {
						if (updatedFlight.hasOwnProperty(key)) {
							if (key !== 'team') this.flight[key] = updatedFlight[key];
						}
					}
				});
			});
		}
	}

	joinFlight(callback) {
		this.flightTeamService.save({ flightId: this.flight._id }, {}, (team) => {
			this.flight.team = this.convertTeamArrayToObject(team);
			this.socket.emit('flightId', this.flight._id);
			this.flight.initilized = true;
			if (typeof callback === "function") callback();
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

	openFlightStatusDialog(ev) {
		console.log('here')
		let confirm = this.$mdDialog.prompt()
			.title('Are you sure you want to close this flight?')
			.textContent('Add a comment if needed:')
			.placeholder('Comment')
			.ariaLabel('Comment')
			.initialValue('')
			.targetEvent(ev)
			.parent(angular.element(document.querySelector('#flight-' + this.flight._id)))
			.ok('Close Fligth')
			.cancel('Cancel');

		this.$mdDialog.show(confirm).then((result) => {
			console.log(result);
			// this.flightService.update({ flightId: this.flight._id }, (data) => {

			// }, (error) => { this.toast.error(error) });
		}, () => { });
	}
}

export default FlightTrackerController;