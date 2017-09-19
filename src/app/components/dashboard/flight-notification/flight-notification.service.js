import FlightNotificationController from './flight-notification.controller';
import flightNotificationTemplate from './flight-notification.html';
import './flight-notification.scss';

class FlightNoticationService {
	constructor($mdToast) {
		'ngInject';
		this.$mdToast = $mdToast;
		// toast configuration object
		this.toastConfig = {
			hideDelay: 0,
			position: 'bottom right',
			controller: FlightNotificationController,
			controllerAs: 'toastVm',
			template: flightNotificationTemplate
		};
		// initilisations
		this.selectedFlights = [];
		this.toastIsOpen = false;
	}

	/**
	 * @desc open toast with the provides configurations, and set toast is open to true
	 */
	openToast() {
		this.$mdToast.show(this.toastConfig);
		this.toastIsOpen = true;
	}

	/**
	 * @param {Array[Flight]} flights 
	 * @desc clear all previous selected flights notification, and initilize the new ones in selected flights array
	 */
	initSelectedFlights(flights) {
		this.clearAll();
		angular.forEach(flights, (flight) => {
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

	/**
	 * @param {string} flightId 
	 */
	newMessage(flightId) {
		// get flight by its ID
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.messages++;				// increment new messages count
			selectedFlight.showNotification = true;	// show notification if they ware hidden
			if (!this.toastIsOpen) this.openToast();// if toast is closed, open it
		}
	}

	initMessages(flightId) {
		// get flight by its ID		
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight.messages = 0;			// reset new messages count
			this.shouldCloseToast(selectedFlight);	// check if no other notification for this flight, then close it
		}
	}

	/**
	 * 
	 * @param {string} flightId 
	 * @param {string: valid('baggageReport', 'flightInfo', 'paxReport', 'offloadReport', 'documentState')} type 
	 * 
	 * @desc get the selected flight, sets document value to true and shows the notification toast
	 */
	documentUpdate(flightId, type) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight[type] = true;
			selectedFlight.showNotification = true;
			if (!this.toastIsOpen) this.openToast();
		}
	}

	// initilize flight document notification
	initDocument(flightId, type) {
		let selectedFlight = this.getSelectedFlight(flightId);
		if (selectedFlight) {
			selectedFlight[type] = false;
			this.shouldCloseToast(selectedFlight);
		}
	}

	// get flight by its ID
	getSelectedFlight(flightId) {
		return this.selectedFlights.find(flt => flt._id === flightId);
	}

	// clear all selected flights by splicing, to keep the current object reference
	clearAll() {
		this.selectedFlights.splice(0, this.selectedFlights.length);
	}

	// initilize all selected flights notification
	initAll() {
		angular.forEach(this.selectedFlights, (flight) => {
			this.initFlight(flight);
		});
	}

	// initilize flight notification
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

	// check if selected flight has any notification left
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

	// check if any flight has notifications
	stillNotifications() {
		return this.selectedFlights.find((flight) => flight.showNotification);
	}

	// check if we should close the toast if there are no more notification for the selected flight
	shouldCloseToast(selectedFlight) {
		selectedFlight.showNotification = !this.shouldCloseNotification(selectedFlight);
		if (!this.stillNotifications()) {
			this.$mdToast.hide();
			this.toastIsOpen = false;
		}
	}
}

export default FlightNoticationService;