import angular from 'angular';

// shared components module
import commonComponentModule from './components/components';
// shared services module
import servicesModule from './services/services';
// shared directives module
import directiveModule from './directives/directives';

// styles
import './icons.scss';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let commonModule = angular
	.module('app.common', [commonComponentModule, servicesModule, directiveModule])
	.config(($translateProvider) => {
		'ngInject';
		// common translations
		$translateProvider.translations('en', en);
		$translateProvider.translations('fr', fr);
	}).name;

export default commonModule;
