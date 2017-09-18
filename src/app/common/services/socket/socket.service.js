import socketIO from "socket.io-client";

let socketFactory = function ($window, $rootScope, $state, $auth, API_ENDPOINT) {
	'ngInject';
	var socketio;

	// connect socket, and then initilize connection events
	initEvents(connect());

	function connect() {
		// get token from localStorage
		let token = $window.localStorage['token'];
		// connect to socket server with token as a query, and return the socket object
		return socketIO.connect(API_ENDPOINT.replace('/api/', ''), { query: "token=bearer " + token });
	}

	function initEvents(socket) {
		socketio = socket;
		socket.on('disconnect', () => {
			console.log('disconnected');
		});

		socket.on('connected', (account) => {
			$rootScope.$apply(() => {
				$rootScope.currentAccount = account;
			});
		});

		socket.on('unauthorized', () => {
			// if unauthorized and user is not is login page, log him out
			if ($state.current.name !== "login") {
				$window.localStorage.removeItem('current_account');
				delete $rootScope.currentAccount;
				$auth.logout();
				$state.go('login');
			}
		});
	}

	function disconnect() {
		if (socketio) socketio.disconnect();
	}

	return {
		connect,
		initEvents,
		disconnect,
		io: socketio
	}
}

export default socketFactory;