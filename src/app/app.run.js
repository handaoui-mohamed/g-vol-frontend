export default

function ($rootScope, $auth, $state, $location, $window, AccountService, $transitions, $mdSidenav, $translate, $mdComponentRegistry, Toast) {
  'ngInject';
  let accountId = $window.localStorage['current_account'];
  if (accountId) {
    AccountService.get({
      accountId
    }, (account) => {
      $rootScope.currentAccount = account;
    }, (error) => {
      Toast.serverError(error)
    });
  }

  $rootScope.tableLabel = {
    en: {
      rowsPerPage: "Rows per page",
      of: "of"
    },
    fr: {
      rowsPerPage: "Lignes par page",
      of: "sur"
    }
  }

  let language = $window.localStorage['language'];
  if (language && (language === "fr" || language === "en")) {
    $translate.use(language);
  }
  $rootScope.language = language || "en";

  $transitions.onStart({}, (trans) => {
    $rootScope.isLoading = true; //activation the progress circular in nav bar
    // close the navbar
    if ($mdComponentRegistry.get("left") && !$mdSidenav("left").isLockedOpen())
      $mdSidenav("left").close();

    let notAllowedStates = ['/login'];
    let toState = trans.to();
    let $state = trans.router.stateService;
    let authService = trans.injector().get('$auth');

    if (notAllowedStates.indexOf($location.url()) === -1)
      $rootScope.next = $location.url();

    if (authService.isAuthenticated()) {
      if (notAllowedStates.indexOf(toState['url']) !== -1)
        return $state.current.name === 'home.dashboard' ? false : $state.target('home.dashboard');
    } else {
      if (toState['loginRequired']) {
        return $state.target('login');
      }
    }
  });

  $transitions.onFinish({}, (trans) => {
    $rootScope.isLoading = false;
  });

  $transitions.onRetain({}, (trans) => {
    $rootScope.isLoading = false;
  });

  $transitions.onError({}, (trans) => {
    $rootScope.isLoading = false;
  });
};
