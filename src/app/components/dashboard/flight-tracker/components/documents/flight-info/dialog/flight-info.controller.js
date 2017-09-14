import './flight-info.scss';

class FlightInfoDialogController {
	constructor($mdDialog, Toast, Flight, DocumentService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentService = DocumentService;
		this.flight = Flight;
		this.flightInfo = this.flight.flightInfo;
	}

	submit() {
		this.save().then((flightInfo) => {
			this.flightInfo.ezfw = flightInfo.ezfw;
			this.flightInfo.createdAt = this.flightInfo.createdAt || flightInfo.createdAt;
			this.$mdDialog.hide(flightInfo);
		}, (error) => {
			this.$mdDialog.cancel();
			this.toast.serverError(error);
		})
	}

	close() {
		this.$mdDialog.cancel();
	}

	save() {
		if (this.flightInfo.createdAt)
			return this.documentService.update({ flightId: this.flight._id, type: 'fi' }, this.flightInfo).$promise;
		else
			return this.documentService.save({ flightId: this.flight._id, type: 'fi' }, this.flightInfo).$promise;
	}
}
export default FlightInfoDialogController;