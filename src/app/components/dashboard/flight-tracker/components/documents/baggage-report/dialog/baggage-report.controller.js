import './baggage-report.scss';

class BaggageReportDialogController {
	constructor($mdDialog, Toast, Flight, DocumentService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentService = DocumentService;
		this.flight = Flight;
		this.baggageReport = this.flight.baggageReport;
		if (this.baggageReport.table.length === 0) this.addEmptyRow();
	}

	submit() {
		this.save().then((baggageReport) => {
			this.flight.baggageReport.createdAt = baggageReport.createdAt;
			this.$mdDialog.hide(baggageReport);
		}, (error) => {
			this.$mdDialog.cancel();
			this.toast.serverError(error);
		})
	}

	close() {
		this.$mdDialog.cancel();
	}

	save() {
		return this.documentService.save({ flightId: this.flight._id, type: 'br' }, this.baggageReport).$promise;
	}

	addEmptyRow() {
		this.baggageReport.table.push({});
	}

	removeRow(index) {
		this.baggageReport.table.splice(index, 1);
		if (this.baggageReport.table.length === 0) this.baggageReport.table.push({});
	}

	reset() {
		this.documentService.get({ flightId: this.flight._id, type: 'br' }, (document) => {
			for (let key in document) {
				if (document.hasOwnProperty(key)) this.baggageReport[key] = document[key];
			}
		}, (error) => { this.toast.serverError(error) });
	}
}
export default BaggageReportDialogController;