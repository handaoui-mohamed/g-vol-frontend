import template from './checklist.html';
import controller from './checklist.controller';
import './checklist.scss';

let checklistComponent = {
	bindings: {
		companyId: "="
	},
	template,
	controller,
	controllerAs: 'chlVm'
};

export default checklistComponent;
