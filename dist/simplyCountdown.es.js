const createCountdownSection = (sectionClass, amount, word) => {
  const section = document.createElement("div");
  section.className = `simply-section ${sectionClass}`;
  const wrap = document.createElement("div");
  const amount_elem = document.createElement("span");
  const word_elem = document.createElement("span");
  amount_elem.className = "simply-amount";
  word_elem.className = "simply-word";
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
const createCountdown = (container) => {
  const days = createCountdownSection("simply-days-section", 0, "day");
  const hours = createCountdownSection("simply-hours-section", 0, "hour");
  const minutes = createCountdownSection("simply-minutes-section", 0, "minute");
  const seconds = createCountdownSection("simply-seconds-section", 0, "second");
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
 * Project : simply-countdown
 * Date : 06/12/2024
 * License : MIT
 * Version : 2.0.1
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
  removeZeroUnits: false
};
const isNodeList = (element) => {
  return element instanceof NodeList;
};
const createCountdownInstance = (targetElement, parameters) => {
  const targetDate = new Date(
    parameters.year,
    parameters.month - 1,
    parameters.day,
    parameters.hours,
    parameters.minutes,
    parameters.seconds
  );
  let inlineElement = null;
  if (parameters.inline) {
    inlineElement = document.createElement("span");
    inlineElement.className = parameters.inlineClass;
    targetElement.appendChild(inlineElement);
  }
  const countdown = parameters.inline ? null : createCountdown(targetElement);
  const refresh = () => {
    const currentDate = parameters.enableUtc ? new Date((/* @__PURE__ */ new Date()).toUTCString()) : /* @__PURE__ */ new Date();
    let diff = parameters.countUp ? currentDate.getTime() - targetDate.getTime() : targetDate.getTime() - currentDate.getTime();
    if (diff <= 0 && !parameters.countUp) {
      diff = 0;
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
      let displayStr = "";
      if (!(parameters.removeZeroUnits && days === 0)) {
        displayStr += `${days} ${parameters.words.days.lambda(parameters.words.days.root, days)}${parameters.inlineSeparator}`;
      }
      if (!(parameters.removeZeroUnits && days === 0 && hours === 0)) {
        displayStr += `${hours} ${parameters.words.hours.lambda(parameters.words.hours.root, hours)}${parameters.inlineSeparator}`;
      }
      if (!(parameters.removeZeroUnits && days === 0 && hours === 0 && minutes === 0)) {
        displayStr += `${minutes} ${parameters.words.minutes.lambda(parameters.words.minutes.root, minutes)}${parameters.inlineSeparator}`;
      }
      displayStr += `${seconds} ${parameters.words.seconds.lambda(parameters.words.seconds.root, seconds)}`;
      inlineElement.innerHTML = displayStr.replace(new RegExp(`${parameters.inlineSeparator}$`), "");
    } else if (countdown) {
      const values = [
        { value: days, section: countdown.days, word: parameters.words.days },
        { value: hours, section: countdown.hours, word: parameters.words.hours },
        { value: minutes, section: countdown.minutes, word: parameters.words.minutes },
        { value: seconds, section: countdown.seconds, word: parameters.words.seconds }
      ];
      values.forEach(({ value, section, word }) => {
        if (!parameters.removeZeroUnits || value > 0) {
          const displayValue = parameters.zeroPad ? String(value).padStart(2, "0") : value;
          const wordValue = word.lambda(word.root, value);
          updateCountdownSection(section, displayValue, wordValue);
          section.style.display = "";
        } else {
          section.style.display = "none";
        }
      });
    }
  };
  const interval = setInterval(refresh, parameters.refresh);
  refresh();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === targetElement) {
          clearInterval(interval);
          observer.disconnect();
        }
      });
    });
  });
  if (targetElement.parentNode) {
    observer.observe(targetElement.parentNode, { childList: true });
  }
};
const simplyCountdown = (element, args = defaultParams) => {
  const parameters = { ...defaultParams, ...args };
  if (typeof element === "string") {
    const elements = document.querySelectorAll(element);
    elements.forEach((el) => createCountdownInstance(el, parameters));
  } else if (isNodeList(element)) {
    element.forEach((el) => createCountdownInstance(el, parameters));
  } else {
    createCountdownInstance(element, parameters);
  }
};
if (typeof window !== "undefined") {
  window.simplyCountdown = simplyCountdown;
}
export {
  simplyCountdown
};
//# sourceMappingURL=simplyCountdown.es.js.map
