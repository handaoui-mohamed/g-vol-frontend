import angular from 'angular';
import AccountService from './account/account.service';
import FlightService from './flight/flight.service';
import CompanyService from './company/company.service';
import ToastService from './Toast/toast.service';
import CsvToJsonService from './csv-to-json/csv-to-json.service';

let servicesModule = angular
  .module('app.services', [])
  .factory('AccountService', AccountService)
  .factory('FlightService', FlightService)
  .factory('CompanyService', CompanyService)
  .service('Toast', ToastService)
  .service('CsvToJson', CsvToJsonService)
  .name;

export default servicesModule;
