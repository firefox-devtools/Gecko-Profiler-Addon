!(function(t) {
  function e(n) {
    if (r[n]) return r[n].exports;
    var o = (r[n] = { i: n, l: !1, exports: {} });
    return t[n].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
  }
  var r = {};
  (e.m = t), (e.c = r), (e.i = function(t) {
    return t;
  }), (e.d = function(t, r, n) {
    e.o(t, r) ||
      Object.defineProperty(t, r, { configurable: !1, enumerable: !0, get: n });
  }), (e.n = function(t) {
    var r = t && t.__esModule
      ? function() {
          return t.default;
        }
      : function() {
          return t;
        };
    return e.d(r, 'a', r), r;
  }), (e.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }), (e.p = ''), e((e.s = 337));
})([
  ,
  ,
  ,
  function(t, e, r) {
    var n = r(41)('wks'),
      o = r(30),
      i = r(4).Symbol,
      u = 'function' == typeof i;
    (t.exports = function(t) {
      return n[t] || (n[t] = (u && i[t]) || (u ? i : o)('Symbol.' + t));
    }).store = n;
  },
  function(t, e) {
    var r = (t.exports = 'undefined' != typeof window && window.Math == Math
      ? window
      : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')());
    'number' == typeof __g && (__g = r);
  },
  function(t, e) {
    var r = (t.exports = { version: '2.4.0' });
    'number' == typeof __e && (__e = r);
  },
  ,
  ,
  function(t, e, r) {
    var n = r(15);
    t.exports = function(t) {
      if (!n(t)) throw TypeError(t + ' is not an object!');
      return t;
    };
  },
  function(t, e, r) {
    t.exports = !r(22)(function() {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function() {
            return 7;
          },
        }).a
      );
    });
  },
  function(t, e, r) {
    var n = r(8), o = r(71), i = r(59), u = Object.defineProperty;
    e.f = r(9)
      ? Object.defineProperty
      : function(t, e, r) {
          if ((n(t), (e = i(e, !0)), n(r), o))
            try {
              return u(t, e, r);
            } catch (t) {}
          if ('get' in r || 'set' in r)
            throw TypeError('Accessors not supported!');
          return 'value' in r && (t[e] = r.value), t;
        };
  },
  function(t, e, r) {
    var n = r(10), o = r(29);
    t.exports = r(9)
      ? function(t, e, r) {
          return n.f(t, e, o(1, r));
        }
      : function(t, e, r) {
          return (t[e] = r), t;
        };
  },
  ,
  function(t, e, r) {
    var n = r(4),
      o = r(5),
      i = r(17),
      u = r(11),
      c = function(t, e, r) {
        var a,
          f,
          s,
          l = t & c.F,
          p = t & c.G,
          d = t & c.S,
          h = t & c.P,
          v = t & c.B,
          y = t & c.W,
          g = p ? o : o[e] || (o[e] = {}),
          b = g.prototype,
          m = p ? n : d ? n[e] : (n[e] || {}).prototype;
        p && (r = e);
        for (a in r)
          ((f = !l && m && void 0 !== m[a]) && a in g) ||
            ((s = f ? m[a] : r[a]), (g[a] = p && 'function' != typeof m[a]
              ? r[a]
              : v && f
                  ? i(s, n)
                  : y && m[a] == s
                      ? (function(t) {
                          var e = function(e, r, n) {
                            if (this instanceof t) {
                              switch (arguments.length) {
                                case 0:
                                  return new t();
                                case 1:
                                  return new t(e);
                                case 2:
                                  return new t(e, r);
                              }
                              return new t(e, r, n);
                            }
                            return t.apply(this, arguments);
                          };
                          return (e.prototype = t.prototype), e;
                        })(s)
                      : h && 'function' == typeof s
                          ? i(Function.call, s)
                          : s), h &&
              (((g.virtual || (g.virtual = {}))[a] = s), t & c.R &&
                b &&
                !b[a] &&
                u(b, a, s)));
      };
    (c.F = 1), (c.G = 2), (c.S = 4), (c.P = 8), (c.B = 16), (c.W = 32), (c.U = 64), (c.R = 128), (t.exports = c);
  },
  function(t, e) {
    var r = {}.hasOwnProperty;
    t.exports = function(t, e) {
      return r.call(t, e);
    };
  },
  function(t, e) {
    t.exports = function(t) {
      return 'object' == typeof t ? null !== t : 'function' == typeof t;
    };
  },
  ,
  function(t, e, r) {
    var n = r(32);
    t.exports = function(t, e, r) {
      if ((n(t), void 0 === e)) return t;
      switch (r) {
        case 1:
          return function(r) {
            return t.call(e, r);
          };
        case 2:
          return function(r, n) {
            return t.call(e, r, n);
          };
        case 3:
          return function(r, n, o) {
            return t.call(e, r, n, o);
          };
      }
      return function() {
        return t.apply(e, arguments);
      };
    };
  },
  function(t, e) {
    t.exports = {};
  },
  function(t, e, r) {
    var n = r(72), o = r(28);
    t.exports = function(t) {
      return n(o(t));
    };
  },
  ,
  function(t, e) {
    var r = {}.toString;
    t.exports = function(t) {
      return r.call(t).slice(8, -1);
    };
  },
  function(t, e) {
    t.exports = function(t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  },
  ,
  ,
  ,
  function(t, e, r) {
    var n = r(10).f, o = r(14), i = r(3)('toStringTag');
    t.exports = function(t, e, r) {
      t &&
        !o((t = r ? t : t.prototype), i) &&
        n(t, i, { configurable: !0, value: e });
    };
  },
  function(t, e) {
    var r;
    r = (function() {
      return this;
    })();
    try {
      r = r || Function('return this')() || (0, eval)('this');
    } catch (t) {
      'object' == typeof window && (r = window);
    }
    t.exports = r;
  },
  function(t, e) {
    t.exports = function(t) {
      if (void 0 == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  },
  function(t, e) {
    t.exports = function(t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e,
      };
    };
  },
  function(t, e) {
    var r = 0, n = Math.random();
    t.exports = function(t) {
      return 'Symbol('.concat(
        void 0 === t ? '' : t,
        ')_',
        (++r + n).toString(36)
      );
    };
  },
  ,
  function(t, e) {
    t.exports = function(t) {
      if ('function' != typeof t) throw TypeError(t + ' is not a function!');
      return t;
    };
  },
  function(t, e, r) {
    var n = r(15), o = r(4).document, i = n(o) && n(o.createElement);
    t.exports = function(t) {
      return i ? o.createElement(t) : {};
    };
  },
  function(t, e) {
    t.exports = !0;
  },
  function(t, e, r) {
    var n = r(74), o = r(40);
    t.exports =
      Object.keys ||
      function(t) {
        return n(t, o);
      };
  },
  function(t, e, r) {
    var n = r(41)('keys'), o = r(30);
    t.exports = function(t) {
      return n[t] || (n[t] = o(t));
    };
  },
  function(t, e) {
    var r = Math.ceil, n = Math.floor;
    t.exports = function(t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? n : r)(t);
    };
  },
  ,
  function(t, e, r) {
    var n = r(21),
      o = r(3)('toStringTag'),
      i =
        'Arguments' ==
        n(
          (function() {
            return arguments;
          })()
        ),
      u = function(t, e) {
        try {
          return t[e];
        } catch (t) {}
      };
    t.exports = function(t) {
      var e, r, c;
      return void 0 === t
        ? 'Undefined'
        : null === t
            ? 'Null'
            : 'string' == typeof (r = u((e = Object(t)), o))
                ? r
                : i
                    ? n(e)
                    : 'Object' == (c = n(e)) && 'function' == typeof e.callee
                        ? 'Arguments'
                        : c;
    };
  },
  function(t, e) {
    t.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
      ','
    );
  },
  function(t, e, r) {
    var n = r(4), o = n['__core-js_shared__'] || (n['__core-js_shared__'] = {});
    t.exports = function(t) {
      return o[t] || (o[t] = {});
    };
  },
  function(t, e, r) {
    var n = r(37), o = Math.min;
    t.exports = function(t) {
      return t > 0 ? o(n(t), 9007199254740991) : 0;
    };
  },
  function(t, e, r) {
    var n = r(28);
    t.exports = function(t) {
      return Object(n(t));
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(109)(!0);
    r(53)(
      String,
      'String',
      function(t) {
        (this._t = String(t)), (this._i = 0);
      },
      function() {
        var t, e = this._t, r = this._i;
        return r >= e.length
          ? { value: void 0, done: !0 }
          : ((t = n(e, r)), (this._i += t.length), { value: t, done: !1 });
      }
    );
  },
  ,
  ,
  ,
  ,
  ,
  ,
  function(t, e, r) {
    'use strict';
    e.__esModule = !0;
    var n = r(99),
      o = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(n);
    e.default = function(t) {
      return function() {
        var e = t.apply(this, arguments);
        return new o.default(function(t, r) {
          function n(i, u) {
            try {
              var c = e[i](u), a = c.value;
            } catch (t) {
              return void r(t);
            }
            if (!c.done)
              return o.default.resolve(a).then(
                function(t) {
                  n('next', t);
                },
                function(t) {
                  n('throw', t);
                }
              );
            t(a);
          }
          return n('next');
        });
      };
    };
  },
  function(t, e, r) {
    t.exports = r(137);
  },
  function(t, e, r) {
    'use strict';
    var n = r(34),
      o = r(13),
      i = r(77),
      u = r(11),
      c = r(14),
      a = r(18),
      f = r(104),
      s = r(26),
      l = r(73),
      p = r(3)('iterator'),
      d = !([].keys && 'next' in [].keys()),
      h = function() {
        return this;
      };
    t.exports = function(t, e, r, v, y, g, b) {
      f(r, e, v);
      var m,
        w,
        _,
        x = function(t) {
          if (!d && t in S) return S[t];
          switch (t) {
            case 'keys':
            case 'values':
              return function() {
                return new r(this, t);
              };
          }
          return function() {
            return new r(this, t);
          };
        },
        O = e + ' Iterator',
        E = 'values' == y,
        j = !1,
        S = t.prototype,
        P = S[p] || S['@@iterator'] || (y && S[y]),
        A = P || x(y),
        T = y ? (E ? x('entries') : A) : void 0,
        k = 'Array' == e ? S.entries || P : P;
      if (
        (k &&
          (_ = l(k.call(new t()))) !== Object.prototype &&
          (s(_, O, !0), n || c(_, p) || u(_, p, h)), E &&
          P &&
          'values' !== P.name &&
          ((j = !0), (A = function() {
            return P.call(this);
          })), (n && !b) || (!d && !j && S[p]) || u(S, p, A), (a[e] = A), (a[
          O
        ] = h), y)
      )
        if (
          ((m = {
            values: E ? A : x('values'),
            keys: g ? A : x('keys'),
            entries: T,
          }), b)
        )
          for (w in m)
            w in S || i(S, w, m[w]);
        else o(o.P + o.F * (d || j), e, m);
      return m;
    };
  },
  function(t, e, r) {
    var n = r(8),
      o = r(106),
      i = r(40),
      u = r(36)('IE_PROTO'),
      c = function() {},
      a = function() {
        var t, e = r(33)('iframe'), n = i.length;
        for (
          (e.style.display = 'none'), r(57).appendChild(e), (e.src =
            'javascript:'), (t = e.contentWindow.document), t.open(), t.write(
            '<script>document.F=Object<\/script>'
          ), t.close(), (a = t.F);
          n--;

        )
          delete a.prototype[i[n]];
        return a();
      };
    t.exports =
      Object.create ||
      function(t, e) {
        var r;
        return null !== t
          ? ((c.prototype = n(t)), (r = new c()), (c.prototype = null), (r[
              u
            ] = t))
          : (r = a()), void 0 === e ? r : o(r, e);
      };
  },
  function(t, e, r) {
    r(113);
    for (
      var n = r(4),
        o = r(11),
        i = r(18),
        u = r(3)('toStringTag'),
        c = [
          'NodeList',
          'DOMTokenList',
          'MediaList',
          'StyleSheetList',
          'CSSRuleList',
        ],
        a = 0;
      a < 5;
      a++
    ) {
      var f = c[a], s = n[f], l = s && s.prototype;
      l && !l[u] && o(l, u, f), (i[f] = i.Array);
    }
  },
  ,
  function(t, e, r) {
    t.exports = r(4).document && document.documentElement;
  },
  function(t, e, r) {
    var n,
      o,
      i,
      u = r(17),
      c = r(103),
      a = r(57),
      f = r(33),
      s = r(4),
      l = s.process,
      p = s.setImmediate,
      d = s.clearImmediate,
      h = s.MessageChannel,
      v = 0,
      y = {},
      g = function() {
        var t = +this;
        if (y.hasOwnProperty(t)) {
          var e = y[t];
          delete y[t], e();
        }
      },
      b = function(t) {
        g.call(t.data);
      };
    (p && d) ||
      ((p = function(t) {
        for (var e = [], r = 1; arguments.length > r; )
          e.push(arguments[r++]);
        return (y[++v] = function() {
          c('function' == typeof t ? t : Function(t), e);
        }), n(v), v;
      }), (d = function(t) {
        delete y[t];
      }), 'process' == r(21)(l)
        ? (n = function(t) {
            l.nextTick(u(g, t, 1));
          })
        : h
            ? ((o = new h()), (i = o.port2), (o.port1.onmessage = b), (n = u(
                i.postMessage,
                i,
                1
              )))
            : s.addEventListener &&
                'function' == typeof postMessage &&
                !s.importScripts
                ? ((n = function(t) {
                    s.postMessage(t + '', '*');
                  }), s.addEventListener('message', b, !1))
                : (n = 'onreadystatechange' in f('script')
                    ? function(t) {
                        a.appendChild(
                          f('script')
                        ).onreadystatechange = function() {
                          a.removeChild(this), g.call(t);
                        };
                      }
                    : function(t) {
                        setTimeout(u(g, t, 1), 0);
                      })), (t.exports = { set: p, clear: d });
  },
  function(t, e, r) {
    var n = r(15);
    t.exports = function(t, e) {
      if (!n(t)) return t;
      var r, o;
      if (e && 'function' == typeof (r = t.toString) && !n((o = r.call(t))))
        return o;
      if ('function' == typeof (r = t.valueOf) && !n((o = r.call(t)))) return o;
      if (!e && 'function' == typeof (r = t.toString) && !n((o = r.call(t))))
        return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  ,
  ,
  ,
  ,
  ,
  function(t, e, r) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    (e.CONNECTION_NAME = 'redux-webext'), (e.DISPATCH =
      '@@STORE_DISPATCH'), (e.UPDATE_STATE = '@@STORE_UPDATE_STATE');
  },
  function(t, e, r) {
    var n = r(17),
      o = r(91),
      i = r(90),
      u = r(8),
      c = r(42),
      a = r(78),
      f = {},
      s = {},
      e = (t.exports = function(t, e, r, l, p) {
        var d,
          h,
          v,
          y,
          g = p
            ? function() {
                return t;
              }
            : a(t),
          b = n(r, l, e ? 2 : 1),
          m = 0;
        if ('function' != typeof g) throw TypeError(t + ' is not iterable!');
        if (i(g)) {
          for (d = c(t.length); d > m; m++)
            if ((y = e ? b(u((h = t[m]))[0], h[1]) : b(t[m])) === f || y === s)
              return y;
        } else
          for (v = g.call(t); !(h = v.next()).done; )
            if ((y = o(v, b, h.value, e)) === f || y === s) return y;
      });
    (e.BREAK = f), (e.RETURN = s);
  },
  function(t, e) {},
  function(t, e, r) {
    'use strict';
    function n(t) {
      if (!r.i(u.a)(t) || r.i(o.a)(t) != c) return !1;
      var e = r.i(i.a)(t);
      if (null === e) return !0;
      var n = l.call(e, 'constructor') && e.constructor;
      return 'function' == typeof n && n instanceof n && s.call(n) == p;
    }
    var o = r(153),
      i = r(155),
      u = r(160),
      c = '[object Object]',
      a = Function.prototype,
      f = Object.prototype,
      s = a.toString,
      l = f.hasOwnProperty,
      p = s.call(Object);
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    Object.defineProperty(e, '__esModule', { value: !0 });
    var o = r(135);
    Object.defineProperty(e, 'createBackgroundStore', {
      enumerable: !0,
      get: function() {
        return n(o).default;
      },
    });
    var i = r(136);
    Object.defineProperty(e, 'createUIStore', {
      enumerable: !0,
      get: function() {
        return n(i).default;
      },
    });
  },
  function(t, e) {
    t.exports = function(t, e, r, n) {
      if (!(t instanceof e) || (void 0 !== n && n in t))
        throw TypeError(r + ': incorrect invocation!');
      return t;
    };
  },
  function(t, e, r) {
    t.exports =
      !r(9) &&
      !r(22)(function() {
        return (
          7 !=
          Object.defineProperty(r(33)('div'), 'a', {
            get: function() {
              return 7;
            },
          }).a
        );
      });
  },
  function(t, e, r) {
    var n = r(21);
    t.exports = Object('z').propertyIsEnumerable(0)
      ? Object
      : function(t) {
          return 'String' == n(t) ? t.split('') : Object(t);
        };
  },
  function(t, e, r) {
    var n = r(14), o = r(43), i = r(36)('IE_PROTO'), u = Object.prototype;
    t.exports =
      Object.getPrototypeOf ||
      function(t) {
        return (t = o(t)), n(t, i)
          ? t[i]
          : 'function' == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object ? u : null;
      };
  },
  function(t, e, r) {
    var n = r(14), o = r(19), i = r(102)(!1), u = r(36)('IE_PROTO');
    t.exports = function(t, e) {
      var r, c = o(t), a = 0, f = [];
      for (r in c)
        r != u && n(c, r) && f.push(r);
      for (; e.length > a; )
        n(c, (r = e[a++])) && (~i(f, r) || f.push(r));
      return f;
    };
  },
  function(t, e) {
    e.f = {}.propertyIsEnumerable;
  },
  function(t, e, r) {
    var n = r(11);
    t.exports = function(t, e, r) {
      for (var o in e)
        r && t[o] ? (t[o] = e[o]) : n(t, o, e[o]);
      return t;
    };
  },
  function(t, e, r) {
    t.exports = r(11);
  },
  function(t, e, r) {
    var n = r(39), o = r(3)('iterator'), i = r(18);
    t.exports = r(5).getIteratorMethod = function(t) {
      if (void 0 != t) return t[o] || t['@@iterator'] || i[n(t)];
    };
  },
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
  function(t, e, r) {
    var n = r(18), o = r(3)('iterator'), i = Array.prototype;
    t.exports = function(t) {
      return void 0 !== t && (n.Array === t || i[o] === t);
    };
  },
  function(t, e, r) {
    var n = r(8);
    t.exports = function(t, e, r, o) {
      try {
        return o ? e(n(r)[0], r[1]) : e(r);
      } catch (e) {
        var i = t.return;
        throw (void 0 !== i && n(i.call(t)), e);
      }
    };
  },
  function(t, e, r) {
    var n = r(3)('iterator'), o = !1;
    try {
      var i = [7][n]();
      (i.return = function() {
        o = !0;
      }), Array.from(i, function() {
        throw 2;
      });
    } catch (t) {}
    t.exports = function(t, e) {
      if (!e && !o) return !1;
      var r = !1;
      try {
        var i = [7], u = i[n]();
        (u.next = function() {
          return { done: (r = !0) };
        }), (i[n] = function() {
          return u;
        }), t(i);
      } catch (t) {}
      return r;
    };
  },
  function(t, e) {
    t.exports = function(t, e) {
      return { value: e, done: !!t };
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(4), o = r(5), i = r(10), u = r(9), c = r(3)('species');
    t.exports = function(t) {
      var e = 'function' == typeof o[t] ? o[t] : n[t];
      u &&
        e &&
        !e[c] &&
        i.f(e, c, {
          configurable: !0,
          get: function() {
            return this;
          },
        });
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(159), o = n.a.Symbol;
    e.a = o;
  },
  function(t, e, r) {
    'use strict';
    function n() {
      for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
        e[r] = arguments[r];
      if (0 === e.length)
        return function(t) {
          return t;
        };
      if (1 === e.length) return e[0];
      var n = e[e.length - 1], o = e.slice(0, -1);
      return function() {
        return o.reduceRight(function(t, e) {
          return e(t);
        }, n.apply(void 0, arguments));
      };
    }
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    function n(t, e, i) {
      function a() {
        b === g && (b = g.slice());
      }
      function f() {
        return y;
      }
      function s(t) {
        if ('function' != typeof t)
          throw new Error('Expected listener to be a function.');
        var e = !0;
        return a(), b.push(t), function() {
          if (e) {
            (e = !1), a();
            var r = b.indexOf(t);
            b.splice(r, 1);
          }
        };
      }
      function l(t) {
        if (!r.i(o.a)(t))
          throw new Error(
            'Actions must be plain objects. Use custom middleware for async actions.'
          );
        if (void 0 === t.type)
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (m) throw new Error('Reducers may not dispatch actions.');
        try {
          (m = !0), (y = v(y, t));
        } finally {
          m = !1;
        }
        for (var e = (g = b), n = 0; n < e.length; n++)
          e[n]();
        return t;
      }
      function p(t) {
        if ('function' != typeof t)
          throw new Error('Expected the nextReducer to be a function.');
        (v = t), l({ type: c.INIT });
      }
      function d() {
        var t, e = s;
        return (t = {
          subscribe: function(t) {
            function r() {
              t.next && t.next(f());
            }
            if ('object' != typeof t)
              throw new TypeError('Expected the observer to be an object.');
            return r(), { unsubscribe: e(r) };
          },
        }), (t[u.a] = function() {
          return this;
        }), t;
      }
      var h;
      if (
        ('function' == typeof e &&
          void 0 === i &&
          ((i = e), (e = void 0)), void 0 !== i)
      ) {
        if ('function' != typeof i)
          throw new Error('Expected the enhancer to be a function.');
        return i(n)(t, e);
      }
      if ('function' != typeof t)
        throw new Error('Expected the reducer to be a function.');
      var v = t, y = e, g = [], b = g, m = !1;
      return l({ type: c.INIT }), (h = {
        dispatch: l,
        subscribe: s,
        getState: f,
        replaceReducer: p,
      }), (h[u.a] = d), h;
    }
    r.d(e, 'a', function() {
      return c;
    }), (e.b = n);
    var o = r(68), i = r(193), u = r.n(i), c = { INIT: '@@redux/INIT' };
  },
  function(t, e, r) {
    'use strict';
  },
  function(t, e, r) {
    t.exports = { default: r(100), __esModule: !0 };
  },
  function(t, e, r) {
    r(67), r(44), r(55), r(114), (t.exports = r(5).Promise);
  },
  function(t, e) {
    t.exports = function() {};
  },
  function(t, e, r) {
    var n = r(19), o = r(42), i = r(110);
    t.exports = function(t) {
      return function(e, r, u) {
        var c, a = n(e), f = o(a.length), s = i(u, f);
        if (t && r != r) {
          for (; f > s; )
            if ((c = a[s++]) != c) return !0;
        } else
          for (; f > s; s++)
            if ((t || s in a) && a[s] === r) return t || s || 0;
        return !t && -1;
      };
    };
  },
  function(t, e) {
    t.exports = function(t, e, r) {
      var n = void 0 === r;
      switch (e.length) {
        case 0:
          return n ? t() : t.call(r);
        case 1:
          return n ? t(e[0]) : t.call(r, e[0]);
        case 2:
          return n ? t(e[0], e[1]) : t.call(r, e[0], e[1]);
        case 3:
          return n ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);
        case 4:
          return n
            ? t(e[0], e[1], e[2], e[3])
            : t.call(r, e[0], e[1], e[2], e[3]);
      }
      return t.apply(r, e);
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(54), o = r(29), i = r(26), u = {};
    r(11)(u, r(3)('iterator'), function() {
      return this;
    }), (t.exports = function(t, e, r) {
      (t.prototype = n(u, { next: o(1, r) })), i(t, e + ' Iterator');
    });
  },
  function(t, e, r) {
    var n = r(4),
      o = r(58).set,
      i = n.MutationObserver || n.WebKitMutationObserver,
      u = n.process,
      c = n.Promise,
      a = 'process' == r(21)(u);
    t.exports = function() {
      var t,
        e,
        r,
        f = function() {
          var n, o;
          for (a && (n = u.domain) && n.exit(); t; ) {
            (o = t.fn), (t = t.next);
            try {
              o();
            } catch (n) {
              throw (t ? r() : (e = void 0), n);
            }
          }
          (e = void 0), n && n.enter();
        };
      if (a)
        r = function() {
          u.nextTick(f);
        };
      else if (i) {
        var s = !0, l = document.createTextNode('');
        new i(f).observe(l, { characterData: !0 }), (r = function() {
          l.data = s = !s;
        });
      } else if (c && c.resolve) {
        var p = c.resolve();
        r = function() {
          p.then(f);
        };
      } else
        r = function() {
          o.call(n, f);
        };
      return function(n) {
        var o = { fn: n, next: void 0 };
        e && (e.next = o), t || ((t = o), r()), (e = o);
      };
    };
  },
  function(t, e, r) {
    var n = r(10), o = r(8), i = r(35);
    t.exports = r(9)
      ? Object.defineProperties
      : function(t, e) {
          o(t);
          for (var r, u = i(e), c = u.length, a = 0; c > a; )
            n.f(t, (r = u[a++]), e[r]);
          return t;
        };
  },
  function(t, e) {
    e.f = Object.getOwnPropertySymbols;
  },
  function(t, e, r) {
    var n = r(8), o = r(32), i = r(3)('species');
    t.exports = function(t, e) {
      var r, u = n(t).constructor;
      return void 0 === u || void 0 == (r = n(u)[i]) ? e : o(r);
    };
  },
  function(t, e, r) {
    var n = r(37), o = r(28);
    t.exports = function(t) {
      return function(e, r) {
        var i, u, c = String(o(e)), a = n(r), f = c.length;
        return a < 0 || a >= f
          ? t ? '' : void 0
          : ((i = c.charCodeAt(a)), i < 55296 ||
              i > 56319 ||
              a + 1 === f ||
              (u = c.charCodeAt(a + 1)) < 56320 ||
              u > 57343
              ? t ? c.charAt(a) : i
              : t
                  ? c.slice(a, a + 2)
                  : u - 56320 + ((i - 55296) << 10) + 65536);
      };
    };
  },
  function(t, e, r) {
    var n = r(37), o = Math.max, i = Math.min;
    t.exports = function(t, e) {
      return (t = n(t)), t < 0 ? o(t + e, 0) : i(t, e);
    };
  },
  ,
  ,
  function(t, e, r) {
    'use strict';
    var n = r(101), o = r(93), i = r(18), u = r(19);
    (t.exports = r(53)(
      Array,
      'Array',
      function(t, e) {
        (this._t = u(t)), (this._i = 0), (this._k = e);
      },
      function() {
        var t = this._t, e = this._k, r = this._i++;
        return !t || r >= t.length
          ? ((this._t = void 0), o(1))
          : 'keys' == e
              ? o(0, r)
              : 'values' == e ? o(0, t[r]) : o(0, [r, t[r]]);
      },
      'values'
    )), (i.Arguments = i.Array), n('keys'), n('values'), n('entries');
  },
  function(t, e, r) {
    'use strict';
    var n,
      o,
      i,
      u = r(34),
      c = r(4),
      a = r(17),
      f = r(39),
      s = r(13),
      l = r(15),
      p = r(32),
      d = r(70),
      h = r(66),
      v = r(108),
      y = r(58).set,
      g = r(105)(),
      b = c.TypeError,
      m = c.process,
      w = c.Promise,
      m = c.process,
      _ = 'process' == f(m),
      x = function() {},
      O = !!(function() {
        try {
          var t = w.resolve(1),
            e = ((t.constructor = {})[r(3)('species')] = function(t) {
              t(x, x);
            });
          return (
            (_ || 'function' == typeof PromiseRejectionEvent) &&
            t.then(x) instanceof e
          );
        } catch (t) {}
      })(),
      E = function(t, e) {
        return t === e || (t === w && e === i);
      },
      j = function(t) {
        var e;
        return !(!l(t) || 'function' != typeof (e = t.then)) && e;
      },
      S = function(t) {
        return E(w, t) ? new P(t) : new o(t);
      },
      P = (o = function(t) {
        var e, r;
        (this.promise = new t(function(t, n) {
          if (void 0 !== e || void 0 !== r) throw b('Bad Promise constructor');
          (e = t), (r = n);
        })), (this.resolve = p(e)), (this.reject = p(r));
      }),
      A = function(t) {
        try {
          t();
        } catch (t) {
          return { error: t };
        }
      },
      T = function(t, e) {
        if (!t._n) {
          t._n = !0;
          var r = t._c;
          g(function() {
            for (
              var n = t._v, o = 1 == t._s, i = 0;
              r.length > i;

            ) !(function(e) {
                var r,
                  i,
                  u = o ? e.ok : e.fail,
                  c = e.resolve,
                  a = e.reject,
                  f = e.domain;
                try {
                  u
                    ? (o || (2 == t._h && M(t), (t._h = 1)), !0 === u
                        ? (r = n)
                        : (f && f.enter(), (r = u(n)), f && f.exit()), r ===
                        e.promise
                        ? a(b('Promise-chain cycle'))
                        : (i = j(r)) ? i.call(r, c, a) : c(r))
                    : a(n);
                } catch (t) {
                  a(t);
                }
              })(r[i++]);
            (t._c = []), (t._n = !1), e && !t._h && k(t);
          });
        }
      },
      k = function(t) {
        y.call(c, function() {
          var e, r, n, o = t._v;
          if (
            (R(t) &&
              ((e = A(function() {
                _
                  ? m.emit('unhandledRejection', o, t)
                  : (r = c.onunhandledrejection)
                      ? r({ promise: t, reason: o })
                      : (n = c.console) &&
                          n.error &&
                          n.error('Unhandled promise rejection', o);
              })), (t._h = _ || R(t) ? 2 : 1)), (t._a = void 0), e)
          )
            throw e.error;
        });
      },
      R = function(t) {
        if (1 == t._h) return !1;
        for (var e, r = t._a || t._c, n = 0; r.length > n; )
          if (((e = r[n++]), e.fail || !R(e.promise))) return !1;
        return !0;
      },
      M = function(t) {
        y.call(c, function() {
          var e;
          _
            ? m.emit('rejectionHandled', t)
            : (e = c.onrejectionhandled) && e({ promise: t, reason: t._v });
        });
      },
      I = function(t) {
        var e = this;
        e._d ||
          ((e._d = !0), (e = e._w || e), (e._v = t), (e._s = 2), e._a ||
            (e._a = e._c.slice()), T(e, !0));
      },
      L = function(t) {
        var e, r = this;
        if (!r._d) {
          (r._d = !0), (r = r._w || r);
          try {
            if (r === t) throw b("Promise can't be resolved itself");
            (e = j(t))
              ? g(function() {
                  var n = { _w: r, _d: !1 };
                  try {
                    e.call(t, a(L, n, 1), a(I, n, 1));
                  } catch (t) {
                    I.call(n, t);
                  }
                })
              : ((r._v = t), (r._s = 1), T(r, !1));
          } catch (t) {
            I.call({ _w: r, _d: !1 }, t);
          }
        }
      };
    O ||
      ((w = function(t) {
        d(this, w, 'Promise', '_h'), p(t), n.call(this);
        try {
          t(a(L, this, 1), a(I, this, 1));
        } catch (t) {
          I.call(this, t);
        }
      }), (n = function(t) {
        (this._c = []), (this._a = void 0), (this._s = 0), (this._d = !1), (this._v = void 0), (this._h = 0), (this._n = !1);
      }), (n.prototype = r(76)(w.prototype, {
        then: function(t, e) {
          var r = S(v(this, w));
          return (r.ok = 'function' != typeof t || t), (r.fail =
            'function' == typeof e && e), (r.domain = _
            ? m.domain
            : void 0), this._c.push(r), this._a && this._a.push(r), this._s &&
            T(this, !1), r.promise;
        },
        catch: function(t) {
          return this.then(void 0, t);
        },
      })), (P = function() {
        var t = new n();
        (this.promise = t), (this.resolve = a(L, t, 1)), (this.reject = a(
          I,
          t,
          1
        ));
      })), s(s.G + s.W + s.F * !O, { Promise: w }), r(26)(w, 'Promise'), r(94)(
      'Promise'
    ), (i = r(5).Promise), s(s.S + s.F * !O, 'Promise', {
      reject: function(t) {
        var e = S(this);
        return (0, e.reject)(t), e.promise;
      },
    }), s(s.S + s.F * (u || !O), 'Promise', {
      resolve: function(t) {
        if (t instanceof w && E(t.constructor, this)) return t;
        var e = S(this);
        return (0, e.resolve)(t), e.promise;
      },
    }), s(
      s.S +
        s.F *
          !(O &&
            r(92)(function(t) {
              w.all(t).catch(x);
            })),
      'Promise',
      {
        all: function(t) {
          var e = this,
            r = S(e),
            n = r.resolve,
            o = r.reject,
            i = A(function() {
              var r = [], i = 0, u = 1;
              h(t, !1, function(t) {
                var c = i++, a = !1;
                r.push(void 0), u++, e.resolve(t).then(function(t) {
                  a || ((a = !0), (r[c] = t), --u || n(r));
                }, o);
              }), --u || n(r);
            });
          return i && o(i.error), r.promise;
        },
        race: function(t) {
          var e = this,
            r = S(e),
            n = r.reject,
            o = A(function() {
              h(t, !1, function(t) {
                e.resolve(t).then(r.resolve, n);
              });
            });
          return o && n(o.error), r.promise;
        },
      }
    );
  },
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
  function(t, e, r) {
    'use strict';
    function n(t, e) {
      var r = {};
      for (var n in t)
        e.indexOf(n) >= 0 ||
          (Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]));
      return r;
    }
    function o(t, e, r) {
      if (t.type === a.DISPATCH) {
        var o = t.action, i = o.type, u = n(o, ['type']), c = s[i];
        c
          ? f.dispatch(c(Object.keys(u).length ? u : void 0))
          : console.error(
              'Provided in background store "actions" object doesn\'t contain "' +
                i +
                '" key.'
            );
      } else if (t.type === a.UPDATE_STATE) return r(f.getState()), !0;
    }
    function i(t) {
      if (t.name === a.CONNECTION_NAME) {
        var e = f.subscribe(function() {
          t.postMessage({ type: a.UPDATE_STATE, data: f.getState() });
        });
        t.onDisconnect.addListener(function() {
          e(), l && l();
        });
      }
    }
    function u(t) {
      if (
        'object' !== (void 0 === t ? 'undefined' : c(t)) ||
        'object' !== c(t.store)
      )
        throw new Error('Expected the "store" to be an object.');
      if (t.hasOwnProperty('actions') && 'object' !== c(t.actions))
        throw new Error('Expected the "actions" to be an object.');
      if (
        t.hasOwnProperty('onDisconnect') &&
        'function' != typeof t.onDisconnect
      )
        throw new Error('Expected the "onDisconnect" to be a function.');
      return (f = t.store), (s = t.actions || {}), (l =
        t.onDisconnect), chrome.runtime.onConnect.addListener(
        i
      ), chrome.runtime.onMessage.addListener(o), f;
    }
    Object.defineProperty(e, '__esModule', { value: !0 });
    var c = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(t) {
          return typeof t;
        }
      : function(t) {
          return t &&
            'function' == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t;
        };
    e.default = u;
    var a = r(65), f = void 0, s = void 0, l = void 0;
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      t.type === c.UPDATE_STATE &&
        ((f = t.data), a.forEach(function(t) {
          return t();
        }));
    }
    function o(t) {
      return a.push(t), function() {
        a = a.filter(function(e) {
          return e !== t;
        });
      };
    }
    function i(t) {
      chrome.runtime.sendMessage({ type: c.DISPATCH, action: t });
    }
    function u() {
      return f;
    }
    Object.defineProperty(e, '__esModule', {
      value: !0,
    }), (e.default = function() {
      return chrome.runtime
        .connect({ name: c.CONNECTION_NAME })
        .onMessage.addListener(n), new Promise(function(t) {
        chrome.runtime.sendMessage({ type: c.UPDATE_STATE }, function(e) {
          (f = e), t({ subscribe: o, dispatch: i, getState: u });
        });
      });
    });
    var c = r(65), a = [], f = void 0;
  },
  function(t, e, r) {
    (function(e) {
      var n = 'object' == typeof e
        ? e
        : 'object' == typeof window
            ? window
            : 'object' == typeof self ? self : this,
        o =
          n.regeneratorRuntime &&
          Object.getOwnPropertyNames(n).indexOf('regeneratorRuntime') >= 0,
        i = o && n.regeneratorRuntime;
      if (((n.regeneratorRuntime = void 0), (t.exports = r(138)), o))
        n.regeneratorRuntime = i;
      else
        try {
          delete n.regeneratorRuntime;
        } catch (t) {
          n.regeneratorRuntime = void 0;
        }
    }.call(e, r(27)));
  },
  function(t, e, r) {
    (function(e) {
      !(function(e) {
        'use strict';
        function r(t, e, r, n) {
          var i = e && e.prototype instanceof o ? e : o,
            u = Object.create(i.prototype),
            c = new d(n || []);
          return (u._invoke = f(t, r, c)), u;
        }
        function n(t, e, r) {
          try {
            return { type: 'normal', arg: t.call(e, r) };
          } catch (t) {
            return { type: 'throw', arg: t };
          }
        }
        function o() {}
        function i() {}
        function u() {}
        function c(t) {
          ['next', 'throw', 'return'].forEach(function(e) {
            t[e] = function(t) {
              return this._invoke(e, t);
            };
          });
        }
        function a(t) {
          function r(e, o, i, u) {
            var c = n(t[e], t, o);
            if ('throw' !== c.type) {
              var a = c.arg, f = a.value;
              return f && 'object' == typeof f && b.call(f, '__await')
                ? Promise.resolve(f.__await).then(
                    function(t) {
                      r('next', t, i, u);
                    },
                    function(t) {
                      r('throw', t, i, u);
                    }
                  )
                : Promise.resolve(f).then(function(t) {
                    (a.value = t), i(a);
                  }, u);
            }
            u(c.arg);
          }
          function o(t, e) {
            function n() {
              return new Promise(function(n, o) {
                r(t, e, n, o);
              });
            }
            return (i = i ? i.then(n, n) : n());
          }
          'object' == typeof e.process &&
            e.process.domain &&
            (r = e.process.domain.bind(r));
          var i;
          this._invoke = o;
        }
        function f(t, e, r) {
          var o = j;
          return function(i, u) {
            if (o === P) throw new Error('Generator is already running');
            if (o === A) {
              if ('throw' === i) throw u;
              return v();
            }
            for ((r.method = i), (r.arg = u); ; ) {
              var c = r.delegate;
              if (c) {
                var a = s(c, r);
                if (a) {
                  if (a === T) continue;
                  return a;
                }
              }
              if ('next' === r.method) r.sent = r._sent = r.arg;
              else if ('throw' === r.method) {
                if (o === j) throw ((o = A), r.arg);
                r.dispatchException(r.arg);
              } else 'return' === r.method && r.abrupt('return', r.arg);
              o = P;
              var f = n(t, e, r);
              if ('normal' === f.type) {
                if (((o = r.done ? A : S), f.arg === T)) continue;
                return { value: f.arg, done: r.done };
              }
              'throw' === f.type &&
                ((o = A), (r.method = 'throw'), (r.arg = f.arg));
            }
          };
        }
        function s(t, e) {
          var r = t.iterator[e.method];
          if (r === y) {
            if (((e.delegate = null), 'throw' === e.method)) {
              if (
                t.iterator.return &&
                ((e.method = 'return'), (e.arg = y), s(t, e), 'throw' ===
                  e.method)
              )
                return T;
              (e.method = 'throw'), (e.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
            }
            return T;
          }
          var o = n(r, t.iterator, e.arg);
          if ('throw' === o.type)
            return (e.method = 'throw'), (e.arg =
              o.arg), (e.delegate = null), T;
          var i = o.arg;
          return i
            ? i.done
                ? ((e[t.resultName] = i.value), (e.next =
                    t.nextLoc), 'return' !== e.method &&
                    ((e.method = 'next'), (e.arg = y)), (e.delegate = null), T)
                : i
            : ((e.method = 'throw'), (e.arg = new TypeError(
                'iterator result is not an object'
              )), (e.delegate = null), T);
        }
        function l(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]), 2 in t &&
            ((e.finallyLoc = t[2]), (e.afterLoc = t[3])), this.tryEntries.push(
            e
          );
        }
        function p(t) {
          var e = t.completion || {};
          (e.type = 'normal'), delete e.arg, (t.completion = e);
        }
        function d(t) {
          (this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(
            l,
            this
          ), this.reset(!0);
        }
        function h(t) {
          if (t) {
            var e = t[w];
            if (e) return e.call(t);
            if ('function' == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var r = -1,
                n = function e() {
                  for (; ++r < t.length; )
                    if (b.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
                  return (e.value = y), (e.done = !0), e;
                };
              return (n.next = n);
            }
          }
          return { next: v };
        }
        function v() {
          return { value: y, done: !0 };
        }
        var y,
          g = Object.prototype,
          b = g.hasOwnProperty,
          m = 'function' == typeof Symbol ? Symbol : {},
          w = m.iterator || '@@iterator',
          _ = m.asyncIterator || '@@asyncIterator',
          x = m.toStringTag || '@@toStringTag',
          O = 'object' == typeof t,
          E = e.regeneratorRuntime;
        if (E) return void (O && (t.exports = E));
        (E = e.regeneratorRuntime = O ? t.exports : {}), (E.wrap = r);
        var j = 'suspendedStart',
          S = 'suspendedYield',
          P = 'executing',
          A = 'completed',
          T = {},
          k = {};
        k[w] = function() {
          return this;
        };
        var R = Object.getPrototypeOf, M = R && R(R(h([])));
        M && M !== g && b.call(M, w) && (k = M);
        var I = (u.prototype = o.prototype = Object.create(k));
        (i.prototype = I.constructor = u), (u.constructor = i), (u[
          x
        ] = i.displayName =
          'GeneratorFunction'), (E.isGeneratorFunction = function(t) {
          var e = 'function' == typeof t && t.constructor;
          return (
            !!e &&
            (e === i || 'GeneratorFunction' === (e.displayName || e.name))
          );
        }), (E.mark = function(t) {
          return Object.setPrototypeOf
            ? Object.setPrototypeOf(t, u)
            : ((t.__proto__ = u), x in t ||
                (t[x] = 'GeneratorFunction')), (t.prototype = Object.create(
            I
          )), t;
        }), (E.awrap = function(t) {
          return { __await: t };
        }), c(a.prototype), (a.prototype[_] = function() {
          return this;
        }), (E.AsyncIterator = a), (E.async = function(t, e, n, o) {
          var i = new a(r(t, e, n, o));
          return E.isGeneratorFunction(e)
            ? i
            : i.next().then(function(t) {
                return t.done ? t.value : i.next();
              });
        }), c(I), (I[x] = 'Generator'), (I[w] = function() {
          return this;
        }), (I.toString = function() {
          return '[object Generator]';
        }), (E.keys = function(t) {
          var e = [];
          for (var r in t)
            e.push(r);
          return e.reverse(), function r() {
            for (; e.length; ) {
              var n = e.pop();
              if (n in t) return (r.value = n), (r.done = !1), r;
            }
            return (r.done = !0), r;
          };
        }), (E.values = h), (d.prototype = {
          constructor: d,
          reset: function(t) {
            if (
              ((this.prev = 0), (this.next = 0), (this.sent = this._sent = y), (this.done = !1), (this.delegate = null), (this.method =
                'next'), (this.arg = y), this.tryEntries.forEach(p), !t)
            )
              for (var e in this)
                't' === e.charAt(0) &&
                  b.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = y);
          },
          stop: function() {
            this.done = !0;
            var t = this.tryEntries[0], e = t.completion;
            if ('throw' === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function(t) {
            function e(e, n) {
              return (i.type = 'throw'), (i.arg = t), (r.next = e), n &&
                ((r.method = 'next'), (r.arg = y)), !!n;
            }
            if (this.done) throw t;
            for (var r = this, n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n], i = o.completion;
              if ('root' === o.tryLoc) return e('end');
              if (o.tryLoc <= this.prev) {
                var u = b.call(o, 'catchLoc'), c = b.call(o, 'finallyLoc');
                if (u && c) {
                  if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                  if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                } else if (u) {
                  if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                } else {
                  if (!c)
                    throw new Error('try statement without catch or finally');
                  if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                }
              }
            }
          },
          abrupt: function(t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var n = this.tryEntries[r];
              if (
                n.tryLoc <= this.prev &&
                b.call(n, 'finallyLoc') &&
                this.prev < n.finallyLoc
              ) {
                var o = n;
                break;
              }
            }
            o &&
              ('break' === t || 'continue' === t) &&
              o.tryLoc <= e &&
              e <= o.finallyLoc &&
              (o = null);
            var i = o ? o.completion : {};
            return (i.type = t), (i.arg = e), o
              ? ((this.method = 'next'), (this.next = o.finallyLoc), T)
              : this.complete(i);
          },
          complete: function(t, e) {
            if ('throw' === t.type) throw t.arg;
            return 'break' === t.type || 'continue' === t.type
              ? (this.next = t.arg)
              : 'return' === t.type
                  ? ((this.rval = this.arg = t.arg), (this.method =
                      'return'), (this.next = 'end'))
                  : 'normal' === t.type && e && (this.next = e), T;
          },
          finish: function(t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), p(r), T;
            }
          },
          catch: function(t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ('throw' === n.type) {
                  var o = n.arg;
                  p(r);
                }
                return o;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function(t, e, r) {
            return (this.delegate = {
              iterator: h(t),
              resultName: e,
              nextLoc: r,
            }), 'next' === this.method && (this.arg = y), T;
          },
        });
      })(
        'object' == typeof e
          ? e
          : 'object' == typeof window
              ? window
              : 'object' == typeof self ? self : this
      );
    }.call(e, r(27)));
  },
  function(t, e, r) {
    t.exports = { default: r(144), __esModule: !0 };
  },
  ,
  function(t, e, r) {
    var n = r(30)('meta'),
      o = r(15),
      i = r(14),
      u = r(10).f,
      c = 0,
      a =
        Object.isExtensible ||
        function() {
          return !0;
        },
      f = !r(22)(function() {
        return a(Object.preventExtensions({}));
      }),
      s = function(t) {
        u(t, n, { value: { i: 'O' + ++c, w: {} } });
      },
      l = function(t, e) {
        if (!o(t))
          return 'symbol' == typeof t
            ? t
            : ('string' == typeof t ? 'S' : 'P') + t;
        if (!i(t, n)) {
          if (!a(t)) return 'F';
          if (!e) return 'E';
          s(t);
        }
        return t[n].i;
      },
      p = function(t, e) {
        if (!i(t, n)) {
          if (!a(t)) return !0;
          if (!e) return !1;
          s(t);
        }
        return t[n].w;
      },
      d = function(t) {
        return f && h.NEED && a(t) && !i(t, n) && s(t), t;
      },
      h = (t.exports = {
        KEY: n,
        NEED: !1,
        fastKey: l,
        getWeak: p,
        onFreeze: d,
      });
  },
  function(t, e, r) {
    'use strict';
    var n = r(97), o = r(192), i = r(191), u = r(190);
    r(96), r(98);
    r.d(e, 'b', function() {
      return n.b;
    }), r.d(e, 'd', function() {
      return o.a;
    }), r.d(e, 'a', function() {
      return i.a;
    }), r.d(e, 'c', function() {
      return u.a;
    });
  },
  function(t, e, r) {
    'use strict';
    e.__esModule = !0;
    var n = r(139),
      o = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(n);
    e.default = function(t, e, r) {
      return e in t
        ? (0, o.default)(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = r), t;
    };
  },
  function(t, e, r) {
    r(149);
    var n = r(5).Object;
    t.exports = function(t, e, r) {
      return n.defineProperty(t, e, r);
    };
  },
  function(t, e, r) {
    var n = r(21);
    t.exports =
      Array.isArray ||
      function(t) {
        return 'Array' == n(t);
      };
  },
  ,
  ,
  function(t, e, r) {
    var n = r(13), o = r(5), i = r(22);
    t.exports = function(t, e) {
      var r = (o.Object || {})[t] || Object[t], u = {};
      (u[t] = e(r)), n(
        n.S +
          n.F *
            i(function() {
              r(1);
            }),
        'Object',
        u
      );
    };
  },
  function(t, e, r) {
    var n = r(13);
    n(n.S + n.F * !r(9), 'Object', { defineProperty: r(10).f });
  },
  ,
  ,
  ,
  function(t, e, r) {
    'use strict';
    function n(t) {
      return null == t
        ? void 0 === t ? a : c
        : f && f in Object(t) ? r.i(i.a)(t) : r.i(u.a)(t);
    }
    var o = r(95),
      i = r(156),
      u = r(157),
      c = '[object Null]',
      a = '[object Undefined]',
      f = o.a ? o.a.toStringTag : void 0;
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    (function(t) {
      var r = 'object' == typeof t && t && t.Object === Object && t;
      e.a = r;
    }.call(e, r(27)));
  },
  function(t, e, r) {
    'use strict';
    var n = r(158), o = r.i(n.a)(Object.getPrototypeOf, Object);
    e.a = o;
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      var e = u.call(t, a), r = t[a];
      try {
        t[a] = void 0;
        var n = !0;
      } catch (t) {}
      var o = c.call(t);
      return n && (e ? (t[a] = r) : delete t[a]), o;
    }
    var o = r(95),
      i = Object.prototype,
      u = i.hasOwnProperty,
      c = i.toString,
      a = o.a ? o.a.toStringTag : void 0;
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      return i.call(t);
    }
    var o = Object.prototype, i = o.toString;
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    function n(t, e) {
      return function(r) {
        return t(e(r));
      };
    }
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    var n = r(154),
      o = 'object' == typeof self && self && self.Object === Object && self,
      i = n.a || o || Function('return this')();
    e.a = i;
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      return null != t && 'object' == typeof t;
    }
    e.a = n;
  },
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
  function(t, e, r) {
    'use strict';
    function n() {
      for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
        e[r] = arguments[r];
      return function(t) {
        return function(r, n, u) {
          var c = t(r, n, u),
            a = c.dispatch,
            f = [],
            s = {
              getState: c.getState,
              dispatch: function(t) {
                return a(t);
              },
            };
          return (f = e.map(function(t) {
            return t(s);
          })), (a = o.a.apply(void 0, f)(c.dispatch)), i({}, c, {
            dispatch: a,
          });
        };
      };
    }
    e.a = n;
    var o = r(96),
      i =
        Object.assign ||
        function(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
          }
          return t;
        };
  },
  function(t, e, r) {
    'use strict';
    function n(t, e) {
      return function() {
        return e(t.apply(void 0, arguments));
      };
    }
    function o(t, e) {
      if ('function' == typeof t) return n(t, e);
      if ('object' != typeof t || null === t)
        throw new Error(
          'bindActionCreators expected an object or a function, instead received ' +
            (null === t ? 'null' : typeof t) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(t), o = {}, i = 0; i < r.length; i++) {
        var u = r[i], c = t[u];
        'function' == typeof c && (o[u] = n(c, e));
      }
      return o;
    }
    e.a = o;
  },
  function(t, e, r) {
    'use strict';
    function n(t, e) {
      var r = e && e.type;
      return (
        'Given action ' +
        ((r && '"' + r.toString() + '"') || 'an action') +
        ', reducer "' +
        t +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function o(t) {
      Object.keys(t).forEach(function(e) {
        var r = t[e];
        if (void 0 === r(void 0, { type: u.a.INIT }))
          throw new Error(
            'Reducer "' +
              e +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        if (
          void 0 ===
          r(void 0, {
            type: '@@redux/PROBE_UNKNOWN_ACTION_' +
              Math.random().toString(36).substring(7).split('').join('.'),
          })
        )
          throw new Error(
            'Reducer "' +
              e +
              '" returned undefined when probed with a random type. Don\'t try to handle ' +
              u.a.INIT +
              ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.'
          );
      });
    }
    function i(t) {
      for (var e = Object.keys(t), r = {}, i = 0; i < e.length; i++) {
        var u = e[i];
        'function' == typeof t[u] && (r[u] = t[u]);
      }
      var c, a = Object.keys(r);
      try {
        o(r);
      } catch (t) {
        c = t;
      }
      return function() {
        var t = arguments.length <= 0 || void 0 === arguments[0]
          ? {}
          : arguments[0],
          e = arguments[1];
        if (c) throw c;
        for (var o = !1, i = {}, u = 0; u < a.length; u++) {
          var f = a[u], s = r[f], l = t[f], p = s(l, e);
          if (void 0 === p) {
            var d = n(f, e);
            throw new Error(d);
          }
          (i[f] = p), (o = o || p !== l);
        }
        return o ? i : t;
      };
    }
    e.a = i;
    var u = r(97);
    r(68), r(98);
  },
  function(t, e, r) {
    t.exports = r(194);
  },
  function(t, e, r) {
    'use strict';
    (function(t, n) {
      Object.defineProperty(e, '__esModule', { value: !0 });
      var o,
        i = r(195),
        u = (function(t) {
          return t && t.__esModule ? t : { default: t };
        })(i);
      o = 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window ? window : void 0 !== t ? t : n;
      var c = (0, u.default)(o);
      e.default = c;
    }.call(e, r(27), r(196)(t)));
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      var e, r = t.Symbol;
      return 'function' == typeof r
        ? r.observable
            ? (e = r.observable)
            : ((e = r('observable')), (r.observable = e))
        : (e = '@@observable'), e;
    }
    Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = n);
  },
  function(t, e) {
    t.exports = function(t) {
      return t.webpackPolyfill ||
        ((t.deprecate = function() {}), (t.paths = []), t.children ||
          (t.children = []), Object.defineProperty(t, 'loaded', {
          enumerable: !0,
          get: function() {
            return t.l;
          },
        }), Object.defineProperty(t, 'id', {
          enumerable: !0,
          get: function() {
            return t.i;
          },
        }), (t.webpackPolyfill = 1)), t;
    };
  },
  ,
  ,
  function(t, e, r) {
    'use strict';
    function n(t, e) {
      return [t, e].join(':');
    }
    e.a = n;
  },
  function(t, e, r) {
    'use strict';
    function n() {
      var t = this;
      return (function() {
        var e = b()(
          y.a.mark(function e(r, n) {
            return y.a.wrap(
              function(t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (!n().profiler.isRunning) {
                        t.next = 4;
                        break;
                      }
                      return t.abrupt('return', r(i()));
                    case 4:
                      return t.abrupt('return', r(o()));
                    case 5:
                    case 'end':
                      return t.stop();
                  }
              },
              e,
              t
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })();
    }
    function o() {
      var t = this;
      return (function() {
        var e = b()(
          y.a.mark(function e(r, n) {
            var o, i, u, c, a;
            return y.a.wrap(
              function(t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (o = n()), (i = o.settings), (u = i.threads.split(
                        ','
                      )), (c = h()(i.features).filter(function(t) {
                        return i.features[t];
                      })), c.push('leaf'), u.length > 0 &&
                        c.push('threads'), (a = {
                        bufferSize: i.buffersize,
                        interval: i.interval,
                        features: c,
                        threads: u,
                      }), r({
                        type: 'PROFILER_START',
                        status: 'start',
                      }), (t.next = 9), browser.geckoProfiler
                        .start(a)
                        .catch(function() {});
                    case 9:
                      r({ type: 'PROFILER_START', status: 'done' });
                    case 10:
                    case 'end':
                      return t.stop();
                  }
              },
              e,
              t
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })();
    }
    function i() {
      var t = this;
      return (function() {
        var e = b()(
          y.a.mark(function e(r) {
            return y.a.wrap(
              function(t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return r({
                        type: 'PROFILER_STOP',
                        status: 'start',
                      }), (t.next = 3), browser.geckoProfiler.stop();
                    case 3:
                      r({ type: 'PROFILER_STOP', status: 'done' });
                    case 4:
                    case 'end':
                      return t.stop();
                  }
              },
              e,
              t
            );
          })
        );
        return function(t) {
          return e.apply(this, arguments);
        };
      })();
    }
    function u() {
      return 'getProfileAsArrayBuffer' in browser.geckoProfiler
        ? browser.geckoProfiler.getProfileAsArrayBuffer().catch(function(t) {
            return console.error(t), {};
          })
        : browser.geckoProfiler.getProfile().catch(function(t) {
            return console.error(t), {};
          });
    }
    function c() {
      var t = this;
      return (function() {
        var e = b()(
          y.a.mark(function e(r, n) {
            return y.a.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return r({
                        type: 'PROFILER_PAUSE',
                        status: 'start',
                      }), (e.next = 3), browser.geckoProfiler
                        .pause()
                        .catch(function() {});
                    case 3:
                      return r({
                        type: 'PROFILER_PAUSE',
                        status: 'done',
                      }), browser.tabs
                        .create({ active: !0, url: n().settings.reportUrl })
                        .then(
                          b()(
                            y.a.mark(function e() {
                              var n;
                              return y.a.wrap(
                                function(t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        return r({
                                          type: 'PROFILER_CAPTURE',
                                          status: 'start',
                                        }), (t.next = 3), u();
                                      case 3:
                                        (n = t.sent), r({
                                          type: 'PROFILER_CAPTURE',
                                          status: 'done',
                                          data: n,
                                        });
                                      case 5:
                                      case 'end':
                                        return t.stop();
                                    }
                                },
                                e,
                                t
                              );
                            })
                          ),
                          function(t) {
                            return console.error(t);
                          }
                        ), (e.prev = 5), r({
                        type: 'PROFILER_RESUME',
                        status: 'start',
                      }), (e.next = 9), browser.geckoProfiler.resume();
                    case 9:
                      r({
                        type: 'PROFILER_RESUME',
                        status: 'done',
                      }), (e.next = 15);
                      break;
                    case 12:
                      (e.prev = 12), (e.t0 = e.catch(5)), console.error(e.t0);
                    case 15:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              t,
              [[5, 12]]
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })();
    }
    function a() {
      var t = this;
      return (function() {
        var e = b()(
          y.a.mark(function e(r, n) {
            var u;
            return y.a.wrap(
              function(t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((u = n().profiler.isRunning), !n().profiler.isRunning)
                      ) {
                        t.next = 4;
                        break;
                      }
                      return (t.next = 4), r(i());
                    case 4:
                      if (!u) {
                        t.next = 7;
                        break;
                      }
                      return (t.next = 7), r(o());
                    case 7:
                    case 'end':
                      return t.stop();
                  }
              },
              e,
              t
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })();
    }
    function f(t) {
      var e = this, r = t.debugName, n = t.breakpadId;
      return (function() {
        var t = b()(
          y.a.mark(function t(o) {
            var i, u, c, a, f;
            return y.a.wrap(
              function(t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return o({
                        type: 'SYMBOLS',
                        status: 'start',
                        data: { debugName: r, breakpadId: n },
                      }), (t.next = 3), browser.geckoProfiler.getSymbols(r, n);
                    case 3:
                      (i = t.sent), (u = p()(i, 3)), (c = u[0]), (a =
                        u[1]), (f = u[2]), o({
                        type: 'SYMBOLS',
                        status: 'done',
                        data: {
                          debugName: r,
                          breakpadId: n,
                          addresses: c,
                          index: a,
                          buffer: f,
                        },
                      });
                    case 9:
                    case 'end':
                      return t.stop();
                  }
              },
              t,
              e
            );
          })
        );
        return function(e) {
          return t.apply(this, arguments);
        };
      })();
    }
    function s(t) {
      return { type: 'IS_RUNNING', data: t };
    }
    (e.a = n), (e.c = o), (e.d = i), (e.b = c), (e.e = a), (e.f = f), (e.g = s);
    var l = r(360),
      p = r.n(l),
      d = r(359),
      h = r.n(d),
      v = r(52),
      y = r.n(v),
      g = r(51),
      b = r.n(g);
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      var e = t.data;
      return { type: 'UPDATE_SETTINGS', data: void 0 === e ? {} : e };
    }
    function o() {
      return { type: 'TOGGLE_SETTINGS' };
    }
    (e.a = n), (e.b = o);
  },
  function(t, e, r) {
    'use strict';
    var n,
      o = r(143),
      i = r.n(o),
      u = r(361),
      c = r.n(u),
      a = r(142),
      f = r(69),
      s = (r.n(f), r(329)),
      l = r.n(s),
      p = r(339),
      d = r(340),
      h = r(200),
      v = r(201),
      y = r.i(a.b)(d.a, a.c.apply(void 0, c()(p.a)));
    l()(y), (e.a = r.i(f.createBackgroundStore)({
      store: y,
      actions: ((n = {}), i()(n, 'TOGGLE_PROFILER', h.a), i()(
        n,
        'START_PROFILER',
        h.c
      ), i()(n, 'STOP_PROFILER', h.d), i()(n, 'CAPTURE_PROFILE', h.b), i()(
        n,
        'RESTART_PROFILER',
        h.e
      ), i()(n, 'UPDATE_SETTINGS', v.a), i()(n, 'TOGGLE_SETTINGS', v.b), i()(
        n,
        'GET_SYMBOL_TABLE',
        h.f
      ), n),
      onDisconnect: function() {},
    }));
  },
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
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function(t, e, r) {
    'use strict';
    e.__esModule = !0;
    var n = r(358),
      o = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(n);
    e.default =
      o.default ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      };
  },
  function(t, e, r) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var n = (e.repeat = function(t, e) {
      return new Array(e + 1).join(t);
    }),
      o = (e.pad = function(t, e) {
        return n('0', e - t.toString().length) + t;
      });
    (e.formatTime = function(t) {
      return (
        o(t.getHours(), 2) +
        ':' +
        o(t.getMinutes(), 2) +
        ':' +
        o(t.getSeconds(), 2) +
        '.' +
        o(t.getMilliseconds(), 3)
      );
    }), (e.timer = 'undefined' != typeof performance &&
      null !== performance &&
      'function' == typeof performance.now
      ? performance
      : Date);
  },
  function(t, e, r) {
    'use strict';
    function n(t, e) {
      return i.hasOwnProperty(t) ? i[t].push(e) : (i[t] = [e]), function() {
        i[t] = i[t].filter(function(t) {
          return t !== e;
        });
      };
    }
    Object.defineProperty(e, '__esModule', {
      value: !0,
    }), (e.subscribe = n), (e.default = function(t) {
      var e = t.getState();
      return t.subscribe(function() {
        var r = t.getState();
        Object.keys(i).forEach(function(t) {
          (0, o.get)(e, t) !== (0, o.get)(r, t) &&
            i[t].forEach(function(t) {
              return t(r);
            });
        }), (e = r);
      }), n;
    });
    var o = r(387), i = {};
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      var e = t.profiler, r = e.isRunning;
      u.setIcon({ path: 'icons/toolbar_' + (r ? 'on' : 'off') + '.png' });
    }
    function o() {
      r.i(i.subscribe)('profiler.isRunning', n);
    }
    e.a = o;
    var i = r(329), u = (r.n(i), browser.browserAction);
  },
  function(t, e, r) {
    'use strict';
    function n() {
      browser.commands.onCommand.addListener(function(t) {
        'ToggleProfiler' === t
          ? o.a.dispatch(r.i(i.a)())
          : 'CaptureProfile' === t && o.a.dispatch(r.i(i.b)());
      });
    }
    e.a = n;
    var o = r(202), i = r(200);
  },
  function(t, e, r) {
    'use strict';
    function n() {
      browser.geckoProfiler.onRunning.addListener(function(t) {
        return o.a.dispatch(r.i(i.a)(t));
      });
    }
    e.a = n;
    var o = r(202), i = r(338);
  },
  function(t, e, r) {
    'use strict';
    function n() {
      browser.storage.local.get('profilerState').then(function(t) {
        o.a.dispatch(r.i(i.a)(t));
      });
    }
    e.a = n;
    var o = r(202), i = r(201);
  },
  ,
  ,
  ,
  function(t, e, r) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var n = r(52),
      o = r.n(n),
      i = r(51),
      u = r.n(i),
      c = r(330),
      a = r(331),
      f = r(332),
      s = r(333);
    !(function() {
      var t = u()(
        o.a.mark(function t() {
          return o.a.wrap(
            function(t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    r.i(s.a)(), r.i(f.a)(), r.i(a.a)(), r.i(c.a)();
                  case 4:
                  case 'end':
                    return t.stop();
                }
            },
            t,
            this
          );
        })
      );
      return function() {
        return t.apply(this, arguments);
      };
    })()();
  },
  function(t, e, r) {
    'use strict';
    var n = r(200);
    r.d(e, 'a', function() {
      return n.g;
    });
    r(201);
  },
  function(t, e, r) {
    'use strict';
    var n = r(392), o = r.n(n), i = [o.a], u = r(391), c = u.createLogger;
    i.push(c({ collapsed: !0 })), (e.a = i);
  },
  function(t, e, r) {
    'use strict';
    var n = r(142),
      o = r(341),
      i = r(342),
      u = r.i(n.d)({ profiler: o.a, settings: i.a });
    e.a = function(t, e) {
      return u(t, e);
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(327),
      o = r.n(n),
      i = r(356),
      u = r.n(i),
      c = r(199),
      a = { symbols: new u.a(), profile: null, isRunning: !1 };
    e.a = function() {
      var t = arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : a,
        e = arguments[1];
      switch (e.type) {
        case 'IS_RUNNING':
          return o()({}, t, { isRunning: e.data });
        case 'PROFILER_CAPTURE':
          return 'done' === e.status ? o()({}, t, { profile: e.data }) : t;
        case 'SYMBOLS':
          if ('done' === e.status) {
            var n = e.data,
              i = n.debugName,
              f = n.breakpadId,
              s = n.addresses,
              l = n.index,
              p = n.buffer,
              d = new u.a(t.symbols);
            return d.set(r.i(c.a)(i, f), [s, l, p]), o()({}, t, { symbols: d });
          }
          return t;
        default:
          return t;
      }
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(327),
      o = r.n(n),
      i = {
        isOpen: !1,
        reportUrl: 'https://perf-html.io/from-addon/',
        buffersize: 1e6,
        interval: 1,
        threads: 'GeckoMain,Compositor',
        features: { js: !0, stackwalk: !0, tasktracer: !1 },
      };
    e.a = function() {
      var t = arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : i,
        e = arguments[1];
      switch (e.type) {
        case 'UPDATE_SETTINGS':
          return o()({}, t, e.data, {
            features: o()({}, t.features, e.data.features),
          });
        case 'TOGGLE_SETTINGS':
          return o()({}, t, { isOpen: !t.isOpen });
        default:
          return t;
      }
    };
  },
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
  function(t, e, r) {
    t.exports = { default: r(362), __esModule: !0 };
  },
  function(t, e, r) {
    t.exports = { default: r(363), __esModule: !0 };
  },
  function(t, e, r) {
    t.exports = { default: r(364), __esModule: !0 };
  },
  function(t, e, r) {
    t.exports = { default: r(365), __esModule: !0 };
  },
  ,
  function(t, e, r) {
    t.exports = { default: r(367), __esModule: !0 };
  },
  function(t, e, r) {
    t.exports = { default: r(368), __esModule: !0 };
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }
    e.__esModule = !0;
    var o = r(355), i = n(o), u = r(354), c = n(u);
    e.default = (function() {
      function t(t, e) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
          for (
            var u, a = (0, c.default)(t);
            !(n = (u = a.next()).done) &&
            (r.push(u.value), !e || r.length !== e);
            n = !0
          );
        } catch (t) {
          (o = !0), (i = t);
        } finally {
          try {
            !n && a.return && a.return();
          } finally {
            if (o) throw i;
          }
        }
        return r;
      }
      return function(e, r) {
        if (Array.isArray(e)) return e;
        if ((0, i.default)(Object(e))) return t(e, r);
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        );
      };
    })();
  },
  function(t, e, r) {
    'use strict';
    e.__esModule = !0;
    var n = r(353),
      o = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(n);
    e.default = function(t) {
      if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++)
          r[e] = t[e];
        return r;
      }
      return (0, o.default)(t);
    };
  },
  function(t, e, r) {
    r(44), r(380), (t.exports = r(5).Array.from);
  },
  function(t, e, r) {
    r(55), r(44), (t.exports = r(378));
  },
  function(t, e, r) {
    r(55), r(44), (t.exports = r(379));
  },
  function(t, e, r) {
    r(67), r(44), r(55), r(381), r(385), (t.exports = r(5).Map);
  },
  ,
  function(t, e, r) {
    r(383), (t.exports = r(5).Object.assign);
  },
  function(t, e, r) {
    r(384), (t.exports = r(5).Object.keys);
  },
  function(t, e, r) {
    var n = r(66);
    t.exports = function(t, e) {
      var r = [];
      return n(t, !1, r.push, r, e), r;
    };
  },
  function(t, e, r) {
    var n = r(17), o = r(72), i = r(43), u = r(42), c = r(372);
    t.exports = function(t, e) {
      var r = 1 == t,
        a = 2 == t,
        f = 3 == t,
        s = 4 == t,
        l = 6 == t,
        p = 5 == t || l,
        d = e || c;
      return function(e, c, h) {
        for (
          var v,
            y,
            g = i(e),
            b = o(g),
            m = n(c, h, 3),
            w = u(b.length),
            _ = 0,
            x = r ? d(e, w) : a ? d(e, 0) : void 0;
          w > _;
          _++
        )
          if ((p || _ in b) && ((v = b[_]), (y = m(v, _, g)), t))
            if (r) x[_] = y;
            else if (y)
              switch (t) {
                case 3:
                  return !0;
                case 5:
                  return v;
                case 6:
                  return _;
                case 2:
                  x.push(v);
              }
            else if (s) return !1;
        return l ? -1 : f || s ? s : x;
      };
    };
  },
  function(t, e, r) {
    var n = r(15), o = r(145), i = r(3)('species');
    t.exports = function(t) {
      var e;
      return o(t) &&
        ((e = t.constructor), 'function' != typeof e ||
          (e !== Array && !o(e.prototype)) ||
          (e = void 0), n(e) && null === (e = e[i]) && (e = void 0)), void 0 ===
        e
        ? Array
        : e;
    };
  },
  function(t, e, r) {
    var n = r(371);
    t.exports = function(t, e) {
      return new (n(t))(e);
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(10).f,
      o = r(54),
      i = r(76),
      u = r(17),
      c = r(70),
      a = r(28),
      f = r(66),
      s = r(53),
      l = r(93),
      p = r(94),
      d = r(9),
      h = r(141).fastKey,
      v = d ? '_s' : 'size',
      y = function(t, e) {
        var r, n = h(e);
        if ('F' !== n) return t._i[n];
        for (r = t._f; r; r = r.n)
          if (r.k == e) return r;
      };
    t.exports = {
      getConstructor: function(t, e, r, s) {
        var l = t(function(t, n) {
          c(
            t,
            l,
            e,
            '_i'
          ), (t._i = o(null)), (t._f = void 0), (t._l = void 0), (t[v] = 0), void 0 != n && f(n, r, t[s], t);
        });
        return i(l.prototype, {
          clear: function() {
            for (var t = this, e = t._i, r = t._f; r; r = r.n)
              (r.r = !0), r.p && (r.p = r.p.n = void 0), delete e[r.i];
            (t._f = t._l = void 0), (t[v] = 0);
          },
          delete: function(t) {
            var e = this, r = y(e, t);
            if (r) {
              var n = r.n, o = r.p;
              delete e._i[r.i], (r.r = !0), o && (o.n = n), n &&
                (n.p = o), e._f == r && (e._f = n), e._l == r && (e._l = o), e[
                v
              ]--;
            }
            return !!r;
          },
          forEach: function(t) {
            c(this, l, 'forEach');
            for (
              var e, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3);
              (e = e ? e.n : this._f);

            )
              for (r(e.v, e.k, this); e && e.r; )
                e = e.p;
          },
          has: function(t) {
            return !!y(this, t);
          },
        }), d &&
          n(l.prototype, 'size', {
            get: function() {
              return a(this[v]);
            },
          }), l;
      },
      def: function(t, e, r) {
        var n, o, i = y(t, e);
        return i
          ? (i.v = r)
          : ((t._l = i = {
              i: (o = h(e, !0)),
              k: e,
              v: r,
              p: (n = t._l),
              n: void 0,
              r: !1,
            }), t._f || (t._f = i), n && (n.n = i), t[v]++, 'F' !== o &&
              (t._i[o] = i)), t;
      },
      getEntry: y,
      setStrong: function(t, e, r) {
        s(
          t,
          e,
          function(t, e) {
            (this._t = t), (this._k = e), (this._l = void 0);
          },
          function() {
            for (var t = this, e = t._k, r = t._l; r && r.r; )
              r = r.p;
            return t._t && (t._l = r = r ? r.n : t._t._f)
              ? 'keys' == e
                  ? l(0, r.k)
                  : 'values' == e ? l(0, r.v) : l(0, [r.k, r.v])
              : ((t._t = void 0), l(1));
          },
          r ? 'entries' : 'values',
          !r,
          !0
        ), p(e);
      },
    };
  },
  function(t, e, r) {
    var n = r(39), o = r(369);
    t.exports = function(t) {
      return function() {
        if (n(this) != t) throw TypeError(t + "#toJSON isn't generic");
        return o(this);
      };
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(4),
      o = r(13),
      i = r(141),
      u = r(22),
      c = r(11),
      a = r(76),
      f = r(66),
      s = r(70),
      l = r(15),
      p = r(26),
      d = r(10).f,
      h = r(370)(0),
      v = r(9);
    t.exports = function(t, e, r, y, g, b) {
      var m = n[t], w = m, _ = g ? 'set' : 'add', x = w && w.prototype, O = {};
      return v &&
        'function' == typeof w &&
        (b ||
          (x.forEach &&
            !u(function() {
              new w().entries().next();
            })))
        ? ((w = e(function(e, r) {
            s(e, w, t, '_c'), (e._c = new m()), void 0 != r && f(r, g, e[_], e);
          })), h(
            'add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(
              ','
            ),
            function(t) {
              var e = 'add' == t || 'set' == t;
              t in x &&
                (!b || 'clear' != t) &&
                c(w.prototype, t, function(r, n) {
                  if ((s(this, w, t), !e && b && !l(r)))
                    return 'get' == t && void 0;
                  var o = this._c[t](0 === r ? 0 : r, n);
                  return e ? this : o;
                });
            }
          ), 'size' in x &&
            d(w.prototype, 'size', {
              get: function() {
                return this._c.size;
              },
            }))
        : ((w = y.getConstructor(e, t, g, _)), a(
            w.prototype,
            r
          ), (i.NEED = !0)), p(w, t), (O[t] = w), o(o.G + o.W + o.F, O), b ||
        y.setStrong(w, t, g), w;
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(10), o = r(29);
    t.exports = function(t, e, r) {
      e in t ? n.f(t, e, o(0, r)) : (t[e] = r);
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(35),
      o = r(107),
      i = r(75),
      u = r(43),
      c = r(72),
      a = Object.assign;
    t.exports = !a ||
      r(22)(function() {
        var t = {}, e = {}, r = Symbol(), n = 'abcdefghijklmnopqrst';
        return (t[r] = 7), n.split('').forEach(function(t) {
          e[t] = t;
        }), 7 != a({}, t)[r] || Object.keys(a({}, e)).join('') != n;
      })
      ? function(t, e) {
          for (
            var r = u(t), a = arguments.length, f = 1, s = o.f, l = i.f;
            a > f;

          )
            for (
              var p,
                d = c(arguments[f++]),
                h = s ? n(d).concat(s(d)) : n(d),
                v = h.length,
                y = 0;
              v > y;

            )
              l.call(d, (p = h[y++])) && (r[p] = d[p]);
          return r;
        }
      : a;
  },
  function(t, e, r) {
    var n = r(8), o = r(78);
    t.exports = r(5).getIterator = function(t) {
      var e = o(t);
      if ('function' != typeof e) throw TypeError(t + ' is not iterable!');
      return n(e.call(t));
    };
  },
  function(t, e, r) {
    var n = r(39), o = r(3)('iterator'), i = r(18);
    t.exports = r(5).isIterable = function(t) {
      var e = Object(t);
      return void 0 !== e[o] || '@@iterator' in e || i.hasOwnProperty(n(e));
    };
  },
  function(t, e, r) {
    'use strict';
    var n = r(17),
      o = r(13),
      i = r(43),
      u = r(91),
      c = r(90),
      a = r(42),
      f = r(376),
      s = r(78);
    o(
      o.S +
        o.F *
          !r(92)(function(t) {
            Array.from(t);
          }),
      'Array',
      {
        from: function(t) {
          var e,
            r,
            o,
            l,
            p = i(t),
            d = 'function' == typeof this ? this : Array,
            h = arguments.length,
            v = h > 1 ? arguments[1] : void 0,
            y = void 0 !== v,
            g = 0,
            b = s(p);
          if (
            (y && (v = n(v, h > 2 ? arguments[2] : void 0, 2)), void 0 == b ||
              (d == Array && c(b)))
          )
            for ((e = a(p.length)), (r = new d(e)); e > g; g++)
              f(r, g, y ? v(p[g], g) : p[g]);
          else
            for ((l = b.call(p)), (r = new d()); !(o = l.next()).done; g++)
              f(r, g, y ? u(l, v, [o.value, g], !0) : o.value);
          return (r.length = g), r;
        },
      }
    );
  },
  function(t, e, r) {
    'use strict';
    var n = r(373);
    t.exports = r(375)(
      'Map',
      function(t) {
        return function() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      },
      {
        get: function(t) {
          var e = n.getEntry(this, t);
          return e && e.v;
        },
        set: function(t, e) {
          return n.def(this, 0 === t ? 0 : t, e);
        },
      },
      n,
      !0
    );
  },
  ,
  function(t, e, r) {
    var n = r(13);
    n(n.S + n.F, 'Object', { assign: r(377) });
  },
  function(t, e, r) {
    var n = r(43), o = r(35);
    r(148)('keys', function() {
      return function(t) {
        return o(n(t));
      };
    });
  },
  function(t, e, r) {
    var n = r(13);
    n(n.P + n.R, 'Map', { toJSON: r(374)('Map') });
  },
  function(t, e, r) {
    (function(r) {
      var n, o;
      !(function(r, i) {
        'use strict';
        (n = []), void 0 !==
          (o = function() {
            return i();
          }.apply(e, n)) && (t.exports = o);
      })(0, function(t) {
        'use strict';
        function e(t, e) {
          (t.super_ = e), (t.prototype = Object.create(e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }));
        }
        function n(t, e) {
          Object.defineProperty(this, 'kind', {
            value: t,
            enumerable: !0,
          }), e && e.length && Object.defineProperty(this, 'path', { value: e, enumerable: !0 });
        }
        function o(t, e, r) {
          o.super_.call(
            this,
            'E',
            t
          ), Object.defineProperty(this, 'lhs', { value: e, enumerable: !0 }), Object.defineProperty(this, 'rhs', { value: r, enumerable: !0 });
        }
        function i(t, e) {
          i.super_.call(
            this,
            'N',
            t
          ), Object.defineProperty(this, 'rhs', { value: e, enumerable: !0 });
        }
        function u(t, e) {
          u.super_.call(
            this,
            'D',
            t
          ), Object.defineProperty(this, 'lhs', { value: e, enumerable: !0 });
        }
        function c(t, e, r) {
          c.super_.call(
            this,
            'A',
            t
          ), Object.defineProperty(this, 'index', { value: e, enumerable: !0 }), Object.defineProperty(this, 'item', { value: r, enumerable: !0 });
        }
        function a(t, e, r) {
          var n = t.slice((r || e) + 1 || t.length);
          return (t.length = e < 0 ? t.length + e : e), t.push.apply(t, n), t;
        }
        function f(t) {
          var e = typeof t;
          return 'object' !== e
            ? e
            : t === Math
                ? 'math'
                : null === t
                    ? 'null'
                    : Array.isArray(t)
                        ? 'array'
                        : '[object Date]' === Object.prototype.toString.call(t)
                            ? 'date'
                            : void 0 !== t.toString &&
                                /^\/.*\//.test(t.toString())
                                ? 'regexp'
                                : 'object';
        }
        function s(e, r, n, l, p, d, h) {
          p = p || [];
          var v = p.slice(0);
          if (void 0 !== d) {
            if (l) {
              if ('function' == typeof l && l(v, d)) return;
              if ('object' == typeof l) {
                if (l.prefilter && l.prefilter(v, d)) return;
                if (l.normalize) {
                  var y = l.normalize(v, d, e, r);
                  y && ((e = y[0]), (r = y[1]));
                }
              }
            }
            v.push(d);
          }
          'regexp' === f(e) &&
            'regexp' === f(r) &&
            ((e = e.toString()), (r = r.toString()));
          var g = typeof e, b = typeof r;
          if ('undefined' === g) 'undefined' !== b && n(new i(v, r));
          else if ('undefined' === b) n(new u(v, e));
          else if (f(e) !== f(r)) n(new o(v, e, r));
          else if (
            '[object Date]' === Object.prototype.toString.call(e) &&
            '[object Date]' === Object.prototype.toString.call(r) &&
            e - r != 0
          )
            n(new o(v, e, r));
          else if ('object' === g && null !== e && null !== r) {
            if (((h = h || []), h.indexOf(e) < 0)) {
              if ((h.push(e), Array.isArray(e))) {
                var m;
                e.length;
                for (m = 0; m < e.length; m++)
                  m >= r.length
                    ? n(new c(v, m, new u(t, e[m])))
                    : s(e[m], r[m], n, l, v, m, h);
                for (; m < r.length; )
                  n(new c(v, m, new i(t, r[m++])));
              } else {
                var w = Object.keys(e), _ = Object.keys(r);
                w.forEach(function(o, i) {
                  var u = _.indexOf(o);
                  u >= 0
                    ? (s(e[o], r[o], n, l, v, o, h), (_ = a(_, u)))
                    : s(e[o], t, n, l, v, o, h);
                }), _.forEach(function(e) {
                  s(t, r[e], n, l, v, e, h);
                });
              }
              h.length = h.length - 1;
            }
          } else
            e !== r &&
              (('number' === g && isNaN(e) && isNaN(r)) || n(new o(v, e, r)));
        }
        function l(e, r, n, o) {
          return (o = o || []), s(
            e,
            r,
            function(t) {
              t && o.push(t);
            },
            n
          ), o.length ? o : t;
        }
        function p(t, e, r) {
          if (r.path && r.path.length) {
            var n, o = t[e], i = r.path.length - 1;
            for (n = 0; n < i; n++)
              o = o[r.path[n]];
            switch (r.kind) {
              case 'A':
                p(o[r.path[n]], r.index, r.item);
                break;
              case 'D':
                delete o[r.path[n]];
                break;
              case 'E':
              case 'N':
                o[r.path[n]] = r.rhs;
            }
          } else
            switch (r.kind) {
              case 'A':
                p(t[e], r.index, r.item);
                break;
              case 'D':
                t = a(t, e);
                break;
              case 'E':
              case 'N':
                t[e] = r.rhs;
            }
          return t;
        }
        function d(t, e, r) {
          if (t && e && r && r.kind) {
            for (
              var n = t, o = -1, i = r.path ? r.path.length - 1 : 0;
              ++o < i;

            )
              void 0 === n[r.path[o]] &&
                (n[r.path[o]] = 'number' == typeof r.path[o] ? [] : {}), (n =
                n[r.path[o]]);
            switch (r.kind) {
              case 'A':
                p(r.path ? n[r.path[o]] : n, r.index, r.item);
                break;
              case 'D':
                delete n[r.path[o]];
                break;
              case 'E':
              case 'N':
                n[r.path[o]] = r.rhs;
            }
          }
        }
        function h(t, e, r) {
          if (r.path && r.path.length) {
            var n, o = t[e], i = r.path.length - 1;
            for (n = 0; n < i; n++)
              o = o[r.path[n]];
            switch (r.kind) {
              case 'A':
                h(o[r.path[n]], r.index, r.item);
                break;
              case 'D':
              case 'E':
                o[r.path[n]] = r.lhs;
                break;
              case 'N':
                delete o[r.path[n]];
            }
          } else
            switch (r.kind) {
              case 'A':
                h(t[e], r.index, r.item);
                break;
              case 'D':
              case 'E':
                t[e] = r.lhs;
                break;
              case 'N':
                t = a(t, e);
            }
          return t;
        }
        function v(t, e, r) {
          if (t && e && r && r.kind) {
            var n, o, i = t;
            for ((o = r.path.length - 1), (n = 0); n < o; n++)
              void 0 === i[r.path[n]] && (i[r.path[n]] = {}), (i =
                i[r.path[n]]);
            switch (r.kind) {
              case 'A':
                h(i[r.path[n]], r.index, r.item);
                break;
              case 'D':
              case 'E':
                i[r.path[n]] = r.lhs;
                break;
              case 'N':
                delete i[r.path[n]];
            }
          }
        }
        function y(t, e, r) {
          if (t && e) {
            s(t, e, function(n) {
              (r && !r(t, e, n)) || d(t, e, n);
            });
          }
        }
        var g, b, m = [];
        return (g = 'object' == typeof r && r
          ? r
          : 'undefined' != typeof window ? window : {}), (b = g.DeepDiff), b &&
          m.push(function() {
            void 0 !== b && g.DeepDiff === l && ((g.DeepDiff = b), (b = t));
          }), e(o, n), e(i, n), e(u, n), e(c, n), Object.defineProperties(l, {
          diff: { value: l, enumerable: !0 },
          observableDiff: { value: s, enumerable: !0 },
          applyDiff: { value: y, enumerable: !0 },
          applyChange: { value: d, enumerable: !0 },
          revertChange: { value: v, enumerable: !0 },
          isConflict: {
            value: function() {
              return void 0 !== b;
            },
            enumerable: !0,
          },
          noConflict: {
            value: function() {
              return m &&
                (m.forEach(function(t) {
                  t();
                }), (m = null)), l;
            },
            enumerable: !0,
          },
        }), l;
      });
    }.call(e, r(27)));
  },
  function(t, e, r) {
    var n, o, i;
    !(function(r, u) {
      'use strict';
      'object' == typeof t && 'object' == typeof t.exports
        ? (t.exports = u())
        : ((o = []), (n = u), void 0 !==
            (i = 'function' == typeof n ? n.apply(e, o) : n) &&
            (t.exports = i));
    })(0, function() {
      'use strict';
      function t(t, e) {
        return null != t && Object.prototype.hasOwnProperty.call(t, e);
      }
      function e(e) {
        if (!e) return !0;
        if (a(e) && 0 === e.length) return !0;
        if ('string' != typeof e) {
          for (var r in e)
            if (t(e, r)) return !1;
          return !0;
        }
        return !1;
      }
      function r(t) {
        return c.call(t);
      }
      function n(t) {
        return 'object' == typeof t && '[object Object]' === r(t);
      }
      function o(t) {
        return 'boolean' == typeof t || '[object Boolean]' === r(t);
      }
      function i(t) {
        var e = parseInt(t);
        return e.toString() === t ? e : t;
      }
      function u(r) {
        function u(e, n) {
          return (
            r.includeInheritedProps ||
            ('number' == typeof n && Array.isArray(e)) ||
            t(e, n)
          );
        }
        function c(t, e) {
          if (u(t, e)) return t[e];
        }
        function f(t, e, r, n) {
          if (('number' == typeof e && (e = [e]), !e || 0 === e.length))
            return t;
          if ('string' == typeof e) return f(t, e.split('.').map(i), r, n);
          var o = e[0], u = c(t, o);
          return 1 === e.length
            ? ((void 0 !== u && n) || (t[o] = r), u)
            : (void 0 === u &&
                ('number' == typeof e[1] ? (t[o] = []) : (t[o] = {})), f(
                t[o],
                e.slice(1),
                r,
                n
              ));
        }
        r = r || {};
        var s = function(t) {
          return Object.keys(s).reduce(function(e, r) {
            return 'create' === r
              ? e
              : ('function' == typeof s[r] && (e[r] = s[r].bind(s, t)), e);
          }, {});
        };
        return (s.has = function(e, n) {
          if (
            ('number' == typeof n
              ? (n = [n])
              : 'string' == typeof n && (n = n.split('.')), !n ||
              0 === n.length)
          )
            return !!e;
          for (var o = 0; o < n.length; o++) {
            var u = i(n[o]);
            if (
              !(('number' == typeof u && a(e) && u < e.length) ||
                (r.includeInheritedProps ? u in Object(e) : t(e, u)))
            )
              return !1;
            e = e[u];
          }
          return !0;
        }), (s.ensureExists = function(t, e, r) {
          return f(t, e, r, !0);
        }), (s.set = function(t, e, r, n) {
          return f(t, e, r, n);
        }), (s.insert = function(t, e, r, n) {
          var o = s.get(t, e);
          (n = ~~n), a(o) || ((o = []), s.set(t, e, o)), o.splice(n, 0, r);
        }), (s.empty = function(t, r) {
          if (!e(r) && null != t) {
            var i, c;
            if ((i = s.get(t, r))) {
              if ('string' == typeof i) return s.set(t, r, '');
              if (o(i)) return s.set(t, r, !1);
              if ('number' == typeof i) return s.set(t, r, 0);
              if (a(i)) i.length = 0;
              else {
                if (!n(i)) return s.set(t, r, null);
                for (c in i)
                  u(i, c) && delete i[c];
              }
            }
          }
        }), (s.push = function(t, e) {
          var r = s.get(t, e);
          a(r) || ((r = []), s.set(t, e, r)), r.push.apply(
            r,
            Array.prototype.slice.call(arguments, 2)
          );
        }), (s.coalesce = function(t, e, r) {
          for (var n, o = 0, i = e.length; o < i; o++)
            if (void 0 !== (n = s.get(t, e[o]))) return n;
          return r;
        }), (s.get = function(t, e, r) {
          if (('number' == typeof e && (e = [e]), !e || 0 === e.length))
            return t;
          if (null == t) return r;
          if ('string' == typeof e) return s.get(t, e.split('.'), r);
          var n = i(e[0]), o = c(t, n);
          return void 0 === o
            ? r
            : 1 === e.length ? o : s.get(t[n], e.slice(1), r);
        }), (s.del = function(t, r) {
          if (('number' == typeof r && (r = [r]), null == t)) return t;
          if (e(r)) return t;
          if ('string' == typeof r) return s.del(t, r.split('.'));
          var n = i(r[0]);
          return u(t, n)
            ? 1 !== r.length
                ? s.del(t[n], r.slice(1))
                : (a(t) ? t.splice(n, 1) : delete t[n], t)
            : t;
        }), s;
      }
      var c = Object.prototype.toString,
        a =
          Array.isArray ||
          function(t) {
            return '[object Array]' === c.call(t);
          },
        f = u();
      return (f.create = u), (f.withInheritedProps = u({ includeInheritedProps: !0 })), f;
    });
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++)
          r[e] = t[e];
        return r;
      }
      return Array.from(t);
    }
    function o(t, e, r, o) {
      switch (void 0 === t ? 'undefined' : c(t)) {
        case 'object':
          return 'function' == typeof t[o] ? t[o].apply(t, n(r)) : t[o];
        case 'function':
          return t(e);
        default:
          return t;
      }
    }
    function i(t) {
      var e = t.timestamp, r = t.duration;
      return function(t, n, o) {
        var i = ['action'];
        return i.push('%c' + String(t.type)), e && i.push('%c@ ' + n), r &&
          i.push('%c(in ' + o.toFixed(2) + ' ms)'), i.join(' ');
      };
    }
    function u(t, e) {
      var r = e.logger,
        n = e.actionTransformer,
        u = e.titleFormatter,
        c = void 0 === u ? i(e) : u,
        f = e.collapsed,
        l = e.colors,
        p = e.level,
        d = e.diff,
        h = void 0 === e.titleFormatter;
      t.forEach(function(i, u) {
        var v = i.started,
          y = i.startedTime,
          g = i.action,
          b = i.prevState,
          m = i.error,
          w = i.took,
          _ = i.nextState,
          x = t[u + 1];
        x && ((_ = x.prevState), (w = x.started - v));
        var O = n(g),
          E = 'function' == typeof f
            ? f(
                function() {
                  return _;
                },
                g,
                i
              )
            : f,
          j = (0, a.formatTime)(y),
          S = l.title ? 'color: ' + l.title(O) + ';' : '',
          P = ['color: gray; font-weight: lighter;'];
        P.push(
          S
        ), e.timestamp && P.push('color: gray; font-weight: lighter;'), e.duration && P.push('color: gray; font-weight: lighter;');
        var A = c(O, j, w);
        try {
          E
            ? l.title && h
                ? r.groupCollapsed.apply(r, ['%c ' + A].concat(P))
                : r.groupCollapsed(A)
            : l.title && h
                ? r.group.apply(r, ['%c ' + A].concat(P))
                : r.group(A);
        } catch (t) {
          r.log(A);
        }
        var T = o(p, O, [b], 'prevState'),
          k = o(p, O, [O], 'action'),
          R = o(p, O, [m, b], 'error'),
          M = o(p, O, [_], 'nextState');
        T &&
          (l.prevState
            ? r[T](
                '%c prev state',
                'color: ' + l.prevState(b) + '; font-weight: bold',
                b
              )
            : r[T](
                'prev state',
                b
              )), k && (l.action ? r[k]('%c action    ', 'color: ' + l.action(O) + '; font-weight: bold', O) : r[k]('action    ', O)), m && R && (l.error ? r[R]('%c error     ', 'color: ' + l.error(m, b) + '; font-weight: bold;', m) : r[R]('error     ', m)), M && (l.nextState ? r[M]('%c next state', 'color: ' + l.nextState(_) + '; font-weight: bold', _) : r[M]('next state', _)), d && (0, s.default)(b, _, r, E);
        try {
          r.groupEnd();
        } catch (t) {
          r.log('—— log end ——');
        }
      });
    }
    Object.defineProperty(e, '__esModule', { value: !0 });
    var c = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(t) {
          return typeof t;
        }
      : function(t) {
          return t &&
            'function' == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t;
        };
    e.printBuffer = u;
    var a = r(328),
      f = r(390),
      s = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(f);
  },
  function(t, e, r) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = {
      level: 'log',
      logger: console,
      logErrors: !0,
      collapsed: void 0,
      predicate: void 0,
      duration: !1,
      timestamp: !0,
      stateTransformer: function(t) {
        return t;
      },
      actionTransformer: function(t) {
        return t;
      },
      errorTransformer: function(t) {
        return t;
      },
      colors: {
        title: function() {
          return 'inherit';
        },
        prevState: function() {
          return '#9E9E9E';
        },
        action: function() {
          return '#03A9F4';
        },
        nextState: function() {
          return '#4CAF50';
        },
        error: function() {
          return '#F20404';
        },
      },
      diff: !1,
      diffPredicate: void 0,
      transformer: void 0,
    }), (t.exports = e.default);
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++)
          r[e] = t[e];
        return r;
      }
      return Array.from(t);
    }
    function o(t) {
      return 'color: ' + f[t].color + '; font-weight: bold';
    }
    function i(t) {
      var e = t.kind, r = t.path, n = t.lhs, o = t.rhs, i = t.index, u = t.item;
      switch (e) {
        case 'E':
          return [r.join('.'), n, '→', o];
        case 'N':
          return [r.join('.'), o];
        case 'D':
          return [r.join('.')];
        case 'A':
          return [r.join('.') + '[' + i + ']', u];
        default:
          return [];
      }
    }
    function u(t, e, r, u) {
      var c = (0, a.default)(t, e);
      try {
        u ? r.groupCollapsed('diff') : r.group('diff');
      } catch (t) {
        r.log('diff');
      }
      c
        ? c.forEach(function(t) {
            var e = t.kind, u = i(t);
            r.log.apply(r, ['%c ' + f[e].text, o(e)].concat(n(u)));
          })
        : r.log('—— no diff ——');
      try {
        r.groupEnd();
      } catch (t) {
        r.log('—— diff end —— ');
      }
    }
    Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = u);
    var c = r(386),
      a = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(c),
      f = {
        E: { color: '#2196F3', text: 'CHANGED:' },
        N: { color: '#4CAF50', text: 'ADDED:' },
        D: { color: '#F44336', text: 'DELETED:' },
        A: { color: '#2196F3', text: 'ARRAY:' },
      };
    t.exports = e.default;
  },
  function(t, e, r) {
    'use strict';
    function n() {
      var t = arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : {},
        e = o({}, a.default, t),
        r = e.logger,
        n = e.stateTransformer,
        c = e.errorTransformer,
        f = e.predicate,
        s = e.logErrors,
        l = e.diffPredicate;
      if (void 0 === r)
        return function() {
          return function(t) {
            return function(e) {
              return t(e);
            };
          };
        };
      if (t.getState && t.dispatch)
        return console.error(
          "[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"
        ), function() {
          return function(t) {
            return function(e) {
              return t(e);
            };
          };
        };
      var p = [];
      return function(t) {
        var r = t.getState;
        return function(t) {
          return function(a) {
            if ('function' == typeof f && !f(r, a)) return t(a);
            var d = {};
            p.push(
              d
            ), (d.started = u.timer.now()), (d.startedTime = new Date()), (d.prevState = n(
              r()
            )), (d.action = a);
            var h = void 0;
            if (s)
              try {
                h = t(a);
              } catch (t) {
                d.error = c(t);
              }
            else h = t(a);
            (d.took = u.timer.now() - d.started), (d.nextState = n(r()));
            var v = e.diff && 'function' == typeof l ? l(r, a) : e.diff;
            if (
              ((0, i.printBuffer)(
                p,
                o({}, e, { diff: v })
              ), (p.length = 0), d.error)
            )
              throw d.error;
            return h;
          };
        };
      };
    }
    Object.defineProperty(e, '__esModule', {
      value: !0,
    }), (e.logger = e.createLogger = e.defaults = void 0);
    var o =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      },
      i = r(388),
      u = r(328),
      c = r(389),
      a = (function(t) {
        return t && t.__esModule ? t : { default: t };
      })(c),
      f = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : {},
          e = t.dispatch,
          r = t.getState;
        if ('function' == typeof e || 'function' == typeof r)
          return n()({ dispatch: e, getState: r });
        console.error(
          "\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n"
        );
      };
    (e.defaults =
      a.default), (e.createLogger = n), (e.logger = f), (e.default = f);
  },
  function(t, e, r) {
    'use strict';
    function n(t) {
      return function(e) {
        var r = e.dispatch, n = e.getState;
        return function(e) {
          return function(o) {
            return 'function' == typeof o ? o(r, n, t) : e(o);
          };
        };
      };
    }
    e.__esModule = !0;
    var o = n();
    (o.withExtraArgument = n), (e.default = o);
  },
]);
