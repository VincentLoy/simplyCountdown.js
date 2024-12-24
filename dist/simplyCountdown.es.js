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
let E = function(s) {
  let n, l = s || {};
  for (let e = 1; e < arguments.length; e += 1) {
    n = arguments[e];
    const d = Object.keys(n);
    if (d.length)
      for (let a = 0; a < d.length; a += 1) {
        let t = d[a];
        Object.prototype.hasOwnProperty.call(n, t) && (typeof n[t] == "object" ? E(l[t], n[t]) : l[t] = n[t]);
      }
  }
  return l;
}, I = (s) => s !== null && Symbol.iterator in Object(s), w = (s, n, l) => {
  let e = document.createElement("div"), d = document.createElement("span"), a = document.createElement("span"), t = document.createElement("div");
  return t.appendChild(d), t.appendChild(a), e.appendChild(t), e.classList.add(n.sectionClass), e.classList.add(l), d.classList.add(n.amountClass), a.classList.add(n.wordClass), s.appendChild(e), {
    full: e,
    amount: d,
    word: a
  };
}, L = (s, n) => {
  let l;
  return s.inline ? (l = document.createElement("span"), l.classList.add(s.inlineClass), n.appendChild(l), {
    days: l,
    hours: l,
    minutes: l,
    seconds: l
  }) : {
    days: w(n, s, "simply-days-section"),
    hours: w(n, s, "simply-hours-section"),
    minutes: w(n, s, "simply-minutes-section"),
    seconds: w(n, s, "simply-seconds-section")
  };
};
const v = function(s, n) {
  const l = Object.getPrototypeOf(s);
  let e = E({
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
  }, n), d, a, t, y, i, u, f, p, h;
  l === String.prototype ? h = document.querySelectorAll(s) : h = s, e.enableUtc ? a = new Date(Date.UTC(
    e.year,
    e.month - 1,
    e.day,
    e.hours,
    e.minutes,
    e.seconds
  )) : a = new Date(
    e.year,
    e.month - 1,
    e.day,
    e.hours,
    e.minutes,
    e.seconds
  );
  let D = (o) => {
    let c = o, r = L(e, c), U;
    U = function() {
      let T, b, S, x, $ = () => {
        i = parseInt(y / 86400, 10), y %= 86400, u = parseInt(y / 3600, 10), y %= 3600, f = parseInt(y / 60, 10), p = parseInt(y % 60, 10);
      };
      e.enableUtc ? (t = /* @__PURE__ */ new Date(), t = new Date(Date.UTC(
        t.getUTCFullYear(),
        t.getUTCMonth(),
        t.getUTCDate(),
        t.getUTCHours(),
        t.getUTCMinutes(),
        t.getUTCSeconds()
      ))) : t = /* @__PURE__ */ new Date(), y = Math.floor((a - t.getTime()) / 1e3), y > 0 ? $() : e.countUp ? (y = (t.getTime() - a) / 1e3, $()) : (i = 0, u = 0, f = 0, p = 0, window.clearInterval(d), e.onEnd());
      let C = (m, P) => m.hasOwnProperty("lambda") ? m.lambda(m.root, P) : m.root, g = e.words;
      if (T = C(g.days, i), b = C(g.hours, u), S = C(g.minutes, f), x = C(g.seconds, p), e.inline) {
        let m = "";
        e.removeZeroUnits && i === 0 || (m += `${i} ${T}${e.inlineSeparator}`), e.removeZeroUnits && i === 0 && u === 0 || (m += `${u} ${b}${e.inlineSeparator}`), e.removeZeroUnits && i === 0 && u === 0 && f === 0 || (m += `${f} ${S}${e.inlineSeparator}`), m += `${p} ${x}`, c.innerHTML = m.replace(/, $/, "");
      } else
        e.removeZeroUnits && i === 0 ? r.days.full.style.display = "none" : (r.days.amount.textContent = (e.zeroPad && i.toString().length < 2 ? "0" : "") + i, r.days.word.textContent = T, r.days.full.style.display = ""), e.removeZeroUnits && i === 0 && u === 0 ? r.hours.full.style.display = "none" : (r.hours.amount.textContent = (e.zeroPad && u.toString().length < 2 ? "0" : "") + u, r.hours.word.textContent = b, r.hours.full.style.display = ""), e.removeZeroUnits && i === 0 && u === 0 && f === 0 ? r.minutes.full.style.display = "none" : (r.minutes.amount.textContent = (e.zeroPad && f.toString().length < 2 ? "0" : "") + f, r.minutes.word.textContent = S, r.minutes.full.style.display = ""), r.seconds.amount.textContent = (e.zeroPad && p.toString().length < 2 ? "0" : "") + p, r.seconds.word.textContent = x, r.seconds.full.style.display = "";
    }, U(), d = window.setInterval(U, e.refresh);
  };
  I(h) ? Array.prototype.forEach.call(h, (o) => {
    D(o);
  }) : D(h);
};
typeof module < "u" && module.exports ? module.exports = { simplyCountdown: v } : typeof define == "function" && define.amd && define([], function() {
  return { simplyCountdown: v };
});
export {
  v as simplyCountdown
};
//# sourceMappingURL=simplyCountdown.es.js.map
