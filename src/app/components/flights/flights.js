import angular from 'angular';
import flightComponent from './flight/flight.component';
import flightsListComponent from './list/flights-list.component';
import flightsBatchComponent from './batch/flights-batch.component';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let flightModule = angular
  .module('flights', [])
  .config(($stateProvider, $translateProvider) => {
    'ngInject';
    $stateProvider
      .state('home.flights', {
        url: 'flights',
        component: 'flightsList',
        loginRequired: true
      })
      .state('home.flightsBatch', {
        url: 'flights/batch',
        component: 'flightsBatch',
        loginRequired: true
      })
      .state('home.newFlight', {
        url: 'flights/add',
        component: 'flight',
        loginRequired: true
      })
      .state('home.flight', {
        url: 'flights/:flightId',
        component: 'flight',
        loginRequired: true
      });
    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .component('flight', flightComponent)
  .component('flightsList', flightsListComponent)
  .component('flightsBatch', flightsBatchComponent)
  .name;

export default flightModule;
