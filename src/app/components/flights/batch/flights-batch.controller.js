import FlightDialogController from './flight-dialog/flight-dialog.controller';
import template from './flight-dialog/flight-dialog.html';

class FlightsBatchController {
  constructor($mdDialog, $filter, FlightService, CompanyService, CsvToJson, Toast) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$translate = $filter('translate');
    this.flightService = FlightService;
    this.companyService = CompanyService;
    this.csvToJson = CsvToJson;
    this.toast = Toast;
  }

  $onInit() {
    this.flights = [];
    this.companies = [];
    this.queryString = "";
    this.query = {
      page: 1,
      limit: 10
    }
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.query((data) => {
      this.companies = data;
    }, (error) => {
      this.toast.serverError(error);
    });
  }

  parseCSV(file) {
    this.promise = this.csvToJson.fromFile(file).then((flights) => {
      flights.pop(); // remove the last empty element
      this.flights = this.validateFlights(flights);
    });
  }

  deleteFlight(ev, flight) {
    var confirm = this.$mdDialog.confirm()
      .title(this.$translate('FLIGHT.DELETE'))
      .ariaLabel('confirm dialog')
      .targetEvent(ev)
      .ok(this.$translate('CONFIRM'))
      .cancel(this.$translate('CANCEL'));

    this.$mdDialog.show(confirm).then(() => {
      let index = this.flights.findIndex(fl => fl === flight);
      this.flights.splice(index, 1);
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

  validateFlights(flights) {
    return flights.map((flight) => {
      flight.errors = this.flightHasErrors(flight);
      return flight;
    });
  }

  flightHasErrors(flight) {

  }

  filterFlightsWithErrors() {
    return this.flights.filter(flight => !flight.errors);
  }

  mapToCompanies(flights) {
    return flights.map((flt) => {
      let flight = angular.copy(flt);
      flight.company = this.companies.find(company => flight.company === company.code)._id;
      return flight;
    });
  }

  submitAll() {
    let flights = this.mapToCompanies(this.filterFlightsWithErrors());
    console.log(flights);
    this.flightService.save({
      flightId: "batch"
    }, {
      flights
    }, (data) => {}, (errors) => {
      this.toast.serverError(error);
    })
  }
}

export default FlightsBatchController;
