import io from 'socket.io-client';

class LoginController {
  constructor($auth, $window, $rootScope, $state, $location, SocketService, Toast, API_ENDPOINT) {
    'ngInject';
    this.$auth = $auth;
    this.$window = $window;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.socketService = SocketService;
    this.toast = Toast;
    this.api_endpoint = API_ENDPOINT;
    this.disableSubmit = false;
    this.account = {};
  }

  loginAccount() {
    if (this.loginForm.$valid) {
      this.disableSubmit = true;
      this.$auth.login(this.account, {
        url: this.api_endpoint + 'auth/login-superadmin-clc'
      }).then((response) => {
        if (!response.data.errors) {
          this.toast.success("Login successful", "AUTH.SUCCESS");
          this.$window.localStorage['current_account'] = response.data.account._id;
          this.$rootScope.currentAccount = response.data.account;
          if (this.$rootScope.next)
            this.$location.path(this.$rootScope.next);
          else
            this.$state.go('home.dashboard');
          let socket = this.socketService.io = this.socketService.connect();
          this.socketService.initEvents(socket);
        } else
          this.toast.warning("Username or password incorrect!", "AUTH.INCORRECT");
        this.disableSubmit = false;
      }, (error) => {
        this.toast.warning("Username or password incorrect!", "AUTH.INCORRECT");
        this.disableSubmit = false;
      });
    }
  }
}

export default LoginController;
