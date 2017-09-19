/**
 * App module run configuration function
 */

export default

	function ($rootScope, $window, AccountDetails, $transitions, $mdSidenav, $translate, $mdComponentRegistry) {
	'ngInject';

	// get the current selected language from the localStorage
	let language = $window.localStorage['language'];
	// check if it's a valid language, then use it
	if (language && (language === "fr" || language === "en")) $translate.use(language);


	// Pages (routes) transition function to constrole user connection and permissions
	$transitions.onStart({}, (trans) => {
		// activation the progress circular in nav bar, this is usefull when using a slow internet connection
		$rootScope.isLoading = true;

		// check if the sidenav is loaded, if so, check if it's not locked open, then close it
		if ($mdComponentRegistry.get("left") && !$mdSidenav("left").isLockedOpen())
			$mdSidenav("left").close();

		/**
		 * manage states permissions and not allowed ones when logged in
		 * get the target route state and its params
		 * 
		 */
		$rootScope.toState = trans.to();
		$rootScope.toStateParams = trans.params();

		// get the state module and save it in rootscope for easy access
		$rootScope.state = trans.router.stateService;

		// inject the authorization module to check if user if authorized to access the target state
		let authorization = trans.injector().get('Authorization');

		/**
		 * since the verification of account authorization is sync
		 * we check if the request is resolved and then authorize
		 * 
		 */
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
