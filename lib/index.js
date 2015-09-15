'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsNgRedux = require('./components/ngRedux');

var _componentsNgRedux2 = _interopRequireDefault(_componentsNgRedux);

exports['default'] = angular.module('ngRedux', []).provider('$ngRedux', _componentsNgRedux2['default']).name;
module.exports = exports['default'];