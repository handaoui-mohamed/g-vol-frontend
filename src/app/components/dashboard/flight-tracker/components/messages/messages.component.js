import template from './messages.html';
import controller from './messages.controller';
import './messages.scss';

let flightMessagesComponent = {
	bindings: {
		flightId: "=",
		team: "=",			// current flight team, to show corresponding messagess
		notification: '='
	},
	template,
	controller,
	controllerAs: 'msg'
};

export default flightMessagesComponent;
