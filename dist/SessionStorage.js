'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var STATE_KEY_PREFIX = '@@scroll|'

var prevKey = null

var SessionStorage = (function() {
  function SessionStorage() {
    _classCallCheck(this, SessionStorage)
  }

  _createClass(SessionStorage, [
    {
      key: 'setPrevKey',
      value: function setPrevKey(key) {
        prevKey = key
      }
    },
    {
      key: 'read',
      value: function read(location, key) {
        var stateKey = this.getStateKey(location, key)
        try {
          var value = sessionStorage.getItem(stateKey)
          return JSON.parse(value)
        } catch (e) {
          console.warn(e)
        }
      }
    },
    {
      key: 'save',
      value: function save(location, key, value) {
        if (key) {
          location = { key: prevKey, hash: location.hash }
        }

        var stateKey = this.getStateKey(location, key)
        var storedValue = JSON.stringify(value)

        try {
          sessionStorage.setItem(stateKey, storedValue)
        } catch (e) {
          console.warn(e)
        }

        if (key) {
          var newKey = location.key || location.hash || 'loadPage'
          if (newKey !== prevKey) {
            prevKey = newKey
          }
        }
      }
    },
    {
      key: 'getStateKey',
      value: function getStateKey(location, key) {
        var locationKey = location.key || location.hash || 'loadPage'
        var stateKeyBase = '' + STATE_KEY_PREFIX + locationKey
        return key == null ? stateKeyBase : stateKeyBase + '|' + key
      }
    }
  ])

  return SessionStorage
})()

exports.default = SessionStorage
