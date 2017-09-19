class ChecklistController {
	constructor($rootScope, $scope, DocumentService, Toast, SocketService, OffloadReport, FlightNotification) {
		'ngInject';
		this.$root = $rootScope;
		this.$scope = $scope;
		this.documentService = DocumentService;
		this.toast = Toast;
		this.socket = SocketService.io;
		this.offloadReport = OffloadReport;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.checklist = {};
		this.checklistDocuments = [];
		this.documentTypes = {
			br: { value: 'baggageReport', index: 0 },
			fi: { value: 'flightInfo', index: 1 },
			ol: { value: 'offloadList', index: 2 },
			oth: { value: 'otherDocuments' }
		}
		this.$scope.$on('documents' + this.flight._id, this.getDocuments.bind(this));
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
				this.emitDocumentChanges(this.checklistDocuments);
			})
		});
	}

	getDocuments(event, queryDocuments) {
		if (queryDocuments) {
			this.documentService.get({ flightId: this.flight._id }, (documents) => {
				angular.forEach(documents, (value, key) => {
					this.flight[key] = documents[key];
				})
				this.documents = documents;
				this.setDocuments(this.documents);
				this.emitDocumentChanges(this.checklistDocuments);
				this.flight.offloadReport = this.offloadReport.generate(documents.offloadList);
			}, (error) => {
				this.toast.serverError(error);
			});
		} else {
			this.documents = this.flight;
			this.setDocuments(this.documents);
			this.emitDocumentChanges(this.checklistDocuments);
		}
	}

	emitDocumentChanges(documents) {
		this.$root.$broadcast('document-state' + this.flight._id, documents);
	}

	setDocuments(documents) {
		this.checklistDocuments = [
			documents.baggageReport,
			documents.flightInfo,
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