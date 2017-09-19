/**
 * @desc angular directive used to limit access to elements according to account role
 * 
 * exemple: <input name="exemple" clc-required>
 * if account is not a CLC this element will be deleted
 */

let clcRequiredDirective = function (AccountDetails) {
	'ngInject';
	return {
		restrict: 'A',
		link: function (scope, element) {
			// get account details
			AccountDetails.identity().then((account) => {
				// if account has a role and doest not meet the requirements, delete element
				if (account.function && account.function.name !== 'clc')
					element.remove();
			})
		}
	}
}

export default clcRequiredDirective;