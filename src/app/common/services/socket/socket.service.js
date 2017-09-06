import io from 'socket.io-client';

let socketFactory = function ($window, $rootScope, $state, $auth, API_ENDPOINT) {
	'ngInject';
	var socketio;

	initEvents(connect());

	function connect() {
		let token = $window.localStorage['token'];
		return io.connect(API_ENDPOINT.replace('/api/', ''), { query: "token=bearer " + token });
	}

	function initEvents(socket) {
		socketio = socket;
		socket.on('disconnect', () => {
			console.log('disconnected');
		});

		socket.on('connected', (account) => {
			$rootScope.currentAccount = account;
		});

		socket.on('unauthorized', () => {
			if ($state.current.name !== "login") {
				$window.localStorage.removeItem('current_account');
				delete $rootScope.currentAccount;
				$auth.logout();
				$state.go('login');
			}
		});
	}

	function disconnect() {
		if (socketio)
			socketio.disconnect();
	}

	return {
		connect,
		initEvents,
		disconnect,
		io: socketio
	}
}

export default socketFactory;