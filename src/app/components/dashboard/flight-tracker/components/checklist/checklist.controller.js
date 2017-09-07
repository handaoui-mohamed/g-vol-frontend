class ChecklistController {
	constructor($scope, DocumentsService, Toast, SocketService) {
		'ngInject';
		this.$scope = $scope;
		this.documentsService = DocumentsService;
		this.toast = Toast;
		this.socket = SocketService.io;
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
			this.documentsService.get({ flightId: this.flight._id }, (documents) => {
				for (var key in documents) {
					if (documents.hasOwnProperty(key)) {
						this.flight[key] = documents[key];
					}
				}
				this.documents = documents;
			}, (error) => {
				this.toast.error(error);
			});
		} else
			this.documents = this.flight;
	}

}

export default ChecklistController;