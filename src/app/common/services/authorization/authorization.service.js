let authorizationFactory = function ($rootScope, AccountDetails) {
	'ngInject';
	return {
		authorize: () => {
			return AccountDetails.identity().then(() => {
				var isAuthenticated = AccountDetails.isAuthenticated();
				var $state = $rootScope.state;
				if (isAuthenticated) {
					if ($rootScope.toState.notAllowed) {
						$state.current.name === 'home.dashboard' ? false : $state.go('home.dashboard');
					}
					else if ($rootScope.toState.data &&
						$rootScope.toState.data.roles &&
						$rootScope.toState.data.roles.length > 0 &&
						!AccountDetails.isInAnyRole($rootScope.toState.data.roles)) {
						$state.go('home.dashboard');
					}
				} else {
					$rootScope.returnToState = $rootScope.toState;
					$rootScope.returnToStateParams = $rootScope.toStateParams;
					$state.go('login');
				}
			});
		}
	};
}

export default authorizationFactory;