class SideNavController {
  constructor($mdSidenav, $window, ssSideNav) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
    this.$window = $window;
    this.sideNavLocked = false;
    this.menu = ssSideNav;
  }

  $onInit() {
    this.sideNavLocked = JSON.parse(this.$window.localStorage['sideNavLocked'] || "false");
  }

  toggleLock() {
    this.sideNavLocked = !this.sideNavLocked;
    this.$window.localStorage['sideNavLocked'] = this.sideNavLocked;
    if (!this.sideNavLocked)
      this.$mdSidenav("left").close();
  }
}

export default SideNavController;
