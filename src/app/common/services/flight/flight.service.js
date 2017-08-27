let FlightFactory = function ($resource, API_ENDPOINT) {
  'ngInject';
  return $resource(API_ENDPOINT + 'flights/:flightId', {
    flightId: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  })
};

export default FlightFactory;
