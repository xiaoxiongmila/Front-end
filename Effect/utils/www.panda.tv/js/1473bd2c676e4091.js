/*! (C) WebReflection Mit Style License */
function commonEventLoop(e, t, n, r) {
  for (var i, s = n.slice(), o = enrich(t, e), u = 0, a = s.length; u < a; u++) {
    handler = s[u], typeof handler == "object" && typeof handler.handleEvent == "function" ? handler.handleEvent(o) : handler.call(e, o);
    if (o.stoppedImmediatePropagation)break
  }
  return i = !o.stoppedPropagation, r && i && e.parentNode ? e.parentNode.dispatchEvent(o) : !o.defaultPrevented
}
function commonDescriptor(e, t) {
  return {configurable: !0, get: e, set: t}
}
function commonTextContent(e, t, n) {
  var r = getOwnPropertyDescriptor(t || e, n);
  defineProperty(e, "textContent", commonDescriptor(function () {
    return r.get.call(this)
  }, function (e) {
    r.set.call(this, e)
  }))
}
function enrich(e, t) {
  return e.currentTarget = t, e.eventPhase = e.target === e.currentTarget ? 2 : 3, e
}
function find(e, t) {
  var n = e.length;
  while (n-- && e[n] !== t);
  return n
}
function getTextContent() {
  if (this.tagName === "BR")return "\n";
  var e = this.firstChild, t = [];
  while (e)e.nodeType !== 8 && e.nodeType !== 7 && t.push(e.textContent), e = e.nextSibling;
  return t.join("")
}
function live(e) {
  return e.nodeType !== 9 && html.contains(e)
}
function onkeyup(e) {
  var t = document.createEvent("Event");
  t.initEvent("input", !0, !0), (e.srcElement || e.fromElement || document).dispatchEvent(t)
}
function onReadyState(e) {
  !READYEVENTDISPATCHED && readyStateOK.test(document.readyState) && (READYEVENTDISPATCHED = !READYEVENTDISPATCHED, document.detachEvent(ONREADYSTATECHANGE, onReadyState), e = document.createEvent("Event"), e.initEvent(DOMCONTENTLOADED, !0, !0), document.dispatchEvent(e))
}
function setTextContent(e) {
  var t;
  while (t = this.lastChild)this.removeChild(t);
  e != null && this.appendChild(document.createTextNode(e))
}
function verify(e, t) {
  return t || (t = window.event), t.target || (t.target = t.srcElement || t.fromElement || document), t.timeStamp || (t.timeStamp = (new Date).getTime()), t
}
var DUNNOABOUTDOMLOADED = !0, READYEVENTDISPATCHED = !1, ONREADYSTATECHANGE = "onreadystatechange", DOMCONTENTLOADED = "DOMContentLoaded", SECRET = "__IE8__" + Math.random(), defineProperty = Object.defineProperty || function (e, t, n) {
    e[t] = n.value
  }, defineProperties = Object.defineProperties || function (e, t) {
    for (var n in t)if (hasOwnProperty.call(t, n))try {
      defineProperty(e, n, t[n])
    } catch (r) {
      window.console && console.log(n + " failed on object:", e, r.message)
    }
  }, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, hasOwnProperty = Object.prototype.hasOwnProperty, ElementPrototype = window.Element.prototype, TextPrototype = window.Text.prototype, possiblyNativeEvent = /^[a-z]+$/, readyStateOK = /loaded|complete/, types = {}, div = document.createElement("div"), html = document.documentElement, removeAttribute = html.removeAttribute, setAttribute = html.setAttribute;
