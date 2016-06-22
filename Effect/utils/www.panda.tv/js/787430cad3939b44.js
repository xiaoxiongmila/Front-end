(function () {
  function t(e, t) {
    return [].slice.call((t || document).querySelectorAll(e))
  }

  if (!window.addEventListener)return;
  var e = window.StyleFix = {
    link: function (t) {
      var n = t.href || t.getAttribute("data-href");
      try {
        if (!n || t.rel !== "stylesheet" || t.hasAttribute("data-noprefix"))return
      } catch (r) {
        return
      }
      var i = n.replace(/[^\/]+$/, ""), s = (/^[a-z]{3,10}:/.exec(i) || [""])[0], o = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(i) || [""])[0], u = /^([^?]*)\??/.exec(n)[1], a = t.parentNode, f = new XMLHttpRequest, l;
      f.onreadystatechange = function () {
        f.readyState === 4 && l()
      }, l = function () {
        var n = f.responseText;
        if (n && t.parentNode && (!f.status || f.status < 400 || f.status > 600)) {
          n = e.fix(n, !0, t);
          if (n && i) {
            n = n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function (e, t, n) {
              return /^([a-z]{3,10}:|#)/i.test(n) ? e : /^\/\//.test(n) ? 'url("' + s + n + '")' : /^\//.test(n) ? 'url("' + o + n + '")' : /^\?/.test(n) ? 'url("' + u + n + '")' : 'url("' + i + n + '")'
            });
            var r = i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
            n = n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + r, "gi"), "$1")
          }
          var l = document.createElement("style");
          l.textContent = "/*# sourceURL=" + t.getAttribute("href") + " */\n/*@ sourceURL=" + t.getAttribute("href") + " */\n" + n, l.media = t.media, l.disabled = t.disabled, l.setAttribute("data-href", t.getAttribute("href")), t.id && (l.id = t.id), a.insertBefore(l, t), a.removeChild(t), l.media = t.media
        }
      };
      try {
        f.open("GET", n), f.send(null)
      } catch (r) {
        typeof XDomainRequest != "undefined" && (f = new XDomainRequest, f.onerror = f.onprogress = function () {
        }, f.onload = l, f.open("GET", n), f.send(null))
      }
      t.setAttribute("data-inprogress", "")
    }, styleElement: function (t) {
      if (t.hasAttribute("data-noprefix"))return;
      var n = t.disabled;
      t.textContent = e.fix(t.textContent, !0, t), t.disabled = n
    }, styleAttribute: function (t) {
      var n = t.getAttribute("style");
      n = e.fix(n, !1, t), t.setAttribute("style", n)
    }, process: function () {
      t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link), t("style").forEach(StyleFix.styleElement), t("[style]").forEach(StyleFix.styleAttribute)
    }, register: function (t, n) {
      (e.fixers = e.fixers || []).splice(n === undefined ? e.fixers.length : n, 0, t)
    }, fix: function (t, n, r) {
      if (e.fixers)for (var i = 0; i < e.fixers.length; i++)t = e.fixers[i](t, n, r) || t;
      return t
    }, camelCase: function (e) {
      return e.replace(/-([a-z])/g, function (e, t) {
        return t.toUpperCase()
      }).replace("-", "")
    }, deCamelCase: function (e) {
      return e.replace(/[A-Z]/g, function (e) {
        return "-" + e.toLowerCase()
      })
    }
  };
  (function () {
    setTimeout(function () {
      t('link[rel="stylesheet"]').forEach(StyleFix.link)
    }, 10), document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
  })()
})(), function (e) {
  function t(e, t, r, i, s) {
    e = n[e];
    if (e.length) {
      var o = RegExp(t + "(" + e.join("|") + ")" + r, "gi");
      s = s.replace(o, i)
    }
    return s
  }

  if (!window.StyleFix || !window.getComputedStyle)return;
  var n = window.PrefixFree = {
    prefixCSS: function (e, r, i) {
      var s = n.prefix;
      n.functions.indexOf("linear-gradient") > -1 && (e = e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, function (e, t, n, r) {
        return t + (n || "") + "linear-gradient(" + (90 - r) + "deg"
      })), e = t("functions", "(\\s|:|,)", "\\s*\\(", "$1" + s + "$2(", e), e = t("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + s + "$2$3", e), e = t("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + s + "$2:", e);
      if (n.properties.length) {
        var o = RegExp("\\b(" + n.properties.join("|") + ")(?!:)", "gi");
        e = t("valueProperties", "\\b", ":(.+?);", function (e) {
          return e.replace(o, s + "$1")
        }, e)
      }
      return r && (e = t("selectors", "", "\\b", n.prefixSelector, e), e = t("atrules", "@", "\\b", "@" + s + "$1", e)), e = e.replace(RegExp("-" + s, "g"), "-"), e = e.replace(/-\*-(?=[a-z]+)/gi, n.prefix), e
    }, property: function (e) {
      return (n.properties.indexOf(e) >= 0 ? n.prefix : "") + e
    }, value: function (e, r) {
      return e = t("functions", "(^|\\s|,)", "\\s*\\(", "$1" + n.prefix + "$2(", e), e = t("keywords", "(^|\\s)", "(\\s|$)", "$1" + n.prefix + "$2$3", e), n.valueProperties.indexOf(r) >= 0 && (e = t("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + n.prefix + "$2$3", e)), e
    }, prefixSelector: function (e) {
      return e.replace(/^:{1,2}/, function (e) {
        return e + n.prefix
      })
    }, prefixProperty: function (e, t) {
      var r = n.prefix + e;
      return t ? StyleFix.camelCase(r) : r
    }
  };
  (function () {
    var e = {}, t = [], r = {}, i = getComputedStyle(document.documentElement, null), s = document.createElement("div").style, o = function (n) {
      if (n.charAt(0) === "-") {
        t.push(n);
        var r = n.split("-"), i = r[1];
        e[i] = ++e[i] || 1;
        while (r.length > 3) {
          r.pop();
          var s = r.join("-");
          u(s) && t.indexOf(s) === -1 && t.push(s)
        }
      }
    }, u = function (e) {
      return StyleFix.camelCase(e) in s
    };
    if (i && i.length > 0)for (var a = 0; a < i.length; a++)o(i[a]); else for (var f in i)o(StyleFix.deCamelCase(f));
    var l = {uses: 0};
    for (var c in e) {
      var h = e[c];
      l.uses < h && (l = {prefix: c, uses: h})
    }
    n.prefix = "-" + l.prefix + "-", n.Prefix = StyleFix.camelCase(n.prefix), n.properties = [];
    for (var a = 0; a < t.length; a++) {
      var f = t[a];
      if (f.indexOf(n.prefix) === 0) {
        var p = f.slice(n.prefix.length);
        u(p) || n.properties.push(p)
      }
    }
    n.Prefix == "Ms" && !("transform" in s) && !("MsTransform" in s) && "msTransform" in s && n.properties.push("transform", "transform-origin"), n.properties.sort()
  })(), function () {
    function i(e, t) {
      return r[t] = "", r[t] = e, !!r[t]
    }

    var e = {
      "linear-gradient": {property: "backgroundImage", params: "red, teal"},
      calc: {property: "width", params: "1px + 5%"},
      element: {property: "backgroundImage", params: "#foo"},
      "cross-fade": {property: "backgroundImage", params: "url(a.png), url(b.png), 50%"}
    };
    e["repeating-linear-gradient"] = e["repeating-radial-gradient"] = e["radial-gradient"] = e["linear-gradient"];
    var t = {
      initial: "color",
      "zoom-in": "cursor",
      "zoom-out": "cursor",
      box: "display",
      flexbox: "display",
      "inline-flexbox": "display",
      flex: "display",
      "inline-flex": "display",
      grid: "display",
      "inline-grid": "display",
      "max-content": "width",
      "min-content": "width",
      "fit-content": "width",
      "fill-available": "width"
    };
    n.functions = [], n.keywords = [];
    var r = document.createElement("div").style;
    for (var s in e) {
      var o = e[s], u = o.property, a = s + "(" + o.params + ")";
      !i(a, u) && i(n.prefix + a, u) && n.functions.push(s)
    }
    for (var f in t) {
      var u = t[f];
      !i(f, u) && i(n.prefix + f, u) && n.keywords.push(f)
    }
  }(), function () {
    function s(e) {
      return i.textContent = e + "{}", !!i.sheet.cssRules.length
    }

    var t = {":read-only": null, ":read-write": null, ":any-link": null, "::selection": null}, r = {
      keyframes: "name",
      viewport: null,
      document: 'regexp(".")'
    };
    n.selectors = [], n.atrules = [];
    var i = e.appendChild(document.createElement("style"));
    for (var o in t) {
      var u = o + (t[o] ? "(" + t[o] + ")" : "");
      !s(u) && s(n.prefixSelector(u)) && n.selectors.push(o)
    }
    for (var a in r) {
      var u = a + " " + (r[a] || "");
      !s("@" + u) && s("@" + n.prefix + u) && n.atrules.push(a)
    }
    e.removeChild(i)
  }(), n.valueProperties = ["transition", "transition-property", "will-change"], e.className += " " + n.prefix, StyleFix.register(n.prefixCSS)
}(document.documentElement), !function (e, t, n) {
  function r() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : k ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
  }

  function i(e) {
    var t = w.className, n = T._config.classPrefix || "";
    if (k && (t = t.baseVal), T._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2")
    }
    T._config.enableClasses && (t += " " + n + e.join(" " + n), k ? w.className.baseVal = t : w.className = t)
  }

  function s(e, t) {
    return typeof e === t
  }

  function o() {
    var e, t, n, r, i, o, u;
    for (var a in S)if (S.hasOwnProperty(a)) {
      if (e = [], t = S[a], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))for (n = 0; n < t.options.aliases.length; n++)e.push(t.options.aliases[n].toLowerCase());
      for (r = s(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++)o = e[i], u = o.split("."), 1 === u.length ? T[u[0]] = r : (!T[u[0]] || T[u[0]] instanceof Boolean || (T[u[0]] = new Boolean(T[u[0]])), T[u[0]][u[1]] = r), b.push((r ? "" : "no-") + u.join("-"))
    }
  }

  function u(e, t) {
    if ("object" == typeof e)for (var n in e)_(e, n) && u(n, e[n]); else {
      e = e.toLowerCase();
      var r = e.split("."), s = T[r[0]];
      if (2 == r.length && (s = s[r[1]]), "undefined" != typeof s)return T;
      t = "function" == typeof t ? t() : t, 1 == r.length ? T[r[0]] = t : (!T[r[0]] || T[r[0]] instanceof Boolean || (T[r[0]] = new Boolean(T[r[0]])), T[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), T._trigger(e, t)
    }
    return T
  }

  function a(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase()
    }).replace(/^-/, "")
  }

  function f(e, t) {
    return !!~("" + e).indexOf(t)
  }

  function l() {
    var e = t.body;
    return e || (e = r(k ? "svg" : "body"), e.fake = !0), e
  }

  function c(e, n, i, s) {
    var o, u, a, f, c = "modernizr", h = r("div"), p = l();
    if (parseInt(i, 10))for (; i--;)a = r("div"), a.id = s ? s[i] : c + (i + 1), h.appendChild(a);
    return o = r("style"), o.type = "text/css", o.id = "s" + c, (p.fake ? p : h).appendChild(o), p.appendChild(h), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), h.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = w.style.overflow, w.style.overflow = "hidden", w.appendChild(p)), u = n(h, e), p.fake ? (p.parentNode.removeChild(p), w.style.overflow = f, w.offsetHeight) : h.parentNode.removeChild(h), !!u
  }

  function h(e, t) {
    return function () {
      return e.apply(t, arguments)
    }
  }

  function p(e, t, n) {
    var r;
    for (var i in e)if (e[i] in t)return n === !1 ? e[i] : (r = t[e[i]], s(r, "function") ? h(r, n || t) : r);
    return !1
  }

  function d(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }

  function v(t, r) {
    var i = t.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; i--;)if (e.CSS.supports(d(t[i]), r))return !0;
      return !1
    }
    if ("CSSSupportsRule" in e) {
      for (var s = []; i--;)s.push("(" + d(t[i]) + ":" + r + ")");
      return s = s.join(" or "), c("@supports (" + s + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == getComputedStyle(e, null).position
      })
    }
    return n
  }

  function m(e, t, i, o) {
    function u() {
      c && (delete z.style, delete z.modElem)
    }

    if (o = s(o, "undefined") ? !1 : o, !s(i, "undefined")) {
      var l = v(e, i);
      if (!s(l, "undefined"))return l
    }
    for (var c, h, p, d, m, g = ["modernizr", "tspan"]; !z.style;)c = !0, z.modElem = r(g.shift()), z.style = z.modElem.style;
    for (p = e.length, h = 0; p > h; h++)if (d = e[h], m = z.style[d], f(d, "-") && (d = a(d)), z.style[d] !== n) {
      if (o || s(i, "undefined"))return u(), "pfx" == t ? d : !0;
      try {
        z.style[d] = i
      } catch (y) {
      }
      if (z.style[d] != m)return u(), "pfx" == t ? d : !0
    }
    return u(), !1
  }

  function g(e, t, n, r, i) {
    var o = e.charAt(0).toUpperCase() + e.slice(1), u = (e + " " + F.join(o + " ") + o).split(" ");
    return s(t, "string") || s(t, "undefined") ? m(u, t, r, i) : (u = (e + " " + M.join(o + " ") + o).split(" "), p(u, t, n))
  }

  function y(e, t, r) {
    return g(e, n, n, t, r)
  }

  var b = [], w = t.documentElement, E = {}.toString, S = [], x = {
    _version: "3.3.1",
    _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
    _q: [],
    on: function (e, t) {
      var n = this;
      setTimeout(function () {
        t(n[e])
      }, 0)
    },
    addTest: function (e, t, n) {
      S.push({name: e, fn: t, options: n})
    },
    addAsyncTest: function (e) {
      S.push({name: null, fn: e})
    }
  }, T = function () {
  };
  T.prototype = x, T = new T, T.addTest("sessionstorage", function () {
    var e = "modernizr";
    try {
      return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
    } catch (t) {
      return !1
    }
  }), T.addTest("websqldatabase", "openDatabase" in e), T.addTest("localstorage", function () {
    var e = "modernizr";
    try {
      return localStorage.setItem(e, e), localStorage.removeItem(e), !0
    } catch (t) {
      return !1
    }
  }), T.addTest("webworkers", "Worker" in e), T.addTest("svgclippaths", function () {
    return !!t.createElementNS && /SVGClipPath/.test(E.call(t.createElementNS("http://www.w3.org/2000/svg", "clipPath")))
  }), T.addTest("smil", function () {
    return !!t.createElementNS && /SVGAnimate/.test(E.call(t.createElementNS("http://www.w3.org/2000/svg", "animate")))
  });
  var N = "CSS" in e && "supports" in e.CSS, C = "supportsCSS" in e;
  T.addTest("supports", N || C);
  var k = "svg" === w.nodeName.toLowerCase();
  T.addTest("inlinesvg", function () {
    var e = r("div");
    return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI)
  });
  var L = x._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  x._prefixes = L;
  var A = function () {
    function e(e, t) {
      var s;
      return e ? (t && "string" != typeof t || (t = r(t || "div")), e = "on" + e, s = e in t, !s && i && (t.setAttribute || (t = r("div")), t.setAttribute(e, ""), s = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), s) : !1
    }

    var i = !("onblur" in t.documentElement);
    return e
  }();
  x.hasEvent = A;
  var O = "Moz O ms Webkit", M = x._config.usePrefixes ? O.toLowerCase().split(" ") : [];
  x._domPrefixes = M, k || !function (e, t) {
    function n(e, t) {
      var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
      return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
    }

    function r() {
      var e = b.elements;
      return "string" == typeof e ? e.split(" ") : e
    }

    function i(e, t) {
      var n = b.elements;
      "string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), b.elements = n + " " + e, f(t)
    }

    function s(e) {
      var t = y[e[m]];
      return t || (t = {}, g++, e[m] = g, y[g] = t), t
    }

    function o(e, n, r) {
      if (n || (n = t), c)return n.createElement(e);
      r || (r = s(n));
      var i;
      return i = r.cache[e] ? r.cache[e].cloneNode() : v.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !i.canHaveChildren || d.test(e) || i.tagUrn ? i : r.frag.appendChild(i)
    }

    function u(e, n) {
      if (e || (e = t), c)return e.createDocumentFragment();
      n = n || s(e);
      for (var i = n.frag.cloneNode(), o = 0, u = r(), a = u.length; a > o; o++)i.createElement(u[o]);
      return i
    }

    function a(e, t) {
      t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
        return b.shivMethods ? o(n, e, t) : t.createElem(n)
      }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function (e) {
          return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
        }) + ");return n}")(b, t.frag)
    }

    function f(e) {
      e || (e = t);
      var r = s(e);
      return !b.shivCSS || l || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || a(e, r), e
    }

    var l, c, h = "3.7.3", p = e.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, v = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, m = "_html5shiv", g = 0, y = {};
    !function () {
      try {
        var e = t.createElement("a");
        e.innerHTML = "<xyz></xyz>", l = "hidden" in e, c = 1 == e.childNodes.length || function () {
            t.createElement("a");
            var e = t.createDocumentFragment();
            return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
          }()
      } catch (n) {
        l = !0, c = !0
      }
    }();
    var b = {
      elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
      version: h,
      shivCSS: p.shivCSS !== !1,
      supportsUnknownElements: c,
      shivMethods: p.shivMethods !== !1,
      type: "default",
      shivDocument: f,
      createElement: o,
      createDocumentFragment: u,
      addElements: i
    };
    e.html5 = b, f(t), "object" == typeof module && module.exports && (module.exports = b)
  }("undefined" != typeof e ? e : this, t), T.addTest("applicationcache", "applicationCache" in e), T.addTest("audio", function () {
    var e = r("audio"), t = !1;
    try {
      (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
    } catch (n) {
    }
    return t
  }), T.addTest("canvas", function () {
    var e = r("canvas");
    return !!e.getContext && !!e.getContext("2d")
  }), T.addTest("canvastext", function () {
    return T.canvas === !1 ? !1 : "function" == typeof r("canvas").getContext("2d").fillText
  }), T.addTest("geolocation", "geolocation" in navigator), T.addTest("hashchange", function () {
    return A("hashchange", e) === !1 ? !1 : t.documentMode === n || t.documentMode > 7
  }), T.addTest("history", function () {
    var t = navigator.userAgent;
    return -1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") ? e.history && "pushState" in e.history : !1
  }), T.addTest("postmessage", "postMessage" in e), T.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), T.addTest("video", function () {
    var e = r("video"), t = !1;
    try {
      (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
    } catch (n) {
    }
    return t
  }), T.addTest("webgl", function () {
    var t = r("canvas"), n = "probablySupportsContext" in t ? "probablySupportsContext" : "supportsContext";
    return n in t ? t[n]("webgl") || t[n]("experimental-webgl") : "WebGLRenderingContext" in e
  }), T.addTest("websockets", "WebSocket" in e && 2 === e.WebSocket.CLOSING);
  var _;
  !function () {
    var e = {}.hasOwnProperty;
    _ = s(e, "undefined") || s(e.call, "undefined") ? function (e, t) {
      return t in e && s(e.constructor.prototype[t], "undefined")
    } : function (t, n) {
      return e.call(t, n)
    }
  }(), x._l = {}, x.on = function (e, t) {
    this._l[e] || (this._l[e] = []), this._l[e].push(t), T.hasOwnProperty(e) && setTimeout(function () {
      T._trigger(e, T[e])
    }, 0)
  }, x._trigger = function (e, t) {
    if (this._l[e]) {
      var n = this._l[e];
      setTimeout(function () {
        var e, r;
        for (e = 0; e < n.length; e++)(r = n[e])(t)
      }, 0), delete this._l[e]
    }
  }, T._q.push(function () {
    x.addTest = u
  }), T.addTest("cssgradients", function () {
    for (var e, t = "background-image:", n = "gradient(linear,left top,right bottom,from(#9f9),to(white));", i = "", s = 0, o = L.length - 1; o > s; s++)e = 0 === s ? "to " : "", i += t + L[s] + "linear-gradient(" + e + "left top, #9f9, white);";
    T._config.usePrefixes && (i += t + "-webkit-" + n);
    var u = r("a"), a = u.style;
    return a.cssText = i, ("" + a.backgroundImage).indexOf("gradient") > -1
  }), T.addTest("multiplebgs", function () {
    var e = r("a").style;
    return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
  }), T.addTest("opacity", function () {
    var e = r("a").style;
    return e.cssText = L.join("opacity:.55;"), /^0.55$/.test(e.opacity)
  }), T.addTest("rgba", function () {
    var e = r("a").style;
    return e.cssText = "background-color:rgba(150,255,150,.5)", ("" + e.backgroundColor).indexOf("rgba") > -1
  });
  var D = r("input"), P = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "), H = {};
  T.input = function (t) {
    for (var n = 0, i = t.length; i > n; n++)H[t[n]] = t[n] in D;
    return H.list && (H.list = !!r("datalist") && !!e.HTMLDataListElement), H
  }(P);
  var B = "search tel url email datetime date month week time datetime-local number range color".split(" "), j = {};
  T.inputtypes = function (e) {
    for (var r, i, s, o = e.length, u = "1)", a = 0; o > a; a++)D.setAttribute("type", r = e[a]), s = "text" !== D.type && "style" in D, s && (D.value = u, D.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && D.style.WebkitAppearance !== n ? (w.appendChild(D), i = t.defaultView, s = i.getComputedStyle && "textfield" !== i.getComputedStyle(D, null).WebkitAppearance && 0 !== D.offsetHeight, w.removeChild(D)) : /^(search|tel)$/.test(r) || (s = /^(url|email)$/.test(r) ? D.checkValidity && D.checkValidity() === !1 : D.value != u)), j[e[a]] = !!s;
    return j
  }(B), T.addTest("hsla", function () {
    var e = r("a").style;
    return e.cssText = "background-color:hsla(120,40%,100%,.5)", f(e.backgroundColor, "rgba") || f(e.backgroundColor, "hsla")
  });
  var F = x._config.usePrefixes ? O.split(" ") : [];
  x._cssomPrefixes = F;
  var I = function (t) {
    var r, i = L.length, s = e.CSSRule;
    if ("undefined" == typeof s)return n;
    if (!t)return !1;
    if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in s)return "@" + t;
    for (var o = 0; i > o; o++) {
      var u = L[o], a = u.toUpperCase() + "_" + r;
      if (a in s)return "@-" + u.toLowerCase() + "-" + t
    }
    return !1
  };
  x.atRule = I;
  var q = x.testStyles = c, R = function () {
    var e = navigator.userAgent, t = e.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1), n = e.match(/w(eb)?osbrowser/gi), r = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9, i = 533 > t && e.match(/android/gi);
    return n || i || r
  }();
  R ? T.addTest("fontface", !1) : q('@font-face {font-family:"font";src:url("https://")}', function (e, n) {
    var r = t.getElementById("smodernizr"), i = r.sheet || r.styleSheet, s = i ? i.cssRules && i.cssRules[0] ? i.cssRules[0].cssText : i.cssText || "" : "", o = /src/i.test(s) && 0 === s.indexOf(n.split(" ")[0]);
    T.addTest("fontface", o)
  }), q('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function (e) {
    T.addTest("generatedcontent", e.offsetHeight >= 7)
  });
  var U = {elem: r("modernizr")};
  T._q.push(function () {
    delete U.elem
  });
  var z = {style: U.elem.style};
  T._q.unshift(function () {
    delete z.style
  });
  var W = x.testProp = function (e, t, r) {
    return m([e], n, t, r)
  };
  T.addTest("textshadow", W("textShadow", "1px 1px")), x.testAllProps = g;
  var X, V = x.prefixed = function (e, t, n) {
    return 0 === e.indexOf("@") ? I(e) : (-1 != e.indexOf("-") && (e = a(e)), t ? g(e, t, n) : g(e, "pfx"))
  };
  try {
    X = V("indexedDB", e)
  } catch ($) {
  }
  T.addTest("indexeddb", !!X), X && T.addTest("indexeddb.deletedatabase", "deleteDatabase" in X), x.testAllProps = y, T.addTest("csstransforms", function () {
    return -1 === navigator.userAgent.indexOf("Android 2.") && y("transform", "scale(1)", !0)
  }), T.addTest("csstransforms3d", function () {
    var e = !!y("perspective", "1px", !0), t = T._config.usePrefixes;
    if (e && (!t || "webkitPerspective" in w.style)) {
      var n, r = "#modernizr{width:0;height:0}";
      T.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", q(r + n, function (t) {
        e = 7 === t.offsetWidth && 18 === t.offsetHeight
      })
    }
    return e
  }), T.addTest("csstransitions", y("transition", "all", !0)), T.addTest("cssanimations", y("animationName", "a", !0)), T.addTest("backgroundsize", y("backgroundSize", "100%", !0)), T.addTest("borderimage", y("borderImage", "url() 1", !0)), T.addTest("borderradius", y("borderRadius", "0px", !0)), T.addTest("boxshadow", y("boxShadow", "1px 1px", !0)), function () {
    T.addTest("csscolumns", function () {
      var e = !1, t = y("columnCount");
      try {
        (e = !!t) && (e = new Boolean(e))
      } catch (n) {
      }
      return e
    });
    for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < n.length; r++)e = n[r].toLowerCase(), t = y("column" + n[r]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || y(n[r])), T.addTest("csscolumns." + e, t)
  }(), T.addTest("flexbox", y("flexBasis", "1px", !0)), T.addTest("cssreflections", y("boxReflect", "above", !0)), o(), i(b), delete x.addTest, delete x.addAsyncTest;
  for (var J = 0; J < T._q.length; J++)T._q[J]();
  e.Modernizr = T
}(window, document), function (e, t) {
  "use strict";
  typeof define == "function" && define.amd ? define(t) : typeof exports == "object" ? module.exports = t() : e.returnExports = t()
}(this, function () {
  var e = Array, t = e.prototype, n = Object, r = n.prototype, i = Function.prototype, s = String, o = s.prototype, u = Number, a = u.prototype, f = t.slice, l = t.splice, c = t.push, h = t.unshift, p = t.concat, d = i.call, v = i.apply, m = Math.max, g = Math.min, y = r.toString, b = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol", w, E = Function.prototype.toString, S = function (t) {
    try {
      return E.call(t), !0
    } catch (n) {
      return !1
    }
  }, x = "[object Function]", T = "[object GeneratorFunction]";
  w = function (t) {
    if (typeof t != "function")return !1;
    if (b)return S(t);
    var n = y.call(t);
    return n === x || n === T
  };
  var N, C = RegExp.prototype.exec, k = function (t) {
    try {
      return C.call(t), !0
    } catch (n) {
      return !1
    }
  }, L = "[object RegExp]";
  N = function (t) {
    return typeof t != "object" ? !1 : b ? k(t) : y.call(t) === L
  };
  var A, O = String.prototype.valueOf, M = function (t) {
    try {
      return O.call(t), !0
    } catch (n) {
      return !1
    }
  }, _ = "[object String]";
  A = function (t) {
    return typeof t == "string" ? !0 : typeof t != "object" ? !1 : b ? M(t) : y.call(t) === _
  };
  var D = n.defineProperty && function () {
      try {
        var e = {};
        n.defineProperty(e, "x", {enumerable: !1, value: e});
        for (var t in e)return !1;
        return e.x === e
      } catch (r) {
        return !1
      }
    }(), P = function (e) {
    var t;
    return D ? t = function (e, t, r, i) {
      if (!i && t in e)return;
      n.defineProperty(e, t, {configurable: !0, enumerable: !1, writable: !0, value: r})
    } : t = function (e, t, n, r) {
      if (!r && t in e)return;
      e[t] = n
    }, function (r, i, s) {
      for (var o in i)e.call(i, o) && t(r, o, i[o], s)
    }
  }(r.hasOwnProperty), H = function (t) {
    var n = typeof t;
    return t === null || n !== "object" && n !== "function"
  }, B = u.isNaN || function (e) {
      return e !== e
    }, j = {
    ToInteger: function (t) {
      var n = +t;
      return B(n) ? n = 0 : n !== 0 && n !== 1 / 0 && n !== -1 / 0 && (n = (n > 0 || -1) * Math.floor(Math.abs(n))), n
    }, ToPrimitive: function (t) {
      var n, r, i;
      if (H(t))return t;
      r = t.valueOf;
      if (w(r)) {
        n = r.call(t);
        if (H(n))return n
      }
      i = t.toString;
      if (w(i)) {
        n = i.call(t);
        if (H(n))return n
      }
      throw new TypeError
    }, ToObject: function (e) {
      if (e == null)throw new TypeError("can't convert " + e + " to object");
      return n(e)
    }, ToUint32: function (t) {
      return t >>> 0
    }
  }, F = function () {
  };
  P(i, {
    bind: function (t) {
      var r = this;
      if (!w(r))throw new TypeError("Function.prototype.bind called on incompatible " + r);
      var i = f.call(arguments, 1), s, o = function () {
        if (this instanceof s) {
          var e = r.apply(this, p.call(i, f.call(arguments)));
          return n(e) === e ? e : this
        }
        return r.apply(t, p.call(i, f.call(arguments)))
      }, u = m(0, r.length - i.length), a = [];
      for (var l = 0; l < u; l++)c.call(a, "$" + l);
      return s = Function("binder", "return function (" + a.join(",") + "){ return binder.apply(this, arguments); }")(o), r.prototype && (F.prototype = r.prototype, s.prototype = new F, F.prototype = null), s
    }
  });
  var I = d.bind(r.hasOwnProperty), q = d.bind(r.toString), R = d.bind(f), U = v.bind(f), z = d.bind(o.slice), W = d.bind(o.split), X = d.bind(o.indexOf), V = d.bind(c), $ = d.bind(r.propertyIsEnumerable), J = d.bind(t.sort), K = e.isArray || function (t) {
      return q(t) === "[object Array]"
    }, Q = [].unshift(0) !== 1;
  P(t, {
    unshift: function () {
      return h.apply(this, arguments), this.length
    }
  }, Q), P(e, {isArray: K});
  var G = n("a"), Y = G[0] !== "a" || !(0 in G), Z = function (t) {
    var n = !0, r = !0, i = !1;
    if (t)try {
      t.call("foo", function (e, t, r) {
        typeof r != "object" && (n = !1)
      }), t.call([1], function () {
        "use strict";
        r = typeof this == "string"
      }, "x")
    } catch (s) {
      i = !0
    }
    return !!t && !i && n && r
  };
  P(t, {
    forEach: function (t) {
      var n = j.ToObject(this), r = Y && A(this) ? W(this, "") : n, i = -1, s = j.ToUint32(r.length), o;
      arguments.length > 1 && (o = arguments[1]);
      if (!w(t))throw new TypeError("Array.prototype.forEach callback must be a function");
      while (++i < s)i in r && (typeof o == "undefined" ? t(r[i], i, n) : t.call(o, r[i], i, n))
    }
  }, !Z(t.forEach)), P(t, {
    map: function (n) {
      var r = j.ToObject(this), i = Y && A(this) ? W(this, "") : r, s = j.ToUint32(i.length), o = e(s), u;
      arguments.length > 1 && (u = arguments[1]);
      if (!w(n))throw new TypeError("Array.prototype.map callback must be a function");
      for (var a = 0; a < s; a++)a in i && (typeof u == "undefined" ? o[a] = n(i[a], a, r) : o[a] = n.call(u, i[a], a, r));
      return o
    }
  }, !Z(t.map)), P(t, {
    filter: function (t) {
      var n = j.ToObject(this), r = Y && A(this) ? W(this, "") : n, i = j.ToUint32(r.length), s = [], o, u;
      arguments.length > 1 && (u = arguments[1]);
      if (!w(t))throw new TypeError("Array.prototype.filter callback must be a function");
      for (var a = 0; a < i; a++)a in r && (o = r[a], (typeof u == "undefined" ? t(o, a, n) : t.call(u, o, a, n)) && V(s, o));
      return s
    }
  }, !Z(t.filter)), P(t, {
    every: function (t) {
      var n = j.ToObject(this), r = Y && A(this) ? W(this, "") : n, i = j.ToUint32(r.length), s;
      arguments.length > 1 && (s = arguments[1]);
      if (!w(t))throw new TypeError("Array.prototype.every callback must be a function");
      for (var o = 0; o < i; o++)if (o in r && (typeof s == "undefined" ? !t(r[o], o, n) : !t.call(s, r[o], o, n)))return !1;
      return !0
    }
  }, !Z(t.every)), P(t, {
    some: function (t) {
      var n = j.ToObject(this), r = Y && A(this) ? W(this, "") : n, i = j.ToUint32(r.length), s;
      arguments.length > 1 && (s = arguments[1]);
      if (!w(t))throw new TypeError("Array.prototype.some callback must be a function");
      for (var o = 0; o < i; o++)if (o in r && (typeof s == "undefined" ? t(r[o], o, n) : t.call(s, r[o], o, n)))return !0;
      return !1
    }
  }, !Z(t.some));
  var et = !1;
  t.reduce && (et = typeof t.reduce.call("es5", function (e, t, n, r) {
      return r
    }) == "object"), P(t, {
    reduce: function (t) {
      var n = j.ToObject(this), r = Y && A(this) ? W(this, "") : n, i = j.ToUint32(r.length);
      if (!w(t))throw new TypeError("Array.prototype.reduce callback must be a function");
      if (i === 0 && arguments.length === 1)throw new TypeError("reduce of empty array with no initial value");
      var s = 0, o;
      if (arguments.length >= 2)o = arguments[1]; else do {
        if (s in r) {
          o = r[s++];
          break
        }
        if (++s >= i)throw new TypeError("reduce of empty array with no initial value")
      } while (!0);
      for (; s < i; s++)s in r && (o = t(o, r[s], s, n));
      return o
    }
  }, !et);
  var tt = !1;
  t.reduceRight && (tt = typeof t.reduceRight.call("es5", function (e, t, n, r) {
      return r
    }) == "object"), P(t, {
    reduceRight: function (t) {
      var n = j.ToObject(this), r = Y && A(this) ? W(this, "") : n, i = j.ToUint32(r.length);
      if (!w(t))throw new TypeError("Array.prototype.reduceRight callback must be a function");
      if (i === 0 && arguments.length === 1)throw new TypeError("reduceRight of empty array with no initial value");
      var s, o = i - 1;
      if (arguments.length >= 2)s = arguments[1]; else do {
        if (o in r) {
          s = r[o--];
          break
        }
        if (--o < 0)throw new TypeError("reduceRight of empty array with no initial value")
      } while (!0);
      if (o < 0)return s;
      do o in r && (s = t(s, r[o], o, n)); while (o--);
      return s
    }
  }, !tt);
  var nt = t.indexOf && [0, 1].indexOf(1, 2) !== -1;
  P(t, {
    indexOf: function (t) {
      var n = Y && A(this) ? W(this, "") : j.ToObject(this), r = j.ToUint32(n.length);
      if (r === 0)return -1;
      var i = 0;
      arguments.length > 1 && (i = j.ToInteger(arguments[1])), i = i >= 0 ? i : m(0, r + i);
      for (; i < r; i++)if (i in n && n[i] === t)return i;
      return -1
    }
  }, nt);
  var rt = t.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
  P(t, {
    lastIndexOf: function (t) {
      var n = Y && A(this) ? W(this, "") : j.ToObject(this), r = j.ToUint32(n.length);
      if (r === 0)return -1;
      var i = r - 1;
      arguments.length > 1 && (i = g(i, j.ToInteger(arguments[1]))), i = i >= 0 ? i : r - Math.abs(i);
      for (; i >= 0; i--)if (i in n && t === n[i])return i;
      return -1
    }
  }, rt);
  var it = function () {
    var e = [1, 2], t = e.splice();
    return e.length === 2 && K(t) && t.length === 0
  }();
  P(t, {
    splice: function (t, n) {
      return arguments.length === 0 ? [] : l.apply(this, arguments)
    }
  }, !it);
  var st = function () {
    var e = {};
    return t.splice.call(e, 0, 0, 1), e.length === 1
  }();
  P(t, {
    splice: function (t, n) {
      if (arguments.length === 0)return [];
      var r = arguments;
      return this.length = m(j.ToInteger(this.length), 0), arguments.length > 0 && typeof n != "number" && (r = R(arguments), r.length < 2 ? V(r, this.length - t) : r[1] = j.ToInteger(n)), l.apply(this, r)
    }
  }, !st);
  var ot = function () {
    var t = new e(1e5);
    return t[8] = "x", t.splice(1, 1), t.indexOf("x") === 7
  }(), ut = function () {
    var e = 256, t = [];
    return t[e] = "a", t.splice(e + 1, 0, "b"), t[e] === "a"
  }();
  P(t, {
    splice: function (t, n) {
      var r = j.ToObject(this), i = [], o = j.ToUint32(r.length), u = j.ToInteger(t), a = u < 0 ? m(o + u, 0) : g(u, o), f = g(m(j.ToInteger(n), 0), o - a), l = 0, c;
      while (l < f)c = s(a + l), I(r, c) && (i[l] = r[c]), l += 1;
      var h = R(arguments, 2), p = h.length, d;
      if (p < f) {
        l = a;
        while (l < o - f)c = s(l + f), d = s(l + p), I(r, c) ? r[d] = r[c] : delete r[d], l += 1;
        l = o;
        while (l > o - f + p)delete r[l - 1], l -= 1
      } else if (p > f) {
        l = o - f;
        while (l > a)c = s(l + f - 1), d = s(l + p - 1), I(r, c) ? r[d] = r[c] : delete r[d], l -= 1
      }
      l = a;
      for (var v = 0; v < h.length; ++v)r[l] = h[v], l += 1;
      return r.length = o - f + p, i
    }
  }, !ot || !ut);
  var at = t.join, ft;
  try {
    ft = Array.prototype.join.call("123", ",") !== "1,2,3"
  } catch (lt) {
    ft = !0
  }
  ft && P(t, {
    join: function (t) {
      var n = typeof t == "undefined" ? "," : t;
      return at.call(A(this) ? W(this, "") : this, n)
    }
  }, ft);
  var ct = [1, 2].join(undefined) !== "1,2";
  ct && P(t, {
    join: function (t) {
      var n = typeof t == "undefined" ? "," : t;
      return at.call(this, n)
    }
  }, ct);
  var ht = function (t) {
    var n = j.ToObject(this), r = j.ToUint32(n.length), i = 0;
    while (i < arguments.length)n[r + i] = arguments[i], i += 1;
    return n.length = r + i, r + i
  }, pt = function () {
    var e = {}, t = Array.prototype.push.call(e, undefined);
    return t !== 1 || e.length !== 1 || typeof e[0] != "undefined" || !I(e, 0)
  }();
  P(t, {
    push: function (t) {
      return K(this) ? c.apply(this, arguments) : ht.apply(this, arguments)
    }
  }, pt);
  var dt = function () {
    var e = [], t = e.push(undefined);
    return t !== 1 || e.length !== 1 || typeof e[0] != "undefined" || !I(e, 0)
  }();
  P(t, {push: ht}, dt), P(t, {
    slice: function (e, t) {
      var n = A(this) ? W(this, "") : this;
      return U(n, arguments)
    }
  }, Y);
  var vt = function () {
    try {
      return [1, 2].sort(null), [1, 2].sort({}), !0
    } catch (e) {
    }
    return !1
  }(), mt = function () {
    try {
      return [1, 2].sort(/a/), !1
    } catch (e) {
    }
    return !0
  }(), gt = function () {
    try {
      return [1, 2].sort(undefined), !0
    } catch (e) {
    }
    return !1
  }();
  P(t, {
    sort: function (t) {
      if (typeof t == "undefined")return J(this);
      if (!w(t))throw new TypeError("Array.prototype.sort callback must be a function");
      return J(this, t)
    }
  }, vt || !gt || !mt);
  var yt = !{toString: null}.propertyIsEnumerable("toString"), bt = function () {
  }.propertyIsEnumerable("prototype"), wt = !I("x", "0"), Et = function (e) {
    var t = e.constructor;
    return t && t.prototype === e
  }, St = {
    $window: !0,
    $console: !0,
    $parent: !0,
    $self: !0,
    $frame: !0,
    $frames: !0,
    $frameElement: !0,
    $webkitIndexedDB: !0,
    $webkitStorageInfo: !0,
    $external: !0
  }, xt = function () {
    if (typeof window == "undefined")return !1;
    for (var e in window)try {
      !St["$" + e] && I(window, e) && window[e] !== null && typeof window[e] == "object" && Et(window[e])
    } catch (t) {
      return !0
    }
    return !1
  }(), Tt = function (e) {
    if (typeof window == "undefined" || !xt)return Et(e);
    try {
      return Et(e)
    } catch (t) {
      return !1
    }
  }, Nt = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], Ct = Nt.length, kt = function (t) {
    return q(t) === "[object Arguments]"
  }, Lt = function (t) {
    return t !== null && typeof t == "object" && typeof t.length == "number" && t.length >= 0 && !K(t) && w(t.callee)
  }, At = kt(arguments) ? kt : Lt;
  P(n, {
    keys: function (t) {
      var n = w(t), r = At(t), i = t !== null && typeof t == "object", o = i && A(t);
      if (!i && !n && !r)throw new TypeError("Object.keys called on a non-object");
      var u = [], a = bt && n;
      if (o && wt || r)for (var f = 0; f < t.length; ++f)V(u, s(f));
      if (!r)for (var l in t)(!a || l !== "prototype") && I(t, l) && V(u, s(l));
      if (yt) {
        var c = Tt(t);
        for (var h = 0; h < Ct; h++) {
          var p = Nt[h];
          (!c || p !== "constructor") && I(t, p) && V(u, p)
        }
      }
      return u
    }
  });
  var Ot = n.keys && function () {
      return n.keys(arguments).length === 2
    }(1, 2), Mt = n.keys && function () {
      var e = n.keys(arguments);
      return arguments.length !== 1 || e.length !== 1 || e[0] !== 1
    }(1), _t = n.keys;
  P(n, {
    keys: function (t) {
      return At(t) ? _t(R(t)) : _t(t)
    }
  }, !Ot || Mt);
  var Dt = (new Date(-0xc782b5b342b24)).getUTCMonth() !== 0, Pt = new Date(-0x55d318d56a724), Ht = new Date(14496624e5), Bt = Pt.toUTCString() !== "Mon, 01 Jan -45875 11:59:59 GMT"
    , jt, Ft, It = Pt.getTimezoneOffset();
  It < -720 ? (jt = Pt.toDateString() !== "Tue Jan 02 -45875", Ft = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(Ht.toString())) : (jt = Pt.toDateString() !== "Mon Jan 01 -45875", Ft = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(Ht.toString()));
  var qt = d.bind(Date.prototype.getFullYear), Rt = d.bind(Date.prototype.getMonth), Ut = d.bind(Date.prototype.getDate), zt = d.bind(Date.prototype.getUTCFullYear), Wt = d.bind(Date.prototype.getUTCMonth), Xt = d.bind(Date.prototype.getUTCDate), Vt = d.bind(Date.prototype.getUTCDay), $t = d.bind(Date.prototype.getUTCHours), Jt = d.bind(Date.prototype.getUTCMinutes), Kt = d.bind(Date.prototype.getUTCSeconds), Qt = d.bind(Date.prototype.getUTCMilliseconds), Gt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"], Yt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Zt = function (t, n) {
    return Ut(new Date(n, t, 0))
  };
  P(Date.prototype, {
    getFullYear: function () {
      if (!!this && this instanceof Date) {
        var t = qt(this);
        return t < 0 && Rt(this) > 11 ? t + 1 : t
      }
      throw new TypeError("this is not a Date object.")
    }, getMonth: function () {
      if (!!this && this instanceof Date) {
        var t = qt(this), n = Rt(this);
        return t < 0 && n > 11 ? 0 : n
      }
      throw new TypeError("this is not a Date object.")
    }, getDate: function () {
      if (!!this && this instanceof Date) {
        var t = qt(this), n = Rt(this), r = Ut(this);
        if (t < 0 && n > 11) {
          if (n === 12)return r;
          var i = Zt(0, t + 1);
          return i - r + 1
        }
        return r
      }
      throw new TypeError("this is not a Date object.")
    }, getUTCFullYear: function () {
      if (!!this && this instanceof Date) {
        var t = zt(this);
        return t < 0 && Wt(this) > 11 ? t + 1 : t
      }
      throw new TypeError("this is not a Date object.")
    }, getUTCMonth: function () {
      if (!!this && this instanceof Date) {
        var t = zt(this), n = Wt(this);
        return t < 0 && n > 11 ? 0 : n
      }
      throw new TypeError("this is not a Date object.")
    }, getUTCDate: function () {
      if (!!this && this instanceof Date) {
        var t = zt(this), n = Wt(this), r = Xt(this);
        if (t < 0 && n > 11) {
          if (n === 12)return r;
          var i = Zt(0, t + 1);
          return i - r + 1
        }
        return r
      }
      throw new TypeError("this is not a Date object.")
    }
  }, Dt), P(Date.prototype, {
    toUTCString: function () {
      if (!!this && this instanceof Date) {
        var t = Vt(this), n = Xt(this), r = Wt(this), i = zt(this), s = $t(this), o = Jt(this), u = Kt(this);
        return Gt[t] + ", " + (n < 10 ? "0" + n : n) + " " + Yt[r] + " " + i + " " + (s < 10 ? "0" + s : s) + ":" + (o < 10 ? "0" + o : o) + ":" + (u < 10 ? "0" + u : u) + " GMT"
      }
      throw new TypeError("this is not a Date object.")
    }
  }, Dt || Bt), P(Date.prototype, {
    toDateString: function () {
      if (!!this && this instanceof Date) {
        var t = this.getDay(), n = this.getDate(), r = this.getMonth(), i = this.getFullYear();
        return Gt[t] + " " + Yt[r] + " " + (n < 10 ? "0" + n : n) + " " + i
      }
      throw new TypeError("this is not a Date object.")
    }
  }, Dt || jt);
  if (Dt || Ft)Date.prototype.toString = function _n() {
    if (!!this && this instanceof Date) {
      var e = this.getDay(), t = this.getDate(), n = this.getMonth(), r = this.getFullYear(), i = this.getHours(), s = this.getMinutes(), o = this.getSeconds(), u = this.getTimezoneOffset(), a = Math.floor(Math.abs(u) / 60), f = Math.floor(Math.abs(u) % 60);
      return Gt[e] + " " + Yt[n] + " " + (t < 10 ? "0" + t : t) + " " + r + " " + (i < 10 ? "0" + i : i) + ":" + (s < 10 ? "0" + s : s) + ":" + (o < 10 ? "0" + o : o) + " GMT" + (u > 0 ? "-" : "+") + (a < 10 ? "0" + a : a) + (f < 10 ? "0" + f : f)
    }
    throw new TypeError("this is not a Date object.")
  }, D && n.defineProperty(Date.prototype, "toString", {configurable: !0, enumerable: !1, writable: !0});
  var en = -621987552e5, tn = "-000001", nn = Date.prototype.toISOString && (new Date(en)).toISOString().indexOf(tn) === -1, rn = Date.prototype.toISOString && (new Date(-1)).toISOString() !== "1969-12-31T23:59:59.999Z";
  P(Date.prototype, {
    toISOString: function () {
      if (!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");
      var t = zt(this), n = Wt(this);
      t += Math.floor(n / 12), n = (n % 12 + 12) % 12;
      var r = [n + 1, Xt(this), $t(this), Jt(this), Kt(this)];
      t = (t < 0 ? "-" : t > 9999 ? "+" : "") + z("00000" + Math.abs(t), 0 <= t && t <= 9999 ? -4 : -6);
      for (var i = 0; i < r.length; ++i)r[i] = z("00" + r[i], -2);
      return t + "-" + R(r, 0, 2).join("-") + "T" + R(r, 2).join(":") + "." + z("000" + Qt(this), -3) + "Z"
    }
  }, nn || rn);
  var sn = function () {
    try {
      return Date.prototype.toJSON && (new Date(NaN)).toJSON() === null && (new Date(en)).toJSON().indexOf(tn) !== -1 && Date.prototype.toJSON.call({
          toISOString: function () {
            return !0
          }
        })
    } catch (e) {
      return !1
    }
  }();
  sn || (Date.prototype.toJSON = function (t) {
    var r = n(this), i = j.ToPrimitive(r);
    if (typeof i == "number" && !isFinite(i))return null;
    var s = r.toISOString;
    if (!w(s))throw new TypeError("toISOString property is not callable");
    return s.call(r)
  });
  var on = Date.parse("+033658-09-27T01:46:40.000Z") === 1e15, un = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")), an = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
  if (an || un || !on) {
    var fn = Math.pow(2, 31) - 1, ln = B((new Date(1970, 0, 1, 0, 0, 0, fn + 1)).getTime());
    Date = function (e) {
      var t = function (r, i, o, u, a, f, l) {
        var c = arguments.length, h;
        if (this instanceof e) {
          var p = f, d = l;
          if (ln && c >= 7 && l > fn) {
            var v = Math.floor(l / fn) * fn, m = Math.floor(v / 1e3);
            p += m, d -= m * 1e3
          }
          h = c === 1 && s(r) === r ? new e(t.parse(r)) : c >= 7 ? new e(r, i, o, u, a, p, d) : c >= 6 ? new e(r, i, o, u, a, p) : c >= 5 ? new e(r, i, o, u, a) : c >= 4 ? new e(r, i, o, u) : c >= 3 ? new e(r, i, o) : c >= 2 ? new e(r, i) : c >= 1 ? new e(r) : new e
        } else h = e.apply(this, arguments);
        return H(h) || P(h, {constructor: t}, !0), h
      }, n = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), r = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], i = function (t, n) {
        var i = n > 1 ? 1 : 0;
        return r[n] + Math.floor((t - 1969 + i) / 4) - Math.floor((t - 1901 + i) / 100) + Math.floor((t - 1601 + i) / 400) + 365 * (t - 1970)
      }, o = function (n) {
        var r = 0, i = n;
        if (ln && i > fn) {
          var s = Math.floor(i / fn) * fn, o = Math.floor(s / 1e3);
          r += o, i -= o * 1e3
        }
        return u(new e(1970, 0, 1, 0, 0, r, i))
      };
      for (var a in e)I(e, a) && (t[a] = e[a]);
      P(t, {now: e.now, UTC: e.UTC}, !0), t.prototype = e.prototype, P(t.prototype, {constructor: t}, !0);
      var f = function (r) {
        var s = n.exec(r);
        if (s) {
          var a = u(s[1]), f = u(s[2] || 1) - 1, l = u(s[3] || 1) - 1, c = u(s[4] || 0), h = u(s[5] || 0), p = u(s[6] || 0), d = Math.floor(u(s[7] || 0) * 1e3), v = Boolean(s[4] && !s[8]), m = s[9] === "-" ? 1 : -1, g = u(s[10] || 0), y = u(s[11] || 0), b, w = h > 0 || p > 0 || d > 0;
          if (c < (w ? 24 : 25) && h < 60 && p < 60 && d < 1e3 && f > -1 && f < 12 && g < 24 && y < 60 && l > -1 && l < i(a, f + 1) - i(a, f)) {
            b = ((i(a, f) + l) * 24 + c + g * m) * 60, b = ((b + h + y * m) * 60 + p) * 1e3 + d, v && (b = o(b));
            if (-864e13 <= b && b <= 864e13)return b
          }
          return NaN
        }
        return e.parse.apply(this, arguments)
      };
      return P(t, {parse: f}), t
    }(Date)
  }
  Date.now || (Date.now = function () {
    return (new Date).getTime()
  });
  var cn = a.toFixed && (8e-5.toFixed(3) !== "0.000" || .9.toFixed(0) !== "1" || 1.255.toFixed(2) !== "1.25" || 0xde0b6b3a7640080.toFixed(0) !== "1000000000000000128"), hn = {
    base: 1e7,
    size: 6,
    data: [0, 0, 0, 0, 0, 0],
    multiply: function (t, n) {
      var r = -1, i = n;
      while (++r < hn.size)i += t * hn.data[r], hn.data[r] = i % hn.base, i = Math.floor(i / hn.base)
    },
    divide: function (t) {
      var n = hn.size, r = 0;
      while (--n >= 0)r += hn.data[n], hn.data[n] = Math.floor(r / t), r = r % t * hn.base
    },
    numToString: function () {
      var t = hn.size, n = "";
      while (--t >= 0)if (n !== "" || t === 0 || hn.data[t] !== 0) {
        var r = s(hn.data[t]);
        n === "" ? n = r : n += z("0000000", 0, 7 - r.length) + r
      }
      return n
    },
    pow: function Dn(e, t, n) {
      return t === 0 ? n : t % 2 === 1 ? Dn(e, t - 1, n * e) : Dn(e * e, t / 2, n)
    },
    log: function (t) {
      var n = 0, r = t;
      while (r >= 4096)n += 12, r /= 4096;
      while (r >= 2)n += 1, r /= 2;
      return n
    }
  }, pn = function (t) {
    var n, r, i, o, a, f, l, c;
    n = u(t), n = B(n) ? 0 : Math.floor(n);
    if (n < 0 || n > 20)throw new RangeError("Number.toFixed called with invalid number of decimals");
    r = u(this);
    if (B(r))return "NaN";
    if (r <= -1e21 || r >= 1e21)return s(r);
    i = "", r < 0 && (i = "-", r = -r), o = "0";
    if (r > 1e-21) {
      a = hn.log(r * hn.pow(2, 69, 1)) - 69, f = a < 0 ? r * hn.pow(2, -a, 1) : r / hn.pow(2, a, 1), f *= 4503599627370496, a = 52 - a;
      if (a > 0) {
        hn.multiply(0, f), l = n;
        while (l >= 7)hn.multiply(1e7, 0), l -= 7;
        hn.multiply(hn.pow(10, l, 1), 0), l = a - 1;
        while (l >= 23)hn.divide(1 << 23), l -= 23;
        hn.divide(1 << l), hn.multiply(1, 1), hn.divide(2), o = hn.numToString()
      } else hn.multiply(0, f), hn.multiply(1 << -a, 0), o = hn.numToString() + z("0.00000000000000000000", 2, 2 + n)
    }
    return n > 0 ? (c = o.length, c <= n ? o = i + z("0.0000000000000000000", 0, n - c + 2) + o : o = i + z(o, 0, c - n) + "." + z(o, c - n)) : o = i + o, o
  };
  P(a, {toFixed: pn}, cn);
  var dn = function () {
    try {
      return 1..toPrecision(undefined) === "1"
    } catch (e) {
      return !0
    }
  }(), vn = a.toPrecision;
  P(a, {
    toPrecision: function (t) {
      return typeof t == "undefined" ? vn.call(this) : vn.call(this, t)
    }
  }, dn), "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || "tesst".split(/(s)*/)[1] === "t" || "test".split(/(?:)/, -1).length !== 4 || "".split(/.?/).length || ".".split(/()()/).length > 1 ? function () {
    var e = typeof /()??/.exec("")[1] == "undefined", t = Math.pow(2, 32) - 1;
    o.split = function (n, r) {
      var i = String(this);
      if (typeof n == "undefined" && r === 0)return [];
      if (!N(n))return W(this, n, r);
      var s = [], o = (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.unicode ? "u" : "") + (n.sticky ? "y" : ""), u = 0, a, f, l, h, p = new RegExp(n.source, o + "g");
      e || (a = new RegExp("^" + p.source + "$(?!\\s)", o));
      var d = typeof r == "undefined" ? t : j.ToUint32(r);
      f = p.exec(i);
      while (f) {
        l = f.index + f[0].length;
        if (l > u) {
          V(s, z(i, u, f.index)), !e && f.length > 1 && f[0].replace(a, function () {
            for (var e = 1; e < arguments.length - 2; e++)typeof arguments[e] == "undefined" && (f[e] = void 0)
          }), f.length > 1 && f.index < i.length && c.apply(s, R(f, 1)), h = f[0].length, u = l;
          if (s.length >= d)break
        }
        p.lastIndex === f.index && p.lastIndex++, f = p.exec(i)
      }
      return u === i.length ? (h || !p.test("")) && V(s, "") : V(s, z(i, u)), s.length > d ? R(s, 0, d) : s
    }
  }() : "0".split(void 0, 0).length && (o.split = function (t, n) {
    return typeof t == "undefined" && n === 0 ? [] : W(this, t, n)
  });
  var mn = o.replace, gn = function () {
    var e = [];
    return "x".replace(/x(.)?/g, function (t, n) {
      V(e, n)
    }), e.length === 1 && typeof e[0] == "undefined"
  }();
  gn || (o.replace = function (t, n) {
    var r = w(n), i = N(t) && /\)[*?]/.test(t.source);
    if (!r || !i)return mn.call(this, t, n);
    var s = function (e) {
      var r = arguments.length, i = t.lastIndex;
      t.lastIndex = 0;
      var s = t.exec(e) || [];
      return t.lastIndex = i, V(s, arguments[r - 2], arguments[r - 1]), n.apply(this, s)
    };
    return mn.call(this, t, s)
  });
  var yn = o.substr, bn = "".substr && "0b".substr(-1) !== "b";
  P(o, {
    substr: function (t, n) {
      var r = t;
      return t < 0 && (r = m(this.length + t, 0)), yn.call(this, r, n)
    }
  }, bn);
  var wn = "	\n\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff", En = "\u200b", Sn = "[" + wn + "]", xn = new RegExp("^" + Sn + Sn + "*"), Tn = new RegExp(Sn + Sn + "*$"), Nn = o.trim && (wn.trim() || !En.trim());
  P(o, {
    trim: function () {
      if (typeof this == "undefined" || this === null)throw new TypeError("can't convert " + this + " to object");
      return s(this).replace(xn, "").replace(Tn, "")
    }
  }, Nn);
  var Cn = d.bind(String.prototype.trim), kn = o.lastIndexOf && "abc\u3042\u3044".lastIndexOf("\u3042\u3044", 2) !== -1;
  P(o, {
    lastIndexOf: function (t) {
      if (typeof this == "undefined" || this === null)throw new TypeError("can't convert " + this + " to object");
      var n = s(this), r = s(t), i = arguments.length > 1 ? u(arguments[1]) : NaN, o = B(i) ? Infinity : j.ToInteger(i), a = g(m(o, 0), n.length), f = r.length, l = a + f;
      while (l > 0) {
        l = m(0, l - f);
        var c = X(z(n, l, a + f), r);
        if (c !== -1)return l + c
      }
      return -1
    }
  }, kn);
  var Ln = o.lastIndexOf;
  P(o, {
    lastIndexOf: function (t) {
      return Ln.apply(this, arguments)
    }
  }, o.lastIndexOf.length !== 1);
  if (parseInt(wn + "08") !== 8 || parseInt(wn + "0x16") !== 22)parseInt = function (e) {
    var t = /^[\-+]?0[xX]/;
    return function (r, i) {
      var s = Cn(r), o = u(i) || (t.test(s) ? 16 : 10);
      return e(s, o)
    }
  }(parseInt);
  1 / parseFloat("-0") !== -Infinity && (parseFloat = function (e) {
    return function (n) {
      var r = Cn(n), i = e(r);
      return i === 0 && z(r, 0, 1) === "-" ? 0 : i
    }
  }(parseFloat));
  if (String(new RangeError("test")) !== "RangeError: test") {
    var An = function Pn() {
      if (typeof this == "undefined" || this === null)throw new TypeError("can't convert " + this + " to object");
      var e = this.name;
      typeof e == "undefined" ? e = "Error" : typeof e != "string" && (e = s(e));
      var t = this.message;
      return typeof t == "undefined" ? t = "" : typeof t != "string" && (t = s(t)), e ? t ? e + ": " + t : e : t
    };
    Error.prototype.toString = An
  }
  if (D) {
    var On = function (e, t) {
      if ($(e, t)) {
        var n = Object.getOwnPropertyDescriptor(e, t);
        n.enumerable = !1, Object.defineProperty(e, t, n)
      }
    };
    On(Error.prototype, "message"), Error.prototype.message !== "" && (Error.prototype.message = ""), On(Error.prototype, "name")
  }
  if (String(/a/mig) !== "/a/gim") {
    var Mn = function Hn() {
      var e = "/" + this.source + "/";
      return this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), e
    };
    RegExp.prototype.toString = Mn
  }
}), function (e, t) {
  "use strict";
  typeof define == "function" && define.amd ? define(t) : typeof exports == "object" ? module.exports = t() : e.returnExports = t()
}(this, function () {
  var e = Function.call, t = Object.prototype, n = e.bind(t.hasOwnProperty), r = e.bind(t.propertyIsEnumerable), i = e.bind(t.toString), s, o, u, a, f = n(t, "__defineGetter__");
  f && (s = e.bind(t.__defineGetter__), o = e.bind(t.__defineSetter__), u = e.bind(t.__lookupGetter__), a = e.bind(t.__lookupSetter__)), Object.getPrototypeOf || (Object.getPrototypeOf = function (n) {
    var r = n.__proto__;
    return r || r === null ? r : i(n.constructor) === "[object Function]" ? n.constructor.prototype : n instanceof Object ? t : null
  });
  var l = function (t) {
    try {
      return t.sentinel = 0, Object.getOwnPropertyDescriptor(t, "sentinel").value === 0
    } catch (n) {
      return !1
    }
  };
  if (Object.defineProperty) {
    var c = l({}), h = typeof document == "undefined" || l(document.createElement("div"));
    if (!h || !c)var p = Object.getOwnPropertyDescriptor
  }
  if (!Object.getOwnPropertyDescriptor || p) {
    var d = "Object.getOwnPropertyDescriptor called on a non-object: ";
    Object.getOwnPropertyDescriptor = function (i, s) {
      if (typeof i != "object" && typeof i != "function" || i === null)throw new TypeError(d + i);
      if (p)try {
        return p.call(Object, i, s)
      } catch (o) {
      }
      var l;
      if (!n(i, s))return l;
      l = {enumerable: r(i, s), configurable: !0};
      if (f) {
        var c = i.__proto__, h = i !== t;
        h && (i.__proto__ = t);
        var v = u(i, s), m = a(i, s);
        h && (i.__proto__ = c);
        if (v || m)return v && (l.get = v), m && (l.set = m), l
      }
      return l.value = i[s], l.writable = !0, l
    }
  }
  Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (t) {
    return Object.keys(t)
  });
  if (!Object.create) {
    var v, m = !({__proto__: null} instanceof Object), g = function () {
      if (!document.domain)return !1;
      try {
        return !!(new ActiveXObject("htmlfile"))
      } catch (t) {
        return !1
      }
    }, y = function () {
      var t, n;
      return n = new ActiveXObject("htmlfile"), n.write("<script></script>"), n.close(), t = n.parentWindow.Object.prototype, n = null, t
    }, b = function () {
      var t = document.createElement("iframe"), n = document.body || document.documentElement, r;
      return t.style.display = "none", n.appendChild(t), t.src = "javascript:", r = t.contentWindow.Object.prototype, n.removeChild(t), t = null, r
    };
    m || typeof document == "undefined" ? v = function () {
      return {__proto__: null}
    } : v = function () {
      var e = g() ? y() : b();
      delete e.constructor, delete e.hasOwnProperty, delete e.propertyIsEnumerable, delete e.isPrototypeOf, delete e.toLocaleString, delete e.toString, delete e.valueOf;
      var t = function () {
      };
      return t.prototype = e, v = function () {
        return new t
      }, new t
    }, Object.create = function (t, n) {
      var r, i = function () {
      };
      if (t === null)r = v(); else {
        if (typeof t != "object" && typeof t != "function")throw new TypeError("Object prototype may only be an Object or null");
        i.prototype = t, r = new i, r.__proto__ = t
      }
      return n !== void 0 && Object.defineProperties(r, n), r
    }
  }
  var w = function (t) {
    try {
      return Object.defineProperty(t, "sentinel", {}), "sentinel" in t
    } catch (n) {
      return !1
    }
  };
  if (Object.defineProperty) {
    var E = w({}), S = typeof document == "undefined" || w(document.createElement("div"));
    if (!E || !S)var x = Object.defineProperty, T = Object.defineProperties
  }
  if (!Object.defineProperty || x) {
    var N = "Property description must be an object: ", C = "Object.defineProperty called on non-object: ", k = "getters & setters can not be defined on this javascript engine";
    Object.defineProperty = function (n, r, i) {
      if (typeof n != "object" && typeof n != "function" || n === null)throw new TypeError(C + n);
      if (typeof i != "object" && typeof i != "function" || i === null)throw new TypeError(N + i);
      if (x)try {
        return x.call(Object, n, r, i)
      } catch (l) {
      }
      if ("value" in i)if (f && (u(n, r) || a(n, r))) {
        var c = n.__proto__;
        n.__proto__ = t, delete n[r], n[r] = i.value, n.__proto__ = c
      } else n[r] = i.value; else {
        if (!f && ("get" in i || "set" in i))throw new TypeError(k);
        "get" in i && s(n, r, i.get), "set" in i && o(n, r, i.set)
      }
      return n
    }
  }
  if (!Object.defineProperties || T)Object.defineProperties = function (t, n) {
    if (T)try {
      return T.call(Object, t, n)
    } catch (r) {
    }
    return Object.keys(n).forEach(function (e) {
      e !== "__proto__" && Object.defineProperty(t, e, n[e])
    }), t
  };
  Object.seal || (Object.seal = function (t) {
    if (Object(t) !== t)throw new TypeError("Object.seal can only be called on Objects.");
    return t
  }), Object.freeze || (Object.freeze = function (t) {
    if (Object(t) !== t)throw new TypeError("Object.freeze can only be called on Objects.");
    return t
  });
  try {
    Object.freeze(function () {
    })
  } catch (L) {
    Object.freeze = function (e) {
      return function (n) {
        return typeof n == "function" ? n : e(n)
      }
    }(Object.freeze)
  }
  Object.preventExtensions || (Object.preventExtensions = function (t) {
    if (Object(t) !== t)throw new TypeError("Object.preventExtensions can only be called on Objects.");
    return t
  }), Object.isSealed || (Object.isSealed = function (t) {
    if (Object(t) !== t)throw new TypeError("Object.isSealed can only be called on Objects.");
    return !1
  }), Object.isFrozen || (Object.isFrozen = function (t) {
    if (Object(t) !== t)throw new TypeError("Object.isFrozen can only be called on Objects.");
    return !1
  }), Object.isExtensible || (Object.isExtensible = function (t) {
    if (Object(t) !== t)throw new TypeError("Object.isExtensible can only be called on Objects.");
    var r = "";
    while (n(t, r))r += "?";
    t[r] = !0;
    var i = n(t, r);
    return delete t[r], i
  })
});