import FlightNotificationController from './flight-notification.controller';
import flightNotificationTemplate from './flight-notification.html';
import './flight-notification.scss';

class FlightNoticationService {
	constructor($mdToast) {
		'ngInject';
		this.$mdToast = $mdToast;
		this.toastConfig = {
			hideDelay: 0,
			position: 'bottom right',
			controller: FlightNotificationController,
			controllerAs: 'toastVm',
			template: flightNotificationTemplate
		}
		this.selectedFlights = [];
		this.toastIsOpen = false;
	}

	openToast() {
		this.$mdToast.show(this.toastConfig);
		this.toastIsOpen = true;
	}

	initSelectedFlights(flights) {
		this.clearAll();
		flights.forEach((flight) => {
			this.selectedFlights.push({
				_id: flight._id,
				flightNumber: flight.flightNumber,
				messages: 0,
				flightInfo: false,
				baggageReport: false,
				paxReport: false,
				offloadReport: false,
				documentState: false
			})
		});
	}

	// messages notification
	newMessage(flightId) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.messages++;
			selectedFlight.showNotification = true;
			if (!this.toastIsOpen) this.openToast();
		}
	}

	initMessages(flightId) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.messages = 0;
			this.shouldCloseToast(selectedFlight);
		}
	}

	// document notification
	documentUpdate(flightId, type) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight[type] = true;
			selectedFlight.showNotification = true;
			if (!this.toastIsOpen) this.openToast();
		}
	}

	initDocument(flightId, type) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight[type] = false;
			this.shouldCloseToast(selectedFlight);
		}
	}

	getSelectedFlight(flightId) {
		return this.selectedFlights.find(flt => flt._id === flightId);
	}

	clearAll() {
		this.selectedFlights.splice(0, this.selectedFlights.length);
	}

	initAll() {
		angular.forEach(this.selectedFlights, (flight) => {
			this.initFlight(flight);
		});
	}

	initFlight(flight) {
		flight.messages = 0;
		flight.flightInfo = false;
		flight.baggageReport = false;
		flight.paxReport = false;
		flight.offloadReport = false;
		flight.documentState = false;
		flight.other = false;
		flight.showNotification = false;
	}

	shouldCloseNotification(selectedFlight) {
		return (
			selectedFlight &&
			selectedFlight.messages === 0 &&
			!selectedFlight.flightInfo &&
			!selectedFlight.baggageReport &&
			!selectedFlight.paxReport &&
			!selectedFlight.offloadReport &&
			!selectedFlight.documentState
		)
	}

	stillNotifications() {
		return this.selectedFlights.find((flight) => flight.showNotification);
	}

	shouldCloseToast(selectedFlight) {
		selectedFlight.showNotification = !this.shouldCloseNotification(selectedFlight);
		if (!this.stillNotifications()) {
			this.$mdToast.hide();
			this.toastIsOpen = false;
		}
	}
}

export default FlightNoticationService;