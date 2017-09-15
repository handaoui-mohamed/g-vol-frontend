import template from './checklist.html';
import controller from './checklist.controller';
import './checklist.scss';

let checklistComponent = {
	bindings: {
		flight: "=",
		checklistDocuments: "=documents"
	},
	template,
	controller,
	controllerAs: 'chlVm'
};

export default checklistComponent;
