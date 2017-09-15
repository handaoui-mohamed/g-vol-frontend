export default

	function ($rootScope, $location, $window, AccountService, $transitions, $mdSidenav, $translate, $mdComponentRegistry) {
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

		// To avoid copying the same top background html code, 
		// we used a global one, and the choose to show the top background
		$rootScope.hideTopBG = false;

		// check if the sidenav is loaded, if it is, check if it's not locked open the close it
		if ($mdComponentRegistry.get("left") && !$mdSidenav("left").isLockedOpen())
			$mdSidenav("left").close();

		// define the not allowed states when user is already logged in
		let notAllowedStates = ['/login'];

		// get the target route
		let toState = trans.to();

		// get the state module to change routes if needed
		let $state = trans.router.stateService;

		// inject the $auth module to check if user if authenticated
		let authService = trans.injector().get('$auth');

		// if user go to one of the not allowed states we register the current one in "next"
		// to be used for redirection when the user is not logged in
		if (notAllowedStates.indexOf($location.url()) === -1)
			$rootScope.next = $location.url();

		// check if user is authenticated
		if (authService.isAuthenticated()) {
			// TODO: handle permissions
			if (notAllowedStates.indexOf(toState['url']) !== -1)
				return $state.current.name === 'home.dashboard' ? false : $state.target('home.dashboard');
		} else {
			// if user not authenticated, and the target state require being logged in
			// we redirect him to the login page
			if (toState['loginRequired']) {
				return $state.target('login');
			}
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
