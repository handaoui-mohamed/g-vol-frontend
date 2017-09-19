import OffloadReportDialogController from './dialog/offload-report.controller';
import dialogTemplate from './dialog/offload-report.html';

class OffloadReportController {
	constructor($rootScope, $scope, $mdDialog, SocketService, FlightNotification, OffloadReport) {
		'ngInject';
		this.$root = $rootScope;
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
		this.offloadReport = OffloadReport;
	}

	$onInit() {
		this.initOffloadListSocket();
		this.removeNotification();
	}

	// initilize offload list socket event
	initOffloadListSocket() {
		this.socket.on('offload-list/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				// generate offload report from offload list
				let offloadReport = this.offloadReport.generate(data.offloadList);
				this.showNotification();
				// add the offload report to the current flight
				if (!this.flight.offloadReport) this.flight.offloadReport = offloadReport;
				else
					// update the current flight offload report
					angular.forEach(offloadReport, (value, key) => {
						this.flight.offloadReport[key] = offloadReport[key];
					});
			})
		});
	}

	// open offload report details dialog
	openOffloadReportDialog(ev) {
		this.hasChanges = false;
		this.$mdDialog.show({
			controller: OffloadReportDialogController,
			controllerAs: 'ofdVm',
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

	// Offload list notifications
	showNotification(data) {
		this.hasChanges = true;
		this.notification = true;
		this.flightNotification.documentUpdate(this.flight._id, 'offloadReport');
	}

	removeNotification() {
		this.hasChanges = false;
		this.flightNotification.initDocument(this.flight._id, 'offloadReport');
	}
}

export default OffloadReportController;