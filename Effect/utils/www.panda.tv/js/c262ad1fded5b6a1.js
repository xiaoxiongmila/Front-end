/*!
 * An jQuery | zepto plugin for lazy loading images.
 * author -> jieyou
 * see https://github.com/jieyou/lazyload
 * use some tuupola's code https://github.com/tuupola/jquery_lazyload (BSD)
 * use component's throttle https://github.com/component/throttle (MIT)
 */
(function (e) {
  typeof define == "function" && define.amd ? define(["jquery"], e) : e(window.jQuery || window.Zepto)
})(function (e, t) {
  function o() {
  }

  function u(e, t) {
    var i;
    return t._$container == r ? i = ("innerHeight" in n ? n.innerHeight : r.height()) + r.scrollTop() : i = t._$container.offset().top + t._$container.height(), i <= e.offset().top - t.threshold
  }

  function a(t, i) {
    var s;
    return i._$container == r ? s = r.width() + (e.fn.scrollLeft ? r.scrollLeft() : n.pageXOffset) : s = i._$container.offset().left + i._$container.width(), s <= t.offset().left - i.threshold
  }

  function f(e, t) {
    var n;
    return t._$container == r ? n = r.scrollTop() : n = t._$container.offset().top, n >= e.offset().top + t.threshold + e.height()
  }

  function l(t, i) {
    var s;
    return i._$container == r ? s = e.fn.scrollLeft ? r.scrollLeft() : n.pageXOffset : s = i._$container.offset().left, s >= t.offset().left + i.threshold + t.width()
  }

  function c(e, t) {
    var n = 0;
    e.each(function (r, i) {
      function o() {
        s.trigger("_lazyload_appear"), n = 0
      }

      var s = e.eq(r);
      if (s.width() <= 0 && s.height() <= 0 || s.css("display") === "none")return;
      if (t.vertical_only) {
        if (!f(s, t))if (!u(s, t))o(); else if (++n > t.failure_limit)return !1
      } else if (!f(s, t) && !l(s, t))if (!u(s, t) && !a(s, t))o(); else if (++n > t.failure_limit)return !1
    })
  }

  function h(e) {
    return e.filter(function (t, n) {
      return !e.eq(t)._lazyload_loadStarted
    })
  }

  function p(e, t) {
    function u() {
      s = 0, o = +(new Date), i = e.apply(n, r), n = null, r = null
    }

    var n, r, i, s, o = 0;
    return function () {
      n = this, r = arguments;
      var a = new Date - o;
      return s || (a >= t ? u() : s = setTimeout(u, t - a)), i
    }
  }

  var n = window, r = e(n), i = {
    threshold: 500,
    failure_limit: 0,
    event: "scroll",
    effect: "show",
    effect_params: null,
    container: n,
    data_attribute: "original",
    data_srcset_attribute: "original-srcset",
    skip_invisible: !0,
    appear: o,
    load: o,
    vertical_only: !1,
    check_appear_throttle_time: 300,
    url_rewriter_fn: o,
    no_fake_img_loader: !1,
    placeholder_data_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
    placeholder_real_img: "http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png"
  }, s;
  s = function () {
    var e = Object.prototype.toString;
    return function (t) {
      return e.call(t).replace("[object ", "").replace("]", "")
    }
  }(), e.fn.hasOwnProperty("lazyload") || (e.fn.lazyload = function (t) {
    var u = this, a, f, l;
    return e.isPlainObject(t) || (t = {}), e.each(i, function (o, u) {
      e.inArray(o, ["threshold", "failure_limit", "check_appear_throttle_time"]) != -1 ? s(t[o]) == "String" ? t[o] = parseInt(t[o], 10) : t[o] = u : o == "container" ? (t.hasOwnProperty(o) ? t[o] == n || t[o] == document ? t._$container = r : t._$container = e(t[o]) : t._$container = r, delete t.container) : i.hasOwnProperty(o) && (!t.hasOwnProperty(o) || s(t[o]) != s(i[o])) && (t[o] = u)
    }), a = t.event == "scroll", l = t.check_appear_throttle_time == 0 ? c : p(c, t.check_appear_throttle_time), f = a || t.event == "scrollstart" || t.event == "scrollstop", u.each(function (n, r) {
      var i = this, s = u.eq(n), a = s.attr("src"), l = s.attr("data-" + t.data_attribute), c = t.url_rewriter_fn == o ? l : t.url_rewriter_fn.call(i, s, l), p = s.attr("data-" + t.data_srcset_attribute), d = s.is("img");
      if (s._lazyload_loadStarted == 1 || a == c) {
        s._lazyload_loadStarted = !0, u = h(u);
        return
      }
      s._lazyload_loadStarted = !1, d && !a && s.one("error", function () {
        s.attr("src", t.placeholder_real_img)
      }).attr("src", t.placeholder_data_img), s.one("_lazyload_appear", function () {
        function a() {
          r && s.hide(), d ? (p && s.attr("srcset", p), c && s.attr("src", c)) : s.css("background-image", 'url("' + c + '")'), r && s[t.effect].apply(s, n ? t.effect_params : []), u = h(u)
        }

        var n = e.isArray(t.effect_params), r;
        s._lazyload_loadStarted || (r = t.effect != "show" && e.fn[t.effect] && (!t.effect_params || n && t.effect_params.length == 0), t.appear != o && t.appear.call(i, s, u.length, t), s._lazyload_loadStarted = !0, t.no_fake_img_loader || p ? (t.load != o && s.one("load", function () {
          t.load.call(i, s, u.length, t)
        }), a()) : e("<img />").one("load", function () {
          a(), t.load != o && t.load.call(i, s, u.length, t)
        }).attr("src", c))
      }), f || s.on(t.event, function () {
        s._lazyload_loadStarted || s.trigger("_lazyload_appear")
      })
    }), f && t._$container.on(t.event, function () {
      l(u, t)
    }), r.on("resize load", function () {
      l(u, t)
    }), e(function () {
      l(u, t)
    }), this
  })
});