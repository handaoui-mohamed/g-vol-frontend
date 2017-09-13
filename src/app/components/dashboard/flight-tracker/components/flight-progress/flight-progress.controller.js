class FlightProgressController {
	constructor() { }

	$onInit() {
		this.flight.formattedSta = this.insert(this.flight.sta, 2, ':');
		this.flight.formattedStd = this.insert(this.flight.std, 2, ':');
	}

	insert(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
	}
}

export default FlightProgressController;