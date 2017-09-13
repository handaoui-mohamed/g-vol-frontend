import BaggageReportDialogController from './dialog/baggage-report.controller';
import dialogTemplate from './dialog/baggage-report.html';

class BaggageReportController {
	constructor($rootScope, $scope, $mdDialog, SocketService, FlightNotification) {
		'ngInject';
		this.$root = $rootScope;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.initBaggageReportSocket();
		this.removeNotification();
	}

	initBaggageReportSocket() {
		this.socket.on('baggage-report/' + this.flight._id, (data) => {
			console.log("baggage", data);
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let baggageReport = data.baggageReport;
				this.showNotification(data.accountId);
				for (let key in baggageReport) {
					if (baggageReport.hasOwnProperty(key)) {
						this.flight.baggageReport[key] = baggageReport[key];
					}
				}
			})
		});
	}

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