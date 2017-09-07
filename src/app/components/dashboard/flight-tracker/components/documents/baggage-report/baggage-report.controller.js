import BaggageReportDialogController from '../dialogs/baggage-report/baggage-report.controller';
import dialogTemplate from '../dialogs/baggage-report/baggage-report.html';

class BaggageReportController {
	constructor($scope, $mdDialog, SocketService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
	}

	$onInit() {
		this.initBaggageReportSocket();
	}

	initBaggageReportSocket() {
		this.socket.on('baggage-report/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				let baggageReport = JSON.parse(data).baggageReport;
				for (let key in baggageReport) {
					if (baggageReport.hasOwnProperty(key)) {
						this.flight.baggageReport[key] = baggageReport[key];
					}
				}
			})
		});
	}

	openBaggageReportDialog(ev) {
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
}

export default BaggageReportController;