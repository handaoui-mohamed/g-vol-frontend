let FlightTeamFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flight-team/:flightId', { flightId: '@id' }, {
		save: {
			method: 'POST',
			isArray: true
		},
		delete: {
			method: 'DELETE',
			hasBody: true,
			headers: { "Content-Type": "application/json;charset=UTF-8" },
			isArray: true
		}
	});
};

export default FlightTeamFactory;
