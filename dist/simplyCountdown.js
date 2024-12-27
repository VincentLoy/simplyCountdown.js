const createCountdownSection = (sectionClass, amountClass, wordClass, amount, word, params) => {
  const section = document.createElement("div");
  section.className = `${sectionClass} ${params.sectionClass}`;
  const wrap = document.createElement("div");
  const amount_elem = document.createElement("span");
  const word_elem = document.createElement("span");
  amount_elem.className = `${amountClass} ${params.amountClass}`;
  word_elem.className = `${wordClass} ${params.wordClass}`;
  amount_elem.textContent = String(amount);
  word_elem.textContent = word;
  wrap.appendChild(amount_elem);
  wrap.appendChild(word_elem);
  section.appendChild(wrap);
  return section;
};
const updateCountdownSection = (section, amount, word) => {
  const amountElement = section.querySelector(".simply-amount");
  const wordElement = section.querySelector(".simply-word");
  if (amountElement) {
    amountElement.textContent = String(amount);
  }
  if (wordElement) {
    wordElement.textContent = word;
  }
};
const createCountdown = (container, params) => {
  const amountCls = "simply-amount";
  const wordCls = "simply-word";
  const days = createCountdownSection("simply-section simply-days-section", amountCls, wordCls, 0, "day", params);
  const hours = createCountdownSection("simply-section simply-hours-section", amountCls, wordCls, 0, "hour", params);
  const minutes = createCountdownSection("simply-section simply-minutes-section", amountCls, wordCls, 0, "minute", params);
  const seconds = createCountdownSection("simply-section simply-seconds-section", amountCls, wordCls, 0, "second", params);
  container.appendChild(days);
  container.appendChild(hours);
  container.appendChild(minutes);
  container.appendChild(seconds);
  return {
    days,
    hours,
    minutes,
    seconds
  };
};
/*!
 * Project : simplyCountdown
 * Date : 2024-12-24
 * License : MIT
 * Version : 3.0.0
 * Author : Vincent Loy-Serre <vincent.loy1@gmail.com>
 * Contributors :
 *  - Justin Beasley <JustinB@harvest.org>
 *  - Nathan Smith <NathanS@harvest.org>
 */
