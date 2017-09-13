let FlightStatusFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flights/:flightId/status', {
		flightId: '@id'
	});
};

export default FlightStatusFactory;
