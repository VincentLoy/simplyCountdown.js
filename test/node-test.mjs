// CommonJS test for SimplyCountdown

// Mock DOM elements since we're in Node.js
class MockElement {
    constructor() {
        this.className = '';
        this.children = [];
        this.style = {};
    }

    appendChild(child) {
        this.children.push(child);
        return child;
    }
}

// Mock window and document
global.window = {
    addEventListener: () => {}
};

global.document = {
    createElement: (tag) => new MockElement(),
    querySelector: (selector) => new MockElement()
};

// Test the countdown
console.log('Testing SimplyCountdown in Node.js environment...');

import('../dist/simplyCountdown.umd.js').then(module => {
    const simplyCountdown = module.default;

    try {
        // Initialize countdown
        simplyCountdown('#mycountdown', {
            year: 2025,
            month: 12,
            day: 25,
            onEnd: () => {
                console.log('Countdown ended!');
            }
        });

        console.log('✅ Countdown initialized successfully');
        
        // Test that simplyCountdown is a function
        if (typeof simplyCountdown !== 'function') {
            throw new Error('simplyCountdown is not a function');
        }
        console.log('✅ simplyCountdown is a function');

        // Test with invalid parameters
        try {
            simplyCountdown('#mycountdown', {
                year: 'invalid',
                month: 13,
                day: 32
            });
            console.log('❌ Should have thrown error for invalid parameters');
        } catch (e) {
            console.log('✅ Correctly handles invalid parameters');
        }

        console.log('All tests completed successfully!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}).catch(error => {
    console.error('❌ Failed to load module:', error);
    process.exit(1);
});
