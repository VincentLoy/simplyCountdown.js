/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.0.0
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 */
/*global window, document*/
(function (exports) {
    'use strict';

    var extend,
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

    simplyCountdown = function (eltId, args) {

        var parameters = extend({
                year: 2015,
                month: 6,
                day: 28,
                words: {
                    days: 'day',
                    hours: 'hour',
                    minutes: 'minute',
                    seconds: 'second',
                    pluralLetter: 's'
                },
                plural: true,
                inline: false,
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word'
            }, args),
            targetDate = new Date(parameters.year, parameters.month - 1, parameters.day),
            currentDate,
            secondsLeft,
            days,
            hours,
            minutes,
            seconds,
            countdown = document.getElementById(eltId);

        window.setInterval(function () {
            var spanTag,
                sectionTag,
                amountTag,
                sectionTagInnerContainer,
                wordTag,
                dayWord,
                hourWord,
                minuteWord,
                fullCountDown,
                secondWord;

            currentDate = new Date().getTime();
            secondsLeft = (targetDate - currentDate) / 1000;

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
            }

            if (parameters.plural) {
                dayWord = days > 1 ? parameters.words.days + parameters.words.pluralLetter : parameters.words.days;
                hourWord = hours > 1 ? parameters.words.hours + parameters.words.pluralLetter : parameters.words.hours;
                minuteWord = minutes > 1 ? parameters.words.minutes + parameters.words.pluralLetter : parameters.words.minutes;
                secondWord = seconds > 1 ? parameters.words.seconds + parameters.words.pluralLetter : parameters.words.seconds;
            } else {
                dayWord = parameters.words.days;
                hourWord = parameters.words.hours;
                minuteWord = parameters.words.minutes;
                secondWord = parameters.words.seconds;
            }

            /* display an inline countdown into a span tag */
            if (parameters.inline) {
                spanTag = document.createElement('span');
                spanTag.classList.add(parameters.inlineClass);

                spanTag.innerHTML =
                    days + ' ' + dayWord + ', ' +
                    hours + ' ' + hourWord + ', ' +
                    minutes + ' ' + minuteWord + ', ' +
                    seconds + ' ' + secondWord + ', ';

                countdown.innerHTML = spanTag.outerHTML;
            } else {
                sectionTag = document.createElement('div');
                amountTag = document.createElement('span');
                wordTag = document.createElement('span');
                sectionTagInnerContainer = document.createElement('div');

                sectionTag.classList.add(parameters.sectionClass);
                amountTag.classList.add(parameters.amountClass);
                wordTag.classList.add(parameters.wordClass);

                sectionTagInnerContainer.appendChild(amountTag);
                sectionTagInnerContainer.appendChild(wordTag);

                sectionTag.appendChild(sectionTagInnerContainer);

                amountTag.innerHTML = days;
                wordTag.innerHTML = dayWord;

                fullCountDown = sectionTag.outerHTML;

                amountTag.innerHTML = hours;
                wordTag.innerHTML = hourWord;

                fullCountDown += sectionTag.outerHTML;

                amountTag.innerHTML = minutes;
                wordTag.innerHTML = minuteWord;

                fullCountDown += sectionTag.outerHTML;

                amountTag.innerHTML = seconds;
                wordTag.innerHTML = secondWord;

                fullCountDown += sectionTag.outerHTML;


                countdown.innerHTML = fullCountDown;
            }
        }, 1000);
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/*global $, jQuery, simplyCountdown*/
(function ($, simplyCountdown) {
    'use strict';

    function simplyCountdownify(el, options) {
        simplyCountdown(el, options);
    }

    $.fn.simplyCountdown = function (options) {
        return simplyCountdownify(this.selector.replace('#', ''), options);
    };
}(jQuery, simplyCountdown));
