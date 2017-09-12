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
				documentState: false,
				other: false
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

	// flights notification
	newFlightInfo(flightId) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.flightInfo = true;
			selectedFlight.showNotification = true;
			if (!this.toastIsOpen) this.openToast();
		}
	}

	initFlightInfo(flightId) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.flightInfo = false;
			this.shouldCloseToast(selectedFlight);
		}
	}

	// baggage report notification
	newBaggageReport(flightId) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.baggageReport = true;
			selectedFlight.showNotification = true;
			if (!this.toastIsOpen) this.openToast();
		}
	}

	initBaggageReport(flightId) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.baggageReport = false;
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
		flight.documentState = false;
		flight.other = false;
		flight.showNotification = false;
	}

	shouldCloseNotification(selectedFlight) {
		return (
			selectedFlight &&
			selectedFlight.messages === 0 &&
			!selectedFlight.flightInfo &&
			!selectedFlight.baggageReport
		)
	}

	stillNotifications() {
		return this.selectedFlights.find((flight) => flight.showNotification);
	}

	shouldCloseToast(selectedFlight) {
		selectedFlight.showNotification = !this.shouldCloseNotification(selectedFlight);
		if (!this.stillNotifications()) this.$mdToast.hide();
	}
}

export default FlightNoticationService;