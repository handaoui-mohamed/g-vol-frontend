export default

function ($locationProvider, $mdThemingProvider, $translateProvider) {
  "ngInject";
  $locationProvider.html5Mode(true).hashPrefix('!');

  // angular-translate configuration
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sce');

  // Toast themes
  $mdThemingProvider.theme("success-toast");
  $mdThemingProvider.theme("error-toast");
  $mdThemingProvider.theme("warning-toast");

  //default global theme
  // $mdThemingProvider.theme('default').primaryPalette('red');
};
