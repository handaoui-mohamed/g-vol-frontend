import FlightTeamDialog from './components/team-dialog/team-dialog.controller';
import dialogTemplate from './components/team-dialog/team-dialog.html';

class FlightTrackerController {
	constructor($mdDialog, FlightService, FlightTeamService, DocumentService, SocketService, FlightStatusService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.socket = SocketService.io;
		this.flightService = FlightService;
		this.flightStatusService = FlightStatusService;
		this.flightTeamService = FlightTeamService;
		this.documentService = DocumentService;
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

		if (this.flight.status !== "new") {
			this.joinFlight();
			this.flight.queryDocuments = true;
		}
	}

	initFlight() {
		if (this.flight.status === "new") {
			this.joinFlight(() => {
				this.documentService.save({ flightId: this.flight._id }, {}, (updatedFlight) => {
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
		let confirm = this.$mdDialog.prompt()
			.title('Are you sure you want to close this flight?')
			.textContent('Add a comment if needed:')
			.placeholder('Comment')
			.ariaLabel('Comment')
			.initialValue(this.flight.comment)
			.targetEvent(ev)
			.parent(angular.element(document.querySelector('#flight-' + this.flight._id)))
			.clickOutsideToClose(true)
			.ok('Close Flight')
			.cancel('Cancel');

		this.$mdDialog.show(confirm).then((comment) => {
			this.flightStatusService.save({ flightId: this.flight._id }, { status: 'done', comment },
				(data) => {
					console.log(data);
					this.flight.comment = data.comment;
					this.flight.status = data.status;
				}, (error) => { this.toast.serverError(error) });
		}, () => { });
	}

	reopenFlight() {
		this.flightStatusService.save({ flightId: this.flight._id }, { status: 'inprogress' },
			(data) => {
				this.flight.status = data.status;
			}, (error) => { this.toast.serverError(error) });
	}
}

export default FlightTrackerController;