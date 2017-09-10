import BaggageReportDialogController from '../dialogs/baggage-report/baggage-report.controller';
import dialogTemplate from '../dialogs/baggage-report/baggage-report.html';

class BaggageReportController {
	constructor($rootScope, $scope, $mdDialog, SocketService) {
		'ngInject';
		this.$root = $rootScope;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
		this.socket = SocketService.io;
	}

	$onInit() {
		this.initBaggageReportSocket();
		this.hasChanges = false;
	}

	initBaggageReportSocket() {
		this.socket.on('baggage-report/' + this.flight._id, (data) => {
			console.log("baggage", data);
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let baggageReport = data.baggageReport;
				if (data.accountId !== this.$root.currentAccount._id) this.hasChanges = true;
				for (let key in baggageReport) {
					if (baggageReport.hasOwnProperty(key)) {
						this.flight.baggageReport[key] = baggageReport[key];
					}
				}
			})
		});
	}

	openBaggageReportDialog(ev) {
		this.hasChanges = false;
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