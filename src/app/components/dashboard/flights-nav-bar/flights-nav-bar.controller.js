class FlightsNavBarController {
	constructor() {
		this.selectedFlights = {};
	}

	$onInit() {
		this.flights = [
			{ _id: 'id1', flightNumber: 'QR1027' },
			{ _id: 'id2', flightNumber: 'AF0024' },
			{ _id: 'id3', flightNumber: 'LH3655' }
		]
	}

	toggleFlight(flightId) {
		this.selectedFlights[flightId] = !this.selectedFlights[flightId];
	}
}

export default FlightsNavBarController;