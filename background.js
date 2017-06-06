/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context
  /******/
  /******/ /******/ __webpack_require__.i = function(value) {
    return value;
  }; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter = module && module.__esModule
      ? /******/ function getDefault() {
          return module['default'];
        }
      : /******/ function getModuleExports() {
          return module;
        };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 354));
  /******/
})(
  /************************************************************************/
  /******/ [
    ,
    ,
    ,
    /* 0 */ /* 1 */ /* 2 */ /* 3 */
    /***/ function(module, exports, __webpack_require__) {
      var store = __webpack_require__(46)('wks'),
        uid = __webpack_require__(39),
        Symbol = __webpack_require__(4).Symbol,
        USE_SYMBOL = typeof Symbol == 'function';

      var $exports = (module.exports = function(name) {
        return (
          store[name] ||
          (store[name] =
            (USE_SYMBOL && Symbol[name]) ||
            (USE_SYMBOL ? Symbol : uid)('Symbol.' + name))
        );
      });

      $exports.store = store;

      /***/
    },
    /* 4 */
    /***/ function(module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = (module.exports = typeof window != 'undefined' &&
        window.Math == Math
        ? window
        : typeof self != 'undefined' && self.Math == Math
            ? self
            : Function('return this')());
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    },
    /* 5 */
    /***/ function(module, exports) {
      var core = (module.exports = { version: '2.4.0' });
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    } /* 9 */ /* 7 */ /* 8 */,
    ,
    ,
    ,
    /* 6 */ /***/ function(module, exports, __webpack_require__) {
      var isObject = __webpack_require__(18);
      module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + ' is not an object!');
        return it;
      };

      /***/
    },
    /* 10 */
    /***/ function(module, exports, __webpack_require__) {
      // Thank's IE8 for his funny defineProperty
      module.exports = !__webpack_require__(25)(function() {
        return (
          Object.defineProperty({}, 'a', {
            get: function() {
              return 7;
            },
          }).a != 7
        );
      });

      /***/
    },
    /* 11 */
    /***/ function(module, exports, __webpack_require__) {
      var dP = __webpack_require__(12), createDesc = __webpack_require__(31);
      module.exports = __webpack_require__(10)
        ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
          }
        : function(object, key, value) {
            object[key] = value;
            return object;
          };

      /***/
    },
    /* 12 */
    /***/ function(module, exports, __webpack_require__) {
      var anObject = __webpack_require__(9),
        IE8_DOM_DEFINE = __webpack_require__(70),
        toPrimitive = __webpack_require__(59),
        dP = Object.defineProperty;

      exports.f = __webpack_require__(10)
        ? Object.defineProperty
        : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE)
              try {
                return dP(O, P, Attributes);
              } catch (e) {
                /* empty */
              }
            if ('get' in Attributes || 'set' in Attributes)
              throw TypeError('Accessors not supported!');
            if ('value' in Attributes) O[P] = Attributes.value;
            return O;
          };

      /***/
    },
    /* 13 */
    /***/ function(module, exports, __webpack_require__) {
      var global = __webpack_require__(4),
        core = __webpack_require__(5),
        ctx = __webpack_require__(21),
        hide = __webpack_require__(11),
        PROTOTYPE = 'prototype';

      var $export = function(type, name, source) {
        var IS_FORCED = type & $export.F,
          IS_GLOBAL = type & $export.G,
          IS_STATIC = type & $export.S,
          IS_PROTO = type & $export.P,
          IS_BIND = type & $export.B,
          IS_WRAP = type & $export.W,
          exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
          expProto = exports[PROTOTYPE],
          target = IS_GLOBAL
            ? global
            : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
          key,
          own,
          out;
        if (IS_GLOBAL) source = name;
        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && target[key] !== undefined;
          if (own && key in exports) continue;
          // export native or passed
          out = own ? target[key] : source[key];
          // prevent global pollution for namespaces
          exports[key] = IS_GLOBAL && typeof target[key] != 'function'
            ? source[key]
            : // bind timers to global for call from export context
              IS_BIND && own
                ? ctx(out, global)
                : // wrap global constructors for prevent change them in library
                  IS_WRAP && target[key] == out
                    ? (function(C) {
                        var F = function(a, b, c) {
                          if (this instanceof C) {
                            switch (arguments.length) {
                              case 0:
                                return new C();
                              case 1:
                                return new C(a);
                              case 2:
                                return new C(a, b);
                            }
                            return new C(a, b, c);
                          }
                          return C.apply(this, arguments);
                        };
                        F[PROTOTYPE] = C[PROTOTYPE];
                        return F;
                        // make static versions for prototype methods
                      })(out)
                    : IS_PROTO && typeof out == 'function'
                        ? ctx(Function.call, out)
                        : out;
          // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
          if (IS_PROTO) {
            (exports.virtual || (exports.virtual = {}))[key] = out;
            // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            if (type & $export.R && expProto && !expProto[key])
              hide(expProto, key, out);
          }
        }
      };
      // type bitmap
      $export.F = 1; // forced
      $export.G = 2; // global
      $export.S = 4; // static
      $export.P = 8; // proto
      $export.B = 16; // bind
      $export.W = 32; // wrap
      $export.U = 64; // safe
      $export.R = 128; // real proto method for `library`
      module.exports = $export;

      /***/
    } /* 15 */,
    ,
    /* 14 */ /***/ function(module, exports) {
      var hasOwnProperty = {}.hasOwnProperty;
      module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
      };

      /***/
    } /* 17 */,
    ,
    /* 16 */ /***/ function(module, exports) {
      module.exports = {};

      /***/
    },
    /* 18 */
    /***/ function(module, exports) {
      module.exports = function(it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };

      /***/
    },
    /* 19 */
    /***/ function(module, exports, __webpack_require__) {
      // to indexed object, toObject with fallback for non-array-like ES3 strings
      var IObject = __webpack_require__(71), defined = __webpack_require__(34);
      module.exports = function(it) {
        return IObject(defined(it));
      };

      /***/
    } /* 21 */,
    ,
    /* 20 */ /***/ function(module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__(33);
      module.exports = function(fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 1:
            return function(a) {
              return fn.call(that, a);
            };
          case 2:
            return function(a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function(a, b, c) {
              return fn.call(that, a, b, c);
            };
        }
        return function(/* ...args */) {
          return fn.apply(that, arguments);
        };
      };

      /***/
    },
    /* 22 */
    /***/ function(module, exports) {
      var toString = {}.toString;

      module.exports = function(it) {
        return toString.call(it).slice(8, -1);
      };

      /***/
    } /* 25 */ /* 24 */,
    ,
    ,
    /* 23 */ /***/ function(module, exports) {
      module.exports = function(exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };

      /***/
    } /* 27 */,
    ,
    /* 26 */ /***/ function(module, exports) {
      var g;

      // This works in non-strict mode
      g = (function() {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function('return this')() || (1, eval)('this');
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === 'object') g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 28 */
    /***/ function(module, exports, __webpack_require__) {
      var def = __webpack_require__(12).f,
        has = __webpack_require__(15),
        TAG = __webpack_require__(3)('toStringTag');

      module.exports = function(it, tag, stat) {
        if (it && !has((it = stat ? it : it.prototype), TAG))
          def(it, TAG, { configurable: true, value: tag });
      };

      /***/
    } /* 30 */,
    ,
    /* 29 */ /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.14 / 15.2.3.14 Object.keys(O)
      var $keys = __webpack_require__(73),
        enumBugKeys = __webpack_require__(45);

      module.exports =
        Object.keys ||
        function keys(O) {
          return $keys(O, enumBugKeys);
        };

      /***/
    },
    /* 31 */
    /***/ function(module, exports) {
      module.exports = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value,
        };
      };

      /***/
    } /* 33 */,
    ,
    /* 32 */ /***/ function(module, exports) {
      module.exports = function(it) {
        if (typeof it != 'function')
          throw TypeError(it + ' is not a function!');
        return it;
      };

      /***/
    },
    /* 34 */
    /***/ function(module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };

      /***/
    },
    /* 35 */
    /***/ function(module, exports, __webpack_require__) {
      var isObject = __webpack_require__(18),
        document = __webpack_require__(4).document,
        // in old IE typeof document.createElement is 'object'
        is = isObject(document) && isObject(document.createElement);
      module.exports = function(it) {
        return is ? document.createElement(it) : {};
      };

      /***/
    },
    /* 36 */
    /***/ function(module, exports) {
      module.exports = true;

      /***/
    },
    /* 37 */
    /***/ function(module, exports, __webpack_require__) {
      var shared = __webpack_require__(46)('keys'),
        uid = __webpack_require__(39);
      module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
      };

      /***/
    },
    /* 38 */
    /***/ function(module, exports) {
      // 7.1.4 ToInteger
      var ceil = Math.ceil, floor = Math.floor;
      module.exports = function(it) {
        return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
      };

      /***/
    },
    /* 39 */
    /***/ function(module, exports) {
      var id = 0, px = Math.random();
      module.exports = function(key) {
        return 'Symbol('.concat(
          key === undefined ? '' : key,
          ')_',
          (++id + px).toString(36)
        );
      };

      /***/
    } /* 43 */ /* 41 */ /* 42 */,
    ,
    ,
    ,
    /* 40 */ /***/ function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;

      var _promise = __webpack_require__(99);

      var _promise2 = _interopRequireDefault(_promise);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = function(fn) {
        return function() {
          var gen = fn.apply(this, arguments);
          return new _promise2.default(function(resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return _promise2.default.resolve(value).then(
                  function(value) {
                    step('next', value);
                  },
                  function(err) {
                    step('throw', err);
                  }
                );
              }
            }

            return step('next');
          });
        };
      };

      /***/
    },
    /* 44 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(141);

      /***/
    },
    /* 45 */
    /***/ function(module, exports) {
      // IE 8- don't enum bug keys
      module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ','
      );

      /***/
    },
    /* 46 */
    /***/ function(module, exports, __webpack_require__) {
      var global = __webpack_require__(4),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
      module.exports = function(key) {
        return store[key] || (store[key] = {});
      };

      /***/
    },
    /* 47 */
    /***/ function(module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(34);
      module.exports = function(it) {
        return Object(defined(it));
      };

      /***/
    } /* 51 */ /* 49 */ /* 50 */,
    ,
    ,
    ,
    /* 48 */ /***/ function(module, exports, __webpack_require__) {
      // getting tag from 19.1.3.6 Object.prototype.toString()
      var cof = __webpack_require__(22),
        TAG = __webpack_require__(3)('toStringTag'),
        // ES3 wrong here
        ARG =
          cof(
            (function() {
              return arguments;
            })()
          ) == 'Arguments';

      // fallback for IE11 Script Access Denied error
      var tryGet = function(it, key) {
        try {
          return it[key];
        } catch (e) {
          /* empty */
        }
      };

      module.exports = function(it) {
        var O, T, B;
        return it === undefined
          ? 'Undefined'
          : it === null
              ? 'Null'
              : // @@toStringTag case
                typeof (T = tryGet((O = Object(it)), TAG)) == 'string'
                  ? T
                  : // builtinTag case
                    ARG
                      ? cof(O)
                      : // ES3 arguments fallback
                        (B = cof(O)) == 'Object' &&
                          typeof O.callee == 'function'
                          ? 'Arguments'
                          : B;
      };

      /***/
    },
    /* 52 */
    /***/ function(module, exports, __webpack_require__) {
      // 7.1.15 ToLength
      var toInteger = __webpack_require__(38), min = Math.min;
      module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
      };

      /***/
    },
    /* 53 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var $at = __webpack_require__(114)(true);

      // 21.1.3.27 String.prototype[@@iterator]()
      __webpack_require__(56)(
        String,
        'String',
        function(iterated) {
          this._t = String(iterated); // target
          this._i = 0; // next index
          // 21.1.5.2.1 %StringIteratorPrototype%.next()
        },
        function() {
          var O = this._t, index = this._i, point;
          if (index >= O.length) return { value: undefined, done: true };
          point = $at(O, index);
          this._i += point.length;
          return { value: point, done: false };
        }
      );

      /***/
    } /* 55 */,
    ,
    /* 54 */ /***/ function(module, exports, __webpack_require__) {
      module.exports =
        __webpack_require__(4).document && document.documentElement;

      /***/
    },
    /* 56 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var LIBRARY = __webpack_require__(36),
        $export = __webpack_require__(13),
        redefine = __webpack_require__(74),
        hide = __webpack_require__(11),
        has = __webpack_require__(15),
        Iterators = __webpack_require__(17),
        $iterCreate = __webpack_require__(107),
        setToStringTag = __webpack_require__(28),
        getPrototypeOf = __webpack_require__(72),
        ITERATOR = __webpack_require__(3)('iterator'),
        BUGGY = !([].keys && 'next' in [].keys()), // Safari has buggy iterators w/o `next`
        FF_ITERATOR = '@@iterator',
        KEYS = 'keys',
        VALUES = 'values';

      var returnThis = function() {
        return this;
      };

      module.exports = function(
        Base,
        NAME,
        Constructor,
        next,
        DEFAULT,
        IS_SET,
        FORCED
      ) {
        $iterCreate(Constructor, NAME, next);
        var getMethod = function(kind) {
          if (!BUGGY && kind in proto) return proto[kind];
          switch (kind) {
            case KEYS:
              return function keys() {
                return new Constructor(this, kind);
              };
            case VALUES:
              return function values() {
                return new Constructor(this, kind);
              };
          }
          return function entries() {
            return new Constructor(this, kind);
          };
        };
        var TAG = NAME + ' Iterator',
          DEF_VALUES = DEFAULT == VALUES,
          VALUES_BUG = false,
          proto = Base.prototype,
          $native =
            proto[ITERATOR] ||
            proto[FF_ITERATOR] ||
            (DEFAULT && proto[DEFAULT]),
          $default = $native || getMethod(DEFAULT),
          $entries = DEFAULT
            ? !DEF_VALUES ? $default : getMethod('entries')
            : undefined,
          $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
          methods,
          key,
          IteratorPrototype;
        // Fix native
        if ($anyNative) {
          IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
          if (IteratorPrototype !== Object.prototype) {
            // Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, true);
            // fix for some old engines
            if (!LIBRARY && !has(IteratorPrototype, ITERATOR))
              hide(IteratorPrototype, ITERATOR, returnThis);
          }
        }
        // fix Array#{values, @@iterator}.name in V8 / FF
        if (DEF_VALUES && $native && $native.name !== VALUES) {
          VALUES_BUG = true;
          $default = function values() {
            return $native.call(this);
          };
        }
        // Define iterator
        if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
          hide(proto, ITERATOR, $default);
        }
        // Plug for library
        Iterators[NAME] = $default;
        Iterators[TAG] = returnThis;
        if (DEFAULT) {
          methods = {
            values: DEF_VALUES ? $default : getMethod(VALUES),
            keys: IS_SET ? $default : getMethod(KEYS),
            entries: $entries,
          };
          if (FORCED)
            for (key in methods) {
              if (!(key in proto)) redefine(proto, key, methods[key]);
            }
          else
            $export(
              $export.P + $export.F * (BUGGY || VALUES_BUG),
              NAME,
              methods
            );
        }
        return methods;
      };

      /***/
    },
    /* 57 */
    /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
      var anObject = __webpack_require__(9),
        dPs = __webpack_require__(110),
        enumBugKeys = __webpack_require__(45),
        IE_PROTO = __webpack_require__(37)('IE_PROTO'),
        Empty = function() {
          /* empty */
        },
        PROTOTYPE = 'prototype';

      // Create object with fake `null` prototype: use iframe Object with cleared prototype
      var createDict = function() {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = __webpack_require__(35)('iframe'),
          i = enumBugKeys.length,
          lt = '<',
          gt = '>',
          iframeDocument;
        iframe.style.display = 'none';
        __webpack_require__(55).appendChild(iframe);
        iframe.src = 'javascript:'; // eslint-disable-line no-script-url
        // createDict = iframe.contentWindow.Object;
        // html.removeChild(iframe);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(
          lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt
        );
        iframeDocument.close();
        createDict = iframeDocument.F;
        while (i--)
          delete createDict[PROTOTYPE][enumBugKeys[i]];
        return createDict();
      };

      module.exports =
        Object.create ||
        function create(O, Properties) {
          var result;
          if (O !== null) {
            Empty[PROTOTYPE] = anObject(O);
            result = new Empty();
            Empty[PROTOTYPE] = null;
            // add "__proto__" for Object.getPrototypeOf polyfill
            result[IE_PROTO] = O;
          } else result = createDict();
          return Properties === undefined ? result : dPs(result, Properties);
        };

      /***/
    },
    /* 58 */
    /***/ function(module, exports, __webpack_require__) {
      var ctx = __webpack_require__(21),
        invoke = __webpack_require__(106),
        html = __webpack_require__(55),
        cel = __webpack_require__(35),
        global = __webpack_require__(4),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
      var run = function() {
        var id = +this;
        if (queue.hasOwnProperty(id)) {
          var fn = queue[id];
          delete queue[id];
          fn();
        }
      };
      var listener = function(event) {
        run.call(event.data);
      };
      // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
      if (!setTask || !clearTask) {
        setTask = function setImmediate(fn) {
          var args = [], i = 1;
          while (arguments.length > i)
            args.push(arguments[i++]);
          queue[++counter] = function() {
            invoke(typeof fn == 'function' ? fn : Function(fn), args);
          };
          defer(counter);
          return counter;
        };
        clearTask = function clearImmediate(id) {
          delete queue[id];
        };
        // Node.js 0.8-
        if (__webpack_require__(22)(process) == 'process') {
          defer = function(id) {
            process.nextTick(ctx(run, id, 1));
          };
          // Browsers with MessageChannel, includes WebWorkers
        } else if (MessageChannel) {
          channel = new MessageChannel();
          port = channel.port2;
          channel.port1.onmessage = listener;
          defer = ctx(port.postMessage, port, 1);
          // Browsers with postMessage, skip WebWorkers
          // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
        } else if (
          global.addEventListener &&
          typeof postMessage == 'function' &&
          !global.importScripts
        ) {
          defer = function(id) {
            global.postMessage(id + '', '*');
          };
          global.addEventListener('message', listener, false);
          // IE8-
        } else if (ONREADYSTATECHANGE in cel('script')) {
          defer = function(id) {
            html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
              html.removeChild(this);
              run.call(id);
            };
          };
          // Rest old browsers
        } else {
          defer = function(id) {
            setTimeout(ctx(run, id, 1), 0);
          };
        }
      }
      module.exports = {
        set: setTask,
        clear: clearTask,
      };

      /***/
    },
    /* 59 */
    /***/ function(module, exports, __webpack_require__) {
      // 7.1.1 ToPrimitive(input [, PreferredType])
      var isObject = __webpack_require__(18);
      // instead of the ES6 spec version, we didn't implement @@toPrimitive case
      // and the second argument - flag - preferred type is a string
      module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (
          S &&
          typeof (fn = it.toString) == 'function' &&
          !isObject((val = fn.call(it)))
        )
          return val;
        if (
          typeof (fn = it.valueOf) == 'function' &&
          !isObject((val = fn.call(it)))
        )
          return val;
        if (
          !S &&
          typeof (fn = it.toString) == 'function' &&
          !isObject((val = fn.call(it)))
        )
          return val;
        throw TypeError("Can't convert object to primitive value");
      };

      /***/
    },
    /* 60 */
    /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(118);
      var global = __webpack_require__(4),
        hide = __webpack_require__(11),
        Iterators = __webpack_require__(17),
        TO_STRING_TAG = __webpack_require__(3)('toStringTag');

      for (
        var collections = [
          'NodeList',
          'DOMTokenList',
          'MediaList',
          'StyleSheetList',
          'CSSRuleList',
        ],
          i = 0;
        i < 5;
        i++
      ) {
        var NAME = collections[i],
          Collection = global[NAME],
          proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
      }

      /***/
    } /* 66 */ /* 62 */ /* 63 */ /* 64 */ /* 65 */,
    ,
    ,
    ,
    ,
    ,
    /* 61 */ /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      var CONNECTION_NAME = (exports.CONNECTION_NAME = 'redux-webext');
      var DISPATCH = (exports.DISPATCH = '@@STORE_DISPATCH');
      var UPDATE_STATE = (exports.UPDATE_STATE = '@@STORE_UPDATE_STATE');

      /***/
    },
    /* 67 */
    /***/ function(module, exports) {
      exports.f = {}.propertyIsEnumerable;

      /***/
    },
    /* 68 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(
        154
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(
        156
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(
        161
      );

      /** `Object#toString` result references. */
      var objectTag = '[object Object]';

      /** Used for built-in method references. */
      var funcProto = Function.prototype, objectProto = Object.prototype;

      /** Used to resolve the decompiled source of functions. */
      var funcToString = funcProto.toString;

      /** Used to check objects for own properties. */
      var hasOwnProperty = objectProto.hasOwnProperty;

      /** Used to infer the `Object` constructor. */
      var objectCtorString = funcToString.call(Object);

      /**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
      function isPlainObject(value) {
        if (
          !__webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__['a' /* default */]
          )(value) ||
          __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__['a' /* default */]
          )(value) != objectTag
        ) {
          return false;
        }
        var proto = __webpack_require__.i(
          __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__['a' /* default */]
        )(value);
        if (proto === null) {
          return true;
        }
        var Ctor =
          hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return (
          typeof Ctor == 'function' &&
          Ctor instanceof Ctor &&
          funcToString.call(Ctor) == objectCtorString
        );
      }

      /* harmony default export */ __webpack_exports__['a'] = isPlainObject;

      /***/
    },
    /* 69 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });

      var _backgroundStore = __webpack_require__(139);

      Object.defineProperty(exports, 'createBackgroundStore', {
        enumerable: true,
        get: function get() {
          return _interopRequireDefault(_backgroundStore).default;
        },
      });

      var _uiStore = __webpack_require__(140);

      Object.defineProperty(exports, 'createUIStore', {
        enumerable: true,
        get: function get() {
          return _interopRequireDefault(_uiStore).default;
        },
      });

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      /***/
    },
    /* 70 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports =
        !__webpack_require__(10) &&
        !__webpack_require__(25)(function() {
          return (
            Object.defineProperty(__webpack_require__(35)('div'), 'a', {
              get: function() {
                return 7;
              },
            }).a != 7
          );
        });

      /***/
    },
    /* 71 */
    /***/ function(module, exports, __webpack_require__) {
      // fallback for non-array-like ES3 and non-enumerable old V8 strings
      var cof = __webpack_require__(22);
      module.exports = Object('z').propertyIsEnumerable(0)
        ? Object
        : function(it) {
            return cof(it) == 'String' ? it.split('') : Object(it);
          };

      /***/
    },
    /* 72 */
    /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
      var has = __webpack_require__(15),
        toObject = __webpack_require__(47),
        IE_PROTO = __webpack_require__(37)('IE_PROTO'),
        ObjectProto = Object.prototype;

      module.exports =
        Object.getPrototypeOf ||
        function(O) {
          O = toObject(O);
          if (has(O, IE_PROTO)) return O[IE_PROTO];
          if (
            typeof O.constructor == 'function' &&
            O instanceof O.constructor
          ) {
            return O.constructor.prototype;
          }
          return O instanceof Object ? ObjectProto : null;
        };

      /***/
    },
    /* 73 */
    /***/ function(module, exports, __webpack_require__) {
      var has = __webpack_require__(15),
        toIObject = __webpack_require__(19),
        arrayIndexOf = __webpack_require__(104)(false),
        IE_PROTO = __webpack_require__(37)('IE_PROTO');

      module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O)
          if (key != IE_PROTO) has(O, key) && result.push(key);
        // Don't enum bug & hidden keys
        while (names.length > i)
          if (has(O, (key = names[i++]))) {
            ~arrayIndexOf(result, key) || result.push(key);
          }
        return result;
      };

      /***/
    },
    /* 74 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(11);

      /***/
    },
    /* 75 */
    /***/ function(module, exports, __webpack_require__) {
      var classof = __webpack_require__(51),
        ITERATOR = __webpack_require__(3)('iterator'),
        Iterators = __webpack_require__(17);
      module.exports = __webpack_require__(5).getIteratorMethod = function(it) {
        if (it != undefined)
          return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
      };

      /***/
    },
    /* 76 */
    /***/ function(module, exports) {
      /***/
    } /* 91 */ /* 78 */ /* 79 */ /* 80 */ /* 81 */ /* 82 */ /* 83 */ /* 84 */ /* 85 */ /* 86 */ /* 87 */ /* 88 */ /* 89 */ /* 90 */,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    /* 77 */ /***/ function(module, exports, __webpack_require__) {
      // check on default Array iterator
      var Iterators = __webpack_require__(17),
        ITERATOR = __webpack_require__(3)('iterator'),
        ArrayProto = Array.prototype;

      module.exports = function(it) {
        return (
          it !== undefined &&
          (Iterators.Array === it || ArrayProto[ITERATOR] === it)
        );
      };

      /***/
    },
    /* 92 */
    /***/ function(module, exports, __webpack_require__) {
      // call something on iterator step with safe closing on error
      var anObject = __webpack_require__(9);
      module.exports = function(iterator, fn, value, entries) {
        try {
          return entries ? fn(anObject(value)[0], value[1]) : fn(value);
          // 7.4.6 IteratorClose(iterator, completion)
        } catch (e) {
          var ret = iterator['return'];
          if (ret !== undefined) anObject(ret.call(iterator));
          throw e;
        }
      };

      /***/
    },
    /* 93 */
    /***/ function(module, exports, __webpack_require__) {
      var ITERATOR = __webpack_require__(3)('iterator'), SAFE_CLOSING = false;

      try {
        var riter = [7][ITERATOR]();
        riter['return'] = function() {
          SAFE_CLOSING = true;
        };
        Array.from(riter, function() {
          throw 2;
        });
      } catch (e) {
        /* empty */
      }

      module.exports = function(exec, skipClosing) {
        if (!skipClosing && !SAFE_CLOSING) return false;
        var safe = false;
        try {
          var arr = [7], iter = arr[ITERATOR]();
          iter.next = function() {
            return { done: (safe = true) };
          };
          arr[ITERATOR] = function() {
            return iter;
          };
          exec(arr);
        } catch (e) {
          /* empty */
        }
        return safe;
      };

      /***/
    },
    /* 94 */
    /***/ function(module, exports) {
      exports.f = Object.getOwnPropertySymbols;

      /***/
    },
    /* 95 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(
        160
      );

      /** Built-in value references. */
      var Symbol =
        __WEBPACK_IMPORTED_MODULE_0__root_js__['a' /* default */].Symbol;

      /* harmony default export */ __webpack_exports__['a'] = Symbol;

      /***/
    },
    /* 96 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = compose;
      /**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

      function compose() {
        for (
          var _len = arguments.length, funcs = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          funcs[_key] = arguments[_key];
        }

        if (funcs.length === 0) {
          return function(arg) {
            return arg;
          };
        }

        if (funcs.length === 1) {
          return funcs[0];
        }

        var last = funcs[funcs.length - 1];
        var rest = funcs.slice(0, -1);
        return function() {
          return rest.reduceRight(function(composed, f) {
            return f(composed);
          }, last.apply(undefined, arguments));
        };
      }

      /***/
    },
    /* 97 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'a',
        function() {
          return ActionTypes;
        }
      );
      /* harmony export (immutable) */ __webpack_exports__['b'] = createStore;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(
        68
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(
        197
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_symbol_observable__
      );

      /**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
      var ActionTypes = {
        INIT: '@@redux/INIT',
      };

      /**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
      function createStore(reducer, preloadedState, enhancer) {
        var _ref2;

        if (
          typeof preloadedState === 'function' &&
          typeof enhancer === 'undefined'
        ) {
          enhancer = preloadedState;
          preloadedState = undefined;
        }

        if (typeof enhancer !== 'undefined') {
          if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.');
          }

          return enhancer(createStore)(reducer, preloadedState);
        }

        if (typeof reducer !== 'function') {
          throw new Error('Expected the reducer to be a function.');
        }

        var currentReducer = reducer;
        var currentState = preloadedState;
        var currentListeners = [];
        var nextListeners = currentListeners;
        var isDispatching = false;

        function ensureCanMutateNextListeners() {
          if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
          }
        }

        /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
        function getState() {
          return currentState;
        }

        /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
        function subscribe(listener) {
          if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.');
          }

          var isSubscribed = true;

          ensureCanMutateNextListeners();
          nextListeners.push(listener);

          return function unsubscribe() {
            if (!isSubscribed) {
              return;
            }

            isSubscribed = false;

            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
          };
        }

        /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
        function dispatch(action) {
          if (
            !__webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__[
                'a' /* default */
              ]
            )(action)
          ) {
            throw new Error(
              'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            );
          }

          if (typeof action.type === 'undefined') {
            throw new Error(
              'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            );
          }

          if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.');
          }

          try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
          } finally {
            isDispatching = false;
          }

          var listeners = (currentListeners = nextListeners);
          for (var i = 0; i < listeners.length; i++) {
            listeners[i]();
          }

          return action;
        }

        /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
        function replaceReducer(nextReducer) {
          if (typeof nextReducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function.');
          }

          currentReducer = nextReducer;
          dispatch({ type: ActionTypes.INIT });
        }

        /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
        function observable() {
          var _ref;

          var outerSubscribe = subscribe;
          return (_ref = {
            /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
            subscribe: function subscribe(observer) {
              if (typeof observer !== 'object') {
                throw new TypeError('Expected the observer to be an object.');
              }

              function observeState() {
                if (observer.next) {
                  observer.next(getState());
                }
              }

              observeState();
              var unsubscribe = outerSubscribe(observeState);
              return { unsubscribe: unsubscribe };
            },
          }), (_ref[
            __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a
          ] = function() {
            return this;
          }), _ref;
        }

        // When a store is created, an "INIT" action is dispatched so that every
        // reducer returns their initial state. This effectively populates
        // the initial state tree.
        dispatch({ type: ActionTypes.INIT });

        return (_ref2 = {
          dispatch: dispatch,
          subscribe: subscribe,
          getState: getState,
          replaceReducer: replaceReducer,
        }), (_ref2[
          __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a
        ] = observable), _ref2;
      }

      /***/
    },
    /* 98 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = warning;
      /**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
      function warning(message) {
        /* eslint-disable no-console */
        if (
          typeof console !== 'undefined' &&
          typeof console.error === 'function'
        ) {
          console.error(message);
        }
        /* eslint-enable no-console */
        try {
          // This error was thrown as a convenience so that if you enable
          // "break on all exceptions" in your console,
          // it would pause the execution at this line.
          throw new Error(message);
          /* eslint-disable no-empty */
        } catch (e) {}
        /* eslint-enable no-empty */
      }

      /***/
    },
    /* 99 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(101), __esModule: true };

      /***/
    },
    /* 100 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;

      var _defineProperty = __webpack_require__(143);

      var _defineProperty2 = _interopRequireDefault(_defineProperty);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = function(obj, key, value) {
        if (key in obj) {
          (0, _defineProperty2.default)(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
          });
        } else {
          obj[key] = value;
        }

        return obj;
      };

      /***/
    },
    /* 101 */
    /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(76);
      __webpack_require__(53);
      __webpack_require__(60);
      __webpack_require__(119);
      module.exports = __webpack_require__(5).Promise;

      /***/
    },
    /* 102 */
    /***/ function(module, exports) {
      module.exports = function() {
        /* empty */
      };

      /***/
    },
    /* 103 */
    /***/ function(module, exports) {
      module.exports = function(it, Constructor, name, forbiddenField) {
        if (
          !(it instanceof Constructor) ||
          (forbiddenField !== undefined && forbiddenField in it)
        ) {
          throw TypeError(name + ': incorrect invocation!');
        }
        return it;
      };

      /***/
    },
    /* 104 */
    /***/ function(module, exports, __webpack_require__) {
      // false -> Array#indexOf
      // true  -> Array#includes
      var toIObject = __webpack_require__(19),
        toLength = __webpack_require__(52),
        toIndex = __webpack_require__(115);
      module.exports = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIObject($this),
            length = toLength(O.length),
            index = toIndex(fromIndex, length),
            value;
          // Array#includes uses SameValueZero equality algorithm
          if (IS_INCLUDES && el != el)
            while (length > index) {
              value = O[index++];
              if (value != value) return true;
              // Array#toIndex ignores holes, Array#includes - not
            }
          else
            for (; length > index; index++)
              if (IS_INCLUDES || index in O) {
                if (O[index] === el) return IS_INCLUDES || index || 0;
              }
          return !IS_INCLUDES && -1;
        };
      };

      /***/
    },
    /* 105 */
    /***/ function(module, exports, __webpack_require__) {
      var ctx = __webpack_require__(21),
        call = __webpack_require__(92),
        isArrayIter = __webpack_require__(91),
        anObject = __webpack_require__(9),
        toLength = __webpack_require__(52),
        getIterFn = __webpack_require__(75),
        BREAK = {},
        RETURN = {};
      var exports = (module.exports = function(
        iterable,
        entries,
        fn,
        that,
        ITERATOR
      ) {
        var iterFn = ITERATOR
          ? function() {
              return iterable;
            }
          : getIterFn(iterable),
          f = ctx(fn, that, entries ? 2 : 1),
          index = 0,
          length,
          step,
          iterator,
          result;
        if (typeof iterFn != 'function')
          throw TypeError(iterable + ' is not iterable!');
        // fast case for arrays with default iterator
        if (isArrayIter(iterFn))
          for (length = toLength(iterable.length); length > index; index++) {
            result = entries
              ? f(anObject((step = iterable[index]))[0], step[1])
              : f(iterable[index]);
            if (result === BREAK || result === RETURN) return result;
          }
        else
          for (
            iterator = iterFn.call(iterable);
            !(step = iterator.next()).done;

          ) {
            result = call(iterator, f, step.value, entries);
            if (result === BREAK || result === RETURN) return result;
          }
      });
      exports.BREAK = BREAK;
      exports.RETURN = RETURN;

      /***/
    },
    /* 106 */
    /***/ function(module, exports) {
      // fast apply, http://jsperf.lnkit.com/fast-apply/5
      module.exports = function(fn, args, that) {
        var un = that === undefined;
        switch (args.length) {
          case 0:
            return un ? fn() : fn.call(that);
          case 1:
            return un ? fn(args[0]) : fn.call(that, args[0]);
          case 2:
            return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
          case 3:
            return un
              ? fn(args[0], args[1], args[2])
              : fn.call(that, args[0], args[1], args[2]);
          case 4:
            return un
              ? fn(args[0], args[1], args[2], args[3])
              : fn.call(that, args[0], args[1], args[2], args[3]);
        }
        return fn.apply(that, args);
      };

      /***/
    },
    /* 107 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var create = __webpack_require__(57),
        descriptor = __webpack_require__(31),
        setToStringTag = __webpack_require__(28),
        IteratorPrototype = {};

      // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
      __webpack_require__(11)(
        IteratorPrototype,
        __webpack_require__(3)('iterator'),
        function() {
          return this;
        }
      );

      module.exports = function(Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, {
          next: descriptor(1, next),
        });
        setToStringTag(Constructor, NAME + ' Iterator');
      };

      /***/
    },
    /* 108 */
    /***/ function(module, exports) {
      module.exports = function(done, value) {
        return { value: value, done: !!done };
      };

      /***/
    },
    /* 109 */
    /***/ function(module, exports, __webpack_require__) {
      var global = __webpack_require__(4),
        macrotask = __webpack_require__(58).set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = __webpack_require__(22)(process) == 'process';

      module.exports = function() {
        var head, last, notify;

        var flush = function() {
          var parent, fn;
          if (isNode && (parent = process.domain)) parent.exit();
          while (head) {
            fn = head.fn;
            head = head.next;
            try {
              fn();
            } catch (e) {
              if (head) notify();
              else last = undefined;
              throw e;
            }
          }
          last = undefined;
          if (parent) parent.enter();
        };

        // Node.js
        if (isNode) {
          notify = function() {
            process.nextTick(flush);
          };
          // browsers with MutationObserver
        } else if (Observer) {
          var toggle = true, node = document.createTextNode('');
          new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
          notify = function() {
            node.data = toggle = !toggle;
          };
          // environments with maybe non-completely correct, but existent Promise
        } else if (Promise && Promise.resolve) {
          var promise = Promise.resolve();
          notify = function() {
            promise.then(flush);
          };
          // for other environments - macrotask based on:
          // - setImmediate
          // - MessageChannel
          // - window.postMessag
          // - onreadystatechange
          // - setTimeout
        } else {
          notify = function() {
            // strange IE + webpack dev server bug - use .call(global)
            macrotask.call(global, flush);
          };
        }

        return function(fn) {
          var task = { fn: fn, next: undefined };
          if (last) last.next = task;
          if (!head) {
            head = task;
            notify();
          }
          last = task;
        };
      };

      /***/
    },
    /* 110 */
    /***/ function(module, exports, __webpack_require__) {
      var dP = __webpack_require__(12),
        anObject = __webpack_require__(9),
        getKeys = __webpack_require__(30);

      module.exports = __webpack_require__(10)
        ? Object.defineProperties
        : function defineProperties(O, Properties) {
            anObject(O);
            var keys = getKeys(Properties), length = keys.length, i = 0, P;
            while (length > i)
              dP.f(O, (P = keys[i++]), Properties[P]);
            return O;
          };

      /***/
    },
    /* 111 */
    /***/ function(module, exports, __webpack_require__) {
      var hide = __webpack_require__(11);
      module.exports = function(target, src, safe) {
        for (var key in src) {
          if (safe && target[key]) target[key] = src[key];
          else hide(target, key, src[key]);
        }
        return target;
      };

      /***/
    },
    /* 112 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var global = __webpack_require__(4),
        core = __webpack_require__(5),
        dP = __webpack_require__(12),
        DESCRIPTORS = __webpack_require__(10),
        SPECIES = __webpack_require__(3)('species');

      module.exports = function(KEY) {
        var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
        if (DESCRIPTORS && C && !C[SPECIES])
          dP.f(C, SPECIES, {
            configurable: true,
            get: function() {
              return this;
            },
          });
      };

      /***/
    },
    /* 113 */
    /***/ function(module, exports, __webpack_require__) {
      // 7.3.20 SpeciesConstructor(O, defaultConstructor)
      var anObject = __webpack_require__(9),
        aFunction = __webpack_require__(33),
        SPECIES = __webpack_require__(3)('species');
      module.exports = function(O, D) {
        var C = anObject(O).constructor, S;
        return C === undefined || (S = anObject(C)[SPECIES]) == undefined
          ? D
          : aFunction(S);
      };

      /***/
    },
    /* 114 */
    /***/ function(module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(38),
        defined = __webpack_require__(34);
      // true  -> String#at
      // false -> String#codePointAt
      module.exports = function(TO_STRING) {
        return function(that, pos) {
          var s = String(defined(that)), i = toInteger(pos), l = s.length, a, b;
          if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
          a = s.charCodeAt(i);
          return a < 0xd800 ||
            a > 0xdbff ||
            i + 1 === l ||
            (b = s.charCodeAt(i + 1)) < 0xdc00 ||
            b > 0xdfff
            ? TO_STRING ? s.charAt(i) : a
            : TO_STRING
                ? s.slice(i, i + 2)
                : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
        };
      };

      /***/
    },
    /* 115 */
    /***/ function(module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(38), max = Math.max, min = Math.min;
      module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
      };

      /***/
    } /* 118 */ /* 117 */,
    ,
    ,
    /* 116 */ /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var addToUnscopables = __webpack_require__(102),
        step = __webpack_require__(108),
        Iterators = __webpack_require__(17),
        toIObject = __webpack_require__(19);

      // 22.1.3.4 Array.prototype.entries()
      // 22.1.3.13 Array.prototype.keys()
      // 22.1.3.29 Array.prototype.values()
      // 22.1.3.30 Array.prototype[@@iterator]()
      module.exports = __webpack_require__(56)(
        Array,
        'Array',
        function(iterated, kind) {
          this._t = toIObject(iterated); // target
          this._i = 0; // next index
          this._k = kind; // kind
          // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
        },
        function() {
          var O = this._t, kind = this._k, index = this._i++;
          if (!O || index >= O.length) {
            this._t = undefined;
            return step(1);
          }
          if (kind == 'keys') return step(0, index);
          if (kind == 'values') return step(0, O[index]);
          return step(0, [index, O[index]]);
        },
        'values'
      );

      // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
      Iterators.Arguments = Iterators.Array;

      addToUnscopables('keys');
      addToUnscopables('values');
      addToUnscopables('entries');

      /***/
    },
    /* 119 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var LIBRARY = __webpack_require__(36),
        global = __webpack_require__(4),
        ctx = __webpack_require__(21),
        classof = __webpack_require__(51),
        $export = __webpack_require__(13),
        isObject = __webpack_require__(18),
        aFunction = __webpack_require__(33),
        anInstance = __webpack_require__(103),
        forOf = __webpack_require__(105),
        speciesConstructor = __webpack_require__(113),
        task = __webpack_require__(58).set,
        microtask = __webpack_require__(109)(),
        PROMISE = 'Promise',
        TypeError = global.TypeError,
        process = global.process,
        $Promise = global[PROMISE],
        process = global.process,
        isNode = classof(process) == 'process',
        empty = function() {
          /* empty */
        },
        Internal,
        GenericPromiseCapability,
        Wrapper;

      var USE_NATIVE = !!(function() {
        try {
          // correct subclassing with @@species support
          var promise = $Promise.resolve(1),
            FakePromise = ((promise.constructor = {})[
              __webpack_require__(3)('species')
            ] = function(exec) {
              exec(empty, empty);
            });
          // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
          return (
            (isNode || typeof PromiseRejectionEvent == 'function') &&
            promise.then(empty) instanceof FakePromise
          );
        } catch (e) {
          /* empty */
        }
      })();

      // helpers
      var sameConstructor = function(a, b) {
        // with library wrapper special case
        return a === b || (a === $Promise && b === Wrapper);
      };
      var isThenable = function(it) {
        var then;
        return isObject(it) && typeof (then = it.then) == 'function'
          ? then
          : false;
      };
      var newPromiseCapability = function(C) {
        return sameConstructor($Promise, C)
          ? new PromiseCapability(C)
          : new GenericPromiseCapability(C);
      };
      var PromiseCapability = (GenericPromiseCapability = function(C) {
        var resolve, reject;
        this.promise = new C(function($$resolve, $$reject) {
          if (resolve !== undefined || reject !== undefined)
            throw TypeError('Bad Promise constructor');
          resolve = $$resolve;
          reject = $$reject;
        });
        this.resolve = aFunction(resolve);
        this.reject = aFunction(reject);
      });
      var perform = function(exec) {
        try {
          exec();
        } catch (e) {
          return { error: e };
        }
      };
      var notify = function(promise, isReject) {
        if (promise._n) return;
        promise._n = true;
        var chain = promise._c;
        microtask(function() {
          var value = promise._v, ok = promise._s == 1, i = 0;
          var run = function(reaction) {
            var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              domain = reaction.domain,
              result,
              then;
            try {
              if (handler) {
                if (!ok) {
                  if (promise._h == 2) onHandleUnhandled(promise);
                  promise._h = 1;
                }
                if (handler === true) result = value;
                else {
                  if (domain) domain.enter();
                  result = handler(value);
                  if (domain) domain.exit();
                }
                if (result === reaction.promise) {
                  reject(TypeError('Promise-chain cycle'));
                } else if ((then = isThenable(result))) {
                  then.call(result, resolve, reject);
                } else resolve(result);
              } else reject(value);
            } catch (e) {
              reject(e);
            }
          };
          while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
          promise._c = [];
          promise._n = false;
          if (isReject && !promise._h) onUnhandled(promise);
        });
      };
      var onUnhandled = function(promise) {
        task.call(global, function() {
          var value = promise._v, abrupt, handler, console;
          if (isUnhandled(promise)) {
            abrupt = perform(function() {
              if (isNode) {
                process.emit('unhandledRejection', value, promise);
              } else if ((handler = global.onunhandledrejection)) {
                handler({ promise: promise, reason: value });
              } else if ((console = global.console) && console.error) {
                console.error('Unhandled promise rejection', value);
              }
            });
            // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
            promise._h = isNode || isUnhandled(promise) ? 2 : 1;
          }
          promise._a = undefined;
          if (abrupt) throw abrupt.error;
        });
      };
      var isUnhandled = function(promise) {
        if (promise._h == 1) return false;
        var chain = promise._a || promise._c, i = 0, reaction;
        while (chain.length > i) {
          reaction = chain[i++];
          if (reaction.fail || !isUnhandled(reaction.promise)) return false;
        }
        return true;
      };
      var onHandleUnhandled = function(promise) {
        task.call(global, function() {
          var handler;
          if (isNode) {
            process.emit('rejectionHandled', promise);
          } else if ((handler = global.onrejectionhandled)) {
            handler({ promise: promise, reason: promise._v });
          }
        });
      };
      var $reject = function(value) {
        var promise = this;
        if (promise._d) return;
        promise._d = true;
        promise = promise._w || promise; // unwrap
        promise._v = value;
        promise._s = 2;
        if (!promise._a) promise._a = promise._c.slice();
        notify(promise, true);
      };
      var $resolve = function(value) {
        var promise = this, then;
        if (promise._d) return;
        promise._d = true;
        promise = promise._w || promise; // unwrap
        try {
          if (promise === value)
            throw TypeError("Promise can't be resolved itself");
          if ((then = isThenable(value))) {
            microtask(function() {
              var wrapper = { _w: promise, _d: false }; // wrap
              try {
                then.call(
                  value,
                  ctx($resolve, wrapper, 1),
                  ctx($reject, wrapper, 1)
                );
              } catch (e) {
                $reject.call(wrapper, e);
              }
            });
          } else {
            promise._v = value;
            promise._s = 1;
            notify(promise, false);
          }
        } catch (e) {
          $reject.call({ _w: promise, _d: false }, e); // wrap
        }
      };

      // constructor polyfill
      if (!USE_NATIVE) {
        // 25.4.3.1 Promise(executor)
        $Promise = function Promise(executor) {
          anInstance(this, $Promise, PROMISE, '_h');
          aFunction(executor);
          Internal.call(this);
          try {
            executor(ctx($resolve, this, 1), ctx($reject, this, 1));
          } catch (err) {
            $reject.call(this, err);
          }
        };
        Internal = function Promise(executor) {
          this._c = []; // <- awaiting reactions
          this._a = undefined; // <- checked in isUnhandled reactions
          this._s = 0; // <- state
          this._d = false; // <- done
          this._v = undefined; // <- value
          this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
          this._n = false; // <- notify
        };
        Internal.prototype = __webpack_require__(111)($Promise.prototype, {
          // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
          then: function then(onFulfilled, onRejected) {
            var reaction = newPromiseCapability(
              speciesConstructor(this, $Promise)
            );
            reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
            reaction.fail = typeof onRejected == 'function' && onRejected;
            reaction.domain = isNode ? process.domain : undefined;
            this._c.push(reaction);
            if (this._a) this._a.push(reaction);
            if (this._s) notify(this, false);
            return reaction.promise;
          },
          // 25.4.5.1 Promise.prototype.catch(onRejected)
          catch: function(onRejected) {
            return this.then(undefined, onRejected);
          },
        });
        PromiseCapability = function() {
          var promise = new Internal();
          this.promise = promise;
          this.resolve = ctx($resolve, promise, 1);
          this.reject = ctx($reject, promise, 1);
        };
      }

      $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Promise: $Promise,
      });
      __webpack_require__(28)($Promise, PROMISE);
      __webpack_require__(112)(PROMISE);
      Wrapper = __webpack_require__(5)[PROMISE];

      // statics
      $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
        // 25.4.4.5 Promise.reject(r)
        reject: function reject(r) {
          var capability = newPromiseCapability(this),
            $$reject = capability.reject;
          $$reject(r);
          return capability.promise;
        },
      });
      $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
        // 25.4.4.6 Promise.resolve(x)
        resolve: function resolve(x) {
          // instanceof instead of internal slot check because we should fix it without replacement native Promise core
          if (x instanceof $Promise && sameConstructor(x.constructor, this))
            return x;
          var capability = newPromiseCapability(this),
            $$resolve = capability.resolve;
          $$resolve(x);
          return capability.promise;
        },
      });
      $export(
        $export.S +
          $export.F *
            !(USE_NATIVE &&
              __webpack_require__(93)(function(iter) {
                $Promise.all(iter)['catch'](empty);
              })),
        PROMISE,
        {
          // 25.4.4.1 Promise.all(iterable)
          all: function all(iterable) {
            var C = this,
              capability = newPromiseCapability(C),
              resolve = capability.resolve,
              reject = capability.reject;
            var abrupt = perform(function() {
              var values = [], index = 0, remaining = 1;
              forOf(iterable, false, function(promise) {
                var $index = index++, alreadyCalled = false;
                values.push(undefined);
                remaining++;
                C.resolve(promise).then(function(value) {
                  if (alreadyCalled) return;
                  alreadyCalled = true;
                  values[$index] = value;
                  --remaining || resolve(values);
                }, reject);
              });
              --remaining || resolve(values);
            });
            if (abrupt) reject(abrupt.error);
            return capability.promise;
          },
          // 25.4.4.4 Promise.race(iterable)
          race: function race(iterable) {
            var C = this,
              capability = newPromiseCapability(C),
              reject = capability.reject;
            var abrupt = perform(function() {
              forOf(iterable, false, function(promise) {
                C.resolve(promise).then(capability.resolve, reject);
              });
            });
            if (abrupt) reject(abrupt.error);
            return capability.promise;
          },
        }
      );

      /***/
    } /* 139 */ /* 121 */ /* 122 */ /* 123 */ /* 124 */ /* 125 */ /* 126 */ /* 127 */ /* 128 */ /* 129 */ /* 130 */ /* 131 */ /* 132 */ /* 133 */ /* 134 */ /* 135 */ /* 136 */ /* 137 */ /* 138 */,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    /* 120 */ /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });

      var _typeof = typeof Symbol === 'function' &&
        typeof Symbol.iterator === 'symbol'
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          };

      exports.default = createBackgroundStore;

      var _constants = __webpack_require__(66);

      function _objectWithoutProperties(obj, keys) {
        var target = {};
        for (var i in obj) {
          if (keys.indexOf(i) >= 0) continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          target[i] = obj[i];
        }
        return target;
      }

      var store = void 0, actions = void 0, onDisconnect = void 0;

      // eslint-disable-next-line consistent-return
      function handleMessage(msg, sender, cb) {
        if (msg.type === _constants.DISPATCH) {
          var _msg$action = msg.action,
            type = _msg$action.type,
            actionData = _objectWithoutProperties(_msg$action, ['type']);

          var action = actions[type];

          if (action) {
            // if action doesn't have any data we should pass "undefined"
            store.dispatch(
              action(Object.keys(actionData).length ? actionData : undefined)
            );
          } else {
            console.error(
              'Provided in background store "actions" object doesn\'t contain "' +
                type +
                '" key.'
            );
          }
        } else if (msg.type === _constants.UPDATE_STATE) {
          cb(store.getState());

          // keep channel open, https://developer.chrome.com/extensions/runtime#event-onMessage
          return true;
        }
      }

      // allow other parts of the app to reuse the store, e.g. popup
      function handleConnection(connection) {
        if (connection.name !== _constants.CONNECTION_NAME) {
          return;
        }

        // send updated state to other parts of the app on every change
        var unsubscribe = store.subscribe(function() {
          connection.postMessage({
            type: _constants.UPDATE_STATE,
            data: store.getState(),
          });
        });

        // unsubscribe on disconnect
        connection.onDisconnect.addListener(function() {
          unsubscribe();

          if (onDisconnect) {
            onDisconnect();
          }
        });
      }

      function createBackgroundStore(options) {
        if (
          (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !==
            'object' ||
          _typeof(options.store) !== 'object'
        ) {
          throw new Error('Expected the "store" to be an object.');
        }

        if (
          options.hasOwnProperty('actions') &&
          _typeof(options.actions) !== 'object'
        ) {
          throw new Error('Expected the "actions" to be an object.');
        }

        if (
          options.hasOwnProperty('onDisconnect') &&
          typeof options.onDisconnect !== 'function'
        ) {
          throw new Error('Expected the "onDisconnect" to be a function.');
        }

        store = options.store;
        actions = options.actions || {};
        onDisconnect = options.onDisconnect;

        chrome.runtime.onConnect.addListener(handleConnection);
        chrome.runtime.onMessage.addListener(handleMessage);

        return store;
      }

      /***/
    },
    /* 140 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });

      exports.default = function() {
        // connect to "background" store
        var connection = chrome.runtime.connect({
          name: _constants.CONNECTION_NAME,
        });

        // listen for changes in the "background" store
        connection.onMessage.addListener(handleMessage);

        // return promise to allow getting current state of "background" store
        return new Promise(function(resolve) {
          chrome.runtime.sendMessage(
            { type: _constants.UPDATE_STATE },
            function(res) {
              state = res;

              // return an object with equivalent to Redux store interface
              resolve({
                subscribe: subscribe,
                dispatch: dispatch,
                getState: getState,
              });
            }
          );
        });
      };

      var _constants = __webpack_require__(66);

      var listeners = [];

      var state = void 0;

      function handleMessage(msg) {
        if (msg.type === _constants.UPDATE_STATE) {
          state = msg.data;

          listeners.forEach(function(l) {
            return l();
          });
        }
      }

      function subscribe(listener) {
        listeners.push(listener);

        // return unsubscribe function
        return function() {
          listeners = listeners.filter(function(l) {
            return l !== listener;
          });
        };
      }

      function dispatch(action) {
        // perform an action to change state of "background" store
        chrome.runtime.sendMessage({
          type: _constants.DISPATCH,
          action: action,
        });
      }

      function getState() {
        return state;
      }

      /***/
    },
    /* 141 */
    /***/ function(module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function(global) {
        // This method of obtaining a reference to the global object needs to be
        // kept identical to the way it is obtained in runtime.js
        var g = typeof global === 'object'
          ? global
          : typeof window === 'object'
              ? window
              : typeof self === 'object' ? self : this;

        // Use `getOwnPropertyNames` because not all browsers support calling
        // `hasOwnProperty` on the global `self` object in a worker. See #183.
        var hadRuntime =
          g.regeneratorRuntime &&
          Object.getOwnPropertyNames(g).indexOf('regeneratorRuntime') >= 0;

        // Save the old regeneratorRuntime in case it needs to be restored later.
        var oldRuntime = hadRuntime && g.regeneratorRuntime;

        // Force reevalutation of runtime.js.
        g.regeneratorRuntime = undefined;

        module.exports = __webpack_require__(142);

        if (hadRuntime) {
          // Restore the original runtime.
          g.regeneratorRuntime = oldRuntime;
        } else {
          // Remove the global property added by runtime.js.
          try {
            delete g.regeneratorRuntime;
          } catch (e) {
            g.regeneratorRuntime = undefined;
          }
        }

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(27)));

      /***/
    },
    /* 142 */
    /***/ function(module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function(global) {
        /**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

        !(function(global) {
          'use strict';
          var Op = Object.prototype;
          var hasOwn = Op.hasOwnProperty;
          var undefined; // More compressible than void 0.
          var $Symbol = typeof Symbol === 'function' ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || '@@iterator';
          var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
          var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

          var inModule = typeof module === 'object';
          var runtime = global.regeneratorRuntime;
          if (runtime) {
            if (inModule) {
              // If regeneratorRuntime is defined globally and we're in a module,
              // make the exports object identical to regeneratorRuntime.
              module.exports = runtime;
            }
            // Don't bother evaluating the rest of this file if the runtime was
            // already defined globally.
            return;
          }

          // Define the runtime globally (as expected by generated code) as either
          // module.exports (if we're in a module) or a new, empty object.
          runtime = global.regeneratorRuntime = inModule ? module.exports : {};

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator = outerFn &&
              outerFn.prototype instanceof Generator
              ? outerFn
              : Generator;
            var generator = Object.create(protoGenerator.prototype);
            var context = new Context(tryLocsList || []);

            // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context);

            return generator;
          }
          runtime.wrap = wrap;

          // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.
          function tryCatch(fn, obj, arg) {
            try {
              return { type: 'normal', arg: fn.call(obj, arg) };
            } catch (err) {
              return { type: 'throw', arg: err };
            }
          }

          var GenStateSuspendedStart = 'suspendedStart';
          var GenStateSuspendedYield = 'suspendedYield';
          var GenStateExecuting = 'executing';
          var GenStateCompleted = 'completed';

          // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.
          var ContinueSentinel = {};

          // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}

          // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.
          var IteratorPrototype = {};
          IteratorPrototype[iteratorSymbol] = function() {
            return this;
          };

          var getProto = Object.getPrototypeOf;
          var NativeIteratorPrototype =
            getProto && getProto(getProto(values([])));
          if (
            NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
          ) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
          }

          var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
            IteratorPrototype
          ));
          GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
          GeneratorFunctionPrototype.constructor = GeneratorFunction;
          GeneratorFunctionPrototype[
            toStringTagSymbol
          ] = GeneratorFunction.displayName = 'GeneratorFunction';

          // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.
          function defineIteratorMethods(prototype) {
            ['next', 'throw', 'return'].forEach(function(method) {
              prototype[method] = function(arg) {
                return this._invoke(method, arg);
              };
            });
          }

          runtime.isGeneratorFunction = function(genFun) {
            var ctor = typeof genFun === 'function' && genFun.constructor;
            return ctor
              ? ctor === GeneratorFunction ||
                  // For the native GeneratorFunction constructor, the best we can
                  // do is to check its .name property.
                  (ctor.displayName || ctor.name) === 'GeneratorFunction'
              : false;
          };

          runtime.mark = function(genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              if (!(toStringTagSymbol in genFun)) {
                genFun[toStringTagSymbol] = 'GeneratorFunction';
              }
            }
            genFun.prototype = Object.create(Gp);
            return genFun;
          };

          // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.
          runtime.awrap = function(arg) {
            return { __await: arg };
          };

          function AsyncIterator(generator) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if (record.type === 'throw') {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;
                if (
                  value &&
                  typeof value === 'object' &&
                  hasOwn.call(value, '__await')
                ) {
                  return Promise.resolve(value.__await).then(
                    function(value) {
                      invoke('next', value, resolve, reject);
                    },
                    function(err) {
                      invoke('throw', err, resolve, reject);
                    }
                  );
                }

                return Promise.resolve(value).then(function(unwrapped) {
                  // When a yielded Promise is resolved, its final value becomes
                  // the .value of the Promise<{value,done}> result for the
                  // current iteration. If the Promise is rejected, however, the
                  // result for this iteration will be rejected with the same
                  // reason. Note that rejections of yielded Promises are not
                  // thrown back into the generator function, as is the case
                  // when an awaited Promise is rejected. This difference in
                  // behavior between yield and await is important, because it
                  // allows the consumer to decide what to do with the yielded
                  // rejection (swallow it and continue, manually .throw it back
                  // into the generator, abandon iteration, whatever). With
                  // await, by contrast, there is no opportunity to examine the
                  // rejection reason outside the generator function, so the
                  // only option is to throw it from the await expression, and
                  // let the generator function handle the exception.
                  result.value = unwrapped;
                  resolve(result);
                }, reject);
              }
            }

            if (typeof global.process === 'object' && global.process.domain) {
              invoke = global.process.domain.bind(invoke);
            }

            var previousPromise;

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new Promise(function(resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }

              return (previousPromise =
                // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise
                  ? previousPromise.then(
                      callInvokeWithMethodAndArg,
                      // Avoid propagating failures to Promises returned by later
                      // invocations of the iterator.
                      callInvokeWithMethodAndArg
                    )
                  : callInvokeWithMethodAndArg());
            }

            // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).
            this._invoke = enqueue;
          }

          defineIteratorMethods(AsyncIterator.prototype);
          AsyncIterator.prototype[asyncIteratorSymbol] = function() {
            return this;
          };
          runtime.AsyncIterator = AsyncIterator;

          // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.
          runtime.async = function(innerFn, outerFn, self, tryLocsList) {
            var iter = new AsyncIterator(
              wrap(innerFn, outerFn, self, tryLocsList)
            );

            return runtime.isGeneratorFunction(outerFn)
              ? iter // If outerFn is a generator, return the full iterator.
              : iter.next().then(function(result) {
                  return result.done ? result.value : iter.next();
                });
          };

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;

            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error('Generator is already running');
              }

              if (state === GenStateCompleted) {
                if (method === 'throw') {
                  throw arg;
                }

                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
              }

              context.method = method;
              context.arg = arg;

              while (true) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }

                if (context.method === 'next') {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg;
                } else if (context.method === 'throw') {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                  }

                  context.dispatchException(context.arg);
                } else if (context.method === 'return') {
                  context.abrupt('return', context.arg);
                }

                state = GenStateExecuting;

                var record = tryCatch(innerFn, self, context);
                if (record.type === 'normal') {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done
                    ? GenStateCompleted
                    : GenStateSuspendedYield;

                  if (record.arg === ContinueSentinel) {
                    continue;
                  }

                  return {
                    value: record.arg,
                    done: context.done,
                  };
                } else if (record.type === 'throw') {
                  state = GenStateCompleted;
                  // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.
                  context.method = 'throw';
                  context.arg = record.arg;
                }
              }
            };
          }

          // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.
          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];
            if (method === undefined) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null;

              if (context.method === 'throw') {
                if (delegate.iterator.return) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = 'return';
                  context.arg = undefined;
                  maybeInvokeDelegate(delegate, context);

                  if (context.method === 'throw') {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                  }
                }

                context.method = 'throw';
                context.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                );
              }

              return ContinueSentinel;
            }

            var record = tryCatch(method, delegate.iterator, context.arg);

            if (record.type === 'throw') {
              context.method = 'throw';
              context.arg = record.arg;
              context.delegate = null;
              return ContinueSentinel;
            }

            var info = record.arg;

            if (!info) {
              context.method = 'throw';
              context.arg = new TypeError('iterator result is not an object');
              context.delegate = null;
              return ContinueSentinel;
            }

            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value;

              // Resume execution at the desired location (see delegateYield).
              context.next = delegate.nextLoc;

              // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.
              if (context.method !== 'return') {
                context.method = 'next';
                context.arg = undefined;
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info;
            }

            // The delegate iterator is finished, so forget it and continue with
            // the outer generator.
            context.delegate = null;
            return ContinueSentinel;
          }

          // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.
          defineIteratorMethods(Gp);

          Gp[toStringTagSymbol] = 'Generator';

          // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.
          Gp[iteratorSymbol] = function() {
            return this;
          };

          Gp.toString = function() {
            return '[object Generator]';
          };

          function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };

            if (1 in locs) {
              entry.catchLoc = locs[1];
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = 'normal';
            delete record.arg;
            entry.completion = record;
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{ tryLoc: 'root' }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }

          runtime.keys = function(object) {
            var keys = [];
            for (var key in object) {
              keys.push(key);
            }
            keys.reverse();

            // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
              while (keys.length) {
                var key = keys.pop();
                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              }

              // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.
              next.done = true;
              return next;
            };
          };

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }

              if (typeof iterable.next === 'function') {
                return iterable;
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                  next = function next() {
                    while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                      }
                    }

                    next.value = undefined;
                    next.done = true;

                    return next;
                  };

                return (next.next = next);
              }
            }

            // Return an iterator with no values.
            return { next: doneResult };
          }
          runtime.values = values;

          function doneResult() {
            return { value: undefined, done: true };
          }

          Context.prototype = {
            constructor: Context,

            reset: function(skipTempReset) {
              this.prev = 0;
              this.next = 0;
              // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.
              this.sent = this._sent = undefined;
              this.done = false;
              this.delegate = null;

              this.method = 'next';
              this.arg = undefined;

              this.tryEntries.forEach(resetTryEntry);

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (
                    name.charAt(0) === 't' &&
                    hasOwn.call(this, name) &&
                    !isNaN(+name.slice(1))
                  ) {
                    this[name] = undefined;
                  }
                }
              }
            },

            stop: function() {
              this.done = true;

              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;
              if (rootRecord.type === 'throw') {
                throw rootRecord.arg;
              }

              return this.rval;
            },

            dispatchException: function(exception) {
              if (this.done) {
                throw exception;
              }

              var context = this;
              function handle(loc, caught) {
                record.type = 'throw';
                record.arg = exception;
                context.next = loc;

                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = 'next';
                  context.arg = undefined;
                }

                return !!caught;
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;

                if (entry.tryLoc === 'root') {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle('end');
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, 'catchLoc');
                  var hasFinally = hasOwn.call(entry, 'finallyLoc');

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error('try statement without catch or finally');
                  }
                }
              }
            },

            abrupt: function(type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (
                  entry.tryLoc <= this.prev &&
                  hasOwn.call(entry, 'finallyLoc') &&
                  this.prev < entry.finallyLoc
                ) {
                  var finallyEntry = entry;
                  break;
                }
              }

              if (
                finallyEntry &&
                (type === 'break' || type === 'continue') &&
                finallyEntry.tryLoc <= arg &&
                arg <= finallyEntry.finallyLoc
              ) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }

              var record = finallyEntry ? finallyEntry.completion : {};
              record.type = type;
              record.arg = arg;

              if (finallyEntry) {
                this.method = 'next';
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
              }

              return this.complete(record);
            },

            complete: function(record, afterLoc) {
              if (record.type === 'throw') {
                throw record.arg;
              }

              if (record.type === 'break' || record.type === 'continue') {
                this.next = record.arg;
              } else if (record.type === 'return') {
                this.rval = this.arg = record.arg;
                this.method = 'return';
                this.next = 'end';
              } else if (record.type === 'normal' && afterLoc) {
                this.next = afterLoc;
              }

              return ContinueSentinel;
            },

            finish: function(finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },

            catch: function(tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;
                  if (record.type === 'throw') {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }
                  return thrown;
                }
              }

              // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.
              throw new Error('illegal catch attempt');
            },

            delegateYield: function(iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
              };

              if (this.method === 'next') {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined;
              }

              return ContinueSentinel;
            },
          };
        })(
          // Among the various tricks for obtaining a reference to the global
          // object, this seems to be the most reliable technique that does not
          // use indirect eval (which violates Content Security Policy).
          typeof global === 'object'
            ? global
            : typeof window === 'object'
                ? window
                : typeof self === 'object' ? self : this
        );

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(27)));

      /***/
    },
    /* 143 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(146), __esModule: true };

      /***/
    } /* 145 */,
    ,
    /* 144 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(
        97
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(
        196
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(
        195
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(
        194
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(
        96
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(
        98
      );
      /* harmony reexport (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'b',
        function() {
          return __WEBPACK_IMPORTED_MODULE_0__createStore__['b'];
        }
      );
      /* harmony reexport (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'd',
        function() {
          return __WEBPACK_IMPORTED_MODULE_1__combineReducers__['a'];
        }
      );
      /* harmony reexport (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'a',
        function() {
          return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__['a'];
        }
      );
      /* harmony reexport (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'c',
        function() {
          return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__['a'];
        }
      );
      /* unused harmony reexport compose */

      /*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
      function isCrushed() {}

      if (
        'development' !== 'production' &&
        typeof isCrushed.name === 'string' &&
        isCrushed.name !== 'isCrushed'
      ) {
        __webpack_require__.i(
          __WEBPACK_IMPORTED_MODULE_5__utils_warning__['a' /* default */]
        )(
          "You are currently using minified code outside of NODE_ENV === 'production'. " +
            'This means that you are running a slower development build of Redux. ' +
            'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
            'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
            'to ensure you have the correct code for your production build.'
        );
      }

      /***/
    },
    /* 146 */
    /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(150);
      var $Object = __webpack_require__(5).Object;
      module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
      };

      /***/
    } /* 149 */ /* 148 */,
    ,
    ,
    /* 147 */ /***/ function(module, exports, __webpack_require__) {
      // most Object methods by ES6 should accept primitives
      var $export = __webpack_require__(13),
        core = __webpack_require__(5),
        fails = __webpack_require__(25);
      module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
        exp[KEY] = exec(fn);
        $export(
          $export.S +
            $export.F *
              fails(function() {
                fn(1);
              }),
          'Object',
          exp
        );
      };

      /***/
    },
    /* 150 */
    /***/ function(module, exports, __webpack_require__) {
      var $export = __webpack_require__(13);
      // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
      $export($export.S + $export.F * !__webpack_require__(10), 'Object', {
        defineProperty: __webpack_require__(12).f,
      });

      /***/
    } /* 154 */ /* 152 */ /* 153 */,
    ,
    ,
    ,
    /* 151 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(
        95
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(
        157
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(
        158
      );

      /** `Object#toString` result references. */
      var nullTag = '[object Null]', undefinedTag = '[object Undefined]';

      /** Built-in value references. */
      var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__[
        'a' /* default */
      ]
        ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__['a' /* default */]
            .toStringTag
        : undefined;

      /**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value)
          ? __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__['a' /* default */]
            )(value)
          : __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_2__objectToString_js__[
                'a' /* default */
              ]
            )(value);
      }

      /* harmony default export */ __webpack_exports__['a'] = baseGetTag;

      /***/
    },
    /* 155 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* WEBPACK VAR INJECTION */ (function(global) {
        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
          typeof global == 'object' &&
          global &&
          global.Object === Object &&
          global;

        /* harmony default export */ __webpack_exports__['a'] = freeGlobal;

        /* WEBPACK VAR INJECTION */
      }.call(__webpack_exports__, __webpack_require__(27)));

      /***/
    },
    /* 156 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(
        159
      );

      /** Built-in value references. */
      var getPrototype = __webpack_require__.i(
        __WEBPACK_IMPORTED_MODULE_0__overArg_js__['a' /* default */]
      )(Object.getPrototypeOf, Object);

      /* harmony default export */ __webpack_exports__['a'] = getPrototype;

      /***/
    },
    /* 157 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(
        95
      );

      /** Used for built-in method references. */
      var objectProto = Object.prototype;

      /** Used to check objects for own properties. */
      var hasOwnProperty = objectProto.hasOwnProperty;

      /**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
      var nativeObjectToString = objectProto.toString;

      /** Built-in value references. */
      var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__[
        'a' /* default */
      ]
        ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__['a' /* default */]
            .toStringTag
        : undefined;

      /**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

        try {
          value[symToStringTag] = undefined;
          var unmasked = true;
        } catch (e) {}

        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }

      /* harmony default export */ __webpack_exports__['a'] = getRawTag;

      /***/
    },
    /* 158 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /** Used for built-in method references. */
      var objectProto = Object.prototype;

      /**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
      var nativeObjectToString = objectProto.toString;

      /**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }

      /* harmony default export */ __webpack_exports__['a'] = objectToString;

      /***/
    },
    /* 159 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }

      /* harmony default export */ __webpack_exports__['a'] = overArg;

      /***/
    },
    /* 160 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(
        155
      );

      /** Detect free variable `self`. */
      var freeSelf =
        typeof self == 'object' && self && self.Object === Object && self;

      /** Used as a reference to the global object. */
      var root =
        __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__['a' /* default */] ||
        freeSelf ||
        Function('return this')();

      /* harmony default export */ __webpack_exports__['a'] = root;

      /***/
    },
    /* 161 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
      function isObjectLike(value) {
        return value != null && typeof value == 'object';
      }

      /* harmony default export */ __webpack_exports__['a'] = isObjectLike;

      /***/
    } /* 194 */ /* 163 */ /* 164 */ /* 165 */ /* 166 */ /* 167 */ /* 168 */ /* 169 */ /* 170 */ /* 171 */ /* 172 */ /* 173 */ /* 174 */ /* 175 */ /* 176 */ /* 177 */ /* 178 */ /* 179 */ /* 180 */ /* 181 */ /* 182 */ /* 183 */ /* 184 */ /* 185 */ /* 186 */ /* 187 */ /* 188 */ /* 189 */ /* 190 */ /* 191 */ /* 192 */ /* 193 */,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    /* 162 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__[
        'a'
      ] = applyMiddleware;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(
        96
      );
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      /**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
      function applyMiddleware() {
        for (
          var _len = arguments.length, middlewares = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          middlewares[_key] = arguments[_key];
        }

        return function(createStore) {
          return function(reducer, preloadedState, enhancer) {
            var store = createStore(reducer, preloadedState, enhancer);
            var _dispatch = store.dispatch;
            var chain = [];

            var middlewareAPI = {
              getState: store.getState,
              dispatch: function dispatch(action) {
                return _dispatch(action);
              },
            };
            chain = middlewares.map(function(middleware) {
              return middleware(middlewareAPI);
            });
            _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__[
              'a' /* default */
            ].apply(undefined, chain)(store.dispatch);

            return _extends({}, store, {
              dispatch: _dispatch,
            });
          };
        };
      }

      /***/
    },
    /* 195 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__[
        'a'
      ] = bindActionCreators;
      function bindActionCreator(actionCreator, dispatch) {
        return function() {
          return dispatch(actionCreator.apply(undefined, arguments));
        };
      }

      /**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
      function bindActionCreators(actionCreators, dispatch) {
        if (typeof actionCreators === 'function') {
          return bindActionCreator(actionCreators, dispatch);
        }

        if (typeof actionCreators !== 'object' || actionCreators === null) {
          throw new Error(
            'bindActionCreators expected an object or a function, instead received ' +
              (actionCreators === null ? 'null' : typeof actionCreators) +
              '. ' +
              'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
          );
        }

        var keys = Object.keys(actionCreators);
        var boundActionCreators = {};
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var actionCreator = actionCreators[key];
          if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(
              actionCreator,
              dispatch
            );
          }
        }
        return boundActionCreators;
      }

      /***/
    },
    /* 196 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__[
        'a'
      ] = combineReducers;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(
        97
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(
        68
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(
        98
      );

      function getUndefinedStateErrorMessage(key, action) {
        var actionType = action && action.type;
        var actionName =
          (actionType && '"' + actionType.toString() + '"') || 'an action';

        return (
          'Given action ' +
          actionName +
          ', reducer "' +
          key +
          '" returned undefined. ' +
          'To ignore an action, you must explicitly return the previous state.'
        );
      }

      function getUnexpectedStateShapeWarningMessage(
        inputState,
        reducers,
        action,
        unexpectedKeyCache
      ) {
        var reducerKeys = Object.keys(reducers);
        var argumentName = action &&
          action.type ===
            __WEBPACK_IMPORTED_MODULE_0__createStore__['a' /* ActionTypes */]
              .INIT
          ? 'preloadedState argument passed to createStore'
          : 'previous state received by the reducer';

        if (reducerKeys.length === 0) {
          return (
            'Store does not have a valid reducer. Make sure the argument passed ' +
            'to combineReducers is an object whose values are reducers.'
          );
        }

        if (
          !__webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__[
              'a' /* default */
            ]
          )(inputState)
        ) {
          return (
            'The ' +
            argumentName +
            ' has unexpected type of "' +
            {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
            '". Expected argument to be an object with the following ' +
            ('keys: "' + reducerKeys.join('", "') + '"')
          );
        }

        var unexpectedKeys = Object.keys(inputState).filter(function(key) {
          return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
        });

        unexpectedKeys.forEach(function(key) {
          unexpectedKeyCache[key] = true;
        });

        if (unexpectedKeys.length > 0) {
          return (
            'Unexpected ' +
            (unexpectedKeys.length > 1 ? 'keys' : 'key') +
            ' ' +
            ('"' +
              unexpectedKeys.join('", "') +
              '" found in ' +
              argumentName +
              '. ') +
            'Expected to find one of the known reducer keys instead: ' +
            ('"' +
              reducerKeys.join('", "') +
              '". Unexpected keys will be ignored.')
          );
        }
      }

      function assertReducerSanity(reducers) {
        Object.keys(reducers).forEach(function(key) {
          var reducer = reducers[key];
          var initialState = reducer(undefined, {
            type: __WEBPACK_IMPORTED_MODULE_0__createStore__[
              'a' /* ActionTypes */
            ].INIT,
          });

          if (typeof initialState === 'undefined') {
            throw new Error(
              'Reducer "' +
                key +
                '" returned undefined during initialization. ' +
                'If the state passed to the reducer is undefined, you must ' +
                'explicitly return the initial state. The initial state may ' +
                'not be undefined.'
            );
          }

          var type =
            '@@redux/PROBE_UNKNOWN_ACTION_' +
            Math.random().toString(36).substring(7).split('').join('.');
          if (typeof reducer(undefined, { type: type }) === 'undefined') {
            throw new Error(
              'Reducer "' +
                key +
                '" returned undefined when probed with a random type. ' +
                ("Don't try to handle " +
                  __WEBPACK_IMPORTED_MODULE_0__createStore__[
                    'a' /* ActionTypes */
                  ].INIT +
                  ' or other actions in "redux/*" ') +
                'namespace. They are considered private. Instead, you must return the ' +
                'current state for any unknown actions, unless it is undefined, ' +
                'in which case you must return the initial state, regardless of the ' +
                'action type. The initial state may not be undefined.'
            );
          }
        });
      }

      /**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
      function combineReducers(reducers) {
        var reducerKeys = Object.keys(reducers);
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
          var key = reducerKeys[i];

          if (true) {
            if (typeof reducers[key] === 'undefined') {
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_2__utils_warning__['a' /* default */]
              )('No reducer provided for key "' + key + '"');
            }
          }

          if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
          }
        }
        var finalReducerKeys = Object.keys(finalReducers);

        if (true) {
          var unexpectedKeyCache = {};
        }

        var sanityError;
        try {
          assertReducerSanity(finalReducers);
        } catch (e) {
          sanityError = e;
        }

        return function combination() {
          var state = arguments.length <= 0 || arguments[0] === undefined
            ? {}
            : arguments[0];
          var action = arguments[1];

          if (sanityError) {
            throw sanityError;
          }

          if (true) {
            var warningMessage = getUnexpectedStateShapeWarningMessage(
              state,
              finalReducers,
              action,
              unexpectedKeyCache
            );
            if (warningMessage) {
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_2__utils_warning__['a' /* default */]
              )(warningMessage);
            }
          }

          var hasChanged = false;
          var nextState = {};
          for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            if (typeof nextStateForKey === 'undefined') {
              var errorMessage = getUndefinedStateErrorMessage(key, action);
              throw new Error(errorMessage);
            }
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
          }
          return hasChanged ? nextState : state;
        };
      }

      /***/
    },
    /* 197 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(198);

      /***/
    },
    /* 198 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      /* WEBPACK VAR INJECTION */ (function(global, module) {
        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var _ponyfill = __webpack_require__(199);

        var _ponyfill2 = _interopRequireDefault(_ponyfill);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var root; /* global window */

        if (typeof self !== 'undefined') {
          root = self;
        } else if (typeof window !== 'undefined') {
          root = window;
        } else if (typeof global !== 'undefined') {
          root = global;
        } else if (true) {
          root = module;
        } else {
          root = Function('return this')();
        }

        var result = (0, _ponyfill2['default'])(root);
        exports['default'] = result;
        /* WEBPACK VAR INJECTION */
      }.call(
        exports,
        __webpack_require__(27),
        __webpack_require__(200)(module)
      ));

      /***/
    },
    /* 199 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports['default'] = symbolObservablePonyfill;
      function symbolObservablePonyfill(root) {
        var result;
        var _Symbol = root.Symbol;

        if (typeof _Symbol === 'function') {
          if (_Symbol.observable) {
            result = _Symbol.observable;
          } else {
            result = _Symbol('observable');
            _Symbol.observable = result;
          }
        } else {
          result = '@@observable';
        }

        return result;
      }

      /***/
    },
    /* 200 */
    /***/ function(module, exports) {
      module.exports = function(module) {
        if (!module.webpackPolyfill) {
          module.deprecate = function() {};
          module.paths = [];
          // module.parent = undefined by default
          if (!module.children) module.children = [];
          Object.defineProperty(module, 'loaded', {
            enumerable: true,
            get: function() {
              return module.l;
            },
          });
          Object.defineProperty(module, 'id', {
            enumerable: true,
            get: function() {
              return module.i;
            },
          });
          module.webpackPolyfill = 1;
        }
        return module;
      };

      /***/
    } /* 202 */,
    ,
    /* 201 */ /***/ function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;

      var _assign = __webpack_require__(210);

      var _assign2 = _interopRequireDefault(_assign);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default =
        _assign2.default ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

      /***/
    } /* 204 */,
    ,
    /* 203 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = unique;
      function unique(debugName, breakpadId) {
        return debugName + ':' + breakpadId;
      }

      /***/
    },
    /* 205 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = toggle;
      /* harmony export (immutable) */ __webpack_exports__['c'] = start;
      /* harmony export (immutable) */ __webpack_exports__['d'] = stop;
      /* harmony export (immutable) */ __webpack_exports__['b'] = capture;
      /* harmony export (immutable) */ __webpack_exports__['e'] = restart;
      /* harmony export (immutable) */ __webpack_exports__['f'] = getSymbols;
      /* harmony export (immutable) */ __webpack_exports__['g'] = running;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(
        376
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(
        375
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(
        44
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(
        43
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__
      );

      function toggle() {
        var _this = this;

        return (function() {
          var _ref = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
              function _callee(dispatch, getState) {
                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          if (!getState().profiler.isRunning) {
                            _context.next = 4;
                            break;
                          }

                          return _context.abrupt('return', dispatch(stop()));

                        case 4:
                          return _context.abrupt('return', dispatch(start()));

                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  },
                  _callee,
                  _this
                );
              }
            )
          );

          return function(_x, _x2) {
            return _ref.apply(this, arguments);
          };
        })();
      }

      function start() {
        var _this2 = this;

        return (function() {
          var _ref2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
              function _callee2(dispatch, getState) {
                var _getState,
                  _getState$settings,
                  buffersize,
                  interval,
                  features,
                  threads,
                  options;

                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                  function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          (_getState = getState()), (_getState$settings =
                            _getState.settings), (buffersize =
                            _getState$settings.buffersize), (interval =
                            _getState$settings.interval), (features =
                            _getState$settings.features), (threads =
                            _getState$settings.threads);
                          options = {
                            buffersize: buffersize,
                            interval: interval,
                            features: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(
                              features
                            ).filter(function(f) {
                              return features[f];
                            }),
                            threads: threads,
                          };

                          dispatch({ type: 'PROFILER_START', status: 'start' });
                          _context2.next = 5;
                          return browser.geckoProfiler
                            .start(options)
                            .catch(function() {});

                        case 5:
                          dispatch({ type: 'PROFILER_START', status: 'done' });

                        case 6:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  },
                  _callee2,
                  _this2
                );
              }
            )
          );

          return function(_x3, _x4) {
            return _ref2.apply(this, arguments);
          };
        })();
      }

      function stop() {
        var _this3 = this;

        return (function() {
          var _ref3 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
              function _callee3(dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                  function _callee3$(_context3) {
                    while (1) {
                      switch ((_context3.prev = _context3.next)) {
                        case 0:
                          dispatch({ type: 'PROFILER_STOP', status: 'start' });
                          _context3.next = 3;
                          return browser.geckoProfiler.stop();

                        case 3:
                          dispatch({ type: 'PROFILER_STOP', status: 'done' });

                        case 4:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  },
                  _callee3,
                  _this3
                );
              }
            )
          );

          return function(_x5) {
            return _ref3.apply(this, arguments);
          };
        })();
      }

      function getProfilePreferablyAsArrayBuffer() {
        // This is a compatibility wrapper for Firefox builds from before 1362800
        // landed. We can remove it once Nightly switches to 56.
        if ('getProfileAsArrayBuffer' in browser.geckoProfiler) {
          return browser.geckoProfiler
            .getProfileAsArrayBuffer()
            .catch(function(e) {
              return console.error(e), {};
            });
        }
        return browser.geckoProfiler.getProfile().catch(function(e) {
          return console.error(e), {};
        });
      }

      function capture() {
        var _this4 = this;

        return (function() {
          var _ref4 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
              function _callee5(dispatch, getState) {
                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                  function _callee5$(_context5) {
                    while (1) {
                      switch ((_context5.prev = _context5.next)) {
                        case 0:
                          // Pause profiler before we collect the profile, so that we don't capture
                          // more samples while the parent process waits for subprocess profiles.
                          dispatch({ type: 'PROFILER_PAUSE', status: 'start' });
                          _context5.next = 3;
                          return browser.geckoProfiler
                            .pause()
                            .catch(function() {});

                        case 3:
                          dispatch({ type: 'PROFILER_PAUSE', status: 'done' });

                          browser.tabs
                            .create({
                              active: true,
                              url: getState().settings.reportUrl,
                            })
                            .then(
                              __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
                                __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
                                  function _callee4() {
                                    var profile;
                                    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                                      function _callee4$(_context4) {
                                        while (1) {
                                          switch ((_context4.prev =
                                            _context4.next)) {
                                            case 0:
                                              dispatch({
                                                type: 'PROFILER_CAPTURE',
                                                status: 'start',
                                              });
                                              _context4.next = 3;
                                              return getProfilePreferablyAsArrayBuffer();

                                            case 3:
                                              profile = _context4.sent;

                                              dispatch({
                                                type: 'PROFILER_CAPTURE',
                                                status: 'done',
                                                data: profile,
                                              });

                                            case 5:
                                            case 'end':
                                              return _context4.stop();
                                          }
                                        }
                                      },
                                      _callee4,
                                      _this4
                                    );
                                  }
                                )
                              ),
                              function(error) {
                                return console.error(error);
                              }
                            );

                          _context5.prev = 5;

                          dispatch({
                            type: 'PROFILER_RESUME',
                            status: 'start',
                          });
                          _context5.next = 9;
                          return browser.geckoProfiler.resume();

                        case 9:
                          dispatch({ type: 'PROFILER_RESUME', status: 'done' });
                          _context5.next = 15;
                          break;

                        case 12:
                          _context5.prev = 12;
                          _context5.t0 = _context5['catch'](5);

                          console.error(_context5.t0);

                        case 15:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  },
                  _callee5,
                  _this4,
                  [[5, 12]]
                );
              }
            )
          );

          return function(_x6, _x7) {
            return _ref4.apply(this, arguments);
          };
        })();
      }

      function restart() {
        var _this5 = this;

        return (function() {
          var _ref6 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
              function _callee6(dispatch, getState) {
                var wasRunning;
                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                  function _callee6$(_context6) {
                    while (1) {
                      switch ((_context6.prev = _context6.next)) {
                        case 0:
                          wasRunning = getState().profiler.isRunning;

                          // only stop the profiler if it is running

                          if (!getState().profiler.isRunning) {
                            _context6.next = 4;
                            break;
                          }

                          _context6.next = 4;
                          return dispatch(stop());

                        case 4:
                          if (!wasRunning) {
                            _context6.next = 7;
                            break;
                          }

                          _context6.next = 7;
                          return dispatch(start());

                        case 7:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  },
                  _callee6,
                  _this5
                );
              }
            )
          );

          return function(_x8, _x9) {
            return _ref6.apply(this, arguments);
          };
        })();
      }

      function getSymbols(_ref7) {
        var _this6 = this;

        var debugName = _ref7.debugName, breakpadId = _ref7.breakpadId;

        return (function() {
          var _ref8 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(
              function _callee7(dispatch) {
                var _ref9, _ref10, addresses, index, buffer;

                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(
                  function _callee7$(_context7) {
                    while (1) {
                      switch ((_context7.prev = _context7.next)) {
                        case 0:
                          dispatch({
                            type: 'GET_SYMBOLS',
                            status: 'start',
                            data: {
                              debugName: debugName,
                              breakpadId: breakpadId,
                            },
                          });
                          _context7.next = 3;
                          return browser.geckoProfiler.getSymbols(
                            debugName,
                            breakpadId
                          );

                        case 3:
                          _ref9 = _context7.sent;
                          _ref10 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(
                            _ref9,
                            3
                          );
                          addresses = _ref10[0];
                          index = _ref10[1];
                          buffer = _ref10[2];

                          dispatch({
                            type: 'GET_SYMBOLS',
                            status: 'done',
                            data: {
                              debugName: debugName,
                              breakpadId: breakpadId,
                              addresses: addresses,
                              index: index,
                              buffer: buffer,
                            },
                          });

                        case 9:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  },
                  _callee7,
                  _this6
                );
              }
            )
          );

          return function(_x10) {
            return _ref8.apply(this, arguments);
          };
        })();
      }

      function running(isRunning) {
        return {
          type: 'IS_RUNNING',
          data: isRunning,
        };
      }

      /***/
    },
    /* 206 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = update;
      /* harmony export (immutable) */ __webpack_exports__['b'] = toggle;
      function update() {
        var data = arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : {};

        return {
          type: 'UPDATE_SETTINGS',
          data: data,
        };
      }

      function toggle() {
        return {
          type: 'TOGGLE_SETTINGS',
        };
      }

      /***/
    },
    /* 207 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(
        100
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(
        377
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(
        145
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_webext__ = __webpack_require__(
        69
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_webext___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_redux_webext__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_subscriber__ = __webpack_require__(
        346
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_subscriber___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_4_redux_subscriber__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middlewares__ = __webpack_require__(
        356
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers__ = __webpack_require__(
        358
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_profiler__ = __webpack_require__(
        205
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_settings__ = __webpack_require__(
        206
      );

      var _actions;

      var store = __webpack_require__.i(
        __WEBPACK_IMPORTED_MODULE_2_redux__['b' /* createStore */]
      )(
        __WEBPACK_IMPORTED_MODULE_6__reducers__['a' /* default */],
        __WEBPACK_IMPORTED_MODULE_2_redux__['c' /* applyMiddleware */].apply(
          undefined,
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(
            __WEBPACK_IMPORTED_MODULE_5__middlewares__['a' /* default */]
          )
        )
      );

      __WEBPACK_IMPORTED_MODULE_4_redux_subscriber___default()(store);

      /* harmony default export */ __webpack_exports__[
        'a'
      ] = __webpack_require__.i(
        __WEBPACK_IMPORTED_MODULE_3_redux_webext__['createBackgroundStore']
      )({
        store: store,
        actions: ((_actions = {}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'TOGGLE_PROFILER',
          __WEBPACK_IMPORTED_MODULE_7__actions_profiler__['a' /* toggle */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'START_PROFILER',
          __WEBPACK_IMPORTED_MODULE_7__actions_profiler__['c' /* start */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'STOP_PROFILER',
          __WEBPACK_IMPORTED_MODULE_7__actions_profiler__['d' /* stop */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'CAPTURE_PROFILE',
          __WEBPACK_IMPORTED_MODULE_7__actions_profiler__['b' /* capture */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'RESTART_PROFILER',
          __WEBPACK_IMPORTED_MODULE_7__actions_profiler__['e' /* restart */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'UPDATE_SETTINGS',
          __WEBPACK_IMPORTED_MODULE_8__actions_settings__['a' /* update */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'TOGGLE_SETTINGS',
          __WEBPACK_IMPORTED_MODULE_8__actions_settings__['b' /* toggle */]
        ), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
          _actions,
          'GET_SYMBOLS',
          __WEBPACK_IMPORTED_MODULE_7__actions_profiler__['f' /* getSymbols */]
        ), _actions),
        onDisconnect: function onDisconnect() {},
      });

      /***/
    } /* 210 */ /* 209 */,
    ,
    ,
    /* 208 */ /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(215), __esModule: true };

      /***/
    } /* 215 */ /* 212 */ /* 213 */ /* 214 */,
    ,
    ,
    ,
    ,
    /* 211 */ /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(228);
      module.exports = __webpack_require__(5).Object.assign;

      /***/
    } /* 225 */ /* 217 */ /* 218 */ /* 219 */ /* 220 */ /* 221 */ /* 222 */ /* 223 */ /* 224 */,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    /* 216 */ /***/ function(module, exports, __webpack_require__) {
      'use strict';
      // 19.1.2.1 Object.assign(target, source, ...)
      var getKeys = __webpack_require__(30),
        gOPS = __webpack_require__(94),
        pIE = __webpack_require__(67),
        toObject = __webpack_require__(47),
        IObject = __webpack_require__(71),
        $assign = Object.assign;

      // should work with symbols and should have deterministic property order (V8 bug)
      module.exports = !$assign ||
        __webpack_require__(25)(function() {
          var A = {}, B = {}, S = Symbol(), K = 'abcdefghijklmnopqrst';
          A[S] = 7;
          K.split('').forEach(function(k) {
            B[k] = k;
          });
          return (
            $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K
          );
        })
        ? function assign(target, source) {
            // eslint-disable-line no-unused-vars
            var T = toObject(target),
              aLen = arguments.length,
              index = 1,
              getSymbols = gOPS.f,
              isEnum = pIE.f;
            while (aLen > index) {
              var S = IObject(arguments[index++]),
                keys = getSymbols
                  ? getKeys(S).concat(getSymbols(S))
                  : getKeys(S),
                length = keys.length,
                j = 0,
                key;
              while (length > j)
                if (isEnum.call(S, (key = keys[j++]))) T[key] = S[key];
            }
            return T;
          }
        : $assign;

      /***/
    } /* 228 */ /* 227 */,
    ,
    ,
    /* 226 */ /***/ function(module, exports, __webpack_require__) {
      // 19.1.3.1 Object.assign(target, source)
      var $export = __webpack_require__(13);

      $export($export.S + $export.F, 'Object', {
        assign: __webpack_require__(225),
      });

      /***/
    } /* 344 */ /* 230 */ /* 231 */ /* 232 */ /* 233 */ /* 234 */ /* 235 */ /* 236 */ /* 237 */ /* 238 */ /* 239 */ /* 240 */ /* 241 */ /* 242 */ /* 243 */ /* 244 */ /* 245 */ /* 246 */ /* 247 */ /* 248 */ /* 249 */ /* 250 */ /* 251 */ /* 252 */ /* 253 */ /* 254 */ /* 255 */ /* 256 */ /* 257 */ /* 258 */ /* 259 */ /* 260 */ /* 261 */ /* 262 */ /* 263 */ /* 264 */ /* 265 */ /* 266 */ /* 267 */ /* 268 */ /* 269 */ /* 270 */ /* 271 */ /* 272 */ /* 273 */ /* 274 */ /* 275 */ /* 276 */ /* 277 */ /* 278 */ /* 279 */ /* 280 */ /* 281 */ /* 282 */ /* 283 */ /* 284 */ /* 285 */ /* 286 */ /* 287 */ /* 288 */ /* 289 */ /* 290 */ /* 291 */ /* 292 */ /* 293 */ /* 294 */ /* 295 */ /* 296 */ /* 297 */ /* 298 */ /* 299 */ /* 300 */ /* 301 */ /* 302 */ /* 303 */ /* 304 */ /* 305 */ /* 306 */ /* 307 */ /* 308 */ /* 309 */ /* 310 */ /* 311 */ /* 312 */ /* 313 */ /* 314 */ /* 315 */ /* 316 */ /* 317 */ /* 318 */ /* 319 */ /* 320 */ /* 321 */ /* 322 */ /* 323 */ /* 324 */ /* 325 */ /* 326 */ /* 327 */ /* 328 */ /* 329 */ /* 330 */ /* 331 */ /* 332 */ /* 333 */ /* 334 */ /* 335 */ /* 336 */ /* 337 */ /* 338 */ /* 339 */ /* 340 */ /* 341 */ /* 342 */ /* 343 */,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    /* 229 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(
        100
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__(
        350
      );

      /* harmony default export */ __webpack_exports__['a'] = function(_ref) {
        var getState = _ref.getState;
        return function(next) {
          return function(action) {
            var result = next(action);
            if (
              action.type === 'UPDATE_SETTINGS' ||
              action.type === 'TOGGLE_SETTINGS'
            ) {
              browser.storage.local.set(
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
                  {},
                  __WEBPACK_IMPORTED_MODULE_1__storage__[
                    'b' /* SETTINGS_KEY */
                  ],
                  getState().settings
                )
              );
            }
            return result;
          };
        };
      };

      /***/
    },
    /* 345 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      var repeat = (exports.repeat = function repeat(str, times) {
        return new Array(times + 1).join(str);
      });

      var pad = (exports.pad = function pad(num, maxLength) {
        return repeat('0', maxLength - num.toString().length) + num;
      });

      var formatTime = (exports.formatTime = function formatTime(time) {
        return (
          pad(time.getHours(), 2) +
          ':' +
          pad(time.getMinutes(), 2) +
          ':' +
          pad(time.getSeconds(), 2) +
          '.' +
          pad(time.getMilliseconds(), 3)
        );
      });

      // Use performance API if it's available in order to get better precision
      var timer = (exports.timer = typeof performance !== 'undefined' &&
        performance !== null &&
        typeof performance.now === 'function'
        ? performance
        : Date);

      /***/
    },
    /* 346 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.subscribe = subscribe;

      exports.default = function(store) {
        var prevState = store.getState();

        store.subscribe(function() {
          var newState = store.getState();

          Object.keys(subscribers).forEach(function(key) {
            if (
              (0, _objectPath.get)(prevState, key) !==
              (0, _objectPath.get)(newState, key)
            ) {
              subscribers[key].forEach(function(cb) {
                return cb(newState);
              });
            }
          });

          prevState = newState;
        });

        return subscribe;
      };

      var _objectPath = __webpack_require__(390);

      var subscribers = {};

      function subscribe(key, cb) {
        if (subscribers.hasOwnProperty(key)) {
          subscribers[key].push(cb);
        } else {
          subscribers[key] = [cb];
        }

        // return "unsubscribe" function
        return function() {
          subscribers[key] = subscribers[key].filter(function(s) {
            return s !== cb;
          });
        };
      }

      /***/
    },
    /* 347 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = init;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_subscriber__ = __webpack_require__(
        346
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_subscriber___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_redux_subscriber__
      );

      var popup = browser.browserAction;

      function setState(_ref) {
        var profiler = _ref.profiler;
        var isRunning = profiler.isRunning;

        popup.setIcon({
          path: 'icons/toolbar_' + (isRunning ? 'on' : 'off') + '.png',
        });
      }

      function init() {
        __webpack_require__.i(
          __WEBPACK_IMPORTED_MODULE_0_redux_subscriber__['subscribe']
        )('profiler.isRunning', setState);
      }

      /***/
    },
    /* 348 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = init;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux_store__ = __webpack_require__(
        207
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_actions_profiler__ = __webpack_require__(
        205
      );

      function init() {
        browser.commands.onCommand.addListener(function(command) {
          if (command === 'ToggleProfiler') {
            return __WEBPACK_IMPORTED_MODULE_0__redux_store__[
              'a' /* default */
            ].dispatch(
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_1__redux_actions_profiler__[
                  'a' /* toggle */
                ]
              )()
            );
          } else if (command === 'CaptureProfile') {
            return __WEBPACK_IMPORTED_MODULE_0__redux_store__[
              'a' /* default */
            ].dispatch(
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_1__redux_actions_profiler__[
                  'b' /* capture */
                ]
              )()
            );
          }
        });
      }

      /***/
    },
    /* 349 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__['a'] = init;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux_store__ = __webpack_require__(
        207
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_actions__ = __webpack_require__(
        355
      );

      function init() {
        browser.geckoProfiler.onRunning.addListener(function(isRunning) {
          return __WEBPACK_IMPORTED_MODULE_0__redux_store__[
            'a' /* default */
          ].dispatch(
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_1__redux_actions__['a' /* running */]
            )(isRunning)
          );
        });
      }

      /***/
    },
    /* 350 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'b',
        function() {
          return SETTINGS_KEY;
        }
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(
        44
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(
        43
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__redux_store__ = __webpack_require__(
        207
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__redux_actions_settings__ = __webpack_require__(
        206
      );

      var SETTINGS_KEY = 'profilerState';

      /* harmony default export */ __webpack_exports__['a'] = (function() {
        var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(
          __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(
            function _callee() {
              var state;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return browser.storage.local.get(SETTINGS_KEY);

                      case 2:
                        state = _context.sent;

                        __WEBPACK_IMPORTED_MODULE_2__redux_store__[
                          'a' /* default */
                        ].dispatch(
                          __webpack_require__.i(
                            __WEBPACK_IMPORTED_MODULE_3__redux_actions_settings__[
                              'a' /* update */
                            ]
                          )(state[SETTINGS_KEY])
                        );

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this
              );
            }
          )
        );

        function init() {
          return _ref.apply(this, arguments);
        }

        return init;
      })();

      /***/
    } /* 354 */ /* 352 */ /* 353 */,
    ,
    ,
    ,
    /* 351 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      Object.defineProperty(__webpack_exports__, '__esModule', { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(
        44
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(
        43
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browserAction__ = __webpack_require__(
        347
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commands__ = __webpack_require__(
        348
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profiler__ = __webpack_require__(
        349
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__(
        350
      );

      var init = (function() {
        var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(
          __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(
            function _callee() {
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        __webpack_require__.i(
                          __WEBPACK_IMPORTED_MODULE_5__storage__[
                            'a' /* default */
                          ]
                        )();
                        __webpack_require__.i(
                          __WEBPACK_IMPORTED_MODULE_4__profiler__[
                            'a' /* default */
                          ]
                        )();
                        __webpack_require__.i(
                          __WEBPACK_IMPORTED_MODULE_3__commands__[
                            'a' /* default */
                          ]
                        )();
                        __webpack_require__.i(
                          __WEBPACK_IMPORTED_MODULE_2__browserAction__[
                            'a' /* default */
                          ]
                        )();

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this
              );
            }
          )
        );

        return function init() {
          return _ref.apply(this, arguments);
        };
      })();

      init();

      /***/
    },
    /* 355 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profiler__ = __webpack_require__(
        205
      );
      /* harmony namespace reexport (by used) */ __webpack_require__.d(
        __webpack_exports__,
        'a',
        function() {
          return __WEBPACK_IMPORTED_MODULE_0__profiler__['g'];
        }
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings__ = __webpack_require__(
        206
      );
      /* unused harmony namespace reexport */

      /***/
    },
    /* 356 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_thunk__ = __webpack_require__(
        395
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_thunk___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_redux_thunk__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser_storage__ = __webpack_require__(
        344
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__(
        357
      );

      var middlewares = [
        __WEBPACK_IMPORTED_MODULE_0_redux_thunk___default.a,
        __WEBPACK_IMPORTED_MODULE_2__logger__['a' /* default */],
        __WEBPACK_IMPORTED_MODULE_1__browser_storage__['a' /* default */],
      ];

      /* harmony default export */ __webpack_exports__['a'] = middlewares;

      /***/
    },
    /* 357 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_logger__ = __webpack_require__(
        394
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_logger___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_redux_logger__
      );

      var middleware = void 0;

      if (true) {
        middleware = __webpack_require__.i(
          __WEBPACK_IMPORTED_MODULE_0_redux_logger__['createLogger']
        )({ collapsed: true });
      } else {
        // this is an empty middleware that just passes things on
        middleware = function middleware() {
          return function(next) {
            return function(action) {
              return next(action);
            };
          };
        };
      }

      /* harmony default export */ __webpack_exports__['a'] = middleware;

      /***/
    },
    /* 358 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(
        145
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profiler__ = __webpack_require__(
        359
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(
        360
      );

      var reducers = __webpack_require__.i(
        __WEBPACK_IMPORTED_MODULE_0_redux__['d' /* combineReducers */]
      )({
        profiler: __WEBPACK_IMPORTED_MODULE_1__profiler__['a' /* default */],
        settings: __WEBPACK_IMPORTED_MODULE_2__settings__['a' /* default */],
      });

      /* harmony default export */ __webpack_exports__['a'] = function(
        state,
        action
      ) {
        return reducers(state, action);
      };

      /***/
    },
    /* 359 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(
        100
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(
        202
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_symbol__ = __webpack_require__(
        204
      );

      var initialState = {
        symbols: {},
        profile: null,
        isRunning: false,
      };

      /* harmony default export */ __webpack_exports__['a'] = function() {
        var state = arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : initialState;
        var action = arguments[1];

        switch (action.type) {
          case 'IS_RUNNING':
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()(
              {},
              state,
              { isRunning: action.data }
            );
          case 'PROFILER_CAPTURE':
            if (action.status === 'done') {
              return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()(
                {},
                state,
                { profile: action.data }
              );
            }
            return state;
          case 'GET_SYMBOLS':
            if (action.status === 'done') {
              var _action$data = action.data,
                debugName = _action$data.debugName,
                breakpadId = _action$data.breakpadId,
                addresses = _action$data.addresses,
                index = _action$data.index,
                buffer = _action$data.buffer;

              return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()(
                {},
                state,
                {
                  symbols: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()(
                    {},
                    state.symbols,
                    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
                      {},
                      __webpack_require__.i(
                        __WEBPACK_IMPORTED_MODULE_2__utils_symbol__[
                          'a' /* unique */
                        ]
                      )(debugName, breakpadId),
                      [addresses, index, buffer]
                    )
                  ),
                }
              );
            }
            return state;
          default:
            return state;
        }
      };

      /***/
    },
    /* 360 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(
        202
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__
      );

      var initialState = {
        isOpen: false,
        reportUrl: 'https://perf-html.io/from-addon/',
        buffersize: 1000000,
        interval: 1,
        threads: ['GeckoMain', 'Compositor'],
        features: {
          js: true,
          stackwalk: true,
          tasktracer: false,
          leaf: true,
          threads: true,
        },
      };

      /* harmony default export */ __webpack_exports__['a'] = function() {
        var state = arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : initialState;
        var action = arguments[1];

        var threads = action.data && action.data.threads
          ? action.data.threads
          : state.threads;
        switch (action.type) {
          case 'UPDATE_SETTINGS':
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()(
              {},
              state,
              action.data,
              {
                threads: threads,
                features: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()(
                  {},
                  state.features,
                  action.data.features,
                  {
                    threads: threads.filter(function(t) {
                      return t.length > 0;
                    }).length > 0,
                  }
                ),
              }
            );
          case 'TOGGLE_SETTINGS':
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()(
              {},
              state,
              { isOpen: !state.isOpen }
            );
          default:
            return state;
        }
      };

      /***/
    } /* 371 */ /* 362 */ /* 363 */ /* 364 */ /* 365 */ /* 366 */ /* 367 */ /* 368 */ /* 369 */ /* 370 */,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    /* 361 */ /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(378), __esModule: true };

      /***/
    },
    /* 372 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(379), __esModule: true };

      /***/
    },
    /* 373 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(380), __esModule: true };

      /***/
    } /* 375 */,
    ,
    /* 374 */ /***/ function(module, exports, __webpack_require__) {
      module.exports = { default: __webpack_require__(382), __esModule: true };

      /***/
    },
    /* 376 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;

      var _isIterable2 = __webpack_require__(373);

      var _isIterable3 = _interopRequireDefault(_isIterable2);

      var _getIterator2 = __webpack_require__(372);

      var _getIterator3 = _interopRequireDefault(_getIterator2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = (function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (
              var _i = (0, _getIterator3.default)(arr), _s;
              !(_n = (_s = _i.next()).done);
              _n = true
            ) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i['return']) _i['return']();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if ((0, _isIterable3.default)(Object(arr))) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance'
            );
          }
        };
      })();

      /***/
    },
    /* 377 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;

      var _from = __webpack_require__(371);

      var _from2 = _interopRequireDefault(_from);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        } else {
          return (0, _from2.default)(arr);
        }
      };

      /***/
    },
    /* 378 */
    /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(53);
      __webpack_require__(386);
      module.exports = __webpack_require__(5).Array.from;

      /***/
    },
    /* 379 */
    /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(60);
      __webpack_require__(53);
      module.exports = __webpack_require__(384);

      /***/
    },
    /* 380 */
    /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(60);
      __webpack_require__(53);
      module.exports = __webpack_require__(385);

      /***/
    } /* 382 */,
    ,
    /* 381 */ /***/ function(module, exports, __webpack_require__) {
      __webpack_require__(388);
      module.exports = __webpack_require__(5).Object.keys;

      /***/
    },
    /* 383 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var $defineProperty = __webpack_require__(12),
        createDesc = __webpack_require__(31);

      module.exports = function(object, index, value) {
        if (index in object)
          $defineProperty.f(object, index, createDesc(0, value));
        else object[index] = value;
      };

      /***/
    },
    /* 384 */
    /***/ function(module, exports, __webpack_require__) {
      var anObject = __webpack_require__(9), get = __webpack_require__(75);
      module.exports = __webpack_require__(5).getIterator = function(it) {
        var iterFn = get(it);
        if (typeof iterFn != 'function')
          throw TypeError(it + ' is not iterable!');
        return anObject(iterFn.call(it));
      };

      /***/
    },
    /* 385 */
    /***/ function(module, exports, __webpack_require__) {
      var classof = __webpack_require__(51),
        ITERATOR = __webpack_require__(3)('iterator'),
        Iterators = __webpack_require__(17);
      module.exports = __webpack_require__(5).isIterable = function(it) {
        var O = Object(it);
        return (
          O[ITERATOR] !== undefined ||
          '@@iterator' in O ||
          Iterators.hasOwnProperty(classof(O))
        );
      };

      /***/
    },
    /* 386 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      var ctx = __webpack_require__(21),
        $export = __webpack_require__(13),
        toObject = __webpack_require__(47),
        call = __webpack_require__(92),
        isArrayIter = __webpack_require__(91),
        toLength = __webpack_require__(52),
        createProperty = __webpack_require__(383),
        getIterFn = __webpack_require__(75);

      $export(
        $export.S +
          $export.F *
            !__webpack_require__(93)(function(iter) {
              Array.from(iter);
            }),
        'Array',
        {
          // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
          from: function from(
            arrayLike /*, mapfn = undefined, thisArg = undefined*/
          ) {
            var O = toObject(arrayLike),
              C = typeof this == 'function' ? this : Array,
              aLen = arguments.length,
              mapfn = aLen > 1 ? arguments[1] : undefined,
              mapping = mapfn !== undefined,
              index = 0,
              iterFn = getIterFn(O),
              length,
              result,
              step,
              iterator;
            if (mapping)
              mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
            // if object isn't iterable or it's array with default iterator - use simple case
            if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
              for (
                (iterator = iterFn.call(O)), (result = new C());
                !(step = iterator.next()).done;
                index++
              ) {
                createProperty(
                  result,
                  index,
                  mapping
                    ? call(iterator, mapfn, [step.value, index], true)
                    : step.value
                );
              }
            } else {
              length = toLength(O.length);
              for (result = new C(length); length > index; index++) {
                createProperty(
                  result,
                  index,
                  mapping ? mapfn(O[index], index) : O[index]
                );
              }
            }
            result.length = index;
            return result;
          },
        }
      );

      /***/
    } /* 388 */,
    ,
    /* 387 */ /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.14 Object.keys(O)
      var toObject = __webpack_require__(47), $keys = __webpack_require__(30);

      __webpack_require__(149)('keys', function() {
        return function keys(it) {
          return $keys(toObject(it));
        };
      });

      /***/
    },
    /* 389 */
    /***/ function(module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function(global) {
        var __WEBPACK_AMD_DEFINE_ARRAY__,
          __WEBPACK_AMD_DEFINE_RESULT__; /*!
 * deep-diff.
 * Licensed under the MIT License.
 */
        (function(root, factory) {
          'use strict';
          if (true) {
            // AMD. Register as an anonymous module.
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = []), (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
              return factory();
            }.apply(
              exports,
              __WEBPACK_AMD_DEFINE_ARRAY__
            )), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else if (typeof exports === 'object') {
            // Node. Does not work with strict CommonJS, but
            // only CommonJS-like environments that support module.exports,
            // like Node.
            module.exports = factory();
          } else {
            // Browser globals (root is window)
            root.DeepDiff = factory();
          }
        })(this, function(undefined) {
          'use strict';
          var $scope, conflict, conflictResolution = [];
          if (typeof global === 'object' && global) {
            $scope = global;
          } else if (typeof window !== 'undefined') {
            $scope = window;
          } else {
            $scope = {};
          }
          conflict = $scope.DeepDiff;
          if (conflict) {
            conflictResolution.push(function() {
              if (
                'undefined' !== typeof conflict &&
                $scope.DeepDiff === accumulateDiff
              ) {
                $scope.DeepDiff = conflict;
                conflict = undefined;
              }
            });
          }

          // nodejs compatible on server side and in the browser.
          function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            });
          }

          function Diff(kind, path) {
            Object.defineProperty(this, 'kind', {
              value: kind,
              enumerable: true,
            });
            if (path && path.length) {
              Object.defineProperty(this, 'path', {
                value: path,
                enumerable: true,
              });
            }
          }

          function DiffEdit(path, origin, value) {
            DiffEdit.super_.call(this, 'E', path);
            Object.defineProperty(this, 'lhs', {
              value: origin,
              enumerable: true,
            });
            Object.defineProperty(this, 'rhs', {
              value: value,
              enumerable: true,
            });
          }
          inherits(DiffEdit, Diff);

          function DiffNew(path, value) {
            DiffNew.super_.call(this, 'N', path);
            Object.defineProperty(this, 'rhs', {
              value: value,
              enumerable: true,
            });
          }
          inherits(DiffNew, Diff);

          function DiffDeleted(path, value) {
            DiffDeleted.super_.call(this, 'D', path);
            Object.defineProperty(this, 'lhs', {
              value: value,
              enumerable: true,
            });
          }
          inherits(DiffDeleted, Diff);

          function DiffArray(path, index, item) {
            DiffArray.super_.call(this, 'A', path);
            Object.defineProperty(this, 'index', {
              value: index,
              enumerable: true,
            });
            Object.defineProperty(this, 'item', {
              value: item,
              enumerable: true,
            });
          }
          inherits(DiffArray, Diff);

          function arrayRemove(arr, from, to) {
            var rest = arr.slice((to || from) + 1 || arr.length);
            arr.length = from < 0 ? arr.length + from : from;
            arr.push.apply(arr, rest);
            return arr;
          }

          function realTypeOf(subject) {
            var type = typeof subject;
            if (type !== 'object') {
              return type;
            }

            if (subject === Math) {
              return 'math';
            } else if (subject === null) {
              return 'null';
            } else if (Array.isArray(subject)) {
              return 'array';
            } else if (
              Object.prototype.toString.call(subject) === '[object Date]'
            ) {
              return 'date';
            } else if (
              typeof subject.toString !== 'undefined' &&
              /^\/.*\//.test(subject.toString())
            ) {
              return 'regexp';
            }
            return 'object';
          }

          function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
            path = path || [];
            var currentPath = path.slice(0);
            if (typeof key !== 'undefined') {
              if (prefilter) {
                if (
                  typeof prefilter === 'function' &&
                  prefilter(currentPath, key)
                ) {
                  return;
                } else if (typeof prefilter === 'object') {
                  if (
                    prefilter.prefilter &&
                    prefilter.prefilter(currentPath, key)
                  ) {
                    return;
                  }
                  if (prefilter.normalize) {
                    var alt = prefilter.normalize(currentPath, key, lhs, rhs);
                    if (alt) {
                      lhs = alt[0];
                      rhs = alt[1];
                    }
                  }
                }
              }
              currentPath.push(key);
            }

            // Use string comparison for regexes
            if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
              lhs = lhs.toString();
              rhs = rhs.toString();
            }

            var ltype = typeof lhs;
            var rtype = typeof rhs;
            if (ltype === 'undefined') {
              if (rtype !== 'undefined') {
                changes(new DiffNew(currentPath, rhs));
              }
            } else if (rtype === 'undefined') {
              changes(new DiffDeleted(currentPath, lhs));
            } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
              changes(new DiffEdit(currentPath, lhs, rhs));
            } else if (
              Object.prototype.toString.call(lhs) === '[object Date]' &&
              Object.prototype.toString.call(rhs) === '[object Date]' &&
              lhs - rhs !== 0
            ) {
              changes(new DiffEdit(currentPath, lhs, rhs));
            } else if (ltype === 'object' && lhs !== null && rhs !== null) {
              stack = stack || [];
              if (stack.indexOf(lhs) < 0) {
                stack.push(lhs);
                if (Array.isArray(lhs)) {
                  var i, len = lhs.length;
                  for (i = 0; i < lhs.length; i++) {
                    if (i >= rhs.length) {
                      changes(
                        new DiffArray(
                          currentPath,
                          i,
                          new DiffDeleted(undefined, lhs[i])
                        )
                      );
                    } else {
                      deepDiff(
                        lhs[i],
                        rhs[i],
                        changes,
                        prefilter,
                        currentPath,
                        i,
                        stack
                      );
                    }
                  }
                  while (i < rhs.length) {
                    changes(
                      new DiffArray(
                        currentPath,
                        i,
                        new DiffNew(undefined, rhs[i++])
                      )
                    );
                  }
                } else {
                  var akeys = Object.keys(lhs);
                  var pkeys = Object.keys(rhs);
                  akeys.forEach(function(k, i) {
                    var other = pkeys.indexOf(k);
                    if (other >= 0) {
                      deepDiff(
                        lhs[k],
                        rhs[k],
                        changes,
                        prefilter,
                        currentPath,
                        k,
                        stack
                      );
                      pkeys = arrayRemove(pkeys, other);
                    } else {
                      deepDiff(
                        lhs[k],
                        undefined,
                        changes,
                        prefilter,
                        currentPath,
                        k,
                        stack
                      );
                    }
                  });
                  pkeys.forEach(function(k) {
                    deepDiff(
                      undefined,
                      rhs[k],
                      changes,
                      prefilter,
                      currentPath,
                      k,
                      stack
                    );
                  });
                }
                stack.length = stack.length - 1;
              }
            } else if (lhs !== rhs) {
              if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
                changes(new DiffEdit(currentPath, lhs, rhs));
              }
            }
          }

          function accumulateDiff(lhs, rhs, prefilter, accum) {
            accum = accum || [];
            deepDiff(
              lhs,
              rhs,
              function(diff) {
                if (diff) {
                  accum.push(diff);
                }
              },
              prefilter
            );
            return accum.length ? accum : undefined;
          }

          function applyArrayChange(arr, index, change) {
            if (change.path && change.path.length) {
              var it = arr[index], i, u = change.path.length - 1;
              for (i = 0; i < u; i++) {
                it = it[change.path[i]];
              }
              switch (change.kind) {
                case 'A':
                  applyArrayChange(
                    it[change.path[i]],
                    change.index,
                    change.item
                  );
                  break;
                case 'D':
                  delete it[change.path[i]];
                  break;
                case 'E':
                case 'N':
                  it[change.path[i]] = change.rhs;
                  break;
              }
            } else {
              switch (change.kind) {
                case 'A':
                  applyArrayChange(arr[index], change.index, change.item);
                  break;
                case 'D':
                  arr = arrayRemove(arr, index);
                  break;
                case 'E':
                case 'N':
                  arr[index] = change.rhs;
                  break;
              }
            }
            return arr;
          }

          function applyChange(target, source, change) {
            if (target && source && change && change.kind) {
              var it = target,
                i = -1,
                last = change.path ? change.path.length - 1 : 0;
              while (++i < last) {
                if (typeof it[change.path[i]] === 'undefined') {
                  it[change.path[i]] = typeof change.path[i] === 'number'
                    ? []
                    : {};
                }
                it = it[change.path[i]];
              }
              switch (change.kind) {
                case 'A':
                  applyArrayChange(
                    change.path ? it[change.path[i]] : it,
                    change.index,
                    change.item
                  );
                  break;
                case 'D':
                  delete it[change.path[i]];
                  break;
                case 'E':
                case 'N':
                  it[change.path[i]] = change.rhs;
                  break;
              }
            }
          }

          function revertArrayChange(arr, index, change) {
            if (change.path && change.path.length) {
              // the structure of the object at the index has changed...
              var it = arr[index], i, u = change.path.length - 1;
              for (i = 0; i < u; i++) {
                it = it[change.path[i]];
              }
              switch (change.kind) {
                case 'A':
                  revertArrayChange(
                    it[change.path[i]],
                    change.index,
                    change.item
                  );
                  break;
                case 'D':
                  it[change.path[i]] = change.lhs;
                  break;
                case 'E':
                  it[change.path[i]] = change.lhs;
                  break;
                case 'N':
                  delete it[change.path[i]];
                  break;
              }
            } else {
              // the array item is different...
              switch (change.kind) {
                case 'A':
                  revertArrayChange(arr[index], change.index, change.item);
                  break;
                case 'D':
                  arr[index] = change.lhs;
                  break;
                case 'E':
                  arr[index] = change.lhs;
                  break;
                case 'N':
                  arr = arrayRemove(arr, index);
                  break;
              }
            }
            return arr;
          }

          function revertChange(target, source, change) {
            if (target && source && change && change.kind) {
              var it = target, i, u;
              u = change.path.length - 1;
              for (i = 0; i < u; i++) {
                if (typeof it[change.path[i]] === 'undefined') {
                  it[change.path[i]] = {};
                }
                it = it[change.path[i]];
              }
              switch (change.kind) {
                case 'A':
                  // Array was modified...
                  // it will be an array...
                  revertArrayChange(
                    it[change.path[i]],
                    change.index,
                    change.item
                  );
                  break;
                case 'D':
                  // Item was deleted...
                  it[change.path[i]] = change.lhs;
                  break;
                case 'E':
                  // Item was edited...
                  it[change.path[i]] = change.lhs;
                  break;
                case 'N':
                  // Item is new...
                  delete it[change.path[i]];
                  break;
              }
            }
          }

          function applyDiff(target, source, filter) {
            if (target && source) {
              var onChange = function(change) {
                if (!filter || filter(target, source, change)) {
                  applyChange(target, source, change);
                }
              };
              deepDiff(target, source, onChange);
            }
          }

          Object.defineProperties(accumulateDiff, {
            diff: {
              value: accumulateDiff,
              enumerable: true,
            },
            observableDiff: {
              value: deepDiff,
              enumerable: true,
            },
            applyDiff: {
              value: applyDiff,
              enumerable: true,
            },
            applyChange: {
              value: applyChange,
              enumerable: true,
            },
            revertChange: {
              value: revertChange,
              enumerable: true,
            },
            isConflict: {
              value: function() {
                return 'undefined' !== typeof conflict;
              },
              enumerable: true,
            },
            noConflict: {
              value: function() {
                if (conflictResolution) {
                  conflictResolution.forEach(function(it) {
                    it();
                  });
                  conflictResolution = null;
                }
                return accumulateDiff;
              },
              enumerable: true,
            },
          });

          return accumulateDiff;
        });

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(27)));

      /***/
    },
    /* 390 */
    /***/ function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__,
        __WEBPACK_AMD_DEFINE_ARRAY__,
        __WEBPACK_AMD_DEFINE_RESULT__;
      (function(root, factory) {
        'use strict';
        /*istanbul ignore next:cant test*/
        if (typeof module === 'object' && typeof module.exports === 'object') {
          module.exports = factory();
        } else if (true) {
          // AMD. Register as an anonymous module.
          !((__WEBPACK_AMD_DEFINE_ARRAY__ = []), (__WEBPACK_AMD_DEFINE_FACTORY__ = factory), (__WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ ===
            'function'
            ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                exports,
                __WEBPACK_AMD_DEFINE_ARRAY__
              )
            : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !==
            undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {
          // Browser globals
          root.objectPath = factory();
        }
      })(this, function() {
        'use strict';
        var toStr = Object.prototype.toString;
        function hasOwnProperty(obj, prop) {
          if (obj == null) {
            return false;
          }
          //to handle objects with null prototypes (too edge case?)
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        function isEmpty(value) {
          if (!value) {
            return true;
          }
          if (isArray(value) && value.length === 0) {
            return true;
          } else if (typeof value !== 'string') {
            for (var i in value) {
              if (hasOwnProperty(value, i)) {
                return false;
              }
            }
            return true;
          }
          return false;
        }

        function toString(type) {
          return toStr.call(type);
        }

        function isObject(obj) {
          return typeof obj === 'object' && toString(obj) === '[object Object]';
        }

        var isArray =
          Array.isArray ||
          function(obj) {
            /*istanbul ignore next:cant test*/
            return toStr.call(obj) === '[object Array]';
          };

        function isBoolean(obj) {
          return (
            typeof obj === 'boolean' || toString(obj) === '[object Boolean]'
          );
        }

        function getKey(key) {
          var intKey = parseInt(key);
          if (intKey.toString() === key) {
            return intKey;
          }
          return key;
        }

        function factory(options) {
          options = options || {};

          var objectPath = function(obj) {
            return Object.keys(objectPath).reduce(function(proxy, prop) {
              if (prop === 'create') {
                return proxy;
              }

              /*istanbul ignore else*/
              if (typeof objectPath[prop] === 'function') {
                proxy[prop] = objectPath[prop].bind(objectPath, obj);
              }

              return proxy;
            }, {});
          };

          function hasShallowProperty(obj, prop) {
            return (
              options.includeInheritedProps ||
              (typeof prop === 'number' && Array.isArray(obj)) ||
              hasOwnProperty(obj, prop)
            );
          }

          function getShallowProperty(obj, prop) {
            if (hasShallowProperty(obj, prop)) {
              return obj[prop];
            }
          }

          function set(obj, path, value, doNotReplace) {
            if (typeof path === 'number') {
              path = [path];
            }
            if (!path || path.length === 0) {
              return obj;
            }
            if (typeof path === 'string') {
              return set(obj, path.split('.').map(getKey), value, doNotReplace);
            }
            var currentPath = path[0];
            var currentValue = getShallowProperty(obj, currentPath);
            if (path.length === 1) {
              if (currentValue === void 0 || !doNotReplace) {
                obj[currentPath] = value;
              }
              return currentValue;
            }

            if (currentValue === void 0) {
              //check if we assume an array
              if (typeof path[1] === 'number') {
                obj[currentPath] = [];
              } else {
                obj[currentPath] = {};
              }
            }

            return set(obj[currentPath], path.slice(1), value, doNotReplace);
          }

          objectPath.has = function(obj, path) {
            if (typeof path === 'number') {
              path = [path];
            } else if (typeof path === 'string') {
              path = path.split('.');
            }

            if (!path || path.length === 0) {
              return !!obj;
            }

            for (var i = 0; i < path.length; i++) {
              var j = getKey(path[i]);

              if (
                (typeof j === 'number' && isArray(obj) && j < obj.length) ||
                (options.includeInheritedProps
                  ? j in Object(obj)
                  : hasOwnProperty(obj, j))
              ) {
                obj = obj[j];
              } else {
                return false;
              }
            }

            return true;
          };

          objectPath.ensureExists = function(obj, path, value) {
            return set(obj, path, value, true);
          };

          objectPath.set = function(obj, path, value, doNotReplace) {
            return set(obj, path, value, doNotReplace);
          };

          objectPath.insert = function(obj, path, value, at) {
            var arr = objectPath.get(obj, path);
            at = ~~at;
            if (!isArray(arr)) {
              arr = [];
              objectPath.set(obj, path, arr);
            }
            arr.splice(at, 0, value);
          };

          objectPath.empty = function(obj, path) {
            if (isEmpty(path)) {
              return void 0;
            }
            if (obj == null) {
              return void 0;
            }

            var value, i;
            if (!(value = objectPath.get(obj, path))) {
              return void 0;
            }

            if (typeof value === 'string') {
              return objectPath.set(obj, path, '');
            } else if (isBoolean(value)) {
              return objectPath.set(obj, path, false);
            } else if (typeof value === 'number') {
              return objectPath.set(obj, path, 0);
            } else if (isArray(value)) {
              value.length = 0;
            } else if (isObject(value)) {
              for (i in value) {
                if (hasShallowProperty(value, i)) {
                  delete value[i];
                }
              }
            } else {
              return objectPath.set(obj, path, null);
            }
          };

          objectPath.push = function(obj, path /*, values */) {
            var arr = objectPath.get(obj, path);
            if (!isArray(arr)) {
              arr = [];
              objectPath.set(obj, path, arr);
            }

            arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
          };

          objectPath.coalesce = function(obj, paths, defaultValue) {
            var value;

            for (var i = 0, len = paths.length; i < len; i++) {
              if ((value = objectPath.get(obj, paths[i])) !== void 0) {
                return value;
              }
            }

            return defaultValue;
          };

          objectPath.get = function(obj, path, defaultValue) {
            if (typeof path === 'number') {
              path = [path];
            }
            if (!path || path.length === 0) {
              return obj;
            }
            if (obj == null) {
              return defaultValue;
            }
            if (typeof path === 'string') {
              return objectPath.get(obj, path.split('.'), defaultValue);
            }

            var currentPath = getKey(path[0]);
            var nextObj = getShallowProperty(obj, currentPath);
            if (nextObj === void 0) {
              return defaultValue;
            }

            if (path.length === 1) {
              return nextObj;
            }

            return objectPath.get(
              obj[currentPath],
              path.slice(1),
              defaultValue
            );
          };

          objectPath.del = function del(obj, path) {
            if (typeof path === 'number') {
              path = [path];
            }

            if (obj == null) {
              return obj;
            }

            if (isEmpty(path)) {
              return obj;
            }
            if (typeof path === 'string') {
              return objectPath.del(obj, path.split('.'));
            }

            var currentPath = getKey(path[0]);
            if (!hasShallowProperty(obj, currentPath)) {
              return obj;
            }

            if (path.length === 1) {
              if (isArray(obj)) {
                obj.splice(currentPath, 1);
              } else {
                delete obj[currentPath];
              }
            } else {
              return objectPath.del(obj[currentPath], path.slice(1));
            }

            return obj;
          };

          return objectPath;
        }

        var mod = factory();
        mod.create = factory;
        mod.withInheritedProps = factory({ includeInheritedProps: true });
        return mod;
      });

      /***/
    },
    /* 391 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });

      var _typeof = typeof Symbol === 'function' &&
        typeof Symbol.iterator === 'symbol'
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          };

      exports.printBuffer = printBuffer;

      var _helpers = __webpack_require__(345);

      var _diff = __webpack_require__(393);

      var _diff2 = _interopRequireDefault(_diff);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        } else {
          return Array.from(arr);
        }
      }

      /**
 * Get log level string based on supplied params
 *
 * @param {string | function | object} level - console[level]
 * @param {object} action - selected action
 * @param {array} payload - selected payload
 * @param {string} type - log entry type
 *
 * @returns {string} level
 */
      function getLogLevel(level, action, payload, type) {
        switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
          case 'object':
            return typeof level[type] === 'function'
              ? level[type].apply(level, _toConsumableArray(payload))
              : level[type];
          case 'function':
            return level(action);
          default:
            return level;
        }
      }

      function defaultTitleFormatter(options) {
        var timestamp = options.timestamp, duration = options.duration;

        return function(action, time, took) {
          var parts = ['action'];

          parts.push('%c' + String(action.type));
          if (timestamp) parts.push('%c@ ' + time);
          if (duration) parts.push('%c(in ' + took.toFixed(2) + ' ms)');

          return parts.join(' ');
        };
      }

      function printBuffer(buffer, options) {
        var logger = options.logger,
          actionTransformer = options.actionTransformer,
          _options$titleFormatt = options.titleFormatter,
          titleFormatter = _options$titleFormatt === undefined
            ? defaultTitleFormatter(options)
            : _options$titleFormatt,
          collapsed = options.collapsed,
          colors = options.colors,
          level = options.level,
          diff = options.diff;

        var isUsingDefaultFormatter =
          typeof options.titleFormatter === 'undefined';

        buffer.forEach(function(logEntry, key) {
          var started = logEntry.started,
            startedTime = logEntry.startedTime,
            action = logEntry.action,
            prevState = logEntry.prevState,
            error = logEntry.error;
          var took = logEntry.took, nextState = logEntry.nextState;

          var nextEntry = buffer[key + 1];

          if (nextEntry) {
            nextState = nextEntry.prevState;
            took = nextEntry.started - started;
          }

          // Message
          var formattedAction = actionTransformer(action);
          var isCollapsed = typeof collapsed === 'function'
            ? collapsed(
                function() {
                  return nextState;
                },
                action,
                logEntry
              )
            : collapsed;

          var formattedTime = (0, _helpers.formatTime)(startedTime);
          var titleCSS = colors.title
            ? 'color: ' + colors.title(formattedAction) + ';'
            : '';
          var headerCSS = ['color: gray; font-weight: lighter;'];
          headerCSS.push(titleCSS);
          if (options.timestamp)
            headerCSS.push('color: gray; font-weight: lighter;');
          if (options.duration)
            headerCSS.push('color: gray; font-weight: lighter;');
          var title = titleFormatter(formattedAction, formattedTime, took);

          // Render
          try {
            if (isCollapsed) {
              if (colors.title && isUsingDefaultFormatter)
                logger.groupCollapsed.apply(
                  logger,
                  ['%c ' + title].concat(headerCSS)
                );
              else logger.groupCollapsed(title);
            } else {
              if (colors.title && isUsingDefaultFormatter)
                logger.group.apply(logger, ['%c ' + title].concat(headerCSS));
              else logger.group(title);
            }
          } catch (e) {
            logger.log(title);
          }

          var prevStateLevel = getLogLevel(
            level,
            formattedAction,
            [prevState],
            'prevState'
          );
          var actionLevel = getLogLevel(
            level,
            formattedAction,
            [formattedAction],
            'action'
          );
          var errorLevel = getLogLevel(
            level,
            formattedAction,
            [error, prevState],
            'error'
          );
          var nextStateLevel = getLogLevel(
            level,
            formattedAction,
            [nextState],
            'nextState'
          );

          if (prevStateLevel) {
            if (colors.prevState)
              logger[prevStateLevel](
                '%c prev state',
                'color: ' + colors.prevState(prevState) + '; font-weight: bold',
                prevState
              );
            else logger[prevStateLevel]('prev state', prevState);
          }

          if (actionLevel) {
            if (colors.action)
              logger[actionLevel](
                '%c action    ',
                'color: ' +
                  colors.action(formattedAction) +
                  '; font-weight: bold',
                formattedAction
              );
            else logger[actionLevel]('action    ', formattedAction);
          }

          if (error && errorLevel) {
            if (colors.error)
              logger[errorLevel](
                '%c error     ',
                'color: ' +
                  colors.error(error, prevState) +
                  '; font-weight: bold;',
                error
              );
            else logger[errorLevel]('error     ', error);
          }

          if (nextStateLevel) {
            if (colors.nextState)
              logger[nextStateLevel](
                '%c next state',
                'color: ' + colors.nextState(nextState) + '; font-weight: bold',
                nextState
              );
            else logger[nextStateLevel]('next state', nextState);
          }

          if (diff) {
            (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
          }

          try {
            logger.groupEnd();
          } catch (e) {
            logger.log('\u2014\u2014 log end \u2014\u2014');
          }
        });
      }

      /***/
    },
    /* 392 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.default = {
        level: 'log',
        logger: console,
        logErrors: true,
        collapsed: undefined,
        predicate: undefined,
        duration: false,
        timestamp: true,
        stateTransformer: function stateTransformer(state) {
          return state;
        },
        actionTransformer: function actionTransformer(action) {
          return action;
        },
        errorTransformer: function errorTransformer(error) {
          return error;
        },
        colors: {
          title: function title() {
            return 'inherit';
          },
          prevState: function prevState() {
            return '#9E9E9E';
          },
          action: function action() {
            return '#03A9F4';
          },
          nextState: function nextState() {
            return '#4CAF50';
          },
          error: function error() {
            return '#F20404';
          },
        },
        diff: false,
        diffPredicate: undefined,

        // Deprecated options
        transformer: undefined,
      };
      module.exports = exports['default'];

      /***/
    },
    /* 393 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.default = diffLogger;

      var _deepDiff = __webpack_require__(389);

      var _deepDiff2 = _interopRequireDefault(_deepDiff);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        } else {
          return Array.from(arr);
        }
      }

      // https://github.com/flitbit/diff#differences
      var dictionary = {
        E: {
          color: '#2196F3',
          text: 'CHANGED:',
        },
        N: {
          color: '#4CAF50',
          text: 'ADDED:',
        },
        D: {
          color: '#F44336',
          text: 'DELETED:',
        },
        A: {
          color: '#2196F3',
          text: 'ARRAY:',
        },
      };

      function style(kind) {
        return 'color: ' + dictionary[kind].color + '; font-weight: bold';
      }

      function render(diff) {
        var kind = diff.kind,
          path = diff.path,
          lhs = diff.lhs,
          rhs = diff.rhs,
          index = diff.index,
          item = diff.item;

        switch (kind) {
          case 'E':
            return [path.join('.'), lhs, '\u2192', rhs];
          case 'N':
            return [path.join('.'), rhs];
          case 'D':
            return [path.join('.')];
          case 'A':
            return [path.join('.') + '[' + index + ']', item];
          default:
            return [];
        }
      }

      function diffLogger(prevState, newState, logger, isCollapsed) {
        var diff = (0, _deepDiff2.default)(prevState, newState);

        try {
          if (isCollapsed) {
            logger.groupCollapsed('diff');
          } else {
            logger.group('diff');
          }
        } catch (e) {
          logger.log('diff');
        }

        if (diff) {
          diff.forEach(function(elem) {
            var kind = elem.kind;

            var output = render(elem);

            logger.log.apply(
              logger,
              ['%c ' + dictionary[kind].text, style(kind)].concat(
                _toConsumableArray(output)
              )
            );
          });
        } else {
          logger.log('\u2014\u2014 no diff \u2014\u2014');
        }

        try {
          logger.groupEnd();
        } catch (e) {
          logger.log('\u2014\u2014 diff end \u2014\u2014 ');
        }
      }
      module.exports = exports['default'];

      /***/
    },
    /* 394 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.logger = exports.createLogger = exports.defaults = undefined;

      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var _core = __webpack_require__(391);

      var _helpers = __webpack_require__(345);

      var _defaults = __webpack_require__(392);

      var _defaults2 = _interopRequireDefault(_defaults);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      /**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
      function createLogger() {
        var options = arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : {};

        var loggerOptions = _extends({}, _defaults2.default, options);

        var logger = loggerOptions.logger,
          stateTransformer = loggerOptions.stateTransformer,
          errorTransformer = loggerOptions.errorTransformer,
          predicate = loggerOptions.predicate,
          logErrors = loggerOptions.logErrors,
          diffPredicate = loggerOptions.diffPredicate;

        // Return if 'console' object is not defined

        if (typeof logger === 'undefined') {
          return function() {
            return function(next) {
              return function(action) {
                return next(action);
              };
            };
          };
        }

        // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
        if (options.getState && options.dispatch) {
          // eslint-disable-next-line no-console
          console.error(
            "[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"
          );

          return function() {
            return function(next) {
              return function(action) {
                return next(action);
              };
            };
          };
        }

        var logBuffer = [];

        return function(_ref) {
          var getState = _ref.getState;
          return function(next) {
            return function(action) {
              // Exit early if predicate function returns 'false'
              if (
                typeof predicate === 'function' &&
                !predicate(getState, action)
              ) {
                return next(action);
              }

              var logEntry = {};

              logBuffer.push(logEntry);

              logEntry.started = _helpers.timer.now();
              logEntry.startedTime = new Date();
              logEntry.prevState = stateTransformer(getState());
              logEntry.action = action;

              var returnedValue = void 0;
              if (logErrors) {
                try {
                  returnedValue = next(action);
                } catch (e) {
                  logEntry.error = errorTransformer(e);
                }
              } else {
                returnedValue = next(action);
              }

              logEntry.took = _helpers.timer.now() - logEntry.started;
              logEntry.nextState = stateTransformer(getState());

              var diff = loggerOptions.diff &&
                typeof diffPredicate === 'function'
                ? diffPredicate(getState, action)
                : loggerOptions.diff;

              (0, _core.printBuffer)(
                logBuffer,
                _extends({}, loggerOptions, { diff: diff })
              );
              logBuffer.length = 0;

              if (logEntry.error) throw logEntry.error;
              return returnedValue;
            };
          };
        };
      }

      var defaultLogger = function defaultLogger() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : {},
          dispatch = _ref2.dispatch,
          getState = _ref2.getState;

        if (typeof dispatch === 'function' || typeof getState === 'function') {
          return createLogger()({ dispatch: dispatch, getState: getState });
        } else {
          // eslint-disable-next-line no-console
          console.error(
            "\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n"
          );
        }
      };

      exports.defaults = _defaults2.default;
      exports.createLogger = createLogger;
      exports.logger = defaultLogger;
      exports.default = defaultLogger;

      /***/
    },
    /* 395 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;
      function createThunkMiddleware(extraArgument) {
        return function(_ref) {
          var dispatch = _ref.dispatch, getState = _ref.getState;
          return function(next) {
            return function(action) {
              if (typeof action === 'function') {
                return action(dispatch, getState, extraArgument);
              }

              return next(action);
            };
          };
        };
      }

      var thunk = createThunkMiddleware();
      thunk.withExtraArgument = createThunkMiddleware;

      exports['default'] = thunk;

      /***/
    },
    /******/
  ]
);
