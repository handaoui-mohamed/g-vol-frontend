import './baggage-report.scss';

class BaggageReportDialogController {
	constructor($mdDialog, Toast, Flight, DocumentService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentService = DocumentService;
		this.flight = Flight;
		this.baggageReport = this.flight.baggageReport; // get baggage report from flight
		if (this.baggageReport.table.length === 0) this.addEmptyRow(); // initilize with an empty row
	}

	submit() {
		this.save().then((baggageReport) => {
			// save baggage report and init createdAt date
			this.flight.baggageReport.createdAt = baggageReport.createdAt;
			// close dialog
			this.$mdDialog.hide(baggageReport);
		}, (error) => {
			this.$mdDialog.cancel();
			this.toast.serverError(error);
		});
	}

	close() {
		this.$mdDialog.cancel();
	}

	// save baggage report document changes to server
	save() {
		return this.documentService.save({ flightId: this.flight._id, type: 'br' }, this.baggageReport).$promise;
	}

	// add an empty row to baggage report table array
	addEmptyRow() {
		this.baggageReport.table.push({});
	}

	// remove the row at the provided index, if all row were removed, add an empty one
	removeRow(index) {
		this.baggageReport.table.splice(index, 1);
		if (this.baggageReport.table.length === 0) this.addEmptyRow()
	}

	// reset all baggage report changes by fetching the last one from serve
	reset() {
		this.documentService.get({ flightId: this.flight._id, type: 'br' }, (document) => {
			angular.forEach(document, (value, key) => {
				this.baggageReport[key] = document[key];
			});
		}, (error) => { this.toast.serverError(error) });
	}
}
export default BaggageReportDialogController;