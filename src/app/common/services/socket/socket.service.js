import socketIO from "socket.io-client";
/**
 * @desc factory function that handles socket connection, athentication, disconnection
 * 
 * @return {function: connect}		connect to server socket
 * @return {function: disconnect}	disconnect from server socket
 * @return {function: initEvent}	initilize globale socket events
 * @return {object: socketio as io} socket object returned after a successful connection, used to add more events
 * 
 */
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

		// socket event, executed when account is disconnected
		// could be used to reconnect,but not in our case
		socket.on('disconnect', () => {
			console.log('disconnected');
		});

		// socket event, executed when connection is successful
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

	// function to disconnect account from socket server
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