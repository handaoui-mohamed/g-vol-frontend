class FlightNotificationController {
	constructor($mdToast, FlightNotification) {
		'ngInject';
		this.$mdToast = $mdToast;
		this.flightNotification = FlightNotification;
		this.selectedFlights = FlightNotification.selectedFlights;
	}

	closeToast() {
		this.$mdToast.hide();
		this.flightNotification.toastIsOpen = false; // set toast open to false
		this.flightNotification.initAll(); // init all flights notification when closing
	}

	// when clicking on a flight notification, dismiss it 
	dismiss(flight) {
		this.flightNotification.initFlight(flight);
		// if not flight notification are left close the toast
		if (!this.flightNotification.stillNotifications()) this.closeToast();
	}
}

export default FlightNotificationController;