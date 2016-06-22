/*!
 * API参见 http://wiki.pandatv.com/display/FE/PDR
 */
(function (e) {
  e.console = e.console || {
      log: function () {
      }, debug: function () {
      }, dir: function () {
      }, error: function () {
      }, trace: function () {
      }
    }, console.__originLog = console.log;
  if (!e.location.hash || -1 === e.location.hash.indexOf("__debug__") && -1 === e.location.hash.indexOf("__test__"))console.log = function () {
  };
  var t = {
    ssl: e.location.protocol === "https:", getProtocol: function () {
      return t.ssl ? "https:" : "http:"
    }, getStaticSslUrl: function (e) {
      return t.ssl ? e.replace(/^http:\/\/(i|s)[0-9]\.pdim\.gs/, function (e, t) {
        return t === "i" ? "http://i.ssl.pdim.gs" : "http://s.ssl.pdim.gs"
      }) : e
    }
  };
  (function () {
    var n = $.now(), r = n, i = !0;
    e.xdomain && (i = !!e.xdomain.slaves[t.getProtocol() + "//roll.panda.tv"]), i && $.getJSON(t.getProtocol() + "//roll.panda.tv/get_comm?_=" + $.now()).done(function (e) {
      e.errno === 0 && e.data && (n = e.data.ts, r = $.now())
    }), t.getServerTime = function () {
      return n + $.now() - r
    }
  })(), !t.host && e._config_env != "dev" && e.location.host !== "www.panda.tv" && (t.host = "www.panda.tv"), t.ajax = function (e, n) {
    var r;
    return $.isPlainObject(e) ? (n = e, e = n.url) : $.type(e) === "string" && (n = n || {}), e && t.host && (r = t.parseUrl(e), r.hostname !== t.host && (r.hostname = t.host, e = t.formatUrl(r))), n.url = e, $.ajax(n)
  }, t.parseUrl = function () {
    function t() {
      return new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/)
    }

    function n(e) {
      return decodeURIComponent(e.replace(/\+/g, " "))
    }

    function r(e, t) {
      var n = e.charAt(0), r = t.split(n);
      return n === e ? r : (e = parseInt(e.substring(1), 10), r[e < 0 ? r.length + e : e - 1])
    }

    function i(e, t) {
      var r = e.charAt(0), i = t.split("&"), s = [], o = {}, u = [], a = e.substring(1), f, l;
      for (f = 0, l = i.length; f < l; f++) {
        s = i[f].match(/(.*?)=(.*)/), s || (s = [i[f], i[f], ""]);
        if (s[1].replace(/\s/g, "") !== "") {
          s[2] = n(s[2] || "");
          if (a === s[1])return s[2];
          u = s[1].match(/(.*)\[([0-9]+)\]/), u ? (o[u[1]] = o[u[1]] || [], o[u[1]][u[2]] = s[2]) : o[s[1]] = s[2]
        }
      }
      return r === e ? o : o[a]
    }

    return function (n, s) {
      var o = {}, u;
      arguments.length === 1 && (s = n, n = "{}");
      if (n === "tld?")return t();
      s = s || e.location.toString();
      if (!n)return s;
      n = n.toString();
      if (u = s.match(/^mailto:([^\/].+)/))o.protocol = "mailto", o.email = u[1]; else {
        if (u = s.match(/(.*?)\/#\!(.*)/))s = u[1] + u[2];
        if (u = s.match(/(.*?)#(.*)/))o.hash = u[2], s = u[1];
        if (o.hash && n.match(/^#/))return i(n, o.hash);
        if (u = s.match(/(.*?)\?(.*)/))o.query = u[2], s = u[1];
        if (o.query && n.match(/^\?/))return i(n, o.query);
        if (u = s.match(/(.*?)\:?\/\/(.*)/))o.protocol = u[1].toLowerCase(), s = u[2];
        if (u = s.match(/(.*?)(\/.*)/))o.path = u[2], s = u[1];
        o.path = (o.path || "").replace(/^([^\/])/, "/$1"), o.path && o.path !== "/" && (o.path = o.path.replace(/\/$/, "")), n.match(/^[\-0-9]+$/) && (n = n.replace(/^([^\/])/, "/$1"));
        if (n.match(/^\//))return r(n, o.path.substring(1));
        u = r("/-1", o.path.substring(1)), u && (u = u.match(/(.*?)\.(.*)/)) && (o.file = u[0], o.filename = u[1], o.fileext = u[2]);
        if (u = s.match(/(.*)\:([0-9]+)$/))o.port = u[2], s = u[1];
        if (u = s.match(/(.*?)@(.*)/))o.auth = u[1], s = u[2];
        o.auth && (u = o.auth.match(/(.*)\:(.*)/), o.user = u ? u[1] : o.auth, o.pass = u ? u[2] : undefined), o.hostname = s.toLowerCase();
        if (n.charAt(0) === ".")return r(n, o.hostname);
        t() && (u = o.hostname.match(t()), u && (o.tld = u[3], o.domain = u[2] ? u[2] + "." + u[3] : undefined, o.sub = u[1] || undefined)), o.port = o.port || (o.protocol === "https" ? "443" : "80"), o.protocol = o.protocol || (o.port === "443" ? "https" : "http")
      }
      return n in o ? o[n] : n === "{}" ? o : undefined
    }
  }(), t.formatUrl = function (n, r) {
    typeof n == "string" && (n = t.parseUrl("{}", n));
    if (r)for (var i in r)n[i] = r[i];
    var s = e.location, o = "", u = n.protocol || s.protocol, a = n.path || "";
    return n.hostname && (u && (o += u + (u.charAt(u.length - 1) === ":" ? "" : ":")), o += "//", n.auth && (o += n.auth + "@"), o += n.hostname, n.port && n.port != "80" && (o += ":" + n.port)), n.hostname ? o += (a.charAt(0) === "/" ? "" : "/") + a : o += a, n.query && (o += (n.query.charAt(0) === "?" ? "" : "?") + n.query), n.hash && (o += (n.hash.charAt(0) === "#" ? "" : "#") + n.hash), o
  }, t.getRoomId = function (n) {
    var r, i;
    return i = n ? "" : e.location.pathname, i || (i = t.parseUrl(n || e.location.href).path), i && (r = i.substr(1)), r > 0 ? r : ""
  }, function () {
    var n = document.referrer, r = e.location.pathname, i = [/^\/roomframe\//, /^\/sidebarframe/], s = [], o = !0;
    e.__config_iframeEscapeUrls && (s = e.__config_iframeEscapeUrls, $.type(s) !== "array" && (s = [s])), s = s.concat(i), $.each(s, function (e, t) {
      if ($.type(t) === "string" && t == r)return o = !1, !1;
      if ($.type(t) === "regexp" && t.test(r))return o = !1, !1
    }), o && e.self !== e.top && (e.top.location.href = e.location.href);
    if (/^\/sidebarframe/.test(r)) {
      var u = t.parseUrl(n).domain;
      u !== "panda.tv" && u !== "pandatv.com" && (e.top.location.href = t.getProtocol() + "//www.panda.tv")
    }
  }(), e._config_disableJobs !== !0 && (Math.random() < .5 ? console.__originLog("\u8bf7\u95ee\u4f60...\u559c\u6b22\u770b\u76f4\u64ad\u5417\uff1f\n\u8fd9\u91cc\u6709\u4f60\u559c\u6b22\u7684\u4e3b\u64ad\u5417\uff1f\n\u6765\u718a\u732btv\u5427\uff01\u8001\u53f8\u673a\u5e26\u4f60\u98d9\u8f66\u3002") : console.__originLog("\u56fd\u6c11\u8001\u516c\u738b\u6821\u957f\u7684\u516c\u53f8...\n\u6ca1\u65f6\u95f4\u89e3\u91ca\u4e86\uff0c\u5feb\u4e0a\u8f66\u3002"), console.__originLog("\u8bf7\u5c06\u7b80\u5386\u53d1\u9001\u81f3 %cjob@panda.tv\uff08\u6807\u9898\u683c\u5f0f\uff1a\u201c\u59d3\u540d-\u5e94\u8058XX\u804c\u4f4d-\u6765\u81eaconsole\u201d\uff09", "color:red;"), console.__originLog("\u804c\u4f4d\u4ecb\u7ecd\uff1ahttp://c.hr.lagou.com/gongsi/107435.html?speedShow=true")), e.PDR = t
})(window);