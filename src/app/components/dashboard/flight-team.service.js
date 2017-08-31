let FlightTeamFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flight-team/:flightId', {
		flightId: '@id'
	}, {
			save: {
				method: 'POST',
				isArray: true
			}
		});
};

export default FlightTeamFactory;
