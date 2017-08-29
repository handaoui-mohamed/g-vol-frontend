import angular from 'angular';
import accountsComponent from './list/accounts-list.component';

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
        component: 'accounts',
        loginRequired: true
      });

    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .component('accounts', accountsComponent)
  .name;

export default accountModule;
