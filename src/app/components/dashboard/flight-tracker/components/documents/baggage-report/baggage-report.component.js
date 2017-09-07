import template from './baggage-report.html';
import controller from './baggage-report.controller';
import './baggage-report.scss';

let baggageReportComponent = {
	bindings: {
		flight: "=",
		toggled: '=',
		toggle: "&"
	},
	template,
	controller,
	controllerAs: 'brVm'
};

export default baggageReportComponent;
