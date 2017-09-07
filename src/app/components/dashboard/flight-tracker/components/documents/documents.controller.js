class FlightDocumentsController {
	constructor($scope, $mdDialog, SocketService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
	}

	$onInit() {
		this.documents = ['baggageReport', 'flightInfo'];
	}

	toggleDocument(documentType) {
		console.log(documentType);
		this[documentType] = !this[documentType];
		this.documents.forEach((document) => {
			if (document !== documentType) this[document] = false;
		})
	}
}

export default FlightDocumentsController;