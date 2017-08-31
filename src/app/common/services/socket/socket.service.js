import io from 'socket.io-client';

let socketFactory = function ($window, $rootScope, $state, $auth, API_ENDPOINT) {
	'ngInject';
	let token = $window.localStorage['token'];
	var socket = io.connect(API_ENDPOINT.replace('/api/', ''), { query: "token=bearer " + token });;
	socket.on('disconnect', () => {
		console.log('disconnected');
	});

	socket.on('connected', (account) => {
		$rootscope.currentAccount = account;
	});

	socket.on('unauthorized', () => {
		if ($state.current.name !== "login") {
			$window.localStorage.removeItem('current_account');
			delete $rootScope.currentAccount;
			$auth.logout();
			$state.go('login');
		}
	});

	function disconnect() {
		if (socket)
			socket.disconnect();
	}

	return {
		// init,
		disconnect,
		io: socket
	}
}

export default socketFactory;