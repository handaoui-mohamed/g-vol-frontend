import angular from 'angular';
import homeComponent from './home.component';

let homeModule = angular
  .module('home', [])
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        abstract: true,
        url: '/',
        component: 'home',
        loginRequired: true
      });
  })
  .component('home', homeComponent).name;

export default homeModule;
