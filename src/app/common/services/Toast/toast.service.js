class ToastService {
	constructor($filter, AccountDetails, toastr) {
		'ngInject';
		this.$translate = $filter('translate');
		this.accountDetails = AccountDetails;
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
				// this.error("Unauthorized access", 'SERVER.401');
				this.accountDetails.logout();
				break;
			case (403):
				this.error("Insufficient permission to perform this operation", 'SERVER.403');
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
