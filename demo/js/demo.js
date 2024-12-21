import simplyCountdown from '../../src/simplyCountdown.js';

document.addEventListener('DOMContentLoaded', function() {
    /**
     * WARNING: I set this coundtown to be running until the end of times.
     * So when you'll init the plugin, follow how it's done in plugin documentation.
     */
    let d = new Date();
    d.setMonth(d.getMonth() + 1);

    // default example
    simplyCountdown('.simply-countdown-one', {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        enableUtc: true
    });

    // losange example
    simplyCountdown('#simply-countdown-losange', {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        enableUtc: false
    });

    // example with removeZeroUnits
    simplyCountdown('.simply-countdown-two', {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() - 30,
        removeZeroUnits: true
    });

    // inline example
    simplyCountdown('.simply-countdown-inline', {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        inline: true
    });

    // Header inline Countdown
    let dateInTwoMinutes = new Date();
    dateInTwoMinutes.setSeconds(dateInTwoMinutes.getSeconds() + 30);
    simplyCountdown('.sc-inline-header__cd', {
        year: dateInTwoMinutes.getFullYear(),
        month: dateInTwoMinutes.getMonth() + 1,
        day: dateInTwoMinutes.getDate(),
        hours: dateInTwoMinutes.getHours(),
        minutes: dateInTwoMinutes.getMinutes(),
        seconds: dateInTwoMinutes.getSeconds(),
        removeZeroUnits: true,
        inline: true,
        inlineSeparator: ' - ',
        onEnd: () => {
            let afterHeaderCdAlert = document.querySelector('.show-after-header-cd');
            afterHeaderCdAlert.classList.add('active');
            document.querySelector('.sc-inline-header').classList.add('hide');

            window.setInterval(() => {
                afterHeaderCdAlert.classList.remove('active');
            }, 20000);
        }
    });

    // Count Up Example
    var countUpDate = new Date();
    simplyCountdown('.simply-countdown-countup', {
        year: countUpDate.getFullYear(),
        month: countUpDate.getMonth() + 1,
        day: countUpDate.getDate(),
        hours: countUpDate.getHours(),
        minutes: countUpDate.getMinutes(),
        seconds: countUpDate.getSeconds(),
        countUp: true
    });
});
