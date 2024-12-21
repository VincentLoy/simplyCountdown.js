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
(function(T) {
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
  }, b = (n) => n !== null && Symbol.iterator in Object(n), f = (n, s, a) => {
    let e = document.createElement("div"), d = document.createElement("span"), r = document.createElement("span"), t = document.createElement("div");
    return t.appendChild(d), t.appendChild(r), e.appendChild(t), e.classList.add(s.sectionClass), e.classList.add(a), d.classList.add(s.amountClass), r.classList.add(s.wordClass), n.appendChild(e), {
      full: e,
      amount: d,
      word: r
    };
  }, S = (n, s) => {
    let a;
    return n.inline ? (a = document.createElement("span"), a.classList.add(n.inlineClass), a) : {
      days: f(s, n, "simply-days-section"),
      hours: f(s, n, "simply-hours-section"),
      minutes: f(s, n, "simply-minutes-section"),
      seconds: f(s, n, "simply-seconds-section")
    };
  };
  T.simplyCountdown = (n, s) => {
    const a = Object.getPrototypeOf(n);
    let e = w({
      year: 2015,
      month: 6,
      day: 28,
      hours: 0,
      minutes: 0,
      seconds: 0,
      words: {
        days: { lambda: (l, c) => c > 1 ? l + "s" : l, root: "day" },
        hours: { lambda: (l, c) => c > 1 ? l + "s" : l, root: "hour" },
        minutes: { lambda: (l, c) => c > 1 ? l + "s" : l, root: "minute" },
        seconds: { lambda: (l, c) => c > 1 ? l + "s" : l, root: "second" }
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
    }, s), d, r, t, y, i, u, p, h, C;
    a === String.prototype ? C = document.querySelectorAll(n) : C = n, e.enableUtc ? r = new Date(Date.UTC(
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
    let P = (l) => {
      let c = l, o = S(e, c), D;
      D = function() {
        let $, v, E, x, I = () => {
          i = parseInt(y / 86400, 10), y %= 86400, u = parseInt(y / 3600, 10), y %= 3600, p = parseInt(y / 60, 10), h = parseInt(y % 60, 10);
        };
        e.enableUtc ? (t = /* @__PURE__ */ new Date(), t = new Date(Date.UTC(
          t.getUTCFullYear(),
          t.getUTCMonth(),
          t.getUTCDate(),
          t.getUTCHours(),
          t.getUTCMinutes(),
          t.getUTCSeconds()
        ))) : t = /* @__PURE__ */ new Date(), y = Math.floor((r - t.getTime()) / 1e3), y > 0 ? I() : e.countUp ? (y = (t.getTime() - r) / 1e3, I()) : (i = 0, u = 0, p = 0, h = 0, window.clearInterval(d), e.onEnd());
        let g = (m, L) => m.hasOwnProperty("lambda") ? m.lambda(m.root, L) : m.root, U = e.words;
        if ($ = g(U.days, i), v = g(U.hours, u), E = g(U.minutes, p), x = g(U.seconds, h), e.inline) {
          let m = "";
          e.removeZeroUnits && i === 0 || (m += `${i} ${$}${e.inlineSeparator}`), e.removeZeroUnits && i === 0 && u === 0 || (m += `${u} ${v}${e.inlineSeparator}`), e.removeZeroUnits && i === 0 && u === 0 && p === 0 || (m += `${p} ${E}${e.inlineSeparator}`), m += `${h} ${x}`, c.innerHTML = m.replace(/, $/, "");
        } else
          e.removeZeroUnits && i === 0 ? o.days.full.style.display = "none" : (o.days.amount.textContent = (e.zeroPad && i.toString().length < 2 ? "0" : "") + i, o.days.word.textContent = $, o.days.full.style.display = ""), e.removeZeroUnits && i === 0 && u === 0 ? o.hours.full.style.display = "none" : (o.hours.amount.textContent = (e.zeroPad && u.toString().length < 2 ? "0" : "") + u, o.hours.word.textContent = v, o.hours.full.style.display = ""), e.removeZeroUnits && i === 0 && u === 0 && p === 0 ? o.minutes.full.style.display = "none" : (o.minutes.amount.textContent = (e.zeroPad && p.toString().length < 2 ? "0" : "") + p, o.minutes.word.textContent = E, o.minutes.full.style.display = ""), o.seconds.amount.textContent = (e.zeroPad && h.toString().length < 2 ? "0" : "") + h, o.seconds.word.textContent = x, o.seconds.full.style.display = "";
      }, D(), d = window.setInterval(D, e.refresh);
    };
    b(C) ? Array.prototype.forEach.call(C, (l) => {
      P(l);
    }) : P(C);
  };
})(window);
window.jQuery && function(T, w) {
  function b(f, S) {
    w(f, S);
  }
  T.fn.simplyCountdown = function(f) {
    return b(this.selector, f);
  };
}(jQuery, simplyCountdown);
//# sourceMappingURL=simplyCountdown.es.js.map
