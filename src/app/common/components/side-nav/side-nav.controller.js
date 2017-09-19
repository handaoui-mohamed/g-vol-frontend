class SideNavController {
	constructor($mdSidenav, $window, $state, ssSideNav, AccountDetails) {
		'ngInject';
		this.$mdSidenav = $mdSidenav;
		this.$window = $window;
		this.$state = $state;
		this.menu = ssSideNav; // sidenav menu
		this.accountDetails = AccountDetails;
	}

	$onInit() {
		// get from localStorage whether the sidenav was loacked open
		this.sideNavLocked = JSON.parse(this.$window.localStorage['sideNavLocked'] || "false");
		// set sidenav menu item visibility according to account roles 
		this.setMenuItemsVisibility();
	}

	// toggle sidenav locked open 
	toggleLock() {
		if (!this.sideNavLocked)
			this.$mdSidenav("left").close();
		this.sideNavLocked = !this.sideNavLocked; // toggle sidenav
		this.$window.localStorage['sideNavLocked'] = this.sideNavLocked; // save sidenav state to localstorage
	}

	// set sidenav menu item visibility according to account roles 
	setMenuItemsVisibility() {
		// get all registerd states
		let states = this.$state.get();
		// get account identity, to check his roles
		this.accountDetails.identity().then(() => {
			// iterate all menu section
			angular.forEach(this.menu.sections, (section) => {
				// if section has children, iterate them				
				angular.forEach(section.children, (child) => {
					// if child had pages, iterate them									
					angular.forEach(child.pages, (page) => {
						// get the state that matches the page
						let pageState = states.find((state) => page.state === state.name);
						// check if page state has roles, then check if account is authorize to access if
						// if not, set its visibility to false (hide the item)
						if (pageState &&
							pageState.data &&
							pageState.data.roles &&
							pageState.data.roles.length > 0 &&
							!this.accountDetails.isInAnyRole(pageState.data.roles)) {
							this.menu.setVisible(page.id, false);
						}
					})
				})
			})
		})
	}
}

export default SideNavController;
