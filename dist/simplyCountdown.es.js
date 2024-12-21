/*!
* Project : simply-countdown
* Date : 06/12/2024
* License : MIT
* Version : 2.0.1
* Author : Vincent Loy <vincent.loy1@gmail.com>
* Contributors :
*  - Justin Beasley <JustinB@harvest.org>
*  - Nathan Smith <NathanS@harvest.org>
*/
(function(P) {
  let w = function(n) {
    let s, a = n || {};
    for (let e = 1; e < arguments.length; e += 1) {
      s = arguments[e];
      const d = Object.keys(s);
      if (d.length)
        for (let r = 0; r < d.length; r += 1) {
          let t = d[r];
          Object.prototype.hasOwnProperty.call(s, t) && (typeof s[t] == "object" ? w(a[t], s[t]) : a[t] = s[t]);
        }
    }
    return a;
  }, T = (n) => n !== null && Symbol.iterator in Object(n), f = (n, s, a) => {
    let e = document.createElement("div"), d = document.createElement("span"), r = document.createElement("span"), t = document.createElement("div");
    return t.appendChild(d), t.appendChild(r), e.appendChild(t), e.classList.add(s.sectionClass), e.classList.add(a), d.classList.add(s.amountClass), r.classList.add(s.wordClass), n.appendChild(e), {
      full: e,
      amount: d,
      word: r
    };
  }, b = (n, s) => {
    let a;
    return n.inline ? (a = document.createElement("span"), a.classList.add(n.inlineClass), a) : {
      days: f(s, n, "simply-days-section"),
      hours: f(s, n, "simply-hours-section"),
      minutes: f(s, n, "simply-minutes-section"),
      seconds: f(s, n, "simply-seconds-section")
    };
  }, S = (n, s) => {
    const a = Object.getPrototypeOf(n);
    let e = w({
      year: 2015,
      month: 6,
      day: 28,
      hours: 0,
      minutes: 0,
      seconds: 0,
      words: {
        days: { lambda: (o, c) => c > 1 ? o + "s" : o, root: "day" },
        hours: { lambda: (o, c) => c > 1 ? o + "s" : o, root: "hour" },
        minutes: { lambda: (o, c) => c > 1 ? o + "s" : o, root: "minute" },
        seconds: { lambda: (o, c) => c > 1 ? o + "s" : o, root: "second" }
      },
      plural: !0,
      inline: !1,
      inlineSeparator: ", ",
      enableUtc: !1,
      onEnd: () => {
      },
      refresh: 1e3,
      inlineClass: "simply-countdown-inline",
      sectionClass: "simply-section",
      amountClass: "simply-amount",
      wordClass: "simply-word",
      zeroPad: !1,
      removeZeroUnits: !1,
      countUp: !1
    }, s), d, r, t, y, i, u, p, C, h;
    a === String.prototype ? h = document.querySelectorAll(n) : h = n, e.enableUtc ? r = new Date(Date.UTC(
      e.year,
      e.month - 1,
      e.day,
      e.hours,
      e.minutes,
      e.seconds
    )) : r = new Date(
      e.year,
      e.month - 1,
      e.day,
      e.hours,
      e.minutes,
      e.seconds
    );
    let I = (o) => {
      let c = o, l = b(e, c), x;
      x = function() {
        let $, D, v, E, L = () => {
          i = parseInt(y / 86400, 10), y %= 86400, u = parseInt(y / 3600, 10), y %= 3600, p = parseInt(y / 60, 10), C = parseInt(y % 60, 10);
        };
        e.enableUtc ? (t = /* @__PURE__ */ new Date(), t = new Date(Date.UTC(
          t.getUTCFullYear(),
          t.getUTCMonth(),
          t.getUTCDate(),
          t.getUTCHours(),
          t.getUTCMinutes(),
          t.getUTCSeconds()
        ))) : t = /* @__PURE__ */ new Date(), y = Math.floor((r - t.getTime()) / 1e3), y > 0 ? L() : e.countUp ? (y = (t.getTime() - r) / 1e3, L()) : (i = 0, u = 0, p = 0, C = 0, window.clearInterval(d), e.onEnd());
        let g = (m, O) => m.hasOwnProperty("lambda") ? m.lambda(m.root, O) : m.root, U = e.words;
        if ($ = g(U.days, i), D = g(U.hours, u), v = g(U.minutes, p), E = g(U.seconds, C), e.inline) {
          let m = "";
          e.removeZeroUnits && i === 0 || (m += `${i} ${$}${e.inlineSeparator}`), e.removeZeroUnits && i === 0 && u === 0 || (m += `${u} ${D}${e.inlineSeparator}`), e.removeZeroUnits && i === 0 && u === 0 && p === 0 || (m += `${p} ${v}${e.inlineSeparator}`), m += `${C} ${E}`, c.innerHTML = m.replace(/, $/, "");
        } else
          e.removeZeroUnits && i === 0 ? l.days.full.style.display = "none" : (l.days.amount.textContent = (e.zeroPad && i.toString().length < 2 ? "0" : "") + i, l.days.word.textContent = $, l.days.full.style.display = ""), e.removeZeroUnits && i === 0 && u === 0 ? l.hours.full.style.display = "none" : (l.hours.amount.textContent = (e.zeroPad && u.toString().length < 2 ? "0" : "") + u, l.hours.word.textContent = D, l.hours.full.style.display = ""), e.removeZeroUnits && i === 0 && u === 0 && p === 0 ? l.minutes.full.style.display = "none" : (l.minutes.amount.textContent = (e.zeroPad && p.toString().length < 2 ? "0" : "") + p, l.minutes.word.textContent = v, l.minutes.full.style.display = ""), l.seconds.amount.textContent = (e.zeroPad && C.toString().length < 2 ? "0" : "") + C, l.seconds.word.textContent = E, l.seconds.full.style.display = "";
      }, x(), d = window.setInterval(x, e.refresh);
    };
    T(h) ? Array.prototype.forEach.call(h, (o) => {
      I(o);
    }) : I(h);
  };
  typeof module < "u" && module.exports ? module.exports = S : typeof define == "function" && define.amd ? define([], function() {
    return S;
  }) : window.simplyCountdown = S;
})();
window.jQuery && function(P, w) {
  function T(f, b) {
    w(f, b);
  }
  P.fn.simplyCountdown = function(f) {
    return T(this.selector, f);
  };
}(jQuery, simplyCountdown);
const Z = simplyCountdown;
export {
  Z as default
};
//# sourceMappingURL=simplyCountdown.es.js.map
