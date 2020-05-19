;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else if (typeof exports === 'object')
    exports['ReduxFirstRouterRestoreScroll'] = factory()
  else root['ReduxFirstRouterRestoreScroll'] = factory()
})(this, function() {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {}
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // identity function for calling harmony imports with the correct context
    /******/
    /******/ /******/ __webpack_require__.i = function(value) {
      return value
    } // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          /******/ configurable: false,
          /******/ enumerable: true,
          /******/ get: getter
          /******/
        })
        /******/
      }
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter = module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
      /******/ __webpack_require__.d(getter, 'a', getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 3))
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isWindow__ = __webpack_require__(
          7
        )
        /* harmony export (immutable) */ __webpack_exports__[
          'a'
        ] = getscrollAccessor

        function getscrollAccessor(offset) {
          var prop = offset === 'pageXOffset' ? 'scrollLeft' : 'scrollTop'

          function scrollAccessor(node, val) {
            var win = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__isWindow__['a' /* default */]
            )(node)

            if (val === undefined) {
              return win ? win[offset] : node[prop]
            }

            if (win) {
              win.scrollTo(win[offset], val)
            } else {
              node[prop] = val
            }
          }

          return scrollAccessor
        }

        /***/
      },
      /* 1 */
      /***/ function(module, exports, __webpack_require__) {
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

        /***/
      },
      /* 2 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        Object.defineProperty(__webpack_exports__, '__esModule', {
          value: true
        })
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__ = __webpack_require__(
          4
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dom_helpers_scrollLeft__ = __webpack_require__(
          8
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dom_helpers_scrollTop__ = __webpack_require__(
          9
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(
          12
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_3_invariant__
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_page_lifecycle_dist_lifecycle_es5__ = __webpack_require__(
          10
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_page_lifecycle_dist_lifecycle_es5___default = __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_4_page_lifecycle_dist_lifecycle_es5__
        )
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(
          11
        )
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'default',
          function() {
            return ScrollBehavior
          }
        )
        /* eslint-disable no-underscore-dangle */

        // Try at most this many times to scroll, to avoid getting stuck.

        var MAX_SCROLL_ATTEMPTS = 2

        var ScrollBehavior = /*#__PURE__*/ (function() {
          function ScrollBehavior(_ref) {
            var _this = this

            var addNavigationListener = _ref.addNavigationListener,
              stateStorage = _ref.stateStorage,
              getCurrentLocation = _ref.getCurrentLocation,
              shouldUpdateScroll = _ref.shouldUpdateScroll

            this._setScrollRestoration = function() {
              if (_this._oldScrollRestoration) {
                // It's possible that we already set the scroll restoration.
                return
              }

              if (
                'scrollRestoration' in window.history && // Unfortunately, Safari on iOS freezes for 2-6s after the user swipes to
                //  navigate through history with scrollRestoration being 'manual', so we
                //  need to detect this browser and exclude it from the following code
                //  until this bug is fixed by Apple.
                !__webpack_require__.i(
                  __WEBPACK_IMPORTED_MODULE_5__utils__['a' /* isMobileSafari */]
                )()
              ) {
                _this._oldScrollRestoration = window.history.scrollRestoration

                try {
                  window.history.scrollRestoration = 'manual'
                } catch (e) {
                  _this._oldScrollRestoration = null
                }
              }
            }

            this._restoreScrollRestoration = function() {
              /* istanbul ignore if: not supported by any browsers on Travis */
              if (_this._oldScrollRestoration) {
                try {
                  window.history.scrollRestoration = _this._oldScrollRestoration
                } catch (e) {
                  /* silence */
                }

                _this._oldScrollRestoration = null
              }
            }

            this._onWindowScroll = function() {
              if (_this._ignoreScrollEvents) {
                // Don't save the scroll position until navigation is complete.
                return
              } // It's possible that this scroll operation was triggered by what will be a
              //  `POP` navigation. Instead of updating the saved location immediately,
              //  we have to enqueue the update, then potentially cancel it if we observe
              //  a location update.

              if (!_this._saveWindowPositionHandle) {
                _this._saveWindowPositionHandle = __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                  'a' /* request */
                ](_this._saveWindowPosition)
              }

              if (_this._windowScrollTarget) {
                var _this$_windowScrollTa = _this._windowScrollTarget,
                  xTarget = _this$_windowScrollTa[0],
                  yTarget = _this$_windowScrollTa[1]
                var x = __webpack_require__.i(
                  __WEBPACK_IMPORTED_MODULE_1_dom_helpers_scrollLeft__[
                    'a' /* default */
                  ]
                )(window)
                var y = __webpack_require__.i(
                  __WEBPACK_IMPORTED_MODULE_2_dom_helpers_scrollTop__[
                    'a' /* default */
                  ]
                )(window)

                if (x === xTarget && y === yTarget) {
                  _this._windowScrollTarget = null

                  _this._cancelCheckWindowScroll()
                }
              }
            }

            this._saveWindowPosition = function() {
              _this._saveWindowPositionHandle = null

              _this._savePosition(null, window)
            }

            this._checkWindowScrollPosition = function() {
              _this._checkWindowScrollHandle = null // We can only get here if scrollTarget is set. Every code path that unsets
              //  scroll target also cancels the handle to avoid calling this handler.
              //  Still, check anyway just in case.

              /* istanbul ignore if: paranoid guard */

              if (!_this._windowScrollTarget) {
                return Promise.resolve()
              }

              _this.scrollToTarget(window, _this._windowScrollTarget)

              ++_this._numWindowScrollAttempts
              /* istanbul ignore if: paranoid guard */

              if (_this._numWindowScrollAttempts >= MAX_SCROLL_ATTEMPTS) {
                // This might happen if the scroll position was already set to the target
                _this._windowScrollTarget = null
                return Promise.resolve()
              }

              return new Promise(function(resolve) {
                _this._checkWindowScrollHandle = __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                  'a' /* request */
                ](function() {
                  return resolve(_this._checkWindowScrollPosition())
                })
              })
            }

            this._stateStorage = stateStorage
            this._getCurrentLocation = getCurrentLocation
            this._shouldUpdateScroll = shouldUpdateScroll
            this._oldScrollRestoration = null // This helps avoid some jankiness in fighting against the browser's
            //  default scroll behavior on `POP` navigations.

            /* istanbul ignore else: Travis browsers all support this */

            this._setScrollRestoration()

            this._saveWindowPositionHandle = null
            this._checkWindowScrollHandle = null
            this._windowScrollTarget = null
            this._numWindowScrollAttempts = 0
            this._ignoreScrollEvents = false
            this._scrollElements = {} // We have to listen to each window scroll update rather than to just
            //  location updates, because some browsers will update scroll position
            //  before emitting the location change.

            window.addEventListener('scroll', this._onWindowScroll)

            var handleNavigation = function handleNavigation(
              saveWindowPosition
            ) {
              __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                'b' /* cancel */
              ](_this._saveWindowPositionHandle)
              _this._saveWindowPositionHandle = null

              if (saveWindowPosition && !_this._ignoreScrollEvents) {
                _this._saveWindowPosition()
              }

              Object.keys(_this._scrollElements).forEach(function(key) {
                var scrollElement = _this._scrollElements[key]
                __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                  'b' /* cancel */
                ](scrollElement.savePositionHandle)
                scrollElement.savePositionHandle = null // It's always fine to save element scroll positions here; the browser
                //  won't modify them.

                if (!_this._ignoreScrollEvents) {
                  _this._saveElementPosition(key)
                }
              })
            }

            this._removeNavigationListener = addNavigationListener(function(
              _ref2
            ) {
              var action = _ref2.action
              // Don't save window position on POP, as the browser may have already
              //  updated it.
              handleNavigation(action !== 'POP')
            })
            __WEBPACK_IMPORTED_MODULE_4_page_lifecycle_dist_lifecycle_es5___default.a.addEventListener(
              'statechange',
              function(_ref3) {
                var newState = _ref3.newState

                if (
                  newState === 'terminated' ||
                  newState === 'frozen' ||
                  newState === 'discarded'
                ) {
                  handleNavigation(true) // Scroll restoration persists across page reloads. We want to reset
                  //  this to the original value, so that we can let the browser handle
                  //  restoring the initial scroll position on server-rendered pages.

                  _this._restoreScrollRestoration()
                } else {
                  _this._setScrollRestoration()
                }
              }
            )
          }

          var _proto = ScrollBehavior.prototype

          _proto.registerElement = function registerElement(
            key,
            element,
            shouldUpdateScroll,
            context
          ) {
            var _this2 = this

            !!this._scrollElements[key]
              ? true
                  ? __WEBPACK_IMPORTED_MODULE_3_invariant___default()(
                      false,
                      'ScrollBehavior: There is already an element registered for `%s`.',
                      key
                    )
                  : invariant(false)
              : void 0

            var saveElementPosition = function saveElementPosition() {
              _this2._saveElementPosition(key)
            }

            var scrollElement = {
              element: element,
              shouldUpdateScroll: shouldUpdateScroll,
              savePositionHandle: null,
              onScroll: function onScroll() {
                if (
                  !scrollElement.savePositionHandle &&
                  !_this2._ignoreScrollEvents
                ) {
                  scrollElement.savePositionHandle = __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                    'a' /* request */
                  ](saveElementPosition)
                }
              }
            } // In case no scrolling occurs, save the initial position

            if (
              !scrollElement.savePositionHandle &&
              !this._ignoreScrollEvents
            ) {
              scrollElement.savePositionHandle = __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                'a' /* request */
              ](saveElementPosition)
            }

            this._scrollElements[key] = scrollElement
            element.addEventListener('scroll', scrollElement.onScroll)

            this._updateElementScroll(key, null, context)
          }

          _proto.unregisterElement = function unregisterElement(key) {
            !this._scrollElements[key]
              ? true
                  ? __WEBPACK_IMPORTED_MODULE_3_invariant___default()(
                      false,
                      'ScrollBehavior: There is no element registered for `%s`.',
                      key
                    )
                  : invariant(false)
              : void 0
            var _this$_scrollElements = this._scrollElements[key],
              element = _this$_scrollElements.element,
              onScroll = _this$_scrollElements.onScroll,
              savePositionHandle = _this$_scrollElements.savePositionHandle
            element.removeEventListener('scroll', onScroll)
            __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
              'b' /* cancel */
            ](savePositionHandle)
            delete this._scrollElements[key]
          }

          _proto.updateScroll = function updateScroll(prevContext, context) {
            var _this3 = this

            this._updateWindowScroll(prevContext, context).then(function() {
              // Save the position immediately after navigation so that if no scrolling
              //  occurs, there is still a saved position.
              if (!_this3._saveWindowPositionHandle) {
                _this3._saveWindowPositionHandle = __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
                  'a' /* request */
                ](_this3._saveWindowPosition)
              }
            })

            Object.keys(this._scrollElements).forEach(function(key) {
              _this3._updateElementScroll(key, prevContext, context)
            })
          }

          _proto.stop = function stop() {
            this._restoreScrollRestoration()

            window.removeEventListener('scroll', this._onWindowScroll)

            this._cancelCheckWindowScroll()

            this._removeNavigationListener()
          }

          _proto.startIgnoringScrollEvents = function startIgnoringScrollEvents() {
            this._ignoreScrollEvents = true
          }

          _proto.stopIgnoringScrollEvents = function stopIgnoringScrollEvents() {
            this._ignoreScrollEvents = false
          }

          _proto._cancelCheckWindowScroll = function _cancelCheckWindowScroll() {
            __WEBPACK_IMPORTED_MODULE_0_dom_helpers_animationFrame__[
              'b' /* cancel */
            ](this._checkWindowScrollHandle)
            this._checkWindowScrollHandle = null
          }

          _proto._saveElementPosition = function _saveElementPosition(key) {
            var scrollElement = this._scrollElements[key]
            scrollElement.savePositionHandle = null

            this._savePosition(key, scrollElement.element)
          }

          _proto._savePosition = function _savePosition(key, element) {
            this._stateStorage.save(this._getCurrentLocation(), key, [
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_1_dom_helpers_scrollLeft__[
                  'a' /* default */
                ]
              )(element),
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_2_dom_helpers_scrollTop__[
                  'a' /* default */
                ]
              )(element)
            ])
          }

          _proto._updateWindowScroll = function _updateWindowScroll(
            prevContext,
            context
          ) {
            // Whatever we were doing before isn't relevant any more.
            this._cancelCheckWindowScroll()

            this._windowScrollTarget = this._getScrollTarget(
              null,
              this._shouldUpdateScroll,
              prevContext,
              context
            ) // Updating the window scroll position is really flaky. Just trying to
            //  scroll it isn't enough. Instead, try to scroll a few times until it
            //  works.

            this._numWindowScrollAttempts = 0
            return this._checkWindowScrollPosition()
          }

          _proto._updateElementScroll = function _updateElementScroll(
            key,
            prevContext,
            context
          ) {
            var _this$_scrollElements2 = this._scrollElements[key],
              element = _this$_scrollElements2.element,
              shouldUpdateScroll = _this$_scrollElements2.shouldUpdateScroll

            var scrollTarget = this._getScrollTarget(
              key,
              shouldUpdateScroll,
              prevContext,
              context
            )

            if (!scrollTarget) {
              return
            } // Unlike with the window, there shouldn't be any flakiness to deal with
            //  here.

            this.scrollToTarget(element, scrollTarget)
          }

          _proto._getDefaultScrollTarget = function _getDefaultScrollTarget(
            location
          ) {
            var hash = location.hash

            if (hash && hash !== '#') {
              return hash.charAt(0) === '#' ? hash.slice(1) : hash
            }

            return [0, 0]
          }

          _proto._getScrollTarget = function _getScrollTarget(
            key,
            shouldUpdateScroll,
            prevContext,
            context
          ) {
            var scrollTarget = shouldUpdateScroll
              ? shouldUpdateScroll.call(this, prevContext, context)
              : true

            if (
              !scrollTarget ||
              Array.isArray(scrollTarget) ||
              typeof scrollTarget === 'string'
            ) {
              return scrollTarget
            }

            var location = this._getCurrentLocation()

            return (
              this._getSavedScrollTarget(key, location) ||
              this._getDefaultScrollTarget(location)
            )
          }

          _proto._getSavedScrollTarget = function _getSavedScrollTarget(
            key,
            location
          ) {
            if (location.action === 'PUSH') {
              return null
            }

            return this._stateStorage.read(location, key)
          }

          _proto.scrollToTarget = function scrollToTarget(element, target) {
            if (typeof target === 'string') {
              var targetElement =
                document.getElementById(target) ||
                document.getElementsByName(target)[0]

              if (targetElement) {
                targetElement.scrollIntoView()
                return
              } // Fallback to scrolling to top when target fragment doesn't exist.

              target = [0, 0] // eslint-disable-line no-param-reassign
            }

            var _target = target, left = _target[0], top = _target[1]
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_1_dom_helpers_scrollLeft__[
                'a' /* default */
              ]
            )(element, left)
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_2_dom_helpers_scrollTop__[
                'a' /* default */
              ]
            )(element, top)
          }

          return ScrollBehavior
        })()

        /***/
      },
      /* 3 */
      /***/ function(module, exports, __webpack_require__) {
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

        var _scrollBehavior = __webpack_require__(2)

        var _scrollBehavior2 = _interopRequireDefault(_scrollBehavior)

        var _SessionStorage = __webpack_require__(1)

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

            var behaviorStateStorage =
              stateStorage || new _SessionStorage2.default()
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
              var key =
                history.location.key || history.location.hash || 'loadPage'
              behaviorStateStorage.setPrevKey(key)
            }

            behavior.manual = manual

            return behavior
          }
        }

        /***/
      },
      /* 4 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canUseDOM__ = __webpack_require__(
          5
        )
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'b',
          function() {
            return cancel
          }
        )
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'a',
          function() {
            return request
          }
        )

        /* https://github.com/component/raf */
        var prev = new Date().getTime()

        function fallback(fn) {
          var curr = new Date().getTime()
          var ms = Math.max(0, 16 - (curr - prev))
          var handle = setTimeout(fn, ms)
          prev = curr
          return handle
        }

        var vendors = ['', 'webkit', 'moz', 'o', 'ms']
        var cancelMethod = 'clearTimeout'
        var rafImpl = fallback // eslint-disable-next-line import/no-mutable-exports

        var getKey = function getKey(vendor, k) {
          return (
            vendor +
            (!vendor ? k : k[0].toUpperCase() + k.substr(1)) +
            'AnimationFrame'
          )
        }

        if (__WEBPACK_IMPORTED_MODULE_0__canUseDOM__['a' /* default */]) {
          vendors.some(function(vendor) {
            var rafMethod = getKey(vendor, 'request')

            if (rafMethod in window) {
              cancelMethod = getKey(vendor, 'cancel') // @ts-ignore

              rafImpl = function rafImpl(cb) {
                return window[rafMethod](cb)
              }
            }

            return !!rafImpl
          })
        }

        var cancel = function cancel(id) {
          // @ts-ignore
          if (typeof window[cancelMethod] === 'function')
            window[cancelMethod](id)
        }
        var request = rafImpl

        /***/
      },
      /* 5 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony default export */ __webpack_exports__[
          'a'
        ] = !!(typeof window !== 'undefined' &&
          window.document &&
          window.document.createElement)

        /***/
      },
      /* 6 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony export (immutable) */ __webpack_exports__['a'] = isDocument
        function isDocument(element) {
          return (
            'nodeType' in element && element.nodeType === document.DOCUMENT_NODE
          )
        }

        /***/
      },
      /* 7 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isDocument__ = __webpack_require__(
          6
        )
        /* harmony export (immutable) */ __webpack_exports__['a'] = isWindow

        function isWindow(node) {
          if ('window' in node && node.window === node) return node
          if (
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__isDocument__['a' /* default */]
            )(node)
          )
            return node.defaultView || false
          return false
        }

        /***/
      },
      /* 8 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getScrollAccessor__ = __webpack_require__(
          0
        )

        /* harmony default export */ __webpack_exports__[
          'a'
        ] = __webpack_require__.i(
          __WEBPACK_IMPORTED_MODULE_0__getScrollAccessor__['a' /* default */]
        )('pageXOffset')

        /***/
      },
      /* 9 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getScrollAccessor__ = __webpack_require__(
          0
        )

        /* harmony default export */ __webpack_exports__[
          'a'
        ] = __webpack_require__.i(
          __WEBPACK_IMPORTED_MODULE_0__getScrollAccessor__['a' /* default */]
        )('pageYOffset')

        /***/
      },
      /* 10 */
      /***/ function(module, exports, __webpack_require__) {
        /*!
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
        /*! lifecycle.es5.js v0.1.1 */
        !(function(e, t) {
          true
            ? (module.exports = t())
            : 'function' == typeof define && define.amd
                ? define(t)
                : (e.lifecycle = t())
        })(this, function() {
          'use strict'
          var e = void 0
          try {
            new EventTarget(), (e = !1)
          } catch (t) {
            e = !1
          }
          var t = 'function' == typeof Symbol &&
            'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e
              }
            : function(e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              },
            n = function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function')
            },
            i = (function() {
              function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var i = t[n]
                  ;(i.enumerable =
                    i.enumerable || !1), (i.configurable = !0), 'value' in i &&
                    (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
              }
              return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
              }
            })(),
            r = function(e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof t
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              })), t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t))
            },
            a = function(e, t) {
              if (!e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !t || ('object' != typeof t && 'function' != typeof t)
                ? e
                : t
            },
            s = (function() {
              function e() {
                n(this, e), (this._registry = {})
              }
              return i(e, [
                {
                  key: 'addEventListener',
                  value: function(e, t) {
                    this._getRegistry(e).push(t)
                  }
                },
                {
                  key: 'removeEventListener',
                  value: function(e, t) {
                    var n = this._getRegistry(e), i = n.indexOf(t)
                    i > -1 && n.splice(i, 1)
                  }
                },
                {
                  key: 'dispatchEvent',
                  value: function(e) {
                    return (e.target = this), Object.freeze(
                      e
                    ), this._getRegistry(e.type).forEach(function(t) {
                      return t(e)
                    }), !0
                  }
                },
                {
                  key: '_getRegistry',
                  value: function(e) {
                    return (this._registry[e] = this._registry[e] || [])
                  }
                }
              ]), e
            })(),
            o = e ? EventTarget : s,
            u = e
              ? Event
              : function e(t) {
                  n(this, e), (this.type = t)
                },
            f = (function(e) {
              function t(e, i) {
                n(this, t)
                var r = a(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
                )
                return (r.newState = i.newState), (r.oldState =
                  i.oldState), (r.originalEvent = i.originalEvent), r
              }
              return r(t, u), t
            })(),
            c = 'active',
            h = 'passive',
            d = 'hidden',
            l = 'frozen',
            p = 'terminated',
            v =
              'object' ===
                ('undefined' == typeof safari ? 'undefined' : t(safari)) &&
              safari.pushNotification,
            y = [
              'focus',
              'blur',
              'visibilitychange',
              'freeze',
              'resume',
              'pageshow',
              'onpageshow' in self ? 'pagehide' : 'unload'
            ],
            g = function(e) {
              return e.preventDefault(), (e.returnValue = 'Are you sure?')
            },
            _ = [
              [c, h, d, p],
              [c, h, d, l],
              [d, h, c],
              [l, d],
              [l, c],
              [l, h]
            ].map(function(e) {
              return e.reduce(function(e, t, n) {
                return (e[t] = n), e
              }, {})
            }),
            b = function() {
              return document.visibilityState === d
                ? d
                : document.hasFocus() ? c : h
            }
          return new ((function(e) {
            function t() {
              n(this, t)
              var e = a(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this)
              ),
                i = b()
              return (e._state = i), (e._unsavedChanges = []), (e._handleEvents = e._handleEvents.bind(e)), y.forEach(
                function(t) {
                  return addEventListener(t, e._handleEvents, !0)
                }
              ), v &&
                addEventListener('beforeunload', function(t) {
                  e._safariBeforeUnloadTimeout = setTimeout(function() {
                    t.defaultPrevented ||
                      t.returnValue.length > 0 ||
                      e._dispatchChangesIfNeeded(t, d)
                  }, 0)
                }), e
            }
            return r(t, o), i(t, [
              {
                key: 'addUnsavedChanges',
                value: function(e) {
                  !this._unsavedChanges.indexOf(e) > -1 &&
                    (0 === this._unsavedChanges.length &&
                      addEventListener(
                        'beforeunload',
                        g
                      ), this._unsavedChanges.push(e))
                }
              },
              {
                key: 'removeUnsavedChanges',
                value: function(e) {
                  var t = this._unsavedChanges.indexOf(e)
                  t > -1 &&
                    (this._unsavedChanges.splice(t, 1), 0 ===
                      this._unsavedChanges.length &&
                      removeEventListener('beforeunload', g))
                }
              },
              {
                key: '_dispatchChangesIfNeeded',
                value: function(e, t) {
                  if (t !== this._state)
                    for (
                      var n = (function(e, t) {
                        for (var n, i = 0; (n = _[i]); ++i) {
                          var r = n[e], a = n[t]
                          if (r >= 0 && a >= 0 && a > r)
                            return Object.keys(n).slice(r, a + 1)
                        }
                        return []
                      })(this._state, t),
                        i = 0;
                      i < n.length - 1;
                      ++i
                    ) {
                      var r = n[i], a = n[i + 1]
                      ;(this._state = a), this.dispatchEvent(
                        new f('statechange', {
                          oldState: r,
                          newState: a,
                          originalEvent: e
                        })
                      )
                    }
                }
              },
              {
                key: '_handleEvents',
                value: function(e) {
                  switch ((v &&
                    clearTimeout(this._safariBeforeUnloadTimeout), e.type)) {
                    case 'pageshow':
                    case 'resume':
                      this._dispatchChangesIfNeeded(e, b())
                      break
                    case 'focus':
                      this._dispatchChangesIfNeeded(e, c)
                      break
                    case 'blur':
                      this._state === c && this._dispatchChangesIfNeeded(e, b())
                      break
                    case 'pagehide':
                    case 'unload':
                      this._dispatchChangesIfNeeded(e, e.persisted ? l : p)
                      break
                    case 'visibilitychange':
                      this._state !== l &&
                        this._state !== p &&
                        this._dispatchChangesIfNeeded(e, b())
                      break
                    case 'freeze':
                      this._dispatchChangesIfNeeded(e, l)
                  }
                }
              },
              {
                key: 'state',
                get: function() {
                  return this._state
                }
              },
              {
                key: 'pageWasDiscarded',
                get: function() {
                  return document.wasDiscarded || !1
                }
              }
            ]), t
          })())()
        })
        //# sourceMappingURL=lifecycle.es5.js.map

        /***/
      },
      /* 11 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        /* harmony export (immutable) */ __webpack_exports__[
          'a'
        ] = isMobileSafari
        function isMobileSafari() {
          return (
            /iPad|iPhone|iPod/.test(window.navigator.platform) &&
            /^((?!CriOS).)*Safari/.test(window.navigator.userAgent)
          )
        }

        /***/
      },
      /* 12 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'
        /**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

        /**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

        var invariant = function(condition, format, a, b, c, d, e, f) {
          if (true) {
            if (format === undefined) {
              throw new Error('invariant requires an error message argument')
            }
          }

          if (!condition) {
            var error
            if (format === undefined) {
              error = new Error(
                'Minified exception occurred; use the non-minified dev environment ' +
                  'for the full error message and additional helpful warnings.'
              )
            } else {
              var args = [a, b, c, d, e, f]
              var argIndex = 0
              error = new Error(
                format.replace(/%s/g, function() {
                  return args[argIndex++]
                })
              )
              error.name = 'Invariant Violation'
            }

            error.framesToPop = 1 // we don't care about invariant's own frame
            throw error
          }
        }

        module.exports = invariant

        /***/
      }
      /******/
    ]
  )
})
