class FlightProgressController {
	constructor() { }

	$onInit() {
		this.flight.formattedSta = this.insert(this.flight.sta, 2, ':');
		this.flight.formattedStd = this.insert(this.flight.std, 2, ':');
		this.progress = 0;
	}

	insert(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
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
}

export default FlightProgressController;