import './baggage-report.scss';

class BaggageReportDialogController {
	constructor($mdDialog, Toast, Flight, DocumentsService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentsService = DocumentsService;
		this.flight = Flight;
		this.baggageReport = this.flight.baggageReport;
	}

	submit() {
		this.save().then((baggageReport) => {
			this.baggageReport.createdAt = this.baggageReport.createdAt || baggageReport.createdAt;
			this.$mdDialog.hide(baggageReport);
		}, (error) => {
			this.$mdDialog.cancel();
			this.toast.error(error);
		})
	}

	close() {
		this.$mdDialog.cancel();
	}

	save() {
		if (this.baggageReport.createdAt)
			return this.documentsService.update({ flightId: this.flight._id, type: 'fi' }, this.baggageReport).$promise;
		else
			return this.documentsService.save({ flightId: this.flight._id, type: 'fi' }, this.baggageReport).$promise;
	}
}
export default BaggageReportDialogController;