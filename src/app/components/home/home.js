import angular from 'angular';
import homeComponent from './home.component';

let homeModule = angular
	.module('home', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state('home', {
				abstract: true,
				url: '/',
				component: 'home',
				loginRequired: true,
				resolve: {
					authorize: ['Authorization',
						function (Authorization) {
							return Authorization.authorize();
						}
					]
				}
			});
	})
	.component('home', homeComponent).name;

export default homeModule;
