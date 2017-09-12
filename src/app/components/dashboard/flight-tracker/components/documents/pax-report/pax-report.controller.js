class PaxReportController {
	constructor($rootScope, $scope, SocketService, FlightNotification) {
		'ngInject';
		this.$root = $rootScope;
		this.$scope = $scope;
		this.socket = SocketService.io;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.initPaxReportSocket();
		this.removeNotification();
	}

	initPaxReportSocket() {
		this.socket.on('pax-report/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let paxReport = data.paxReport;
				if (data.accountId !== this.$root.currentAccount._id) {
					this.hasChanges = true;
					this.notification = true;
					this.flightNotification.documentUpdate(this.flight._id, 'paxReport');
				}

				for (let key in paxReport) {
					if (paxReport.hasOwnProperty(key)) {
						this.flight.paxReport[key] = paxReport[key];
					}
				}
			})
		});
	}

	removeNotification() {
		this.hasChanges = false;
		this.flightNotification.initDocument(this.flight._id, 'paxReport');
	}
}

export default PaxReportController;