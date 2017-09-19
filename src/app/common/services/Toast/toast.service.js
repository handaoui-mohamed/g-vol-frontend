/**
 * Service used to handle server side errors and custom messages with there states ['success','warning', 'error']
 */

class ToastService {
	constructor($filter, AccountDetails, toastr) {
		'ngInject';
		this.$translate = $filter('translate'); // get translation filter, to translate toast messages
		this.accountDetails = AccountDetails;
		this.toastr = toastr;
	}

	/**
	 * 
	 * @param {string} message the default message to show
	 * @param {string} translate if specified translate the message then show the toast
	 * 
	 * @desc this applies to success, warning and error functions
	 * 
	 */
	success(message, translate) {
		this.toastr.success(translate ? this.$translate(translate) : message);
	}

	warning(message, translate) {
		this.toastr.warning(translate ? this.$translate(translate) : message);
	}

	error(message, translate) {
		this.toastr.warning(translate ? this.$translate(translate) : message);
	}

	/**
	 * 
	 * @param {object} error should contain error status for accurate error handling
	 * @desc handles this server side errors [400, 401, 403, 404]
	 * 
	 */
	serverError(error) {
		switch (error.status) {
			case (400): // bad request, there is field missing or not properly formatted
				this.error("You must fill in all fields", 'SERVER.400');
				break;
			case (401): // unauthorised access, when not loggin or token expried
				// this.error("Unauthorized access", 'SERVER.401');
				this.accountDetails.logout();
				break;
			case (403): // account logged in but not sufficient permissions
				this.error("Insufficient permission to perform this operation", 'SERVER.403');
				break;
			case (404): // the content doest not existe
				this.warning("The content you requested does not exist", 'SERVER.404');
				break;
			default:   // usually it supposed to be 500 server error, but we treat the rest all the same 
				this.error('Service not available for the moment', 'SERVER.500');
				break;
		}
	}
}

export default ToastService;
