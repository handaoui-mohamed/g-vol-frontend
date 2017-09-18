import angular from 'angular';
import sideNav from './side-nav.component';
import './md-side-nav/angular-material-sidenav';

// styles
import './md-side-nav/angular-material-sidenav.css';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let sideNavComponentModule = angular
	.module('common.sidenav', ['sasrio.angular-material-sidenav'])
	.config(($translateProvider, ssSideNavSectionsProvider) => {
		'ngInject';

		// side nav translations
		$translateProvider.translations('en', en);
		$translateProvider.translations('fr', fr);

		// sidenav menus
		ssSideNavSectionsProvider.initWithSections([{
			id: 'dashboard',
			name: 'Dashboard',
			translate: 'SIDENAV.DASHBOARD',
			state: 'home.dashboard',
			type: 'link',
			icon: 'icon-home'
		}, {
			id: 'manage',
			name: 'Manage',
			translate: 'SIDENAV.MANAGE',
			type: 'heading',
			children: [{
				name: 'Accounts',
				translate: 'SIDENAV.ACCOUNTS.HEADER',
				type: 'toggle',
				icon: 'icon-people',
				pages: [{
					id: 'accounts_list',
					name: 'Accounts list',
					translate: 'SIDENAV.ACCOUNTS.LIST',
					state: 'home.accounts'
				}, {
					id: 'account_new',
					name: 'New account',
					translate: 'SIDENAV.ACCOUNTS.NEW',
					state: 'home.newAccount'
				}]
			},
			{
				name: 'Flights',
				translate: 'SIDENAV.FLIGHTS.HEADER',
				type: 'toggle',
				icon: 'icon-airplane',
				pages: [{
					id: 'flights_list',
					name: 'Flights list',
					translate: 'SIDENAV.FLIGHTS.LIST',
					state: 'home.flights'
				}, {
					id: 'flight_new',
					name: 'New flight',
					translate: 'SIDENAV.FLIGHTS.NEW',
					state: 'home.newFlight'
				}, {
					id: 'flight_new_batch',
					name: 'New flights by batch',
					translate: 'SIDENAV.FLIGHTS.NEWBATCH',
					state: 'home.flightsBatch'
				}]
			},
			{
				name: 'Companies',
				translate: 'SIDENAV.COMPANIES.HEADER',
				type: 'toggle',
				icon: 'icon-format-list-bulleted',
				pages: [{
					id: 'companies_list',
					name: 'Companies list',
					translate: 'SIDENAV.COMPANIES.LIST',
					state: 'home.companies'
				}, {
					id: 'company_new',
					name: 'New company',
					translate: 'SIDENAV.COMPANIES.NEW',
					state: 'home.newCompany'
				}]
			}
			]
		}]);
	})
	.component('ngSideNav', sideNav).name;

export default sideNavComponentModule;
