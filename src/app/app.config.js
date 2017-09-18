export default function ($locationProvider, $urlRouterProvider, $mdThemingProvider, $translateProvider) {
	"ngInject";
	// activate hmlt5 mode to remove the hash(#) in URLs
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	// angular-translate configuration, set default language to English
	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('sce');
};
