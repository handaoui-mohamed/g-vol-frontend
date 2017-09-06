class ChecklistController {
	constructor(DocumentsService, Toast) {
		'ngInject';
		this.documentsService = DocumentsService;
		this.toast = Toast;
	}

	$onInit() {
		this.checklist = {};
		this.getDocuments();
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