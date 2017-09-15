export default function ($locationProvider, $mdThemingProvider, $translateProvider) {
	"ngInject";
	// activate hmlt5 mode to remove the hash(#) in URLs
	$locationProvider.html5Mode(true).hashPrefix('!');

	// angular-translate configuration, set default language to English
	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('sce');

	// Register toast themes
	$mdThemingProvider.theme("success-toast");
	$mdThemingProvider.theme("error-toast");
	$mdThemingProvider.theme("warning-toast");
};
