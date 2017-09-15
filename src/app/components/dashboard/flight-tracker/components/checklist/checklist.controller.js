class ChecklistController {
	constructor($scope, DocumentService, Toast, SocketService, OffloadReport, FlightNotification) {
		'ngInject';
		this.$scope = $scope;
		this.documentService = DocumentService;
		this.toast = Toast;
		this.socket = SocketService.io;
		this.offloadReport = OffloadReport;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.checklist = {};
		this.documentTypes = {
			fi: { value: 'flightInfo', index: 0 },
			br: { value: 'baggageReport', index: 1 },
			ol: { value: 'offloadList', index: 2 },
			oth: { value: 'otherDocuments' }
		}
		this.getDocuments();
		this.initFlightDocumentStatusSocket()
	}

	initFlightDocumentStatusSocket() {
		this.socket.on('flight-documents-status/' + this.flight._id, (data) => {
			data = JSON.parse(data);
			this.flightNotification.documentUpdate(this.flight._id, 'documentState');
			this.$scope.$apply(() => {
				if (data.type !== 'oth')
					this.flight[this.documentTypes[data.type].value].status = data.status;
				else {
					let document = this.flight.otherDocuments.find(doc => doc._id === data.docId);
					if (document) document.status = data.status;
				}
				this.updateDocuments(data);
			})
		});
	}

	getDocuments() {
		if (this.flight.queryDocuments) {
			this.documentService.get({ flightId: this.flight._id }, (documents) => {
				for (var key in documents) {
					if (documents.hasOwnProperty(key)) {
						this.flight[key] = documents[key];
					}
				}
				this.documents = documents;
				this.setDocuments(this.documents);
				this.flight.offloadReport = this.offloadReport.generate(documents.offloadList);
			}, (error) => {
				this.toast.serverError(error);
			});
		} else {
			this.documents = this.flight;
			this.setDocuments(this.documents);
		}
	}

	setDocuments(documents) {
		this.checklistDocuments = [
			documents.flightInfo,
			documents.baggageReport,
			documents.offloadList
		].concat(documents.otherDocuments || []);
	}

	updateDocuments(data) {
		let document;
		if (data.type !== 'oth')
			document = this.checklistDocuments[this.documentTypes[data.type].index];
		else
			document = this.checklistDocuments.find(doc => doc._id === data.docId);

		if (document) {
			document.status = data.status;
			if (document.status) document.finishedAt = data.finishedAt;
		}
	}

}

export default ChecklistController;