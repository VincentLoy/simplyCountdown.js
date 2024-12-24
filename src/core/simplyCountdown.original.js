/* global Symbol */

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

/**
 * Function that merge user parameters with defaults one.
 * @param output
 * @returns {*|{}}
 */

let extend = function (output) {
    let obj;
    let out = output || {};

    for (let i = 1; i < arguments.length; i += 1) {
        obj = arguments[i];
        const keys = Object.keys(obj);

        if (keys.length) {
            for (let i2 = 0; i2 < keys.length; i2 += 1) {
                let key = keys[i2];

                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    if (typeof obj[key] === 'object') {
                        extend(out[key], obj[key]);
                    } else {
                        out[key] = obj[key];
                    }
                }
            }
        }
    }

    return out;
};

let isIterableElement = (val) => {
    return val !== null && Symbol.iterator in Object(val);
};

/**
 * Function that create a countdown section
 * @param countdown
 * @param parameters
 * @param typeClass
 * @returns {{full: (*|Element), amount: (*|Element), word: (*|Element)}}
 */
let createCountdownElt = (countdown, parameters, typeClass) => {
    let sectionTag = document.createElement('div');
    let amountTag = document.createElement('span');
    let wordTag = document.createElement('span');
    let innerSectionTag = document.createElement('div');

    innerSectionTag.appendChild(amountTag);
    innerSectionTag.appendChild(wordTag);
    sectionTag.appendChild(innerSectionTag);

    sectionTag.classList.add(parameters.sectionClass);
    sectionTag.classList.add(typeClass);
    amountTag.classList.add(parameters.amountClass);
    wordTag.classList.add(parameters.wordClass);

    countdown.appendChild(sectionTag);

    return {
        full: sectionTag,
        amount: amountTag,
        word: wordTag
    };
};

/**
 * Function that create full countdown DOM elements calling createCountdownElt
 * @param parameters
 * @param countdown
 * @returns {{days:(*|Element), hours:(*|Element), minutes:(*|Element), seconds:(*|Element)}}
 */
let createElements = (parameters, countdown) => {
    let spanTag;

    if (!parameters.inline) {
        return {
            days: createCountdownElt(countdown, parameters, 'simply-days-section'),
            hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
            minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
            seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
        };
    }

    spanTag = document.createElement('span');
    spanTag.classList.add(parameters.inlineClass);
    countdown.appendChild(spanTag);

    return {
        days: spanTag,
        hours: spanTag,
        minutes: spanTag,
        seconds: spanTag
    };
};

/**
 * simplyCountdown, create and display the countdown.
 * @param elt
 * @param args (parameters)
 */
