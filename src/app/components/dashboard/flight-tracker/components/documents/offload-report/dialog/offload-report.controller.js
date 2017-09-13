import './offload-report.scss';

class OffloadReportDialogController {
	constructor($mdDialog, Flight) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.flight = Flight;
		this.offloadReport = this.flight.offloadReport;
	}

	close() {
		this.$mdDialog.cancel();
	}
}
export default OffloadReportDialogController;