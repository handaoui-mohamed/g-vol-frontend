class FlightProgressController {
	constructor($scope, $interval, $element, $mdDialog, SocketService) {
		'ngInject';
		this.$scope = $scope;
		this.$interval = $interval;
		this.$element = $element;
		this.$mdDialog = $mdDialog;
		this.socket = SocketService.io;
	}

	$onInit() {
		this.initFlightTimeSocket();
		this.flight.formattedSta = this.insert(this.flight.sta, 2, ':');
		this.flight.formattedStd = this.insert(this.flight.std, 2, ':');
		this.progress = 0;
		this.setFlightTimeOut();
		this.initTimeOut();
		this.width = angular.element(this.$element[0].querySelector('.meter'))[0].clientWidth;
	}

	initTimeOut() {
		this.$interval(() => {
			this.setFlightTimeOut();
		}, 60000);
	}

	insert(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
	}

	initFlightTimeSocket() {
		this.socket.on('flight-time/' + this.flight._id, (data) => {
			data = JSON.parse(data);
			this.$scope.$apply(() => {
				this.flight.eta = data.eta;
				this.flight.etd = data.etd;
				this.flight.ata = data.ata;
				this.flight.atd = data.atd;
			});
		})
	}

	setFlightTimeOut() {
		let start = new Date();
		let end = new Date(this.flight.departureDate);
		let diff = Math.abs(end.getTime() - start.getTime()) / (1000 * 60);
		let hours = Math.floor(diff / 60);
		this.timeLeft = hours + ":" + Math.round(diff - hours * 60);
	}

	calculateProgress() {
		let nbDocuments = 2;
		let finishedDocuments = 0;

		if (this.flight.flightInfo && this.flight.flightInfo.status) finishedDocuments++;
		if (this.flight.baggageReport && this.flight.baggageReport.status) finishedDocuments++;

		if (this.flight.offloadList) {
			nbDocuments++;
			if (this.flight.offloadList.status) finishedDocuments++;
		}

		if (this.flight.otherDocuments) {
			nbDocuments += this.flight.otherDocuments.length;
			this.flight.otherDocuments.forEach((document) => {
				if (document.status) finishedDocuments++;
			})
		}

		return finishedDocuments ? finishedDocuments * 100 / nbDocuments : 0;
	}

	openDialog(ev, index) {
		let title;
		switch (index) {
			case (0): // flight info
				title = "Flight info";
				break;
			case (1): // baggage report
				title = "Baggage report";
				break;
			case (2): // offload list
				title = "Offload list";
				break;
			default: // other documents
				title = this.documents[index].title;
				break;
		}

		this.$mdDialog.show(
			this.$mdDialog.alert()
				.parent(angular.element(document.querySelector('#flight-' + this.flight._id)))
				.clickOutsideToClose(true)
				.textContent("Document : " + title)
				.ariaLabel('document')
				.ok('Close')
				.targetEvent(ev)
		);
	}
}

export default FlightProgressController;