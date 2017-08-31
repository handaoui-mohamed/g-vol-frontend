import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import ngResource from 'angular-resource';
import mdDataTable from 'angular-material-data-table';
import translate from 'angular-translate';
import ngFileUpload from 'ng-file-upload';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import AppConfig from './app.config';
import AppRun from './app.run';
// socketio
import socket from 'socket.io-client';

//styles
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'angular-material-data-table/dist/md-data-table.min.css';

angular.module('app', [
  ngAnimate,
  ngMessages,
  ngSanitize,
  uiRouter,
  ngResource,
  ngMaterial,
  mdDataTable,
  translate,
  ngFileUpload,
  Common,
  Components
])
  .config(AppConfig)
  .run(AppRun)
  .constant('API_ENDPOINT', 'http://localhost:4040/api/')
  .component('app', AppComponent);
