class AccountsListController {
  constructor($mdDialog, $filter, AccountService, Toast) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$translate = $filter('translate');
    this.accountService = AccountService;
    this.toast = Toast;
  }

  $onInit() {
    this.accounts = [];
    this.selectedFunctions = [];
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
    this.query = {
      page: 1,
      limit: 10
    };
    this.getAccounts();
    this.getAccountsCount();
  }

  getAccounts() {
    let skip = (this.query.page - 1) * this.query.limit;
    let limit = this.query.limit;
    let q = this.queryString;
    let functions = this.selectedFunctions.length > 0 ? this.selectedFunctions : null;
    this.promise = this.accountService.query({
      skip,
      limit,
      q,
      functions
    }, (data) => {
      this.accounts = data;
    }, (error) => {
      this.toast.serverError(error);
    }).$promise;
  }

  getAccountsCount() {
    this.accountService.get({
      accountId: "count"
    }, (data) => {
      this.count = data.count;
    }, (error) => {
      this.toast.serverError(error);
    })
  }

  searchAccounts() {
    this.query.page = 1;
    this.getAccounts();
  }

  deleteAccount(ev, accountId, index) {
    var confirm = this.$mdDialog.confirm()
      .title(this.$translate('ACCOUNT.DELETE'))
      // .textContent('You can restore this account by going to deleted Accounts')
      .ariaLabel('confirm dialog')
      .targetEvent(ev)
      .ok(this.$translate('CONFIRM'))
      .cancel(this.$translate('CANCEL'));

    this.$mdDialog.show(confirm).then(() => {
      this.accountService.delete({
        accountId
      }, () => {
        this.accounts.splice(index, 1);
        this.toast.success('Account was deleted successfully', 'ACCOUNT.DELETED');
      }, (error) => {
        this.toast.serverError(error);
      });
    });
  }

}

export default AccountsListController;
