/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.2.0
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 */
/*global window, document*/
(function (exports) {
    'use strict';

    var // functions
        extend,
        createElements,
        simplyCountdown;

    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
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

    createElements = function (parameters, countdown) {
        var // inline mode
            spanTag,
            // block mode
            daysSectionTag,
            daysAmount,
            daysWord,
            daysInnerContainer,
            hoursSectionTag,
            hoursAmount,
            hoursWord,
            hoursInnerContainer,
            minutesSectionTag,
            minutesAmount,
            minutesWord,
            minutesInnerContainer,
            secondsSectionTag,
            secondsAmount,
            secondsWord,
            secondsInnerContainer;

        if (!parameters.inline) {
            daysSectionTag = document.createElement('div');
            daysAmount = document.createElement('span');
            daysWord = document.createElement('span');
            daysInnerContainer = document.createElement('div');

            daysInnerContainer.appendChild(daysAmount);
            daysInnerContainer.appendChild(daysWord);
            daysSectionTag.appendChild(daysInnerContainer);

            minutesSectionTag = document.createElement('div');
            minutesAmount = document.createElement('span');
            minutesWord = document.createElement('span');
            minutesInnerContainer = document.createElement('div');

            minutesInnerContainer.appendChild(minutesAmount);
            minutesInnerContainer.appendChild(minutesWord);
            minutesSectionTag.appendChild(minutesInnerContainer);

            hoursSectionTag = document.createElement('div');
            hoursAmount = document.createElement('span');
            hoursWord = document.createElement('span');
            hoursInnerContainer = document.createElement('div');

            hoursInnerContainer.appendChild(hoursAmount);
            hoursInnerContainer.appendChild(hoursWord);
            hoursSectionTag.appendChild(hoursInnerContainer);

            secondsSectionTag = document.createElement('div');
            secondsAmount = document.createElement('span');
            secondsWord = document.createElement('span');
            secondsInnerContainer = document.createElement('div');

            secondsInnerContainer.appendChild(secondsAmount);
            secondsInnerContainer.appendChild(secondsWord);
            secondsSectionTag.appendChild(secondsInnerContainer);

            daysSectionTag.classList.add(parameters.sectionClass);
            hoursSectionTag.classList.add(parameters.sectionClass);
            minutesSectionTag.classList.add(parameters.sectionClass);
            secondsSectionTag.classList.add(parameters.sectionClass);

            daysAmount.classList.add(parameters.amountClass);
            hoursAmount.classList.add(parameters.amountClass);
            minutesAmount.classList.add(parameters.amountClass);
            secondsAmount.classList.add(parameters.amountClass);

            daysWord.classList.add(parameters.wordClass);
            hoursWord.classList.add(parameters.wordClass);
            minutesWord.classList.add(parameters.wordClass);
            secondsWord.classList.add(parameters.wordClass);


            countdown.appendChild(daysSectionTag);
            countdown.appendChild(hoursSectionTag);
            countdown.appendChild(minutesSectionTag);
            countdown.appendChild(secondsSectionTag);

            return {
                days: {
                    full: daysSectionTag,
                    amount: daysAmount,
                    word: daysWord
                },
                hours: {
                    full: hoursSectionTag,
                    amount: hoursAmount,
                    word: hoursWord
                },
                minutes: {
                    full: minutesSectionTag,
                    amount: minutesAmount,
                    word: minutesWord
                },
                seconds: {
                    full: secondsSectionTag,
                    amount: secondsAmount,
                    word: secondsWord
                }
            };

        }

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.inlineClass);
        return spanTag;
    };

    simplyCountdown = function (elt, args) {
        var parameters = extend({
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
                enableUtc: true,
                onEnd: function () {
                    return;
                },
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word'
            }, args),
            interval,
            targetDate,
            targetTmpDate,
            now,
            nowUtc,
            secondsLeft,
            days,
            hours,
            minutes,
            seconds,
            cd = document.querySelectorAll(elt);

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

        Array.prototype.forEach.call(cd, function (countdown) {
            var fullCountDown = createElements(parameters, countdown);
            //console.log('fullCD', fullCountDown);

            interval = window.setInterval(function () {
                var dayWord,
                    hourWord,
                    minuteWord,
                    secondWord;

                now = new Date();
                if (parameters.enableUtc) {
                    nowUtc = new Date(now.getFullYear(), now.getMonth(), now.getDate(),  now.getHours(),
                        now.getMinutes(), now.getSeconds());
                    secondsLeft = (targetDate - nowUtc.getTime()) / 1000;

                } else {
                    secondsLeft = (targetDate - now.getTime()) / 1000;
                }

                if (secondsLeft > 0) {
                    days = parseInt(secondsLeft / 86400, 10);
                    secondsLeft = secondsLeft % 86400;

                    hours = parseInt(secondsLeft / 3600, 10);
                    secondsLeft = secondsLeft % 3600;

                    minutes = parseInt(secondsLeft / 60, 10);
                    seconds = parseInt(secondsLeft % 60, 10);
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
                        ? parameters.words.days + parameters.words.pluralLetter : parameters.words.days;

                    hourWord = hours > 1
                        ? parameters.words.hours + parameters.words.pluralLetter : parameters.words.hours;

                    minuteWord = minutes > 1
                        ? parameters.words.minutes + parameters.words.pluralLetter : parameters.words.minutes;

                    secondWord = seconds > 1
                        ? parameters.words.seconds + parameters.words.pluralLetter : parameters.words.seconds;

                } else {
                    dayWord = parameters.words.days;
                    hourWord = parameters.words.hours;
                    minuteWord = parameters.words.minutes;
                    secondWord = parameters.words.seconds;
                }

                /* display an inline countdown into a span tag */
                if (parameters.inline) {
                    countdown.innerHTML =
                        days + ' ' + dayWord + ', ' +
                        hours + ' ' + hourWord + ', ' +
                        minutes + ' ' + minuteWord + ', ' +
                        seconds + ' ' + secondWord + '.';

                } else {
                    fullCountDown.days.amount.innerHTML = days;
                    fullCountDown.days.word.innerHTML = dayWord;

                    fullCountDown.hours.amount.innerHTML = hours;
                    fullCountDown.hours.word.innerHTML = hourWord;

                    fullCountDown.minutes.amount.innerHTML = minutes;
                    fullCountDown.minutes.word.innerHTML = minuteWord;

                    fullCountDown.seconds.amount.innerHTML = seconds;
                    fullCountDown.seconds.word.innerHTML = secondWord;


                    //sectionTag = document.createElement('div');
                    //amountTag = document.createElement('span');
                    //wordTag = document.createElement('span');
                    //sectionTagInnerContainer = document.createElement('div');
                    //
                    //sectionTag.classList.add(parameters.sectionClass);
                    //amountTag.classList.add(parameters.amountClass);
                    //wordTag.classList.add(parameters.wordClass);
                    //
                    //sectionTagInnerContainer.appendChild(amountTag);
                    //sectionTagInnerContainer.appendChild(wordTag);
                    //
                    //sectionTag.appendChild(sectionTagInnerContainer);
                    //
                    //amountTag.innerHTML = days;
                    //wordTag.innerHTML = dayWord;
                    //
                    //fullCountDown = sectionTag.outerHTML;
                    //
                    //amountTag.innerHTML = hours;
                    //wordTag.innerHTML = hourWord;
                    //
                    //fullCountDown += sectionTag.outerHTML;
                    //
                    //amountTag.innerHTML = minutes;
                    //wordTag.innerHTML = minuteWord;
                    //
                    //fullCountDown += sectionTag.outerHTML;
                    //
                    //amountTag.innerHTML = seconds;
                    //wordTag.innerHTML = secondWord;
                    //
                    //fullCountDown += sectionTag.outerHTML;
                    //
                    //countdown.innerHTML = fullCountDown;
                }
            }, 1000);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/*global $, jQuery, simplyCountdown*/
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
