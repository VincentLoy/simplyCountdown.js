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

import type { CountdownParameters, CountdownSelector } from '../types';
import { createCountdown, updateCountdownSection } from './dom';

const defaultParams: CountdownParameters = {
    year: 2024,
    month: 12,
    day: 25,
    hours: 0,
    minutes: 0,
    seconds: 0,
    words: {
        days: { lambda: (root, n) => n > 1 ? root + 's' : root, root: 'day' },
        hours: { lambda: (root, n) => n > 1 ? root + 's' : root, root: 'hour' },
        minutes: { lambda: (root, n) => n > 1 ? root + 's' : root, root: 'minute' },
        seconds: { lambda: (root, n) => n > 1 ? root + 's' : root, root: 'second' }
    },
    plural: true,
    inline: false,
    inlineSeparator: ', ',
    enableUtc: false,
    onEnd: () => {},
    refresh: 1000,
    inlineClass: 'simply-countdown-inline',
    sectionClass: 'simply-section',
    amountClass: 'simply-amount',
    wordClass: 'simply-word',
    zeroPad: false,
    countUp: false,
    removeZeroUnits: false
};

const isNodeList = (element: CountdownSelector): element is NodeListOf<HTMLElement> => {
    return element instanceof NodeList;
};

interface TimeUnit {
    value: number;
    word: keyof CountdownParameters['words'];
    element?: HTMLElement;
}

/**
 * Formats a time unit with optional zero padding and pluralization
 * @param unit - The time unit object containing value and word properties
 * @param params - The countdown parameters containing formatting options and word definitions
 * @returns A formatted string containing the value and pluralized word for the time unit
 * @example
 * // With zeroPad: true
 * formatTimeUnit({value: 5, word: 'days'}, params) // returns "05 days"
 * // With zeroPad: false
 * formatTimeUnit({value: 5, word: 'days'}, params) // returns "5 days"
 */
function formatTimeUnit(unit: TimeUnit, params: CountdownParameters): string {
    const value = params.zeroPad ? String(unit.value).padStart(2, '0') : unit.value;
    return `${value} ${params.words[unit.word].lambda(params.words[unit.word].root, unit.value)}`;
}

/**
 * Determines whether a time unit should be displayed based on its value and the values of previous units
 * @param unit - The current time unit to evaluate
 * @param previousUnits - Array of time units that come before the current unit
 * @param params - Configuration parameters for the countdown
 * @returns True if the unit should be displayed, false otherwise
 * 
 * If removeZeroUnits is false in params, always returns true.
 * Otherwise, returns true if either:
 * - The current unit value is not zero
 * - Any previous unit has a non-zero value
 */
function shouldDisplay(unit: TimeUnit, previousUnits: TimeUnit[], params: CountdownParameters): boolean {
    if (!params.removeZeroUnits) return true;
    return unit.value !== 0 || previousUnits.some(u => u.value !== 0);
}

/**
 * Displays the countdown timer inline within the specified HTML element.
 * 
 * @param timeUnits - Array of time units containing values and labels for display
 * @param params - Configuration parameters for the countdown display
 * @param element - The HTML element where the countdown will be rendered
 * 
 * @remarks
 * The function filters and formats time units based on display rules, then joins them with
 * the specified separator from params.inlineSeparator before setting the element's innerHTML.
 */
function displayInline(timeUnits: TimeUnit[], params: CountdownParameters, element: HTMLElement): void {
    const displayStr = timeUnits
        .filter((unit, index) => shouldDisplay(unit, timeUnits.slice(0, index), params))
        .map(unit => formatTimeUnit(unit as { value: number; word: keyof typeof params.words }, params))
        .join(params.inlineSeparator);

    element.innerHTML = displayStr;
}

