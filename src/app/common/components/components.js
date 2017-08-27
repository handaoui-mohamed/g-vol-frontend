import angular from 'angular';
import sideNav from './side-nav/side-nav';
import navBar from './nav-bar/nav-bar.component';
import mdDataPagination from './md-data-pagination/md-data-pagination.component';
import filterMenu from './filter-menu/filter-menu.component';

// translations
import en from './nav-bar/i18n/en.json';
import fr from './nav-bar/i18n/fr.json';

let commonComponentModule = angular
  .module('common.components', [sideNav])
  .config(($translateProvider) => {
    'ngInject';
    $translateProvider.translations('en', en);
    $translateProvider.translations('fr', fr);
  })
  .component('ngNavBar', navBar)
  .component('ngFilterMenu', filterMenu)
  .component('mdDataPagination', mdDataPagination)
  .name;

export default commonComponentModule;
