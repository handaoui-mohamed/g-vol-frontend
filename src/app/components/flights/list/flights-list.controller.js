import FlightDialogController from '../dialogs/flight-dialog/flight-dialog.controller';
import template from '../dialogs/flight-dialog/flight-dialog.html';

class FlightsListController {
  constructor($mdDialog, $filter, FlightService, CompanyService, Toast) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$translate = $filter('translate');
    this.flightService = FlightService;
    this.companyService = CompanyService;
    this.toast = Toast;
  }

  $onInit() {
    this.flights = [];
    this.companies = [];
    this.selectedStatus = [];
    this.queryString = "";
    this.query = {
      page: 1,
      limit: 10
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
    this.selectedArrivalDates = {};
    this.selectedDepartureDates = {};
    this.getCompanies();
    this.getFlights();
    this.getFlightsCount();
  }

  getFlights() {
    let skip = (this.query.page - 1) * this.query.limit;
    let limit = this.query.limit;
    let q = this.queryString;
    let status = this.selectedStatus.length > 0 ? this.selectedStatus : null;
    this.promise = this.flightService.query({
      skip,
      limit,
      q,
      status,
      arrivalstart: this.selectedArrivalDates.start,
      arrivalend: this.selectedArrivalDates.end,
      departurestart: this.selectedDepartureDates.start,
      departureend: this.selectedDepartureDates.end,
    }, (data) => {
      this.flights = data;
      this.companyPromise.then(() => this.mapFlightsToCompanies());
    }, (error) => {
      this.toast.serverError(error);
    }).$promise;
  }

  getCompanies() {
    this.companyPromise = this.companyService.query((data) => {
      this.companies = data;
    }, (error) => {
      this.toast.serverError(error);
    }).$promise;
  }

  getFlightsCount() {
    this.flightService.get({
      flightId: "count"
    }, (data) => {
      this.count = data.count;
    }, (error) => {
      this.toast.serverError(error);
    })
  }

  searchFlights() {
    this.query.page = 1;
    this.getFlights();
  }

  mapFlightsToCompanies() {
    this.flights.map((flight) => {
      flight.company = this.companies.find((company) => flight.company === company._id);
      return flight;
    })
  }

  deleteFlight(ev, flightId, index) {
    var confirm = this.$mdDialog.confirm()
      .title(this.$translate('FLIGHT.DELETE'))
      .ariaLabel('confirm dialog')
      .targetEvent(ev)
      .ok(this.$translate('CONFIRM'))
      .cancel(this.$translate('CANCEL'));

    this.$mdDialog.show(confirm).then(() => {
      this.flightService.delete({
        flightId
      }, () => {
        this.flights.splice(index, 1);
        this.toast.success('Flight was deleted successfully', 'FLIGHT.DELETED');
      }, (error) => {
        this.toast.serverError(error);
      });
    });
  }

  editFlight(ev, flight) {
    this.$mdDialog.show({
      controller: FlightDialogController,
      controllerAs: 'fldVm',
      template,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        Flight: flight,
        Companies: this.companies
      }
    })
      .then((updatedFlight) => {
        angular.forEach(updatedFlight, (value, key) => {
          flight[key] = value;
        });
        flight.errors = this.flightHasErrors(flight);
      });
  }
}

export default FlightsListController;