const defaultParams = {
  year: 2024,
  month: 12,
  day: 25,
  hours: 0,
  minutes: 0,
  seconds: 0,
  words: {
    days: { lambda: (root, n) => n > 1 ? root + "s" : root, root: "day" },
    hours: { lambda: (root, n) => n > 1 ? root + "s" : root, root: "hour" },
    minutes: { lambda: (root, n) => n > 1 ? root + "s" : root, root: "minute" },
    seconds: { lambda: (root, n) => n > 1 ? root + "s" : root, root: "second" }
  },
  plural: true,
  inline: false,
  inlineSeparator: ", ",
  enableUtc: false,
  onEnd: () => {
  },
  refresh: 1e3,
  inlineClass: "simply-countdown-inline",
  sectionClass: "simply-section",
  amountClass: "simply-amount",
  wordClass: "simply-word",
  zeroPad: false,
  countUp: false,
  removeZeroUnits: false,
  onStop: () => {
  },
  onResume: () => {
  },
  onUpdate: () => {
  }
};
const isNodeList = (element) => {
  return element instanceof NodeList;
};
function formatTimeUnit(unit, params) {
  const value = params.zeroPad ? String(unit.value).padStart(2, "0") : unit.value;
  return `${value} ${params.words[unit.word].lambda(params.words[unit.word].root, unit.value)}`;
}
function shouldDisplay(unit, previousUnits, params) {
  if (!params.removeZeroUnits) return true;
  return unit.value !== 0 || previousUnits.some((u) => u.value !== 0);
}
function displayInline(timeUnits, params, element) {
  const displayStr = timeUnits.filter((unit, index) => shouldDisplay(unit, timeUnits.slice(0, index), params)).map((unit) => formatTimeUnit(unit, params)).join(params.inlineSeparator);
  element.innerHTML = displayStr;
}
function displayBlocks(timeUnits, params, countdown) {
  timeUnits.forEach((unit, index) => {
    const shouldShow = unit.word === "seconds" || shouldDisplay(unit, timeUnits.slice(0, index), params);
    if (shouldShow) {
      updateCountdownSection(
        countdown[unit.word],
        params.zeroPad ? String(unit.value).padStart(2, "0") : unit.value,
        params.words[unit.word].lambda(params.words[unit.word].root, unit.value)
      );
      countdown[unit.word].style.display = "";
    } else {
      countdown[unit.word].style.display = "none";
    }
  });
}
const createCountdownInstance = (targetElement, parameters) => {
  let state = {
    isPaused: false,
    interval: null,
    targetDate: /* @__PURE__ */ new Date()
  };
  const getTargetDate = (params) => {
    return params.enableUtc ? new Date(Date.UTC(
      params.year,
      params.month - 1,
      params.day,
      params.hours,
      params.minutes,
      params.seconds
    )) : new Date(
      params.year,
      params.month - 1,
      params.day,
      params.hours,
      params.minutes,
      params.seconds
    );
  };
  state.targetDate = getTargetDate(parameters);
  let inlineElement = null;
  if (parameters.inline) {
    inlineElement = document.createElement("span");
    inlineElement.className = parameters.inlineClass;
    targetElement.appendChild(inlineElement);
  }
  const countdown = parameters.inline ? null : createCountdown(targetElement, {
    sectionClass: parameters.sectionClass,
    amountClass: parameters.amountClass,
    wordClass: parameters.wordClass
  });
  const refresh = () => {
    const currentDate = parameters.enableUtc ? new Date(Date.UTC(
      (/* @__PURE__ */ new Date()).getUTCFullYear(),
      (/* @__PURE__ */ new Date()).getUTCMonth(),
      (/* @__PURE__ */ new Date()).getUTCDate(),
      (/* @__PURE__ */ new Date()).getUTCHours(),
      (/* @__PURE__ */ new Date()).getUTCMinutes(),
      (/* @__PURE__ */ new Date()).getUTCSeconds()
    )) : /* @__PURE__ */ new Date();
    let diff = parameters.countUp ? currentDate.getTime() - state.targetDate.getTime() : state.targetDate.getTime() - currentDate.getTime();
    if (diff <= 0 && !parameters.countUp) {
      diff = 0;
      clearInterval(state.interval);
      if (parameters.onEnd) {
        parameters.onEnd();
      }
    }
    const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
    diff -= days * 1e3 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1e3 * 60 * 60));
    diff -= hours * 1e3 * 60 * 60;
    const minutes = Math.floor(diff / (1e3 * 60));
    diff -= minutes * 1e3 * 60;
    const seconds = Math.floor(diff / 1e3);
    if (parameters.inline && inlineElement) {
      const timeUnits = [
        { value: days, word: "days" },
        { value: hours, word: "hours" },
        { value: minutes, word: "minutes" },
        { value: seconds, word: "seconds" }
      ];
      displayInline(timeUnits, parameters, inlineElement);
    } else if (countdown) {
      const timeUnits = [
        { value: days, word: "days" },
        { value: hours, word: "hours" },
        { value: minutes, word: "minutes" },
        { value: seconds, word: "seconds" }
      ];
      displayBlocks(timeUnits, parameters, countdown);
    }
  };
  const startInterval = () => {
    state.interval = setInterval(refresh, parameters.refresh);
    refresh();
  };
  const stopCountdown = () => {
    var _a;
    if (state.interval) {
      clearInterval(state.interval);
      state.interval = null;
    }
    state.isPaused = true;
    (_a = parameters.onStop) == null ? void 0 : _a.call(parameters);
  };
  const resumeCountdown = () => {
    var _a;
    if (state.isPaused) {
      startInterval();
      state.isPaused = false;
      (_a = parameters.onResume) == null ? void 0 : _a.call(parameters);
    }
  };
  const updateCountdown = (newParams) => {
    var _a;
    Object.assign(parameters, newParams);
    if (newParams.year !== void 0 || newParams.month !== void 0 || newParams.day !== void 0 || newParams.hours !== void 0 || newParams.minutes !== void 0 || newParams.seconds !== void 0) {
      state.targetDate = getTargetDate(parameters);
    }
    (_a = parameters.onUpdate) == null ? void 0 : _a.call(parameters, newParams);
    if (!state.isPaused) {
      if (state.interval) {
        clearInterval(state.interval);
      }
      startInterval();
    }
  };
  const getState = () => ({ ...state });
  startInterval();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === targetElement) {
          clearInterval(state.interval);
          observer.disconnect();
        }
      });
    });
  });
  if (targetElement.parentNode) {
    observer.observe(targetElement.parentNode, { childList: true });
  }
  return {
    stopCountdown,
    resumeCountdown,
    updateCountdown,
    getState
  };
};
const createControllerArray = (controllers) => {
  const array = controllers;
  array.stopCountdown = () => controllers.forEach((c) => c.stopCountdown());
  array.resumeCountdown = () => controllers.forEach((c) => c.resumeCountdown());
  array.updateCountdown = (newParams) => controllers.forEach((c) => c.updateCountdown(newParams));
  array.getState = () => controllers.map((c) => c.getState());
  return array;
};
const simplyCountdown = (element, args = defaultParams) => {
  const parameters = { ...defaultParams, ...args };
  if (typeof element === "string") {
    const elements = document.querySelectorAll(element);
    const controllers = Array.from(elements).map((el) => createCountdownInstance(el, parameters));
    return controllers.length === 1 ? controllers[0] : createControllerArray(controllers);
  }
  if (isNodeList(element)) {
    const controllers = Array.from(element).map((el) => createCountdownInstance(el, parameters));
    return controllers.length === 1 ? controllers[0] : createControllerArray(controllers);
  }
  return createCountdownInstance(element, parameters);
};
export {
  simplyCountdown as default
};
//# sourceMappingURL=simplyCountdown.js.map
