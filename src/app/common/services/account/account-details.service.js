/**
 * 
 * @param {*} AccountService used to get the current account details from server
 * @param {*} SocketService  used for only disconnecting account from server socket
 * 
 * @return {function: identity}
 * @return {function: isIdentityResolved}
 * @return {function: isAuthenticated}
 * @return {function: isInAnyRole}
 * @return {function: logout}
 * @return {function: save}
 * 
 * @desc this function is used to access account details, check roles, if is authenticated, logout
 */

let accountDetailsFactory = function ($q, $rootScope, $window, $auth, $state, AccountService, SocketService) {
	'ngInject';
	var _identity = undefined,  // user idenity
		_authenticated = false; // boolean if account is authenticated

	// check if account async request was resolved
	let isIdentityResolved = function () {
		return angular.isDefined(_identity);
	}

	// check if account is authenticated
	let isAuthenticated = function () {
		return _authenticated;
	}

	// check if account has any matching roles
	let isInAnyRole = function (roles) {
		if (!_authenticated || !_identity.function || !_identity.function.name) return false;
		return roles.includes(_identity.function.name);
	}

	// fetch account from server is not request not sent yet otherwise return the reloved one
	let identity = function () {
		let deferred = $q.defer();
		// if account was fetch return it
		if (angular.isDefined(_identity)) {
			deferred.resolve(_identity);
		} else {
			/**
			 * if account was not fetched,
			 * get the current account ID from local storage
			 * 
			 */
			let accountId = $window.localStorage['current_account'];
			if (!accountId)
				// if account id does not existe, resolve the request but with identity as null
				// to allow state transition
				deferred.resolve(_identity);
			else {
				// GET request for account by id
				AccountService.get({ accountId }).$promise.then((account) => {
					// save all account information
					save(account);
					deferred.resolve(_identity);
				}, (error) => {
					// if any errors logout the current account
					logout();
					// if error status is 401 unauthorised then resole the request to allow state transition
					error.status === 401 ? deferred.resolve(_identity) : deferred.reject(_identity);
				})
			}
		}
		return deferred.promise;
	}

	/**
	 * @desc function used to logout account
	 * saves the previous state
	 * remove the current account id and token from local storage
	 * disconnect account from server socket
	 * redirect him to login page
	 */
	let logout = function () {
		_identity = undefined;
		_authenticated = false;
		savePreviousState();
		$window.localStorage.removeItem('current_account');
		$auth.logout();
		SocketService.disconnect();
		$state.go('login');
	}

	let save = function (account) {
		_identity = account;
		_authenticated = true;
	}

	// saves the previous state details
	let savePreviousState = function () {
		$rootScope.nextState = angular.copy($state.current.name);
		$rootScope.nextStateParams = angular.copy($state.params);
	}


	return {
		identity,
		isIdentityResolved,
		isAuthenticated,
		isInAnyRole,
		logout,
		save
	};
}

export default accountDetailsFactory;