export interface WordConfig {
    lambda: (root: string, n: number) => string;
    root: string;
}

export interface Words {
    days: WordConfig;
    hours: WordConfig;
    minutes: WordConfig;
    seconds: WordConfig;
}

export interface CountdownParameters {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    words: Words;
    plural: boolean;
    inline: boolean;
    inlineSeparator: string;
    enableUtc: boolean;
    onEnd: () => void;
    refresh: number;
    inlineClass: string;
    sectionClass: string;
    amountClass: string;
    wordClass: string;
    zeroPad: boolean;
    removeZeroUnits: boolean;
    countUp: boolean;
    onStop?: () => void;
    onResume?: () => void;
    onUpdate?: (newParams: Partial<CountdownParameters>) => void;
}

export type CountdownState = {
    isPaused: boolean;
    interval: ReturnType<typeof setInterval> | null;
    targetDate: Date;
};

export interface CountdownElements {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
}

export interface CountdownSection {
    full: HTMLElement;
    amount: HTMLElement;
    word: HTMLElement;
}

export type CountdownSelector = string | HTMLElement | NodeListOf<HTMLElement>;

export interface CountdownController {
    stopCountdown: () => void;
    resumeCountdown: () => void;
    updateCountdown: (newParams: Partial<CountdownParameters>) => void;
    getState: () => CountdownState;
}

export interface CountdownControllerArray extends Array<CountdownController> {
    stopCountdown: () => void;
    resumeCountdown: () => void;
    updateCountdown: (newParams: Partial<CountdownParameters>) => void;
    getState: () => CountdownState[];
}
