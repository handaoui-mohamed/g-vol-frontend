let FlightDocumentsFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flight-documents/:flightId/:type:documentId/:status', {
		flightId: '@id',
		type: '@type',
		documentId: '@documentId',
		status: '@status',
	}, { update: { method: 'PUT' } });
};

export default FlightDocumentsFactory;
