import angular from 'angular';
import dashboardComponent from './dashboard.component';
import flightNavBarComponent from './flights-nav-bar/flights-nav-bar.component';
import flightTrackerComponent from './flight-tracker/flight-tracker.component';

// flight tracker components
import flightMessagesComponent from './flight-tracker/components/messages/messages.component';
import flightChecklistComponent from './flight-tracker/components/checklist/checklist.component';
import flightDocumentsComponent from './flight-tracker/components/documents/documents.component';

// flight Services
import MessageService from './services/messages.service';
import FlightTeamService from './services/flight-team.service';
import FlightDocumentsService from './services/flight-document.service';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let dashboardModule = angular
  .module('dashboard', [])
  .config(($stateProvider, $translateProvider) => {
    "ngInject";
    $stateProvider
      .state('home.dashboard', {
        url: '',
        component: 'dashboard',
        loginRequired: true
      });

    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .factory('MessageService', MessageService)
  .factory('FlightTeamService', FlightTeamService)
  .factory('DocumentsService', FlightDocumentsService)
  .component('flightsNavBar', flightNavBarComponent)
  .component('flightTracker', flightTrackerComponent)
  .component('flightMessages', flightMessagesComponent)
  .component('flightChecklist', flightChecklistComponent)
  .component('flightDocuments', flightDocumentsComponent)
  .component('dashboard', dashboardComponent).name;

export default dashboardModule;
