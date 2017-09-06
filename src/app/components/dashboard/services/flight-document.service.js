let FlightDocumentsFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flight-documents/:flightId/:type:documentId/:docStatus', {
		flightId: '@id',
		type: '@type',
		documentId: '@documentId',
		docStatus: '@docStatus',
	}, { update: { method: 'PUT' } });
};

export default FlightDocumentsFactory;
