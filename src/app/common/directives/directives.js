import angular from 'angular';

import adminRequiredDirective from './admin-required.directive';
import clcRequiredDirective from './clc-required.directive'

let directiveModule = angular
	.module('app.directives', [])
	.directive('adminRequired', adminRequiredDirective)
	.directive('clcRequired', clcRequiredDirective)
	.name;

export default directiveModule;
