/**
 * @desc angular directive used to limit access to elements according to account role
 * 
 * exemple: <input name="exemple" admin-required>
 * if account is not an admin this element will be deleted
 */

let adminRequiredDirective = function (AccountDetails) {
	'ngInject';
	return {
		restrict: 'A',
		link: function (scope, element) {
			let acceptedRoles = ['superadmin', 'admin'];
			// get account details
			AccountDetails.identity().then((account) => {
				// if account has a role and doest not meet the requirements, delete element
				if (account.function && !acceptedRoles.includes(account.function.name))
					// if element is an input disable it, else remove it
					if (element[0].tagName === "INPUT")
						element[0].disabled = true;
					else
						element.remove();
			})
		}
	}
}

export default adminRequiredDirective;