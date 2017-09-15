let CompanyFactory = function ($resource, API_ENDPOINT) {
	'ngInject';
	return $resource(API_ENDPOINT + 'companies/:companyId', {
		companyId: '@id'
	}, { update: { method: 'PUT' } });
};

export default CompanyFactory;
