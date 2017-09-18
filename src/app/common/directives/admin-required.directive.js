let adminRequiredDirective = function (AccountDetails) {
	'ngInject';
	return {
		restrict: 'A',
		link: function (scope, element) {
			console.log('admin required')
			let acceptedRoles = ['superadmin', 'admin'];
			AccountDetails.identity().then((account) => {
				console.log('admin required account', account);

				if (account.function && !acceptedRoles.includes(account.function.name))
					element.remove();
			})
		}
	}
}

export default adminRequiredDirective;