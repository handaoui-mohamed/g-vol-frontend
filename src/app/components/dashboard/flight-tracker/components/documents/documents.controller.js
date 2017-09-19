class FlightDocumentsController {
	constructor($scope, $mdDialog, SocketService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
	}

	$onInit() {
		this.documents = ['flightInfo', 'paxReport', 'offloadReport'];
	}

	toggleDocument(documentType) {
		this[documentType] = !this[documentType];
		angular.forEach(this.documents, (document) => {
			if (document !== documentType) this[document] = false;
		})
	}
}

export default FlightDocumentsController;