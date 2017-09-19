class SideNavController {
	constructor($mdSidenav, $window, $state, ssSideNav, AccountDetails) {
		'ngInject';
		this.$mdSidenav = $mdSidenav;
		this.$window = $window;
		this.$state = $state;
		this.sideNavLocked = false;
		this.menu = ssSideNav;
		this.accountDetails = AccountDetails;
	}

	$onInit() {
		// get from localStorage whether the sidenav was loacked open
		this.sideNavLocked = JSON.parse(this.$window.localStorage['sideNavLocked'] || "false");
		this.setVisibility();
		this.states = this.$state.get();
	}

	toggleLock() {
		if (!this.sideNavLocked)
			this.$mdSidenav("left").close();
		this.sideNavLocked = !this.sideNavLocked;
		this.$window.localStorage['sideNavLocked'] = this.sideNavLocked;
	}

	setVisibility() {
		this.accountDetails.identity().then(() => {
			angular.forEach(this.menu.sections, (section) => {
				angular.forEach(section.children, (child) => {
					angular.forEach(child.pages, (page) => {
						let route = this.states.find((state) => page.state === state.name);
						if (route &&
							route.data &&
							route.data.roles &&
							route.data.roles.length > 0 &&
							!this.accountDetails.isInAnyRole(route.data.roles)) {
							this.menu.setVisible(page.id, false);
						}
					})
				})
			})
		})
	}
}

export default SideNavController;
