class SideNavController {
	constructor($mdSidenav, $window, ssSideNav) {
		'ngInject';
		this.$mdSidenav = $mdSidenav;
		this.$window = $window;
		this.sideNavLocked = false;
		this.menu = ssSideNav;
	}

	$onInit() {
		// get from localStorage if the sidenav was loacked open
		this.sideNavLocked = JSON.parse(this.$window.localStorage['sideNavLocked'] || "false");
	}

	toggleLock() {
		if (!this.sideNavLocked)
			this.$mdSidenav("left").close();
		this.sideNavLocked = !this.sideNavLocked;
		this.$window.localStorage['sideNavLocked'] = this.sideNavLocked;
	}
}

export default SideNavController;
