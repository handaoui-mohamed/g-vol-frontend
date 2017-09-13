class ChecklistController {
	constructor($scope, DocumentService, Toast, SocketService, OffloadReport) {
		'ngInject';
		this.$scope = $scope;
		this.documentService = DocumentService;
		this.toast = Toast;
		this.socket = SocketService.io;
		this.offloadReport = OffloadReport;
	}

	$onInit() {
		this.checklist = {};
		this.documentTypes = {
			fi: 'flightInfo',
			br: 'baggageReport',
			ol: 'offloadList',
			oth: 'otherDocuments'
		}
		this.getDocuments();
		this.initFlightDocumentStatusSocket()
	}

	initFlightDocumentStatusSocket() {
		this.socket.on('flight-documents-status/' + this.flight._id, (data) => {
			console.log(data);
			data = JSON.parse(data);
			this.$scope.$apply(() => {
				if (data.type !== 'oth')
					this.flight[this.documentTypes[data.type]].status = data.status;
				else {
					let document = this.flight.otherDocuments.find(doc => doc._id === data.docId);
					if (document) document.status = data.status;
				}
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
				this.flight.offloadReport = this.offloadReport.generate(documents.offloadList);
			}, (error) => {
				this.toast.error(error);
			});
		} else
			this.documents = this.flight;
	}

}

export default ChecklistController;