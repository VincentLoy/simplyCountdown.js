/**
 * Utility functions for the countdown
 */

/**
 * Extends multiple objects into one
 */
export const extend = <T extends object>(output: T, ...objects: Partial<T>[]): T => {
    const out = output || {} as T;

    for (const obj of objects) {
        if (!obj) continue;

        for (const [key, value] of Object.entries(obj)) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (value && typeof value === 'object') {
                    out[key as keyof T] = extend(
                        out[key as keyof T] as object || {},
                        value
                    ) as T[keyof T];
                } else {
                    out[key as keyof T] = value as T[keyof T];
                }
            }
        }
    }

    return out;
};

/**
 * Checks if a value is iterable
 */
export const isIterableElement = (val: unknown): boolean => {
    return val !== null && Symbol.iterator in Object(val);
};

/**
 * Formats a number with leading zero if needed
 */
export const formatTime = (value: number, zeroPad: boolean): string => {
    return zeroPad && value < 10 ? `0${value}` : `${value}`;
};

/**
 * Calculates time units from seconds
 */
export const calculateTimeUnits = (secondsLeft: number): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} => {
    // Utilisation de parseInt pour correspondre à l'original
    const days = parseInt((secondsLeft / 86400).toString(), 10);
    secondsLeft %= 86400;

    const hours = parseInt((secondsLeft / 3600).toString(), 10);
    secondsLeft %= 3600;

    const minutes = parseInt((secondsLeft / 60).toString(), 10);
    const seconds = parseInt((secondsLeft % 60).toString(), 10);

    return { days, hours, minutes, seconds };
};
