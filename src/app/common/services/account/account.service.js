let AccountFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'accounts/:accountId', {
		accountId: '@id'
	}, { update: { method: 'PUT' }, patch: { method: 'PATCH' } });
};

export default AccountFactory;
