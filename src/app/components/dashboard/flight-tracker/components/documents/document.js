import angular from 'angular';
import flightDocumentsComponent from './documents.component';
import flightInfoComponent from './flight-info/flight-info.component';
import baggageReportComponent from './baggage-report/baggage-report.component';
import paxReportComponent from './pax-report/pax-report.component';
import offloadReportComponent from './offload-report/offload-report.component';

// translations
// import en from './i18n/en.json';
// import fr from './i18n/fr.json';

let flightDocumentsModule = angular
	.module('flightDocuments', [])
	.config(($translateProvider) => {
		"ngInject";
		// $translateProvider.translations('en', en);
		// $translateProvider.translations('fr', fr);
	})
	.component('flightInfo', flightInfoComponent)
	.component('baggageReport', baggageReportComponent)
	.component('paxReport', paxReportComponent)
	.component('offloadReport', offloadReportComponent)
	.component('flightDocuments', flightDocumentsComponent).name;

export default flightDocumentsModule;
