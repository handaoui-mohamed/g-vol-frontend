let accountDetailsFactory = function ($q, $window, $auth, $state, AccountService, SocketService) {
	'ngInject';
	var _identity = undefined,
		_authenticated = false;

	let isIdentityResolved = function () {
		return angular.isDefined(_identity);
	}

	let isAuthenticated = function () {
		return _authenticated;
	}

	let isInAnyRole = function (roles) {
		if (!_authenticated || !_identity.function || !_identity.function.name) return false;
		return roles.includes(_identity.function.name);
	}

	let identity = function () {
		let deferred = $q.defer();
		if (angular.isDefined(_identity)) {
			deferred.resolve(_identity);
		} else {
			let accountId = $window.localStorage['current_account'];
			if (!accountId) {
				deferred.resolve(_identity);
			} else {
				AccountService.get({ accountId }).$promise.then(function (response) {
					_identity = response;
					_authenticated = true;
					deferred.resolve(_identity);
				}, function (error) {
					logout();
					error.status === 401 ? deferred.resolve(_identity) : deferred.reject(_identity);
				})
			}
		}
		return deferred.promise;
	}

	let logout = function () {
		_identity = undefined;
		_authenticated = false;
		$window.localStorage.removeItem('current_account');
		$auth.logout();
		SocketService.disconnect();
		$state.go('login');
	}

	let save = function (account) {
		_identity = account;
		_authenticated = true;
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