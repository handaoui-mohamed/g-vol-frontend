class flightController {
	// similaire comments are found in account
	constructor($state, $stateParams, FlightService, CompanyService, Toast) {
		'ngInject';
		this.$state = $state;
		this.flightService = FlightService;
		this.companyService = CompanyService;
		this.toast = Toast;
		this.flightId = $stateParams.flightId;
	}

	$onInit() {
		this.flight = {};
		this.companies = [];
		if (this.flightId) this.getSelectedFlight();
		this.getCompanies();
	}

	getSelectedFlight() {
		this.flightService.get({ flightId: this.flightId }, (data) => {
			this.flight = data;
			this.isUpdate = true;
		}, (error) => { this.toast.serverError(error); });
	}

	getCompanies() {
		this.companyService.query((data) => {
			this.companies = data;
		}, (error) => { this.toast.serverError(error); });
	}

	submit() {
		this.isUpdate ? this.update() : this.save();
	}

	save() {
		this.flightService.save(this.flight, (data) => {
			this.toast.success('Flight was saved successfully', 'FLIGHT.SAVED');
			this.$state.go('home.flights');
		}, (error) => { this.toast.serverError(error); });
	}

	update() {
		this.flightService.update({ flightId: this.flightId }, this.flight, (data) => {
			this.toast.success('Flight was updated successfully', 'FLIGHT.UPDATED');
			this.$state.go('home.flights');
		}, (error) => { this.toast.serverError(error); });
	}
}

export default flightController;
