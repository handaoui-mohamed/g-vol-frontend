import './flight-selection.scss';

class flightSelectionController {
	constructor($mdDialog, $filter, Toast, FlightService, SelectedFlights) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$translate = $filter('translate');
		this.selectedFlights = angular.copy(SelectedFlights);
		this.flightService = FlightService;
		this.toast = Toast;

		// Initilization
		this.flights = [];
		this.selectedStatus = ['new', 'inprogress'];
		this.queryString = "";
		this.query = {
			page: 1,
			limit: 5
		};
		this.status = [{
			translate: 'FLIGHT.STATUS.NEW',
			value: 'new'
		}, {
			translate: 'FLIGHT.STATUS.INPROGRESS',
			value: 'inprogress'
		}, {
			translate: 'FLIGHT.STATUS.DONE',
			value: 'done'
		}];
		let today = new Date();
		this.selectedArrivalDates = { start: today };
		this.selectedDepartureDates = { start: today };
		this.getFlights();
	}

	submit() {
		this.$mdDialog.hide(this.selectedFlights);
	}

	cancel() {
		this.$mdDialog.cancel();
	}

	getFlights() {
		let skip = (this.query.page - 1) * this.query.limit;
		let limit = this.query.limit;
		let q = this.queryString;
		let status = this.selectedStatus.length > 0 ? this.selectedStatus : null;
		let query = {
			skip,
			limit,
			q,
			status,
			arrivalstart: this.selectedArrivalDates.start,
			arrivalend: this.selectedArrivalDates.end,
			departurestart: this.selectedDepartureDates.start,
			departureend: this.selectedDepartureDates.end,
		};

		this.promise = this.flightService.query(query, (data) => {
			this.flights = data;
			this.initSelection();
		}, (error) => { this.toast.serverError(error); }).$promise;
	}

	searchFlights() {
		this.query.page = 1;
		this.getFlights();
	}

	// toggle flight selection
	toggleSelection(flight) {
		// find the flight index from selected flights
		let flightIndex = this.selectedFlights.findIndex((selectedFlight) => {
			return selectedFlight._id === flight._id;
		});

		// if flight is selected but not is in the array push it
		if (flightIndex === -1 && flight.selected) {
			this.selectedFlights.push(flight);
		} else
			// if flight was unselected and existe in the array remove it
			if (flightIndex !== -1 && !flight.selected) {
				this.selectedFlights.splice(flightIndex, 1);
			}
	}

	// when opening flight selection dialog, set the selected flight ckeckbox to true
	initSelection() {
		angular.forEach(this.selectedFlights, (selectedFlight) => {
			this.flights = this.flights.map((flight) => {
				if (flight._id === selectedFlight._id) flight.selected = true;
				return flight;
			})
		})
	}

	// show all selected flights
	showSelectedFlights() {
		this.show = !this.show;
		if (this.show) {
			this.flights = this.selectedFlights;
			this.query.page = 1;
		} else
			this.getFlights();
	}
}

export default flightSelectionController;