commonTextContent(window.HTMLCommentElement.prototype, ElementPrototype, "nodeValue"), commonTextContent(window.HTMLScriptElement.prototype, null, "text"), commonTextContent(TextPrototype, null, "nodeValue"), commonTextContent(window.HTMLTitleElement.prototype, null, "text"), defineProperty(window.HTMLStyleElement.prototype, "textContent", function (e) {
  return commonDescriptor(function () {
    return e.get.call(this.styleSheet)
  }, function (t) {
    e.set.call(this.styleSheet, t)
  })
}(getOwnPropertyDescriptor(window.CSSStyleSheet.prototype, "cssText"))), defineProperties(ElementPrototype, {
  textContent: {
    get: getTextContent,
    set: setTextContent
  }, firstElementChild: {
    get: function () {
      for (var e = this.childNodes || [], t = 0, n = e.length; t < n; t++)if (e[t].nodeType == 1)return e[t]
    }
  }, lastElementChild: {
    get: function () {
      for (var e = this.childNodes || [], t = e.length; t--;)if (e[t].nodeType == 1)return e[t]
    }
  }, oninput: {
    get: function () {
      return this._oninput || null
    }, set: function (e) {
      this._oninput && (this.removeEventListener("input", this._oninput), this._oninput = e, e && this.addEventListener("input", e))
    }
  }, previousElementSibling: {
    get: function () {
      var e = this.previousSibling;
      while (e && e.nodeType != 1)e = e.previousSibling;
      return e
    }
  }, nextElementSibling: {
    get: function () {
      var e = this.nextSibling;
      while (e && e.nodeType != 1)e = e.nextSibling;
      return e
    }
  }, childElementCount: {
    get: function () {
      for (var e = 0, t = this.childNodes || [], n = t.length; n--; e += t[n].nodeType == 1);
      return e
    }
  }, addEventListener: {
    value: function (e, t, n) {
      var r = this, i = "on" + e, s = r[SECRET] || defineProperty(r, SECRET, {value: {}})[SECRET], o = s[i] || (s[i] = {}), u = o.h || (o.h = []), a, f;
      if (!hasOwnProperty.call(o, "w")) {
        o.w = function (e) {
          return e[SECRET] || commonEventLoop(r, verify(r, e), u, !1)
        };
        if (!hasOwnProperty.call(types, i))if (possiblyNativeEvent.test(e)) {
          try {
            a = document.createEventObject(), a[SECRET] = !0, r.nodeType != 9 && (r.parentNode == null && div.appendChild(r), (f = r.getAttribute(i)) && removeAttribute.call(r, i)), r.fireEvent(i, a), types[i] = !0
          } catch (a) {
            types[i] = !1;
            while (div.hasChildNodes())div.removeChild(div.firstChild)
          }
          f != null && setAttribute.call(r, i, f)
        } else types[i] = !1;
        (o.n = types[i]) && r.attachEvent(i, o.w)
      }
      find(u, t) < 0 && u[n ? "unshift" : "push"](t), e === "input" && r.attachEvent("onkeyup", onkeyup)
    }
  }, dispatchEvent: {
    value: function (e) {
      var t = this, n = "on" + e.type, r = t[SECRET], i = r && r[n], s = !!i, o;
      return e.target || (e.target = t), s ? i.n ? t.fireEvent(n, e) : commonEventLoop(t, e, i.h, !0) : (o = t.parentNode) ? o.dispatchEvent(e) : !0, !e.defaultPrevented
    }
  }, removeEventListener: {
    value: function (e, t, n) {
      var r = this, i = "on" + e, s = r[SECRET], o = s && s[i], u = o && o.h, a = u ? find(u, t) : -1;
      -1 < a && u.splice(a, 1)
    }
  }
}), defineProperties(TextPrototype, {
  addEventListener: {value: ElementPrototype.addEventListener},
  dispatchEvent: {value: ElementPrototype.dispatchEvent},
  removeEventListener: {value: ElementPrototype.removeEventListener}
}), defineProperties(window.XMLHttpRequest.prototype, {
  addEventListener: {
    value: function (e, t, n) {
      var r = this, i = "on" + e, s = r[SECRET] || defineProperty(r, SECRET, {value: {}})[SECRET], o = s[i] || (s[i] = {}), u = o.h || (o.h = []);
      find(u, t) < 0 && (r[i] || (r[i] = function () {
        var t = document.createEvent("Event");
        t.initEvent(e, !0, !0), r.dispatchEvent(t)
      }), u[n ? "unshift" : "push"](t))
    }
  }, dispatchEvent: {
    value: function (e) {
      var t = this, n = "on" + e.type, r = t[SECRET], i = r && r[n], s = !!i;
      return s && (i.n ? t.fireEvent(n, e) : commonEventLoop(t, e, i.h, !0))
    }
  }, removeEventListener: {value: ElementPrototype.removeEventListener}
}), defineProperties(window.Event.prototype, {
  bubbles: {value: !0, writable: !0},
  cancelable: {value: !0, writable: !0},
  preventDefault: {
    value: function () {
      this.cancelable && (this.defaultPrevented = !0, this.returnValue = !1)
    }
  },
  stopPropagation: {
    value: function () {
      this.stoppedPropagation = !0, this.cancelBubble = !0
    }
  },
  stopImmediatePropagation: {
    value: function () {
      this.stoppedImmediatePropagation = !0, this.stopPropagation()
    }
  },
  initEvent: {
    value: function (e, t, n) {
      this.type = e, this.bubbles = !!t, this.cancelable = !!n, this.bubbles || this.stopPropagation()
    }
  }
}), defineProperties(window.HTMLDocument.prototype, {
  defaultView: {
    get: function () {
      return this.parentWindow
    }
  },
  textContent: {
    get: function () {
      return this.nodeType === 11 ? getTextContent.call(this) : null
    }, set: function (e) {
      this.nodeType === 11 && setTextContent.call(this, e)
    }
  },
  addEventListener: {
    value: function (e, t, n) {
      var r = this;
      ElementPrototype.addEventListener.call(r, e, t, n), DUNNOABOUTDOMLOADED && e === DOMCONTENTLOADED && !readyStateOK.test(r.readyState) && (DUNNOABOUTDOMLOADED = !1, r.attachEvent(ONREADYSTATECHANGE, onReadyState), window == top && function i(e) {
        try {
          r.documentElement.doScroll("left"), onReadyState()
        } catch (t) {
          setTimeout(i, 50)
        }
      }())
    }
  },
  dispatchEvent: {value: ElementPrototype.dispatchEvent},
  removeEventListener: {value: ElementPrototype.removeEventListener},
  createEvent: {
    value: function (e) {
      var t;
      if (e !== "Event")throw new Error("unsupported " + e);
      return t = document.createEventObject(), t.timeStamp = (new Date).getTime(), t
    }
  }
}), defineProperties(window.Window.prototype, {
  getComputedStyle: {
    value: function () {
      function i(e) {
        this._ = e
      }

      function s() {
      }

      var e = /^(?:[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/, t = /^(top|right|bottom|left)$/, n = /\-([a-z])/g, r = function (e, t) {
        return t.toUpperCase()
      };
      return i.prototype.getPropertyValue = function (i) {
        var s = this._, o = s.style, u = s.currentStyle, a = s.runtimeStyle, f, l, c;
        return i = (i === "float" ? "style-float" : i).replace(n, r), f = u ? u[i] : o[i], e.test(f) && !t.test(i) && (l = o.left, c = a && a.left, c && (a.left = u.left), o.left = i === "fontSize" ? "1em" : f, f = o.pixelLeft + "px", o.left = l, c && (a.left = c)), f == null ? f : f + "" || "auto"
      }, s.prototype.getPropertyValue = function () {
        return null
      }, function (e, t) {
        return t ? new s(e) : new i(e)
      }
    }()
  }, addEventListener: {
    value: function (e, t, n) {
      var r = window, i = "on" + e, s;
      if (e === "beforeunload")return;
      r[i] || (r[i] = function (e) {
        return commonEventLoop(r, verify(r, e), s, !1)
      }), s = r[i][SECRET] || (r[i][SECRET] = []), find(s, t) < 0 && s[n ? "unshift" : "push"](t)
    }
  }, dispatchEvent: {
    value: function (e) {
      var t = window["on" + e.type];
      return t ? t.call(window, e) !== !1 && !e.defaultPrevented : !0
    }
  }, removeEventListener: {
    value: function (e, t, n) {
      var r = "on" + e, i = (window[r] || Object)[SECRET], s = i ? find(i, t) : -1;
      -1 < s && i.splice(s, 1)
    }
  }
}), function (e, t, n) {
  for (n = 0; n < t.length; n++)document.createElement(t[n]);
  e.length || document.createStyleSheet(""), e[0].addRule(t.join(","), "display:block;")
}(document.styleSheets, ["header", "nav", "section", "article", "aside", "footer"]);