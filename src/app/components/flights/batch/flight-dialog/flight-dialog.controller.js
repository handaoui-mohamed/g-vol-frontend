class flightDialogController {
  constructor($mdDialog, Flight, Companies) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.flight = angular.copy(Flight);
    this.companies = Companies;
  }

  submit() {
    this.$mdDialog.hide(this.flight);
  }

  cancel() {
    this.$mdDialog.hide();
  }
}

export default flightDialogController;
