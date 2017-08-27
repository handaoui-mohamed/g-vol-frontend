class NavBarController {
  constructor($mdSidenav, $window, $state, $auth, $rootScope, $translate) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.$state = $state;
    this.$auth = $auth;
    this.$translate = $translate;
  }

  $onInit() {
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

    let language = this.$window.localStorage['language'];
    this.selectedLanguage = this.languages[language || this.$translate.preferredLanguage()];
  }

  toggleSideNav() {
    this.$mdSidenav("left").toggle();
  }

  isLockedOpen() {
    return this.$mdSidenav("left").isLockedOpen();
  }

  logout() {
    this.$window.localStorage.removeItem('current_account');
    delete this.$rootScope.current_user;
    this.$auth.logout();
    this.$state.go('login');
  }

  changeLanguage(lang) {
    this.selectedLanguage = lang;
    if (lang.code === 'fr' || lang.code === 'en') {
      this.$window.localStorage['language'] = lang.code;
      this.$rootScope.language = lang.code;
      this.$translate.use(lang.code);
    }
  }
}

export default NavBarController;
