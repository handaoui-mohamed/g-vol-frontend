import FlightTeamDialog from './components/team-dialog/team-dialog.controller';
import dialogTemplate from './components/team-dialog/team-dialog.html';

class FlightTrackerController {
	constructor($rootScope, $mdDialog, $filter, Toast, FlightService, FlightTeamService, DocumentService, SocketService, FlightStatusService) {
		'ngInject';
		this.$root = $rootScope;
		this.$mdDialog = $mdDialog;
		this.$translate = $filter('translate');
		this.toast = Toast;
		this.socket = SocketService.io;
		this.flightService = FlightService;
		this.flightStatusService = FlightStatusService;
		this.flightTeamService = FlightTeamService;
		this.documentService = DocumentService;
	}

	$onInit() {
		this.documents = [];
		// if the flight was initilized join the flight, else initFlight with button
		if (this.flight.status !== "new")
			this.joinFlight();
	}

	// initilize new flight and its documents with company checklist and join the flight
	initFlight() {
		if (this.flight.status === "new") {
			this.joinFlight(() => {
				this.documentService.save({ flightId: this.flight._id }, {}, (updatedFlight) => {
					// update flight documents after initilizing them
					angular.forEach(updatedFlight, (value, key) => {
						if (key !== 'team') this.flight[key] = updatedFlight[key];
					});
					// broadcast an event that documents were initilized
					this.$root.$broadcast('documents' + this.flight._id, false);
				});
			});
		}
	}

	// function to join flight, has a callback if needed when flight is new
	joinFlight(callback) {
		this.flightTeamService.save({ flightId: this.flight._id }, {}, (team) => {
			// convert team array to object for easy access and maintaining 
			// unique team member using member ID as object key
			this.flight.team = this.convertTeamArrayToObject(team);
			// emit to server socket to join the flight
			this.socket.emit('flightId', this.flight._id);
			this.flight.initilized = true;
			if (typeof callback === "function") callback(); // execute callback if provided
			else
				// broadcast an event that documents were initilized
				this.$root.$broadcast('documents' + this.flight._id, true);
		});
	}

	/**
	 * @param {Array[string]} flightTeam 
	 * @return {Object: flightTeam}
	 * @desc convert team array to object for easy access and maintaining 
	 * 		 unique team member using member ID as object key
	 */
	convertTeamArrayToObject(flightTeam) {
		let team = {};
		angular.forEach(flightTeam, (account) => {
			team[account._id] = account;
		});
		return team;
	}

	// close flight tracker panel, and decrement open flights count
	reducePanel() {
		this.flight.opened = false;
		this.openedFlights--;
	}

	// open dialog containg current flight team member
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

	// opens flight status dialog to close it, contains comment input
	openFlightStatusDialog(ev) {
		// Baggage report, flight info are required to close the flight
		if (this.flight.baggageReport.status &&
			this.flight.flightInfo.status) {
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
				// saves flight with status done, and comment if added
				this.flightStatusService.save({ flightId: this.flight._id }, { status: 'done', comment }, (data) => {
					this.flight.comment = data.comment;
					this.flight.status = data.status;
				}, (error) => { this.toast.serverError(error) });
			}, () => { });
		} else
			this.toast.warning(this.$translate('FLIGHTSTATUS.INCOMPLETE'))
	}

	// reopen closed flight
	reopenFlight() {
		this.flightStatusService.save({ flightId: this.flight._id }, { status: 'inprogress' }, (data) => {
			this.flight.status = data.status;
		}, (error) => { this.toast.serverError(error) });
	}
}

export default FlightTrackerController;