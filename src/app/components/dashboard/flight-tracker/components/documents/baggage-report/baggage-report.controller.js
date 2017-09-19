import BaggageReportDialogController from './dialog/baggage-report.controller';
import dialogTemplate from './dialog/baggage-report.html';

class BaggageReportController {
	constructor($scope, $mdDialog, SocketService, FlightNotification) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.initBaggageReportSocket();
		this.removeNotification();
	}

	// initilize baggage report socket event
	initBaggageReportSocket() {
		this.socket.on('baggage-report/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let baggageReport = data.baggageReport;
				this.showNotification(data.accountId);
				angular.forEach(baggageReport, (value, key) => {
					this.flight.baggageReport[key] = baggageReport[key];
				});
			})
		});
	}

	// open baggage report dialog to view details
	openBaggageReportDialog(ev) {
		this.removeNotification();
		this.$mdDialog.show({
			controller: BaggageReportDialogController,
			controllerAs: 'brdVm',
			template: dialogTemplate,
			parent: angular.element(document.querySelector('#flight-' + this.flight._id)),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: true,
			locals: {
				Flight: this.flight,
			}
		}).then((baggageReport) => { }, (msg) => { });
	}

	// Baggage report notifications
	removeNotification() {
		this.hasChanges = false;
		this.flightNotification.initDocument(this.flight._id, 'baggageReport');
	}

	showNotification(accountId) {
		if (accountId !== this.$root.currentAccount._id) {
			this.hasChanges = true;
			this.notification = true;
			this.flightNotification.documentUpdate(this.flight._id, 'baggageReport');
		}
	}
}

export default BaggageReportController;