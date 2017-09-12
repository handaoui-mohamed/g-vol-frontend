class OffloadReportController {
	constructor($rootScope, $scope, SocketService, FlightNotification) {
		'ngInject';
		this.$root = $rootScope;
		this.$scope = $scope;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.initOffloadReportSocket();
		this.removeNotification();
	}

	initOffloadReportSocket() {
		this.socket.on('offload-report/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let offloadReport = data.offloadReport;
				this.showNotification();
				for (let key in offloadReport) {
					if (offloadReport.hasOwnProperty(key)) {
						this.flight.offloadReport[key] = offloadReport[key];
					}
				}
			})
		});
	}

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