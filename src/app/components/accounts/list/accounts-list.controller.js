class AccountsListController {
	constructor($stateParams, $mdDialog, $filter, AccountService, Toast) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$translate = $filter('translate');
		this.accountService = AccountService;
		this.toast = Toast;
		this.deletedAccounts = $stateParams.deleted;
	}

	$onInit() {
		// initilizations
		this.accounts = [];
		this.selectedFunctions = [];
		// function used by menu filter
		this.functions = [{
			translate: 'CLC',
			value: 'clc'
		}, {
			translate: 'TRC',
			value: 'trc'
		}, {
			translate: 'TL',
			value: 'tl'
		}, {
			translate: 'TB',
			value: 'tb'
		}];
		this.queryString = "";
		this.query = { page: 1, limit: 10 };

		this.getAccounts();
		this.getAccountsCount();
	}

	getAccounts() {
		// query params {skip, limit, search:q, functions}
		// calculate skip value
		let skip = (this.query.page - 1) * this.query.limit;
		let limit = this.query.limit;
		let q = this.queryString;
		let functions = this.selectedFunctions.length > 0 ? this.selectedFunctions : null;

		// this.promise is used by the table to show asyn progress bar
		this.promise = this.accountService.query({ skip, limit, q, functions, deleted: this.deletedAccounts }, (data) => {
			this.accounts = data;
		}, (error) => { this.toast.serverError(error); }).$promise;
	}

	getAccountsCount() {
		this.accountService.get({ accountId: "count" }, (data) => {
			this.count = data.count;
		}, (error) => { this.toast.serverError(error); })
	}

	searchAccounts() {
		this.query.page = 1;
		this.getAccounts();
	}

	deleteAccount(ev, accountId, index) {
		// show confimation dialog before deleting selected account
		var confirm = this.$mdDialog.confirm()
			.title(this.$translate('ACCOUNT.DELETE'))
			.textContent(this.$translate("ACCOUNT.CAN_RESTORE"))
			.ariaLabel('confirm dialog')
			.targetEvent(ev)
			.ok(this.$translate('CONFIRM'))
			.cancel(this.$translate('CANCEL'));

		this.$mdDialog.show(confirm).then(() => {
			// if confirmed, delete user
			this.accountService.delete({ accountId }, () => {
				// if successful, remove account from accounts array
				this.accounts.splice(index, 1);
				this.toast.success('Account was deleted successfully', 'ACCOUNT.DELETED');
			}, (error) => { this.toast.serverError(error); });
		});
	}

	restoreAccount(ev, accountId, index) {
		// show confimation dialog before deleting selected account
		var confirm = this.$mdDialog.confirm()
			.title(this.$translate('ACCOUNT.RESTORE'))
			.ariaLabel('confirm dialog')
			.targetEvent(ev)
			.ok(this.$translate('CONFIRM'))
			.cancel(this.$translate('CANCEL'));

		this.$mdDialog.show(confirm).then(() => {
			// if confirmed, delete user
			this.accountService.patch({ accountId }, {}, () => {
				// if successful, remove account from deleted accounts array
				this.accounts.splice(index, 1);
				this.toast.success('Account was restored successfully', 'ACCOUNT.RESTORED');
			}, (error) => { this.toast.serverError(error); });
		});
	}
}

export default AccountsListController;
