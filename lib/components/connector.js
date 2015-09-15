'use strict';

exports.__esModule = true;
exports['default'] = Connector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsShallowEqual = require('../utils/shallowEqual');

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsWrapActionCreators = require('../utils/wrapActionCreators');

var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var defaultMapStateToTarget = function defaultMapStateToTarget() {
  return {};
};
var defaultMapDispatchToTarget = function defaultMapDispatchToTarget(dispatch) {
  return { dispatch: dispatch };
};

function Connector(store) {
  return function (mapStateToTarget, mapDispatchToTarget) {

    var finalMapStateToTarget = mapStateToTarget || defaultMapStateToTarget;

    var finalMapDispatchToTarget = _lodash2['default'].isPlainObject(mapDispatchToTarget) ? _utilsWrapActionCreators2['default'](mapDispatchToTarget) : mapDispatchToTarget || defaultMapDispatchToTarget;

    _invariant2['default'](_lodash2['default'].isFunction(finalMapStateToTarget), 'mapStateToTarget must be a Function. Instead received $s.', finalMapStateToTarget);

    _invariant2['default'](_lodash2['default'].isPlainObject(finalMapDispatchToTarget) || _lodash2['default'].isFunction(finalMapDispatchToTarget), 'mapDispatchToTarget must be a plain Object or a Function. Instead received $s.', finalMapDispatchToTarget);

    var slice = getStateSlice(store.getState(), finalMapStateToTarget);

    var boundActionCreators = finalMapDispatchToTarget(store.dispatch);

    return function (target) {

      _invariant2['default'](_lodash2['default'].isFunction(target) || _lodash2['default'].isObject(target), 'The target parameter passed to connect must be a Function or a object.');

      //Initial update
      updateTarget(target, slice, boundActionCreators);

      var unsubscribe = store.subscribe(function () {
        var nextSlice = getStateSlice(store.getState(), finalMapStateToTarget);
        if (!_utilsShallowEqual2['default'](slice, nextSlice)) {
          slice = nextSlice;
          updateTarget(target, slice, boundActionCreators);
        }
      });
      return unsubscribe;
    };
  };
}

function updateTarget(target, StateSlice, dispatch) {
  if (_lodash2['default'].isFunction(target)) {
    target(StateSlice, dispatch);
  } else {
    _lodash2['default'].assign(target, StateSlice, dispatch);
  }
}

function getStateSlice(state, mapStateToScope) {
  var slice = mapStateToScope(state);

  _invariant2['default'](_lodash2['default'].isPlainObject(slice), '`mapStateToScope` must return an object. Instead received %s.', slice);

  return slice;
}
module.exports = exports['default'];