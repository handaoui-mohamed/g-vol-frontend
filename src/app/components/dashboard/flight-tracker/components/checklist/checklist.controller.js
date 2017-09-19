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
		// documents type for easy access when updating
		this.documentTypes = {
			br: { value: 'baggageReport', index: 0 },
			fi: { value: 'flightInfo', index: 1 },
			ol: { value: 'offloadList', index: 2 },
			oth: { value: 'otherDocuments' }
		}
		// listen for documents fetched event
		this.$scope.$on('documents' + this.flight._id, this.getDocuments.bind(this));
		// listen to documents status socket event
		this.initFlightDocumentStatusSocket()
	}

	initFlightDocumentStatusSocket() {
		this.socket.on('flight-documents-status/' + this.flight._id, (data) => {
			data = JSON.parse(data);
			// show toast notification
			this.flightNotification.documentUpdate(this.flight._id, 'documentState');
			this.$scope.$apply(() => {
				// check for document type to update its status
				if (data.type !== 'oth')
					this.flight[this.documentTypes[data.type].value].status = data.status;
				else {
					let document = this.flight.otherDocuments.find(doc => doc._id === data.docId);
					if (document) document.status = data.status;
				}
				// these function are used to assist flight progress, TODO: move this code to flight progress
				this.updateDocuments(data);
				this.emitDocumentChanges(this.checklistDocuments);
			})
		});
	}

	// fetch flight documents from server and then update flight
	getDocuments(event, queryDocuments) {
		if (queryDocuments) {
			this.documentService.get({ flightId: this.flight._id }, (documents) => {
				// update flight with documents
				angular.forEach(documents, (value, key) => {
					this.flight[key] = documents[key];
				})
				this.documents = documents;
				this.setDocuments(this.documents);
				this.emitDocumentChanges(this.checklistDocuments);
				// generate offload report if offload list existes
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

	// ************ Used for flight progress

	// emit document state changes
	emitDocumentChanges(documents) {
		this.$root.$broadcast('document-state' + this.flight._id, documents);
	}

	// put all documents in one array, it would make it easy for flight progress
	setDocuments(documents) {
		this.checklistDocuments = [
			documents.baggageReport,
			documents.flightInfo,
			documents.offloadList
		].concat(documents.otherDocuments || []);
	}

	// update documents status, if status is true update finishedAt date
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