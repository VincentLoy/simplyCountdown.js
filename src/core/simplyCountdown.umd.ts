import simplyCountdownCore from './simplyCountdown';

// @ts-ignore
if (typeof define === 'function' && define.amd) {
    // AMD
    define(function() {
        return simplyCountdownCore;
    });
} else if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = simplyCountdownCore;
} else {
    // Browser
    (window as any).simplyCountdown = simplyCountdownCore;
}

// Export pour Vite/Rollup
export default simplyCountdownCore;
