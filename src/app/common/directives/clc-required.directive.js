let clcRequiredDirective = function (AccountDetails) {
	'ngInject';
	return {
		restrict: 'A',
		link: function (scope, element) {
			AccountDetails.identity().then((account) => {
				if (account.function && account.function.name !== 'clc')
					element.remove();
			})
		}
	}
}

export default clcRequiredDirective;