export const simplyCountdown = function (elt, args) {
    const eltProto = Object.getPrototypeOf(elt);
    let parameters = extend({
        year: 2015,
        month: 6,
        day: 28,
        hours: 0,
        minutes: 0,
        seconds: 0,
        words: {
            days: {lambda: (root, n) => {return n > 1 ? root + "s" : root }, root: 'day'},
            hours: {lambda: (root, n) => {return n > 1 ? root + "s" : root }, root: 'hour'},
            minutes: {lambda: (root, n) => {return n > 1 ? root + "s" : root }, root: 'minute'},
            seconds: {lambda: (root, n) => {return n > 1 ? root + "s" : root }, root: 'second'}
        },
        plural: true,
        inline: false,
        inlineSeparator: ', ',
        enableUtc: false,
        onEnd: () => {
        },
        refresh: 1000,
        inlineClass: 'simply-countdown-inline',
        sectionClass: 'simply-section',
        amountClass: 'simply-amount',
        wordClass: 'simply-word',
        zeroPad: false,
        removeZeroUnits: false,
        countUp: false
    }, args);
    let interval;
    let targetDate;
    let now;
    let secondsLeft;
    let days;
    let hours;
    let minutes;
    let seconds;
    let cd;

    // console.log(typeof elt);
    //
    if (eltProto === String.prototype) {
        cd = document.querySelectorAll(elt);
    } else {
        cd = elt;
    }

    if (parameters.enableUtc) {
        // Use UTC for target date
        targetDate = new Date(Date.UTC(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        ));
    } else {
        // Use local time for target date
        targetDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );
    }

    let runCountdown = (theCountdown) => {
        let countdown = theCountdown;
        let fullCountDown = createElements(parameters, countdown);
        let refresh;

        refresh = function () {
            let dayWord;
            let hourWord;
            let minuteWord;
            let secondWord;

            let updateDisplayDate = () => {
                days = parseInt(secondsLeft / 86400, 10);
                secondsLeft %= 86400;

                hours = parseInt(secondsLeft / 3600, 10);
                secondsLeft %= 3600;

                minutes = parseInt(secondsLeft / 60, 10);
                seconds = parseInt(secondsLeft % 60, 10);
            };

            if (parameters.enableUtc) {
                // Calculate "now" in UTC
                now = new Date();
                now = new Date(Date.UTC(
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate(),
                    now.getUTCHours(),
                    now.getUTCMinutes(),
                    now.getUTCSeconds()
                ));
            } else {
                // Calculate "now" in local time
                now = new Date();
            }

            secondsLeft = Math.floor((targetDate - now.getTime()) / 1000);

            if (secondsLeft > 0) {
                updateDisplayDate();
            } else if (parameters.countUp) {
                secondsLeft = (now.getTime() - targetDate) / 1000;
                updateDisplayDate();
            } else {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
                window.clearInterval(interval);
                parameters.onEnd();
            }

            let getWord = (obj, n) => {
                return obj.hasOwnProperty('lambda')
                    ? obj.lambda(obj.root, n)
                    : obj.root
            };
            let words = parameters.words;
            dayWord = getWord(words.days, days);
            hourWord = getWord(words.hours, hours);
            minuteWord = getWord(words.minutes, minutes);
            secondWord = getWord(words.seconds, seconds);

            /* display an inline countdown into a span tag */
            if (parameters.inline) {
                let displayStr = '';

                if (!(parameters.removeZeroUnits && days === 0)) {
                    displayStr += `${days} ${dayWord}${parameters.inlineSeparator}`;
                }

                if (!(parameters.removeZeroUnits && days === 0 && hours === 0)) {
                    displayStr += `${hours} ${hourWord}${parameters.inlineSeparator}`;
                }

                if (!(parameters.removeZeroUnits && days === 0 && hours === 0 && minutes === 0)) {
                    displayStr += `${minutes} ${minuteWord}${parameters.inlineSeparator}`;
                }

                // Seconds should always be displayed
                displayStr += `${seconds} ${secondWord}`;

                countdown.innerHTML = displayStr.replace(/, $/, ''); // Remove trailing comma if any
            } else {
                if (!(parameters.removeZeroUnits && days === 0)) {
                    fullCountDown.days.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + days;
                    fullCountDown.days.word.textContent = dayWord;
                    fullCountDown.days.full.style.display = '';
                } else {
                    fullCountDown.days.full.style.display = 'none';
                }

                if (!(parameters.removeZeroUnits && days === 0 && hours === 0)) {
                    fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + hours;
                    fullCountDown.hours.word.textContent = hourWord;
                    fullCountDown.hours.full.style.display = '';
                } else {
                    fullCountDown.hours.full.style.display = 'none';
                }

                if (!(parameters.removeZeroUnits && days === 0 && hours === 0 && minutes === 0)) {
                    fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes;
                    fullCountDown.minutes.word.textContent = minuteWord;
                    fullCountDown.minutes.full.style.display = '';
                } else {
                    fullCountDown.minutes.full.style.display = 'none';
                }

                // Seconds should always be displayed
                fullCountDown.seconds.amount.textContent = (parameters.zeroPad && seconds.toString().length < 2 ? '0' : '') + seconds;
                fullCountDown.seconds.word.textContent = secondWord;
                fullCountDown.seconds.full.style.display = '';
            }
        };

        // Refresh immediately to prevent a Flash of Unstyled Content
        refresh();
        interval = window.setInterval(refresh, parameters.refresh);
    };

    if (!isIterableElement(cd)) {
        runCountdown(cd);
    } else {
        Array.prototype.forEach.call(cd, (cdElt) => {
            runCountdown(cdElt);
        });
    }
};

// Export for CommonJS and AMD
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { simplyCountdown };
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        return { simplyCountdown };
    });
}
