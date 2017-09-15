import angular from 'angular';
import commonComponentModule from './components/components';

// shared services
import servicesModule from './services/services';

//styles
import './icons.scss';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let commonModule = angular
	.module('app.common', [
		commonComponentModule,
		servicesModule
	])
	.config(($translateProvider) => {
		'ngInject';
		// common translations
		$translateProvider.translations('en', en);
		$translateProvider.translations('fr', fr);
	}).name;

export default commonModule;
