import template from './flights-list.html';
import controller from './flights-list.controller';
import './flights-list.scss';

let flightsComponent = {
  bindings: {},
  template,
  controller,
  controllerAs: 'flsVm'
};

export default flightsComponent;
