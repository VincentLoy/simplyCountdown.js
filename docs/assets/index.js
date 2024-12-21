(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))f(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&f(n)}).observe(document,{childList:!0,subtree:!0});function g(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(s){if(s.ep)return;s.ep=!0;const r=g(s);fetch(s.href,r)}})();const Z="modulepreload",_=function(v,p){return new URL(v,p).href},I={},A=function(p,g,f){let s=Promise.resolve();if(g&&g.length>0){const n=document.getElementsByTagName("link"),t=document.querySelector("meta[property=csp-nonce]"),m=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));s=Promise.allSettled(g.map(e=>{if(e=_(e,f),e in I)return;I[e]=!0;const a=e.endsWith(".css"),y=a?'[rel="stylesheet"]':"";if(!!f)for(let i=n.length-1;i>=0;i--){const d=n[i];if(d.href===e&&(!a||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${y}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":Z,a||(l.as="script"),l.crossOrigin="",l.href=e,m&&l.setAttribute("nonce",m),document.head.appendChild(l),a)return new Promise((i,d)=>{l.addEventListener("load",i),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${e}`)))})}))}function r(n){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=n,window.dispatchEvent(t),!t.defaultPrevented)throw n}return s.then(n=>{for(const t of n||[])t.status==="rejected"&&r(t.reason);return p().catch(r)})};/*!
* Project : simply-countdown
* Date : 06/12/2024
* License : MIT
* Version : 2.0.1
* Author : Vincent Loy <vincent.loy1@gmail.com>
* Contributors :
*  - Justin Beasley <JustinB@harvest.org>
*  - Nathan Smith <NathanS@harvest.org>
*/(function(v){let p=function(n){let t,m=n||{};for(let e=1;e<arguments.length;e+=1){t=arguments[e];const a=Object.keys(t);if(a.length)for(let y=0;y<a.length;y+=1){let o=a[y];Object.prototype.hasOwnProperty.call(t,o)&&(typeof t[o]=="object"?p(m[o],t[o]):m[o]=t[o])}}return m},g=n=>n!==null&&Symbol.iterator in Object(n),f=(n,t,m)=>{let e=document.createElement("div"),a=document.createElement("span"),y=document.createElement("span"),o=document.createElement("div");return o.appendChild(a),o.appendChild(y),e.appendChild(o),e.classList.add(t.sectionClass),e.classList.add(m),a.classList.add(t.amountClass),y.classList.add(t.wordClass),n.appendChild(e),{full:e,amount:a,word:y}},s=(n,t)=>{let m;return n.inline?(m=document.createElement("span"),m.classList.add(n.inlineClass),m):{days:f(t,n,"simply-days-section"),hours:f(t,n,"simply-hours-section"),minutes:f(t,n,"simply-minutes-section"),seconds:f(t,n,"simply-seconds-section")}},r=(n,t)=>{const m=Object.getPrototypeOf(n);let e=p({year:2015,month:6,day:28,hours:0,minutes:0,seconds:0,words:{days:{lambda:(u,h)=>h>1?u+"s":u,root:"day"},hours:{lambda:(u,h)=>h>1?u+"s":u,root:"hour"},minutes:{lambda:(u,h)=>h>1?u+"s":u,root:"minute"},seconds:{lambda:(u,h)=>h>1?u+"s":u,root:"second"}},plural:!0,inline:!1,inlineSeparator:", ",enableUtc:!1,onEnd:()=>{},refresh:1e3,inlineClass:"simply-countdown-inline",sectionClass:"simply-section",amountClass:"simply-amount",wordClass:"simply-word",zeroPad:!1,removeZeroUnits:!1,countUp:!1},t),a,y,o,l,i,d,C,E,U;m===String.prototype?U=document.querySelectorAll(n):U=n,e.enableUtc?y=new Date(Date.UTC(e.year,e.month-1,e.day,e.hours,e.minutes,e.seconds)):y=new Date(e.year,e.month-1,e.day,e.hours,e.minutes,e.seconds);let D=u=>{let h=u,c=s(e,h),P;P=function(){let T,L,$,O,x=()=>{i=parseInt(l/86400,10),l%=86400,d=parseInt(l/3600,10),l%=3600,C=parseInt(l/60,10),E=parseInt(l%60,10)};e.enableUtc?(o=new Date,o=new Date(Date.UTC(o.getUTCFullYear(),o.getUTCMonth(),o.getUTCDate(),o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds()))):o=new Date,l=Math.floor((y-o.getTime())/1e3),l>0?x():e.countUp?(l=(o.getTime()-y)/1e3,x()):(i=0,d=0,C=0,E=0,window.clearInterval(a),e.onEnd());let b=(w,j)=>w.hasOwnProperty("lambda")?w.lambda(w.root,j):w.root,S=e.words;if(T=b(S.days,i),L=b(S.hours,d),$=b(S.minutes,C),O=b(S.seconds,E),e.inline){let w="";e.removeZeroUnits&&i===0||(w+=`${i} ${T}${e.inlineSeparator}`),e.removeZeroUnits&&i===0&&d===0||(w+=`${d} ${L}${e.inlineSeparator}`),e.removeZeroUnits&&i===0&&d===0&&C===0||(w+=`${C} ${$}${e.inlineSeparator}`),w+=`${E} ${O}`,h.innerHTML=w.replace(/, $/,"")}else e.removeZeroUnits&&i===0?c.days.full.style.display="none":(c.days.amount.textContent=(e.zeroPad&&i.toString().length<2?"0":"")+i,c.days.word.textContent=T,c.days.full.style.display=""),e.removeZeroUnits&&i===0&&d===0?c.hours.full.style.display="none":(c.hours.amount.textContent=(e.zeroPad&&d.toString().length<2?"0":"")+d,c.hours.word.textContent=L,c.hours.full.style.display=""),e.removeZeroUnits&&i===0&&d===0&&C===0?c.minutes.full.style.display="none":(c.minutes.amount.textContent=(e.zeroPad&&C.toString().length<2?"0":"")+C,c.minutes.word.textContent=$,c.minutes.full.style.display=""),c.seconds.amount.textContent=(e.zeroPad&&E.toString().length<2?"0":"")+E,c.seconds.word.textContent=O,c.seconds.full.style.display=""},P(),a=window.setInterval(P,e.refresh)};g(U)?Array.prototype.forEach.call(U,u=>{D(u)}):D(U)};typeof module<"u"&&module.exports?module.exports=r:typeof define=="function"&&define.amd?define([],function(){return r}):window.simplyCountdown=r})();window.jQuery&&function(v,p){function g(f,s){p(f,s)}v.fn.simplyCountdown=function(f){return g(this.selector,f)}}(jQuery,simplyCountdown);const R=simplyCountdown;window.simplyCountdown=R;const W=setInterval(()=>{window.jQuery&&(clearInterval(W),A(()=>import("./demo.js"),[],import.meta.url))},100);
