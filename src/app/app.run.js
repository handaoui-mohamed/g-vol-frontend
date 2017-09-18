export default

	function ($rootScope, $window, AccountDetails, $transitions, $mdSidenav, $translate, $mdComponentRegistry) {
	'ngInject';

	// get the current selected language from the localStorage
	let language = $window.localStorage['language'];
	if (language && (language === "fr" || language === "en")) {
		// if it's a valid language, use it
		$translate.use(language);
	}

	// Pages (routes) transition function to constrole user connection and permissions
	$transitions.onStart({}, (trans) => {
		// activation the progress circular in nav bar, this is usefull when using a slow internet connection
		$rootScope.isLoading = true;

		// check if the sidenav is loaded, if it is, check if it's not locked open the close it
		if ($mdComponentRegistry.get("left") && !$mdSidenav("left").isLockedOpen())
			$mdSidenav("left").close();

		//manage states permissions and not allowed ones when loggin
		// get the target route
		let toState = trans.to();
		let params = trans.params();

		// get the state module to change routes if needed
		let $state = trans.router.stateService;
		$rootScope.state = $state;

		// inject the authorization module to check if user if authorized
		let authorization = trans.injector().get('Authorization');

		$rootScope.toState = toState;
		$rootScope.toStateParams = params;

		if (AccountDetails.isIdentityResolved()) {
			authorization.authorize();
		}
	});

	// handle some transitions events, to close the loading circular progress
	$transitions.onFinish({}, (trans) => {
		$rootScope.isLoading = false;
	});

	$transitions.onRetain({}, (trans) => {
		$rootScope.isLoading = false;
	});

	$transitions.onError({}, (trans) => {
		$rootScope.isLoading = false;
	});
};
