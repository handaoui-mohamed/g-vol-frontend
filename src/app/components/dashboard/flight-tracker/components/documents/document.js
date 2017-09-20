import angular from 'angular';
import flightDocumentsComponent from './documents.component';
import flightInfoComponent from './flight-info/flight-info.component';
import baggageReportComponent from './baggage-report/baggage-report.component';
import paxReportComponent from './pax-report/pax-report.component';
import offloadReportComponent from './offload-report/offload-report.component';

let flightDocumentsModule = angular
	.module('flightDocuments', [])
	.component('flightInfo', flightInfoComponent)
	.component('baggageReport', baggageReportComponent)
	.component('paxReport', paxReportComponent)
	.component('offloadReport', offloadReportComponent)
	.component('flightDocuments', flightDocumentsComponent).name;

export default flightDocumentsModule;
