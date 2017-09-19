import FlightTeamDialog from './components/team-dialog/team-dialog.controller';
import dialogTemplate from './components/team-dialog/team-dialog.html';

class FlightTrackerController {
	constructor($rootScope, $mdDialog, $filter, FlightService, FlightTeamService, DocumentService, SocketService, FlightStatusService) {
		'ngInject';
		this.$root = $rootScope;
		this.$mdDialog = $mdDialog;
		this.$translate = $filter('translate');
		this.socket = SocketService.io;
		this.flightService = FlightService;
		this.flightStatusService = FlightStatusService;
		this.flightTeamService = FlightTeamService;
		this.documentService = DocumentService;
	}

	$onInit() {
		this.documents = [];
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

		if (this.flight.status !== "new")
			this.joinFlight();
	}

	initFlight() {
		if (this.flight.status === "new") {
			this.joinFlight(() => {
				this.documentService.save({ flightId: this.flight._id }, {}, (updatedFlight) => {
					angular.forEach(updatedFlight, (value, key) => {
						if (key !== 'team') this.flight[key] = updatedFlight[key];
					});
					this.$root.$broadcast('documents' + this.flight._id, false);
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
			else
				this.$root.$broadcast('documents' + this.flight._id, true);
		});
	}

	convertTeamArrayToObject(flightTeam) {
		let team = {};
		angular.forEach(flightTeam, (account) => {
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
			.title(this.$translate('FLIGHTSTATUS.CONFIRMATION'))
			.textContent(this.$translate('FLIGHTSTATUS.ADDCOMMENT'))
			.placeholder(this.$translate('FLIGHTSTATUS.COMMENT'))
			.ariaLabel('Comment')
			.initialValue(this.flight.comment)
			.targetEvent(ev)
			.parent(angular.element(document.querySelector('#flight-' + this.flight._id)))
			.clickOutsideToClose(true)
			.ok(this.$translate('FLIGHTSTATUS.CLOSE'))
			.cancel(this.$translate('CANCEL'));

		this.$mdDialog.show(confirm).then((comment) => {
			this.flightStatusService.save({ flightId: this.flight._id }, { status: 'done', comment },
				(data) => {
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