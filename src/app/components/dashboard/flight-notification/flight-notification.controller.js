class FlightNotificationController {
	constructor($mdToast, FlightNotification) {
		'ngInject';
		this.$mdToast = $mdToast;
		this.flightNotification = FlightNotification;
		this.selectedFlights = FlightNotification.selectedFlights;
	}

	closeToast() {
		this.$mdToast.hide();
		this.flightNotification.toastIsOpen = false;
		this.flightNotification.initAll();
	}

	dismiss(flight) {
		this.flightNotification.initFlight(flight);
		if (!this.flightNotification.stillNotifications()) this.closeToast();
	}
}

export default FlightNotificationController;