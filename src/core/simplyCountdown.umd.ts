import simplyCountdownCore from "./simplyCountdown";

declare const define: {
    (factory: () => any): void;
    amd: boolean;
};

if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
        return simplyCountdownCore;
    });
} else if (typeof module === "object" && module.exports) {
    // Node
    module.exports = simplyCountdownCore;
} else {
    // Browser
    (window as any).simplyCountdown = simplyCountdownCore;
}

// Export for Vite/Rollup
export default simplyCountdownCore;
