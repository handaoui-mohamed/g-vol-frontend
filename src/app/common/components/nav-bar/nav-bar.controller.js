class NavBarController {
	constructor($mdSidenav, $window, $translate, AccountDetails) {
		'ngInject';
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
}

export default NavBarController;
