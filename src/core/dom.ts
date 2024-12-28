/**
 * Creates a countdown section element
 */
export const createCountdownSection = (
    sectionClass: string,
    amountClass: string,
    wordClass: string,
    amount: number,
    word: string,
    params: {
        sectionClass: string;
        amountClass: string;
        wordClass: string;
    }
): HTMLElement => {
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

/**
 * Retrieves a countdown section element from a container
 */
export const getCountdownSection = (sectionClass: string, container: HTMLElement): HTMLElement | null => {
    return container.querySelector(`.simply-section.${sectionClass}`);
};

/**
 * Updates a countdown section element
 */
export const updateCountdownSection = (section: HTMLElement, amount: number | string, word: string): void => {
    const amountElement = section.querySelector(".simply-amount");
    const wordElement = section.querySelector(".simply-word");

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
    container: HTMLElement,
    params: {
        sectionClass: string;
        amountClass: string;
        wordClass: string;
    }
): {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
} => {
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
        seconds,
    };
};
