import template from './checklist.html';
import controller from './checklist.controller';
import './checklist.scss';

let checklistComponent = {
	bindings: {
		flight: "=",
		// this one is used to assist the flight progress component
		// this component is responsible for fetching flight documents
		checklistDocuments: "=documents"
	},
	template,
	controller,
	controllerAs: 'chlVm'
};

export default checklistComponent;
