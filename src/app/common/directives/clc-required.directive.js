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
				let TAG_NAMES = ['INPUT', 'MD-SELECT', 'MD-DATEPICKER']
				if (account.function && account.function.name !== 'clc')
					if (TAG_NAMES.includes(element[0].tagName))
						attrs.$set('disabled', 'disabled');
					else
						element.remove();
			})
		}
	}
}

export default clcRequiredDirective;