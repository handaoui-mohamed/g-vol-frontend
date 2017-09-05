class ChecklistController {
	constructor(CompanyService, Toast) {
		'ngInject';
		this.companyService = CompanyService;
		this.toast = Toast;
	}

	$onInit() {
		this.checklist = {};
		this.getCompany();
	}

	getCompany() {
		this.companyService.get({ companyId: this.companyId }, (company) => {
			this.company = company;
		}, (error) => {
			this.toast.error(error);
		});
	}

}

export default ChecklistController;