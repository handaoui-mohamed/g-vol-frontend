class flightDialogController {
	constructor($mdDialog, Flight, Companies) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		// create a flight copy, so that changes does not impact the list automatically but only when sumbitting
		this.flight = angular.copy(Flight);
		this.companies = Companies;
	}

	// sumbit function, hide the dialog and pass the edited flight informations
	submit() {
		this.$mdDialog.hide(this.flight);
	}

	// hide the current dialog
	cancel() {
		this.$mdDialog.hide();
	}
}

export default flightDialogController;
