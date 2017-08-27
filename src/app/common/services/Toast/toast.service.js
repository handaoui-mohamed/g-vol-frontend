class ToastService {
  constructor($mdToast, $filter, $window, $state) {
    'ngInject';
    this.$mdToast = $mdToast;
    this.$filter = $filter;
    this.$window = $window;
    this.$state = $state;
    this.toastPosition = "top right";
    this.toastDelay = 3000;
  }

  showToast(message, type, translate) {
    this.$mdToast.show(this.$mdToast
      .simple()
      .content(translate ? this.$filter('translate')(translate) : message)
      .theme(type)
      .position(this.toastPosition)
      .hideDelay(this.toastDelay));
  }

  success(message, translate) {
    this.showToast(message, "success-toast", translate);
  }

  warning(message, translate) {
    this.showToast(message, "warning-toast", translate);
  }

  error(message, translate) {
    this.showToast(message, "error-toast", translate);
  }

  serverError(error) {
    switch (error.status) {
      case (400):
        this.error("You must fill in all fields", 'SERVER.400');
        break;
      case (401):
        this.error("Unauthorized access", 'SERVER.401');
        this.$window.localStorage.removeItem('current_account');
        this.$auth.logout();
        this.$state.go('login');
        break;
      case (403):
        this.error("Insufficient permission to perform the opération", 'SERVER.403');
        break;
      case (404):
        this.warning("The content you requested does not exist", 'SERVER.404');
        break;
      default:
        this.error('Service not available for the moment', 'SERVER.500');
        break;
    }
  }
}

export default ToastService;
