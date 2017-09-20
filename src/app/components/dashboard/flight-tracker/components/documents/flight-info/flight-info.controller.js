import FlightInfoDialogController from './dialog/flight-info.controller';
import dialogTemplate from './dialog/flight-info.html';

class FlightInfoController {
	constructor($rootScope, $scope, $mdDialog, SocketService, FlightNotification) {
		'ngInject';
		this.$root = $rootScope;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.initFlightInfoSocket();
		this.removeNotification();
	}

	// initilize flight info socket event
	initFlightInfoSocket() {
		this.socket.on('flight-info/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let flightInfo = data.flightInfo;
				this.showNotification(data.accountId);
				angular.forEach(flightInfo, (value, key) => {
					this.flight.flightInfo[key] = flightInfo[key];
				});
			})
		});
	}

	// open flight info details dialogs
	openFlightInfoDialog(ev) {
		this.hasChanges = false;
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
		});
	}

	// flight info notifations
	removeNotification() {
		this.hasChanges = false;
		this.flightNotification.initDocument(this.flight._id, 'flightInfo');
	}

	showNotification(accountId) {
		if (accountId !== this.$root.currentAccount._id) {
			this.hasChanges = true;
			this.notification = true;
			this.flightNotification.documentUpdate(this.flight._id, 'flightInfo');
		}
	}
}

export default FlightInfoController;