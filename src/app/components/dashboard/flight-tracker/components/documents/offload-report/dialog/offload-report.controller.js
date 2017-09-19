import './offload-report.scss';

class OffloadReportDialogController {
	constructor($mdDialog, Flight) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.flight = Flight;
		this.offloadReport = this.flight.offloadReport; // get current flight offload report
	}

	close() {
		this.$mdDialog.cancel();
	}
}
export default OffloadReportDialogController;