/**
 * Updates the display of time units in the countdown based on their values and display conditions
 * @param timeUnits - Array of TimeUnit objects containing the time values and their corresponding words
 * @param params - Configuration parameters for the countdown display
 * @param countdown - DOM elements representing the countdown display sections
 * @returns void
 *
 * @remarks
 * This function iterates through each time unit and determines whether it should be shown based on:
 * - If it's the seconds unit (always shown)
 * - If it meets display criteria based on previous units
 * 
 * For units that should be shown, it:
 * - Updates the display value (with optional zero padding)
 * - Updates the word label using the configured lambda function
 * - Shows the unit's DOM element
 * 
 * For units that shouldn't be shown, it hides their DOM elements
 */
function displayBlocks(timeUnits: TimeUnit[], params: CountdownParameters, countdown: any): void {
    timeUnits.forEach((unit, index) => {
        const shouldShow = unit.word === 'seconds' || shouldDisplay(unit, timeUnits.slice(0, index), params);
        
        if (shouldShow) {
            updateCountdownSection(
                countdown[unit.word],
                params.zeroPad ? String(unit.value).padStart(2, '0') : unit.value,
                params.words[unit.word].lambda(params.words[unit.word].root, unit.value)
            );
            countdown[unit.word].style.display = '';
        } else {
            countdown[unit.word].style.display = 'none';
        }
    });
}

const createCountdownInstance = (targetElement: HTMLElement, parameters: CountdownParameters) => {
    // Create target date with proper UTC handling
    const targetDate = parameters.enableUtc 
        ? new Date(Date.UTC(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        ))
        : new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

    // Create span element for inline mode
    let inlineElement: HTMLElement | null = null;
    if (parameters.inline) {
        inlineElement = document.createElement('span');
        inlineElement.className = parameters.inlineClass;
        targetElement.appendChild(inlineElement);
    }

    const countdown = parameters.inline ? null : createCountdown(targetElement, {
        sectionClass: parameters.sectionClass,
        amountClass: parameters.amountClass,
        wordClass: parameters.wordClass
    });

    const refresh = () => {
        // Fix UTC current date handling
        const currentDate = parameters.enableUtc 
            ? new Date(Date.UTC(
                new Date().getUTCFullYear(),
                new Date().getUTCMonth(),
                new Date().getUTCDate(),
                new Date().getUTCHours(),
                new Date().getUTCMinutes(),
                new Date().getUTCSeconds()
            ))
            : new Date();

        let diff = parameters.countUp
            ? currentDate.getTime() - targetDate.getTime()
            : targetDate.getTime() - currentDate.getTime();

        if (diff <= 0 && !parameters.countUp) {
            diff = 0;
            if (parameters.onEnd) {
                parameters.onEnd();
            }
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * 1000 * 60;

        const seconds = Math.floor(diff / 1000);

        if (parameters.inline && inlineElement) {
            const timeUnits: TimeUnit[] = [
                { value: days, word: 'days' as keyof CountdownParameters['words'] },
                { value: hours, word: 'hours' as keyof CountdownParameters['words'] },
                { value: minutes, word: 'minutes' as keyof CountdownParameters['words'] },
                { value: seconds, word: 'seconds' as keyof CountdownParameters['words'] }
            ];
            displayInline(timeUnits, parameters, inlineElement);
        } else if (countdown) {
            const timeUnits: TimeUnit[] = [
                { value: days, word: 'days' as keyof CountdownParameters['words'] },
                { value: hours, word: 'hours' as keyof CountdownParameters['words'] },
                { value: minutes, word: 'minutes' as keyof CountdownParameters['words'] },
                { value: seconds, word: 'seconds' as keyof CountdownParameters['words'] }
            ];
            displayBlocks(timeUnits, parameters, countdown);
        }
    };

    const interval = setInterval(refresh, parameters.refresh);
    refresh();

    // Cleanup on element removal
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

export const simplyCountdown = (
    element: CountdownSelector,
    args: Partial<CountdownParameters> = defaultParams
): void => {
    const parameters: CountdownParameters = { ...defaultParams, ...args };

    if (typeof element === 'string') {
        const elements = document.querySelectorAll<HTMLElement>(element);
        elements.forEach((el) => createCountdownInstance(el, parameters));
    } else if (isNodeList(element)) {
        element.forEach((el) => createCountdownInstance(el, parameters));
    } else {
        createCountdownInstance(element, parameters);
    }
};
