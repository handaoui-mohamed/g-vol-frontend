import angular from 'angular';
import satellizer from 'satellizer';
import loginComponent from './login.component';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let loginModule = angular
  .module('login', [satellizer])
  .config(($stateProvider, $authProvider, $translateProvider) => {
    "ngInject";
    $authProvider.tokenPrefix = '';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = '';

    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login'
      });
    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .component('login', loginComponent).name;

export default loginModule;
