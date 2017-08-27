class CompaniesListController {
  constructor($mdDialog, $filter, CompanyService, Toast) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$translate = $filter('translate');
    this.companyService = CompanyService;
    this.toast = Toast;
  }

  $onInit() {
    this.companies = [];
    this.queryString = "";
    this.query = {
      page: 1,
      limit: 3
    };
    this.getCompanies();
    this.getCompaniesCount();
  }

  getCompanies() {
    let skip = (this.query.page - 1) * this.query.limit;
    let limit = this.query.limit;
    let q = this.queryString;
    this.promise = this.companyService.query({
      skip,
      limit,
      q
    }, (data) => {
      this.companies = data;
    }, (error) => {
      this.toast.serverError(error);
    }).$promise;
  }


  getCompaniesCount() {
    this.companyService.get({
      companyId: "count"
    }, (data) => {
      this.count = data.count;
    }, (error) => {
      this.toast.serverError(error);
    })
  }

  searchCompanies() {
    this.query.page = 1;
    this.getCompanies();
  }

  deleteCompany(ev, companyId, index) {
    var confirm = this.$mdDialog.confirm()
      .title(this.$translate('COMPANY.DELETE'))
      .ariaLabel('confirm dialog')
      .targetEvent(ev)
      .ok(this.$translate('CONFIRM'))
      .cancel(this.$translate('CANCEL'));

    this.$mdDialog.show(confirm).then(() => {
      this.companyService.delete({
        companyId
      }, () => {
        this.companies.splice(index, 1);
        this.toast.success('Company was deleted successfully', 'COMPANY.DELETED');
      }, (error) => {
        this.toast.serverError(error);
      });
    });
  }

}

export default CompaniesListController;
