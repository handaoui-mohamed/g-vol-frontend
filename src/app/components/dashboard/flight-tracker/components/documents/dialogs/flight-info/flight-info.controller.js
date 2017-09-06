import './flight-info.scss';

class FlightInfoController {
	constructor($mdDialog, Toast, Flight, DocumentsService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentsService = DocumentsService;
		this.flight = Flight;
		this.flightInfo = this.flight.flightInfo;
	}

	submit() {
		this.save().then((document) => {
			this.$mdDialog.hide(this.selectedFlights);
		}, (error) => {
			this.$mdDialog.cancel();
			this.toast.error(error);
		})
	}

	close() {
		this.$mdDialog.cancel();
	}

	save() {
		return this.documentsService.save({ flightId: this.flightId, type: 'fi' }, this.flightInfo).$promise;
	}
}
export default FlightInfoController;