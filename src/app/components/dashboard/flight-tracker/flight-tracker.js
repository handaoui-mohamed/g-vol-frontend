import angular from 'angular';
import flightDocuments from './components/documents/document';
import flightTrackerComponent from './flight-tracker.component';
import flightMessagesComponent from './components/messages/messages.component';
import flightChecklistComponent from './components/checklist/checklist.component';
import flightDocumentsComponent from './components/documents/documents.component';


// translations
// import en from './i18n/en.json';
// import fr from './i18n/fr.json';

let flightTrackerModule = angular
	.module('flightTracker', [flightDocuments])
	.config(() => {
		"ngInject";
		// $translateProvider.translations('en', en);
		// $translateProvider.translations('fr', fr);
	})
	.component('flightMessages', flightMessagesComponent)
	.component('flightChecklist', flightChecklistComponent)
	.component('flightTracker', flightTrackerComponent).name;

export default flightTrackerModule;
