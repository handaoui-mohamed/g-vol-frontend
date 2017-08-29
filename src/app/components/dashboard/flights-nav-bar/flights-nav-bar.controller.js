class FlightsNavBarController {
	constructor() {
		this.selectedFlights = {};
	}

	toggleFlight(flightId) {
		this.selectedFlights[flightId] = !this.selectedFlights[flightId];
	}
}

export default FlightsNavBarController;