/**
 * @desc angular directive used to limit access to elements according to account role
 * 
 * @example <input name="example" admin-required>
 * if account is not an admin this input will be disabled
 * 
 * @example <div class="example-content" admin-required></div>
 * if account is not an admin this input will be removed
 * 
 */

let adminRequiredDirective = function (AccountDetails) {
	'ngInject';
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			let acceptedRoles = ['superadmin', 'admin'];
			// get account details
			AccountDetails.identity().then((account) => {
				// if account has a role and doest not meet the requirements, delete element
				let TAG_NAMES = ['INPUT', 'MD-SELECT', 'MD-DATEPICKER']
				if (account.function && !acceptedRoles.includes(account.function.name))
					// if element is an input disable it, else remove it
					if (TAG_NAMES.includes(element[0].tagName))
						attrs.$set('disabled', 'disabled');
					else
						element.remove();
			})
		}
	}
}

export default adminRequiredDirective;