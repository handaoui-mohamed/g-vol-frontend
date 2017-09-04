class FlightTrackerController {

	$onInit() {
		this.flight.formatedSta = this.insert(this.flight.sta, 2, ":");
	}

	reducePanel() {
		this.flight.opened = false;
		this.openedFlights--;
	}

	insert(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
	}
}

export default FlightTrackerController;