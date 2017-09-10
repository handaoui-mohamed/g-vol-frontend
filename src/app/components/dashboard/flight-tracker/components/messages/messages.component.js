import template from './messages.html';
import controller from './messages.controller';
import './messages.scss';

let flightMessagesComponent = {
	bindings: {
		flightId: "=",
		team: "=",
		notification: '='
	},
	template,
	controller,
	controllerAs: 'msg'
};

export default flightMessagesComponent;
