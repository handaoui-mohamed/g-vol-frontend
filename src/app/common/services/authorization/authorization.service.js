/**
 * @param {*} $rootScope  
 * @param {*} AccountDetails 
 * @returns {function: authorize}
 * 
 * @desc this factory function is used by $state transition
 * as a resolve function, to check account authorization
 * and handle redirection in case of rejection
 * 
 * exemples : 
 * $stateProvider
 * 		.state('home', {
 * 			abstract: true,
 * 			url: '/',
 * 			component: 'main',
 * 			@desc notAllowed is for state that should not be accessed when logged in, like 'login' state
 * 			notAllowed: false,
 * 			@desc accepted account roles should be at the desired state, not necessarily here
 * 			data: {
 * 				roles: ['admin', 'clc']
 * 			}
 * 			@desc resolve function should be at an abstract state level, to handle all state children
 * 			resolve: {
 * 				authorize: ['Authorization', function (Authorization) {
 * 					return Authorization.authorize();
 * 				}]
 * 			}
 * 		});
 * 
 */
let authorizationFactory = function ($rootScope, AccountDetails) {
	'ngInject';
	return {
		authorize: () => {
			// get account details synchronously, then check if authenticated
			return AccountDetails.identity().then(() => {
				var isAuthenticated = AccountDetails.isAuthenticated();
				var $state = $rootScope.state; // get state service than was injected from app.run.js

				// if account is authenticated
				if (isAuthenticated) {
					if ($rootScope.toState.notAllowed) {
						//if state is not allowed go to dashboard, if not already in it
						$state.current.name === 'home.dashboard' ? false : $state.go('home.dashboard');
					}
					// check if roles are specified in state, then check account roles if it matches
					// if not go to dashboard
					else if ($rootScope.toState.data &&
						$rootScope.toState.data.roles &&
						$rootScope.toState.data.roles.length > 0 &&
						!AccountDetails.isInAnyRole($rootScope.toState.data.roles)) {
						$state.go('home.dashboard');
					}
				} else
					$state.go('login'); // if account not authenticated, send him to login page
			});
		}
	};
}

export default authorizationFactory;