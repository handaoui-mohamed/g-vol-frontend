import angular from 'angular';

import AccountService from './account/account.service';
import AccountDetailsService from './account/account-details.service';
import AuthorizationService from './authorization/authorization.service';
import FlightService from './flight/flight.service';
import CompanyService from './company/company.service';
import ToastService from './Toast/toast.service';
import CsvToJsonService from './csv-to-json/csv-to-json.service';

//sockets
import SocketService from './socket/socket.service';

let servicesModule = angular
	.module('app.services', [])
	.config((toastrConfig) => {
		'ngInject'
		// toastr configuration
		// for more information about it, see angular-toastr github page
		angular.extend(toastrConfig, {
			"autoDismiss": true,
			"positionClass": "toast-top-right",
			"type": "info",
			"timeOut": 3000,
			"extendedTimeOut": 0,
			"allowHtml": false,
			"closeButton": true,
			"tapToDismiss": true,
			"progressBar": true,
			"newestOnTop": true,
			"maxOpened": 3,
			"preventOpenDuplicates": true
		});
	})
	.factory('AccountService', AccountService)
	.factory('FlightService', FlightService)
	.factory('CompanyService', CompanyService)
	.factory('SocketService', SocketService)
	.factory('AccountDetails', AccountDetailsService)
	.factory('Authorization', AuthorizationService)
	.service('Toast', ToastService)
	.service('CsvToJson', CsvToJsonService)
	.name;

export default servicesModule;
