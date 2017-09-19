class LoginController {
	constructor($auth, $window, $rootScope, $state, $location, AccountDetails, SocketService, Toast, API_ENDPOINT) {
		'ngInject';
		this.$auth = $auth;
		this.$window = $window;
		this.$location = $location;
		this.$rootScope = $rootScope;
		this.$state = $state;
		this.socketService = SocketService;
		this.accountDetails = AccountDetails;
		this.toast = Toast;
		this.api_endpoint = API_ENDPOINT;
	}

	$onInit() {
		// login endpoint for superadmin, admin, clc
		this.loginEndpoint = this.api_endpoint + 'auth/login-superadmin-clc';
		// initilization
		this.disableSubmit = false;
		this.account = {};
	}

	loginAccount() {
		// check if all login form data are valid
		if (this.loginForm.$valid) {
			// disable submit button top stop user to retrying before request is done 
			this.disableSubmit = true;

			// try login user
			this.$auth.login(this.account, { url: this.loginEndpoint }).then((response) => {
				if (!response.data.errors) {
					// if no error is response, then user login was success
					// we should get a valid token, and the current account information
					this.loginSuccess(response.data);
				} else
					this.toast.warning("Username or password incorrect!", "AUTH.INCORRECT");

				// enable submit button
				this.disableSubmit = false;
			}, (error) => {
				this.toast.warning("Username or password incorrect!", "AUTH.INCORRECT");
				// enable submit button
				this.disableSubmit = false;
			});
		}
	}

	loginSuccess(data) {
		this.toast.success("Login successful", "AUTH.SUCCESS");
		// store current account id in localStorage
		this.$window.localStorage['current_account'] = data.account._id;
		// add logged in account to global variable
		this.accountDetails = data.account;
		// if user came from another page, redirect him to it
		if (this.$rootScope.nextState)
			this.$state.go(this.$rootScope.nextState, this.$rootScope.nextStateParams)
		else
			this.$state.go('home.dashboard');

		// initilize socket connection
		this.initSocket();
	}

	initSocket() {
		let socket = this.socketService.io = this.socketService.connect();
		this.socketService.initEvents(socket);
	}
}

export default LoginController;
