import FlightInfoController from './dialogs/flight-info/flight-info.controller';
import dialogTemplate from './dialogs/flight-info/flight-info.html';

class FlightDocumentsController {
	constructor($mdDialog) {
		'ngInject';
		this.$mdDialog = $mdDialog;
	}

	openFlightInfoDialog(ev) {
		this.$mdDialog.show({
			controller: FlightInfoController,
			controllerAs: 'fiVm',
			template: dialogTemplate,
			parent: angular.element(document.querySelector('#flight-' + this.flight._id)),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: true,
			locals: {
				Flight: this.flight,
			}
		}).then((flightInfo) => {
			console.log(flightInfo);
		}, (msg) => { });
	}
}

export default FlightDocumentsController;