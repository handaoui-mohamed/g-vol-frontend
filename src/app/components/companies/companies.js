import angular from 'angular';
import companyComponent from './company/company.component';
import companiesListComponent from './list/companies-list.component';

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
        component: 'companiesList',
        loginRequired: true
      })
      .state('home.newCompany', {
        url: 'companies/add',
        component: 'company',
        loginRequired: true
      })
      .state('home.company', {
        url: 'companies/:companyId',
        component: 'company',
        loginRequired: true
      });
    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .component('company', companyComponent)
  .component('companiesList', companiesListComponent)
  .name;

export default companyModule;
