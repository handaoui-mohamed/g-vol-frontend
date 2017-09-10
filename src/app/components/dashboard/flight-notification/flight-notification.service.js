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
		this.openedToasts = [];
	}

	openToast(flight) {
		this.$mdToast.show(this.toastConfig);
	}

	initSelectedFlights(flights) {
		this.closeAll();
		this.selectedFlights = flights.map((flight) => {
			return {
				_id: flight._id,
				flightNumber: flight.flightNumber,
				messages: 0,
				flightInfo: false,
				baggageReport: false
			}
		});
	}

	newMessage(flight) {
		let selectedFlight = this.getSelectedFlight(flight);
		if (selectedFlight) selectedFlight.messages++;
	}

	initMessages(flight) {
		let selectedFlight = this.getSelectedFlight(flight);
		if (selectedFlight) selectedFlight.messages = 0;
	}

	newFlightInfo(flight) {
		let selectedFlight = this.getSelectedFlight(flight);
		if (selectedFlight) selectedFlight.flightInfo = true;
	}

	initFlightInfo(flight) {
		let selectedFlight = this.getSelectedFlight(flight);
		if (selectedFlight) selectedFlight.flightInfo = false;
	}

	newBaggageReport(flight) {
		let selectedFlight = this.getSelectedFlight(flight);
		if (selectedFlight) selectedFlight.baggageReport = true;
	}

	initBaggageReport(flight) {
		let selectedFlight = this.getSelectedFlight(flight);
		if (selectedFlight) selectedFlight.baggageReport = false;
	}

	getSelectedFlight(flight) {
		return this.selectedFlights.find(flt => flt._id === flight._id);
	}

	closeAll() {

	}
}

export default FlightNoticationService;