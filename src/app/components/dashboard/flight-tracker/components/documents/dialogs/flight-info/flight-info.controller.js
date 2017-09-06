import './flight-info.scss';

class FlightInfoController {
	constructor($mdDialog, Toast, Flight, DocumentsService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.documentsService = DocumentsService;
		this.flight = Flight;
		this.flightInfo = this.flight.flightInfo;
		console.log("init", this.flightInfo);
	}

	submit() {
		this.save().then((flightInfo) => {
			this.flightInfo.ezfw = flightInfo.ezfw;
			this.flightInfo.createdAt = this.flightInfo.createdAt || flightInfo.createdAt;
			console.log("update", this.flightInfo);
			this.$mdDialog.hide(flightInfo);
		}, (error) => {
			this.$mdDialog.cancel();
			this.toast.error(error);
		})
	}

	close() {
		this.$mdDialog.cancel();
	}

	save() {
		if (this.flightInfo.createdAt)
			return this.documentsService.update({ flightId: this.flight._id, type: 'fi' }, this.flightInfo).$promise;
		else
			return this.documentsService.save({ flightId: this.flight._id, type: 'fi' }, this.flightInfo).$promise;
	}
}
export default FlightInfoController;