import template from './offload-report.html';
import controller from './offload-report.controller';
import './offload-report.scss';

let offloadReportComponent = {
	bindings: {
		flight: "=",
		toggled: '=',
		notification: "=",
		toggle: "&"
	},
	template,
	controller,
	controllerAs: 'ofVm'
};

export default offloadReportComponent;
