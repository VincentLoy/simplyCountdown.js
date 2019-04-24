(function (exports) {
    'use strict';

    /*!
     * Project : simply-countdown
     * Date : 27/06/2015
     * License : MIT
     * Version : 1.5.0
     * Author : Vincent Loy <vincent.loy1@gmail.com>
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
        return spanTag;
    };

    /**
     * simplyCountdown, create and display the coundtown.
     * @param elt
     * @param args (parameters)
     */
    exports.simplyCountdown = (elt, args) => {
        let parameters = extend({
            year: 2015,
            month: 6,
            day: 28,
            hours: 0,
            minutes: 0,
            seconds: 0,
            words: {
                days: 'day',
                hours: 'hour',
                minutes: 'minute',
                seconds: 'second',
                pluralLetter: 's'
            },
            plural: true,
            inline: false,
            enableUtc: false,
            onEnd: () => {
            },
            refresh: 1000,
            inlineClass: 'simply-countdown-inline',
            sectionClass: 'simply-section',
            amountClass: 'simply-amount',
            wordClass: 'simply-word',
            zeroPad: false,
            countUp: false
        }, args);
        let interval;
        let targetDate;
        let targetTmpDate;
        let now;
        let nowUtc;
        let secondsLeft;
        let days;
        let hours;
        let minutes;
        let seconds;
        let cd = document.querySelectorAll(elt);

        targetTmpDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

        if (parameters.enableUtc) {
            targetDate = new Date(
                targetTmpDate.getUTCFullYear(),
                targetTmpDate.getUTCMonth(),
                targetTmpDate.getUTCDate(),
                targetTmpDate.getUTCHours(),
                targetTmpDate.getUTCMinutes(),
                targetTmpDate.getUTCSeconds()
            );
        } else {
            targetDate = targetTmpDate;
        }

        Array.prototype.forEach.call(cd, (theCountdown) => {
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

                now = new Date();
                if (parameters.enableUtc) {
                    nowUtc = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                        now.getHours(), now.getMinutes(), now.getSeconds());
                    secondsLeft = (targetDate - nowUtc.getTime()) / 1000;
                } else {
                    secondsLeft = (targetDate - now.getTime()) / 1000;
                }

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

                if (parameters.plural) {
                    dayWord = days > 1
                        ? parameters.words.days + parameters.words.pluralLetter
                        : parameters.words.days;

                    hourWord = hours > 1
                        ? parameters.words.hours + parameters.words.pluralLetter
                        : parameters.words.hours;

                    minuteWord = minutes > 1
                        ? parameters.words.minutes + parameters.words.pluralLetter
                        : parameters.words.minutes;

                    secondWord = seconds > 1
                        ? parameters.words.seconds + parameters.words.pluralLetter
                        : parameters.words.seconds;
                } else {
                    dayWord = parameters.words.days;
                    hourWord = parameters.words.hours;
                    minuteWord = parameters.words.minutes;
                    secondWord = parameters.words.seconds;
                }

                /* display an inline countdown into a span tag */
                if (parameters.inline) {
                    countdown.innerHTML = `${days} ${dayWord}, `
                        + `${hours} ${hourWord}, `
                        + `${minutes} ${minuteWord}, `
                        + `${seconds} ${secondWord}.`;
                } else {
                    fullCountDown.days.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + days;
                    fullCountDown.days.word.textContent = dayWord;

                    fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + hours;
                    fullCountDown.hours.word.textContent = hourWord;

                    fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes;
                    fullCountDown.minutes.word.textContent = minuteWord;

                    fullCountDown.seconds.amount.textContent = (parameters.zeroPad && seconds.toString().length < 2 ? '0' : '') + seconds;
                    fullCountDown.seconds.word.textContent = secondWord;
                }
            };

            // Refresh immediately to prevent a Flash of Unstyled Content
            refresh();
            interval = window.setInterval(refresh, parameters.refresh);
        });
    };
}(window));

/* global jQuery, simplyCountdown */
if (window.jQuery) {
    (function ($, simplyCountdown) {
        'use strict';

        function simplyCountdownify(el, options) {
            simplyCountdown(el, options);
        }

        $.fn.simplyCountdown = function (options) {
            return simplyCountdownify(this.selector, options);
        };
    }(jQuery, simplyCountdown));
}
