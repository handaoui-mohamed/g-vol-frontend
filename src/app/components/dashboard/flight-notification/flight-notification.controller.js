class FlightNotificationController {
	constructor($mdToast, FlightNotification) {
		'ngInject';
		this.$mdToast = $mdToast;
		this.flightNotification = FlightNotification;
		this.selectedFlights = [
			{ _id: "flight id", flightNumber: "QR54654", messages: 120, flightInfo: true, baggageReport: true },
			{ _id: "flight id2", flightNumber: "FR46548", messages: 220, flightInfo: false, baggageReport: true }
		]
	}

	closeToast() {
		this.$mdToast.hide()
	}

	dismiss(index) {
		this.selectedFlights.splice(index, 1);
		if(this.selectedFlights.length === 0) this.closeToast();
	}
}

export default FlightNotificationController;