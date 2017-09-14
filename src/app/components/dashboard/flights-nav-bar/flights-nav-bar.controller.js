import FlightSelectionDialogController from '../dialogs/flight-selection/flight-selection.controller';
import dialogTemplate from '../dialogs/flight-selection/flight-selection.html';

class FlightsNavBarController {
	constructor($window, $scope, $filter, $mdDialog, SocketService, FlightNotification, MessageService) {
		'ngInject';
		this.$window = $window;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.$filter = $filter;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
		this.messageService = MessageService;
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

		// for reconnection
		this.socket.on("connected", (data) => {
			if (this.selectedFlights.length > 0)
				this.socket.emit('socket-reconnected', JSON.stringify(this.getSelectedFlightIds()));
			this.selectedFlights.forEach((flight) => {
				if (flight.initilized) this.socket.emit('flightId', flight._id);
			})
		});

		this.ListenForReconnectionData();
	}

	ListenForReconnectionData() {
		this.socket.on("reconnected", (data) => {
			let flights = JSON.parse(data);
			if (flights.length > 0) {
				this.$scope.$apply(() => {
					flights.forEach((flight) => {
						let selectedFlight = this.selectedFlights.find(flt => flt._id === flight._id);
						if (selectedFlight) {
							for (var key in flight) {
								if (flight.hasOwnProperty(key)) {
									selectedFlight = flight[key];
								}
							}
							this.getFlightMessages(flight._id);
						}
					})
				});
			}
		});
	}

	getFlightMessages(flightId) {
		this.messageService.query({ flightId, skip: 0, limit: 20 }, (messages) => {
			let flight = this.selectedFlights.find(flt => flt._id === flightId);
			if (flight) {
				flight.messages = [];
				flight.messages.unshift(...messages.map((message) => {
					message.sentAt = this.$filter('date')(new Date(message.createdAt), 'dd/MM HH:mm');
					return message;
				}));
			}
		}, (error) => { this.toast.serverError(error); });
	}

	getSelectedFlightIds() {
		return this.selectedFlights.map(flight => flight._id);
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
			this.flightNotification.initSelectedFlights(this.selectedFlights);
		}, (msg) => { });
	}
}

export default FlightsNavBarController;