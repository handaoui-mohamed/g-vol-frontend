import template from './documents.html';
import controller from './documents.controller';
import './documents.scss';

let flightDocumentsComponent = {
	bindings: {
		flight: "="
	},
	template,
	controller,
	controllerAs: 'docVm'
};

export default flightDocumentsComponent;
