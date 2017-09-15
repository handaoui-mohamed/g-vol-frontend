class accountController {
	constructor($state, $stateParams, AccountService, Toast) {
		'ngInject';
		this.$state = $state;
		this.accountService = AccountService;
		this.toast = Toast;

		// get accountId from state params if exists
		this.accountId = $stateParams.accountId;
	}

	$onInit() {
		this.account = {};
		// if accountId, we get the selected account from server
		if (this.accountId) this.getSelectedAccount();
	}

	getSelectedAccount() {
		this.accountService.get({ accountId: this.accountId }, (data) => {
			this.account = data;
			this.isUpdate = true;
		}, (error) => { this.toast.serverError(error); });
	}

	submit() {
		// if this is an update, update account else save a new one
		this.isUpdate ? this.update() : this.save();
	}

	save() {
		this.accountService.save(this.account, (data) => {
			this.toast.success('Account was saved successfully', 'ACCOUNT.SAVED');
			this.$state.go('home.accounts');
		}, (error) => { this.toast.serverError(error); });
	}

	update() {
		// if update account without changing password, we remove it
		if (!this.changePassword) delete this.account.password;
		this.accountService.update({ accountId: this.accountId }, this.account, (data) => {
			this.toast.success('Account was updated successfully', 'ACCOUNT.UPDATED');
			this.$state.go('home.accounts');
		}, (error) => { this.toast.serverError(error); });
	}
}

export default accountController;
