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

	// initilize pax report socket event
	initPaxReportSocket() {
		this.socket.on('pax-report/' + this.flight._id, (data) => {
			this.$scope.$apply(() => {
				data = JSON.parse(data);
				let paxReport = data.paxReport;
				this.showNotification();
				// initilize flight pax report
				if (!this.flight.paxReport) this.flight.paxReport = {};
				angular.forEach(paxReport, (value, key) => {
					this.flight.paxReport[key] = paxReport[key]; F
				});
			})
		});
	}

	// Pax report notifications
	showNotification(data) {
		this.hasChanges = true;
		this.notification = true;
		this.flightNotification.documentUpdate(this.flight._id, 'paxReport');
	}

	removeNotification() {
		this.hasChanges = false;
		this.flightNotification.initDocument(this.flight._id, 'paxReport');
	}
}

export default PaxReportController;