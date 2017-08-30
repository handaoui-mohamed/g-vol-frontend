import angular from 'angular';
import dashboardComponent from './dashboard.component';
import flightNavBarComponent from './flights-nav-bar/flights-nav-bar.component';
import flightTrackerComponent from './flight-tracker/flight-tracker.component';

// flight tracker components
import flightMessagesComponent from './flight-tracker/components/messages/messages.component';

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
  .component('flightsNavBar', flightNavBarComponent)
  .component('flightTracker', flightTrackerComponent)
  .component('flightMessages', flightMessagesComponent)
  .component('dashboard', dashboardComponent).name;

export default dashboardModule;
