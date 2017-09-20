/**
 * @desc angular directive used to limit access to elements according to account role
 * 
 * @example <input name="example" clc-required>
 * if account is not a CLC this input will be disabled
 * 
 * @example <div class="example-content" clc-required></div>
 * if account is not a CLC this input will be removed
 * 
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
					if (element[0].tagName === "INPUT")
						element[0].disabled = true;
					else
						element.remove();
			})
		}
	}
}

export default clcRequiredDirective;