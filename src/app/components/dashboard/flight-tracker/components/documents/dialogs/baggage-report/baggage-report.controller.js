import './baggage-report.scss';

class BaggageReportDialogController {
	constructor($mdDialog, Toast, Flight, DocumentsService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentsService = DocumentsService;
		this.flight = Flight;
		this.baggageReport = angular.copy(this.flight.baggageReport);
		if (this.baggageReport.table.length === 0) this.addEmptyRowToBaggageReport();
	}

	submit() {
		this.save().then((baggageReport) => {
			this.flight.baggageReport.createdAt = baggageReport.createdAt;
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
		return this.documentsService.save({ flightId: this.flight._id, type: 'br' }, this.baggageReport).$promise;
	}

	addEmptyRowToBaggageReport() {
		this.baggageReport.table.push({});
	}

	removeRowFromBaggageReport(index) {
		this.baggageReport.table.splice(index, 1);
		if (this.baggageReport.table.length === 0) this.baggageReport.table.push({});
	}

	reset() {
		this.baggageReport = angular.copy(this.flight.baggageReport);
	}
}
export default BaggageReportDialogController;