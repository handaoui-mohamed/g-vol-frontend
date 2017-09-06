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
			this.documentsService.get({ flightId: this.flight._id }, (flight) => {
				this.documents = flight;
				console.log("st",flight);
			}, (error) => {
				this.toast.error(error);
			});
		} else
			this.documents = this.flight;
	}

}

export default ChecklistController;