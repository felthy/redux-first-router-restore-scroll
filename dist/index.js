'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _scrollBehavior = require('scroll-behavior')

var _scrollBehavior2 = _interopRequireDefault(_scrollBehavior)

var _SessionStorage = require('./SessionStorage')

var _SessionStorage2 = _interopRequireDefault(_SessionStorage)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

exports.default = function() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined
    ? arguments[0]
    : {},
    shouldUpdateScroll = _ref.shouldUpdateScroll,
    manual = _ref.manual,
    stateStorage = _ref.stateStorage

  return function(history) {
    if (typeof window === 'undefined') return

    var behaviorStateStorage = stateStorage || new _SessionStorage2.default()
    var behavior = new _scrollBehavior2.default({
      addNavigationListener: history.listen,
      stateStorage: behaviorStateStorage,
      getCurrentLocation: function getCurrentLocation() {
        return _extends({}, history.location, {
          action: history.action
        })
      },
      shouldUpdateScroll: shouldUpdateScroll
    })

    behavior.setPrevKey = function() {
      var key = history.location.key || history.location.hash || 'loadPage'
      behaviorStateStorage.setPrevKey(key)
    }

    behavior.manual = manual

    return behavior
  }
}
