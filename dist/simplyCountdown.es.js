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
(function(O) {
  let $ = function(n) {
    let s, i = n || {};
    for (let e = 1; e < arguments.length; e += 1) {
      s = arguments[e];
      const d = Object.keys(s);
      if (d.length)
        for (let r = 0; r < d.length; r += 1) {
          let t = d[r];
          Object.prototype.hasOwnProperty.call(s, t) && (typeof s[t] == "object" ? $(i[t], s[t]) : i[t] = s[t]);
        }
    }
    return i;
  }, P = (n) => n !== null && Symbol.iterator in Object(n), C = (n, s, i) => {
    let e = document.createElement("div"), d = document.createElement("span"), r = document.createElement("span"), t = document.createElement("div");
    return t.appendChild(d), t.appendChild(r), e.appendChild(t), e.classList.add(s.sectionClass), e.classList.add(i), d.classList.add(s.amountClass), r.classList.add(s.wordClass), n.appendChild(e), {
      full: e,
      amount: d,
      word: r
    };
  }, I = (n, s) => {
    let i;
    return n.inline ? (i = document.createElement("span"), i.classList.add(n.inlineClass), i) : {
      days: C(s, n, "simply-days-section"),
      hours: C(s, n, "simply-hours-section"),
      minutes: C(s, n, "simply-minutes-section"),
      seconds: C(s, n, "simply-seconds-section")
    };
  }, D = (n, s) => {
    const i = Object.getPrototypeOf(n);
    let e = $({
      year: 2015,
      month: 6,
      day: 28,
      hours: 0,
      minutes: 0,
      seconds: 0,
      words: {
        days: { lambda: (l, m) => m > 1 ? l + "s" : l, root: "day" },
        hours: { lambda: (l, m) => m > 1 ? l + "s" : l, root: "hour" },
        minutes: { lambda: (l, m) => m > 1 ? l + "s" : l, root: "minute" },
        seconds: { lambda: (l, m) => m > 1 ? l + "s" : l, root: "second" }
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
    }, s), d, r, t, y, a, u, p, f, h;
    i === String.prototype ? h = document.querySelectorAll(n) : h = n, e.enableUtc ? r = new Date(Date.UTC(
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
    let v = (l) => {
      let m = l, o = I(e, m), U;
      U = function() {
        let T, b, S, x, E = () => {
          a = parseInt(y / 86400, 10), y %= 86400, u = parseInt(y / 3600, 10), y %= 3600, p = parseInt(y / 60, 10), f = parseInt(y % 60, 10);
        };
        e.enableUtc ? (t = /* @__PURE__ */ new Date(), t = new Date(Date.UTC(
          t.getUTCFullYear(),
          t.getUTCMonth(),
          t.getUTCDate(),
          t.getUTCHours(),
          t.getUTCMinutes(),
          t.getUTCSeconds()
        ))) : t = /* @__PURE__ */ new Date(), y = Math.floor((r - t.getTime()) / 1e3), y > 0 ? E() : e.countUp ? (y = (t.getTime() - r) / 1e3, E()) : (a = 0, u = 0, p = 0, f = 0, window.clearInterval(d), e.onEnd());
        let w = (c, L) => c.hasOwnProperty("lambda") ? c.lambda(c.root, L) : c.root, g = e.words;
        if (T = w(g.days, a), b = w(g.hours, u), S = w(g.minutes, p), x = w(g.seconds, f), e.inline) {
          let c = "";
          e.removeZeroUnits && a === 0 || (c += `${a} ${T}${e.inlineSeparator}`), e.removeZeroUnits && a === 0 && u === 0 || (c += `${u} ${b}${e.inlineSeparator}`), e.removeZeroUnits && a === 0 && u === 0 && p === 0 || (c += `${p} ${S}${e.inlineSeparator}`), c += `${f} ${x}`, m.innerHTML = c.replace(/, $/, "");
        } else
          e.removeZeroUnits && a === 0 ? o.days.full.style.display = "none" : (o.days.amount.textContent = (e.zeroPad && a.toString().length < 2 ? "0" : "") + a, o.days.word.textContent = T, o.days.full.style.display = ""), e.removeZeroUnits && a === 0 && u === 0 ? o.hours.full.style.display = "none" : (o.hours.amount.textContent = (e.zeroPad && u.toString().length < 2 ? "0" : "") + u, o.hours.word.textContent = b, o.hours.full.style.display = ""), e.removeZeroUnits && a === 0 && u === 0 && p === 0 ? o.minutes.full.style.display = "none" : (o.minutes.amount.textContent = (e.zeroPad && p.toString().length < 2 ? "0" : "") + p, o.minutes.word.textContent = S, o.minutes.full.style.display = ""), o.seconds.amount.textContent = (e.zeroPad && f.toString().length < 2 ? "0" : "") + f, o.seconds.word.textContent = x, o.seconds.full.style.display = "";
      }, U(), d = window.setInterval(U, e.refresh);
    };
    P(h) ? Array.prototype.forEach.call(h, (l) => {
      v(l);
    }) : v(h);
  };
  typeof module < "u" && module.exports ? module.exports = D : window.simplyCountdown = D;
})();
const Z = simplyCountdown;
export {
  Z as default
};
//# sourceMappingURL=simplyCountdown.es.js.map
