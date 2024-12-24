/**
 * Creates a countdown section element
 */
export const createCountdownSection = (
    sectionClass: string,
    amount: number,
    word: string
): HTMLElement => {
    const section = document.createElement('div');
    section.className = `simply-section ${sectionClass}`;

    const wrap = document.createElement('div');
    const amount_elem = document.createElement('span');
    const word_elem = document.createElement('span');

    amount_elem.className = 'simply-amount';
    word_elem.className = 'simply-word';

    amount_elem.textContent = String(amount);
    word_elem.textContent = word;

    wrap.appendChild(amount_elem);
    wrap.appendChild(word_elem);
    section.appendChild(wrap);

    return section;
};

/**
 * Retrieves a countdown section element from a container
 */
export const getCountdownSection = (
    sectionClass: string,
    container: HTMLElement
): HTMLElement | null => {
    return container.querySelector(`.simply-section.${sectionClass}`);
};

/**
 * Updates a countdown section element
 */
export const updateCountdownSection = (
    section: HTMLElement,
    amount: number | string,
    word: string
): void => {
    const amountElement = section.querySelector('.simply-amount');
    const wordElement = section.querySelector('.simply-word');

    if (amountElement) {
        amountElement.textContent = String(amount);
    }
    if (wordElement) {
        wordElement.textContent = word;
    }
};

/**
 * Creates all countdown elements
 */
export const createCountdown = (
    container: HTMLElement
): {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
} => {
    const days = createCountdownSection('simply-days-section', 0, 'day');
    const hours = createCountdownSection('simply-hours-section', 0, 'hour');
    const minutes = createCountdownSection('simply-minutes-section', 0, 'minute');
    const seconds = createCountdownSection('simply-seconds-section', 0, 'second');

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
