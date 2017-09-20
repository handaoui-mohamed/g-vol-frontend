class NavBarController {
	constructor($rootScope, $mdSidenav, $window, $translate, AccountDetails) {
		'ngInject';
		this.$root = $rootScope;
		this.$mdSidenav = $mdSidenav;
		this.$window = $window;
		this.$translate = $translate;
		this.accountDetails = AccountDetails;
	}

	$onInit() {
		// for language buttons, flag is an icon found in assets folder
		this.languages = {
			en: {
				'title': 'English',
				'code': 'en',
				'flag': 'us'
			},
			fr: {
				'title': 'Français',
				'code': 'fr',
				'flag': 'fr'
			}
		};

		// get the selected language to select the flag
		let language = this.$window.localStorage['language'];
		this.selectedLanguage = this.languages[language || this.$translate.preferredLanguage()];

		// get the current zoom levet from localstorage
		// this.$root.currentZoom = parseInt(this.$window.localStorage['zoom'] || "100");
	}

	logout() {
		this.accountDetails.logout();
	}

	changeLanguage(lang) {
		this.selectedLanguage = lang;
		if (lang.code === 'fr' || lang.code === 'en') {
			this.$window.localStorage['language'] = lang.code;
			this.$translate.use(lang.code);
		}
	}

	// SIDENAV function
	// used by the hamburger button, to toggle sidenav
	toggleSideNav() {
		this.$mdSidenav("left").toggle();
	}

	// check if sidenav is locked open, if so hide the toggle button
	isLockedOpen() {
		return this.$mdSidenav("left").isLockedOpen();
	}

	// handle page zoom
	changeZoom(zoomIn) {
		let zoom = this.$root.currentZoom + (zoomIn ? 5 : -5);
		if (zoom <= 100 && zoom >= 75)
			this.$root.currentZoom = zoom;
		this.$window.localStorage['zoom'] = this.$root.currentZoom;
	}
}

export default NavBarController;
