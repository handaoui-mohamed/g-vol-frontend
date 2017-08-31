import angular from 'angular';
import AccountService from './account/account.service';
import FlightService from './flight/flight.service';
import CompanyService from './company/company.service';
import ToastService from './Toast/toast.service';

//sockets
import SocketService from './socket/socket.service';

let servicesModule = angular
  .module('app.services', [])
  .factory('AccountService', AccountService)
  .factory('FlightService', FlightService)
  .factory('CompanyService', CompanyService)
  .factory('SocketService', SocketService)
  .service('Toast', ToastService)
  .name;

export default servicesModule;
