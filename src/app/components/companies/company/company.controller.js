class companyController {
	constructor($stateParams, $state, CompanyService, Toast) {
		'ngInject';
		this.$state = $state;
		this.companyService = CompanyService;
		this.toast = Toast;

		// get company id
		this.companyId = $stateParams.companyId;
	}

	$onInit() {
		this.company = { checklist: [] };
		if (this.companyId) this.getSelectedCompany();
	}

	getSelectedCompany() {
		this.companyService.get({ companyId: this.companyId }, (data) => {
			this.company = data;
			this.isUpdate = true;
		}, (error) => { this.toast.serverError(error); });
	}

	addItem() {
		if (this.checklistItem) {
			this.company.checklist.push(this.checklistItem);
			this.checklistItem = null;
		}
	}

	removeItem(index) {
		this.company.checklist.splice(index, 1);
	}

	selectItem(index) {
		this.checklistItem = this.company.checklist[index];
		this.removeItem(index);
	}

	submit() {
		this.isUpdate ? this.update() : this.save();
	}

	save() {
		this.companyService.save(this.company, (data) => {
			this.toast.success('Company was saved successfully', 'COMPANY.SAVED');
			this.$state.go('home.companies');
		}, (error) => { this.toast.serverError(error); });
	}

	update() {
		this.companyService.update({ companyId: this.companyId }, this.company, (data) => {
			this.toast.success('Company was updated successfully', 'COMPANY.UPDATED');
			this.$state.go('home.companies');
		}, (error) => { this.toast.serverError(error); });
	}
}

export default companyController;
