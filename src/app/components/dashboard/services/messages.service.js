let MessageFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'flight-messages/:flightId', { flightId: '@id' });
};

export default MessageFactory;
