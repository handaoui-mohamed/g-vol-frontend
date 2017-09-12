import template from './pax-report.html';
import controller from './pax-report.controller';
import './pax-report.scss';

let paxReportComponent = {
	bindings: {
		flight: "=",
		toggled: '=',
		notification: "=",
		toggle: "&"
	},
	template,
	controller,
	controllerAs: 'prVm'
};

export default paxReportComponent;
