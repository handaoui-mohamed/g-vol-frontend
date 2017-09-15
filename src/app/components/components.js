import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Dashboard from './dashboard/dashboard';
import Accounts from './accounts/accounts';
import Companies from './companies/companies';
import Flights from './flights/flights';

let componentModule = angular
	.module('app.components', [
		Login,
		Home,
		Dashboard,
		Accounts,
		Companies,
		Flights
	]).name;

export default componentModule;
