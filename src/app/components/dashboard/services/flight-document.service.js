let FlightDocumentsFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flight-documents/:flightId/:type', {
		flightId: '@id',
		type: '@type'
	}, { update: { method: 'PUT' } });
};

export default FlightDocumentsFactory;
