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
		let nbDocuments = 0;
		let finishedDocuments = 0;
		if (this.flight.flightInfo && this.flight.flightInfo.status) {
			nbDocuments++; finishedDocuments++;
		}
		if (this.flight.baggageReport && this.flight.baggageReport.status) {
			nbDocuments++; finishedDocuments++;
		}

		if (this.flight.offloadList && this.flight.offloadList.status) {
			nbDocuments++; finishedDocuments++;
		}

		if (this.flight.paxReport && this.flight.paxReport.status) {
			nbDocuments++; finishedDocuments++;
		}

		if (this.flight.otherDocuments) {
			nbDocuments += this.flight.otherDocuments.length;
			this.flight.otherDocuments.forEach((document) => {
				if (document.status) finishedDocuments++;
			})
		}

		console.log("here", finishedDocuments, nbDocuments, nbDocuments * 100 / finishedDocuments);
		return finishedDocuments ? finishedDocuments * 100 / nbDocuments : 0;
	}
}

export default FlightProgressController;