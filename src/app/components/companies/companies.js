import angular from 'angular';
import companiesComponent from './list/companies-list.component';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let companyModule = angular
  .module('companies', [])
  .config(($stateProvider, $translateProvider) => {
    'ngInject';
    $stateProvider
      .state('home.companies', {
        url: 'companies',
        component: 'companies',
        loginRequired: true
      })
    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .component('companies', companiesComponent)
  .name;

export default companyModule;
