class DashboardController {
  constructor($rootScope) {
    'ngInject';
    $rootScope.hideTopBG = true;
  }

  $onInit(){
    this.selectedFlights = [1,2,3]
  }
}

export default DashboardController;
