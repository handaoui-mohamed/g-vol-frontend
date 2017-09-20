import FlightSelectionDialogController from '../dialogs/flight-selection/flight-selection.controller';
import dialogTemplate from '../dialogs/flight-selection/flight-selection.html';

class FlightsNavBarController {
	constructor($rootScope, $window, $scope, $filter, $mdDialog, SocketService, FlightNotification, OffloadReport) {
		'ngInject';
		this.$root = $rootScope;
		this.$window = $window;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.$filter = $filter;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
		this.offloadReport = OffloadReport;
	}

	$onInit() {
		// initilize selectedFlights and openFlights if $rootScope has the values
		// this is usefull when changing states, everything will be saved
		// so returning to flight tracking with the same selected flights
		if (this.$root.selectedFlights) this.selectedFlights = this.$root.selectedFlights;
		if (this.$root.openedFlights) this.openedFlights = this.$root.openedFlights;

		// listen to flight member join and add it to the current flight team
		this.socket.on("joined", (data) => {
			data = JSON.parse(data); // parse the data with JSON
			// get current flight which the account joined
			let flight = this.selectedFlights.find(selecteFlight => data.flightId === selecteFlight._id);
			if (flight) {
				this.$scope.$apply(() => {
					flight.team[data.account._id] = data.account; // add the new member to the team
				});
			}
		});

		// listen for reconnected event, when losing connection with server
		this.socket.on("connected", (data) => {
			// if flights are selected, emit an event that the socket reconnected by sending all selected
			// flight IDs to the server
			if (this.selectedFlights.length > 0)
				this.socket.emit('socket-reconnected', JSON.stringify(this.getSelectedFlightIds()));
			// Rejoin the flights if they are initilized
			angular.forEach(this.selectedFlights, (flight) => {
				if (flight.initilized) this.socket.emit('flightId', flight._id);
			})
		});


		this.ListenForReconnectionData();
	}

	// listen for socket reconnection data response containing 
	// update selected flights all when sending the selected flight IDs
	ListenForReconnectionData() {
		this.socket.on("reconnected", (data) => {
			let flights = JSON.parse(data);
			if (flights && flights.length > 0) {
				this.$scope.$apply(() => {
					// iterate all flights recieved
					angular.forEach(flights, (flight) => {
						// get the matching selected flight
						let selectedFlight = this.selectedFlights.find(flt => flt._id === flight._id);
						if (selectedFlight) {
							// update selected flight data
							angular.forEach(flight, (value, key) => {
								selectedFlight[key] = flight[key];
							});
							// fetch latest selected flight messages and team members
							this.$root.$broadcast("messages" + flight._id);
							this.$root.$broadcast("team" + flight._id);

							// generate offload report from offload list
							if (flight.offloadList)
								flight.offloadReport = this.offloadReport.generate(flight.offloadList);
						}
					})
				});
			}
		});
	}

	// get selected flight IDs
	getSelectedFlightIds() {
		return this.selectedFlights.map(flight => flight._id);
	}

	// toggle flight to hide/close, and change openFlights count
	toggleFlight(flight) {
		flight.opened = !flight.opened;
		if (flight.opened) this.openedFlights++;
		else this.openedFlights--;
		// save opened flights count in $rootScope
		this.$root.openedFlights = this.openedFlights;
	}

	// flight selection dialog
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
			// save selected flights in $rootScope			
			this.$root.selectedFlights = this.selectedFlights;
			// initilize flight notification flights
			this.flightNotification.initSelectedFlights(this.selectedFlights);
		}, (msg) => { });
	}
}

export default FlightsNavBarController;