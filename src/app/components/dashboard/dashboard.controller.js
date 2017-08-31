class DashboardController {
  constructor($rootScope) {
    'ngInject';
    $rootScope.hideTopBG = true;
  }

  $onInit() {
    this.selectedFlights = [];
  }

  openFlights() {
    return this.selectedFlights.filter(flight => flight.opened);
  }
}

export default DashboardController;
