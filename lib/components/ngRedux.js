'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = ngReduxProvider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _redux = require('redux');

var _digestMiddleware = require('./digestMiddleware');

var _digestMiddleware2 = _interopRequireDefault(_digestMiddleware);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function ngReduxProvider() {
  var _reducer = undefined;
  var _middlewares = undefined;
  var _storeEnhancers = undefined;

  this.createStoreWith = function (reducer, middlewares, storeEnhancers) {
    _invariant2['default'](_lodash2['default'].isFunction(reducer), 'The reducer parameter passed to createStoreWith must be a Function. Instead received %s.', typeof reducer);

    _invariant2['default'](!storeEnhancers || _lodash2['default'].isArray(storeEnhancers), 'The storeEnhancers parameter passed to createStoreWith must be an Array. Instead received %s.', typeof storeEnhancers);

    _reducer = reducer;
    _storeEnhancers = storeEnhancers;
    _middlewares = middlewares || [];
  };

  this.$get = function ($injector) {
    var store = undefined,
        resolvedMiddleware = [];

    for (var _iterator = _middlewares, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var middleware = _ref;

      if (typeof middleware === 'string') {
        resolvedMiddleware.push($injector.get(middleware));
      } else {
        resolvedMiddleware.push(middleware);
      }
    }

    var finalCreateStore = _storeEnhancers ? _redux.compose.apply(undefined, _storeEnhancers)(_redux.createStore) : _redux.createStore;

    //digestMiddleware needs to be the last one.
    resolvedMiddleware.push(_digestMiddleware2['default']($injector.get('$rootScope')));

    store = _redux.applyMiddleware.apply(undefined, resolvedMiddleware)(finalCreateStore)(_reducer);

    return _extends({}, store, {
      connect: _connector2['default'](store)
    });
  };

  this.$get.$inject = ['$injector'];
}

module.exports = exports['default'];