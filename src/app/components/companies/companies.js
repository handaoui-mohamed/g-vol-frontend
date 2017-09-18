import angular from 'angular';
import companiesComponent from './list/companies-list.component';
import companyComponent from './company/company.component';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let companyModule = angular
	.module('companies', [])
	.config(($stateProvider, $translateProvider) => {
		'ngInject';
		$stateProvider
			.state('home.companies', {
				url: 'companies',
				component: 'companies'
			})
			.state('home.newCompany', {
				url: 'companies/add',
				component: 'company',
				data: {
					roles: ['superadmin', 'admin']
				}
			})
			.state('home.company', {
				url: 'companies/:companyId',
				component: 'company'
			});

		// company pages translations
		$translateProvider.translations('en', en);
		$translateProvider.translations('fr', fr);
	})
	.component('company', companyComponent)
	.component('companies', companiesComponent)
	.name;

export default companyModule;
