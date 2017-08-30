import template from './messages.html';
import controller from './messages.controller';
import './messages.scss';

let flightMessagesComponent = {
	bindings: {},
	template,
	controller,
	controllerAs: 'msg'
};

export default flightMessagesComponent;
