class accountController {
  constructor($state, $stateParams, AccountService, Toast) {
    'ngInject';
    this.$state = $state;
    this.accountService = AccountService;
    this.toast = Toast;
    let accountId = $stateParams.accountId;
    if (accountId) this.accountId = accountId;
  }

  $onInit() {
    this.account = {};
    if (this.accountId) this.getSelectedAccount();
  }

  getSelectedAccount() {
    this.accountService.get({
      accountId: this.accountId
    }, (data) => {
      this.account = data;
      this.isUpdate = true;
    }, (error) => {
      this.toast.serverError(error);
    });
  }

  submit() {
    this.isUpdate ? this.update() : this.save();
  }

  save() {
    this.accountService.save(this.account, (data) => {
      this.toast.success('Account was saved successfully', 'ACCOUNT.SAVED');
      this.$state.go('home.accounts');
    }, (error) => {
      this.toast.serverError(error);
    });
  }

  update() {
    if (!this.changePassord) delete this.account.password;
    this.accountService.update({
      accountId: this.accountId
    }, this.account, (data) => {
      this.toast.success('Account was updated successfully', 'ACCOUNT.UPDATED');
      this.$state.go('home.accounts');
    }, (error) => {
      this.toast.serverError(error);
    });
  }
}

export default accountController;
