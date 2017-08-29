import angular from 'angular';
import sideNav from './side-nav.component';
import './md-side-nav/angular-material-sidenav';

// styles
import './md-side-nav/angular-material-sidenav.css';

// translations
import en from './i18n/en.json';
import fr from './i18n/fr.json';

let sideNavComponentModule = angular
  .module('common.sidenav', ['sasrio.angular-material-sidenav'])
  .config(($translateProvider, ssSideNavSectionsProvider) => {
    'ngInject';

    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);

    ssSideNavSectionsProvider.initWithSections([{
      id: 'dashboard',
      name: 'Main page',
      translate: 'SIDENAV.DASHBOARD',
      state: 'home.dashboard',
      type: 'link',
      icon: 'icon-home'
    }, {
      id: 'accounts_list',
      name: 'Accounts list',
      translate: 'SIDENAV.ACCOUNTS.LIST',
      state: 'home.accounts',
      type: 'link',
      icon: 'icon-people'
    }, {
      id: 'flights_list',
      name: 'Flights list',
      translate: 'SIDENAV.FLIGHTS.LIST',
      state: 'home.flights',
      type: 'link',
      icon: 'icon-airplane'
    }, {
      id: 'companies_list',
      name: 'Companies list',
      translate: 'SIDENAV.COMPANIES.LIST',
      state: 'home.companies',
      type: 'link',
      icon: 'icon-format-list-bulleted'
    }]);
  })
  .component('ngSideNav', sideNav)
  .name;

export default sideNavComponentModule;
