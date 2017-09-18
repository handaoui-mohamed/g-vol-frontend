import angular from 'angular';
import accountsComponent from './list/accounts-list.component';
import accountComponent from './account/account.component';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let accountModule = angular
	.module('accounts', [])
	.config(($stateProvider, $translateProvider) => {
		'ngInject';
		$stateProvider
			.state('home.accounts', {
				url: 'accounts',
				component: 'accounts'
			})
			.state('home.newAccount', {
				url: 'accounts/add',
				component: 'account',
				data: {
					roles: ['superadmin', 'admin']
				}
			})
			.state('home.account', {
				url: 'accounts/:accountId',
				component: 'account'
			});

		// account pages translations
		$translateProvider.translations('en', en);
		$translateProvider.translations('fr', fr);
	})
	.component('account', accountComponent)
	.component('accounts', accountsComponent)
	.name;

export default accountModule;
