class ToastService {
	constructor($filter, $window, $state, toastr) {
		'ngInject';
		this.$translate = $filter('translate');
		this.$window = $window;
		this.$state = $state;
		this.toastr = toastr;
	}

	success(message, translate) {
		this.toastr.success(translate ? this.$translate(translate) : message);
	}

	warning(message, translate) {
		this.toastr.warning(translate ? this.$translate(translate) : message);
	}

	error(message, translate) {
		this.toastr.warning(translate ? this.$translate(translate) : message);
	}

	serverError(error) {
		switch (error.status) {
			case (400):
				this.error("You must fill in all fields", 'SERVER.400');
				break;
			case (401):
				this.error("Unauthorized access", 'SERVER.401');
				this.$window.localStorage.removeItem('current_account');
				this.$auth.logout();
				this.$state.go('login');
				this.socketSerivce.disconnect();
				break;
			case (403):
				this.error("Insufficient permission to perform the opération", 'SERVER.403');
				break;
			case (404):
				this.warning("The content you requested does not exist", 'SERVER.404');
				break;
			default:
				this.error('Service not available for the moment', 'SERVER.500');
				break;
		}
	}
}

export default ToastService;
