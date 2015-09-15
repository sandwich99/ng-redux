"use strict";

exports.__esModule = true;
exports["default"] = digestMiddleware;

function digestMiddleware($rootScope) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (!$rootScope.$$phase) {
          $rootScope.$apply(next(action));
        } else {
          next(action);
        }
      };
    };
  };
}

module.exports = exports["default"];