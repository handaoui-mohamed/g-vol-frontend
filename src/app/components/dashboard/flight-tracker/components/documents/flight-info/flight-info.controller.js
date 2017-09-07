import FlightInfoDialogController from '../dialogs/flight-info/flight-info.controller';
import dialogTemplate from '../dialogs/flight-info/flight-info.html';

class FlightInfoController {
	constructor($scope, $mdDialog, SocketService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
	}

	$onInit() {
		this.initFlightInfoSocket();
	}

	initFlightInfoSocket() {
		this.socket.on('flight-info/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				let flightInfo = JSON.parse(data).flightInfo;
				for (let key in flightInfo) {
					if (flightInfo.hasOwnProperty(key)) {
						this.flight.flightInfo[key] = flightInfo[key];
					}
				}
			})
		});
	}

	openFlightInfoDialog(ev) {
		this.$mdDialog.show({
			controller: FlightInfoDialogController,
			controllerAs: 'fidVm',
			template: dialogTemplate,
			parent: angular.element(document.querySelector('#flight-' + this.flight._id)),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: true,
			locals: {
				Flight: this.flight,
			}
		}).then((flightInfo) => { }, (msg) => { });
	}
}

export default FlightInfoController;