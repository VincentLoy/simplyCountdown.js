# SimplyCountdown.js

A simple yet powerful countdown plugin, with no dependencies. Create beautiful countdowns with ease!

## Features

- Zero dependencies
- Multiple module formats (ES, UMD, CommonJS)
- Multiple themes included
- Lightweight and performant
- Count up or down
- UTC support
- Highly customizable

## Installation

```bash
npm install simplycountdown
# or
yarn add simplycountdown
# or
bun install simplycountdown
```

## Basic Usage

### ES Module
```javascript
import simplyCountdown from 'simplycountdown';

simplyCountdown('#mycountdown', {
    year: 2025,
    month: 12,
    day: 25
});
```

### CommonJS
```javascript
const simplyCountdown = require('simplycountdown');

simplyCountdown('#mycountdown', {
    year: 2025,
    month: 12,
    day: 25
});
```

### Browser (UMD)
```html
<script src="path/to/simplyCountdown.umd.js"></script>
<script>
    simplyCountdown('#mycountdown', {
        year: 2025,
        month: 12,
        day: 25
    });
</script>
```

## Configuration Options

```javascript
simplyCountdown('#mycountdown', {
    // Target date (Required)
    year: 2025,          // Target year [YYYY]
    month: 12,           // Target month [1-12]
    day: 25,            // Target day [1-31]
    hours: 0,           // Target hours [0-23]
    minutes: 0,         // Target minutes [0-59]
    seconds: 0,         // Target seconds [0-59]
    
    // Words customization
    words: {
        days: {
            // Function to handle pluralization
            lambda: (root, count) => count > 1 ? root + 's' : root,
            root: 'day'  // Base word for days
        },
        hours: {
            lambda: (root, count) => count > 1 ? root + 's' : root,
            root: 'hour'
        },
        minutes: {
            lambda: (root, count) => count > 1 ? root + 's' : root,
            root: 'minute'
        },
        seconds: {
            lambda: (root, count) => count > 1 ? root + 's' : root,
            root: 'second'
        }
    },
    
    // Display options
    plural: true,         // Enable/disable pluralization
    inline: false,        // Display inline (true) or in blocks (false)
    inlineSeparator: ', ', // Separator for inline display
    enableUtc: false,     // Use UTC time instead of local time
    
    // Styling classes
    inlineClass: 'simply-countdown-inline',  // Class for inline display
    sectionClass: 'simply-section',          // Class for each time unit section
    amountClass: 'simply-amount',            // Class for number display
    wordClass: 'simply-word',                // Class for word display
    
    // Formatting options
    zeroPad: false,           // Add leading zeros to numbers (e.g., 05 instead of 5)
    countUp: false,           // Count up from target date instead of down to it
    removeZeroUnits: false,   // Hide time units when they reach zero
    refresh: 1000,            // Update interval in milliseconds (1 second = 1000)
    
    // Event handlers
    onEnd: () => {           // Callback function when countdown ends
        console.log('Countdown finished!');
    }
});
```

## HTML Structure

The plugin generates the following HTML structure:

### Block Display (default)
```html
<div class="simply-countdown">
    <div class="simply-section">
        <div>
            <span class="simply-amount">24</span>
            <span class="simply-word">days</span>
        </div>
    </div>
    <!-- Similar sections for hours, minutes, seconds -->
</div>
```

### Inline Display
```html
<div class="simply-countdown simply-countdown-inline">
    24 days, 3 hours, 45 minutes, 12 seconds
</div>
```

## Themes

The library comes with several built-in themes:
- `default.css` - Classic theme with clean, modern design
- `dark.css` - Dark mode theme
- `circle.css` - Circular display with modern aesthetics
- `cyber.css` - Cyberpunk-inspired design
- `losange.css` - Diamond-shaped display

To use a theme, include its CSS file:
```html
<link rel="stylesheet" href="path/to/themes/default.css">
```

## Examples

### New Year Countdown with UTC
```javascript
simplyCountdown('#newyear', {
    year: 2025,
    month: 1,
    day: 1,
    enableUtc: true,
    zeroPad: true,
    onEnd: () => {
        alert('Happy New Year!');
    }
});
```

### Event Timer (Count Up) with Zero Padding
```javascript
simplyCountdown('#timer', {
    year: 2024,
    month: 1,
    day: 1,
    countUp: true,
    zeroPad: true,
    removeZeroUnits: true
});
```

### Custom Words with Inline Display
```javascript
simplyCountdown('#inline', {
    year: 2025,
    month: 12,
    day: 25,
    inline: true,
    inlineSeparator: ' | ',
    words: {
        days: { 
            lambda: (root, count) => count === 1 ? 'day' : 'days',
            root: 'day'
        },
        hours: { 
            lambda: (root, count) => count === 1 ? 'hour' : 'hours',
            root: 'hour'
        },
        minutes: { 
            lambda: (root, count) => count === 1 ? 'minute' : 'minutes',
            root: 'minute'
        },
        seconds: { 
            lambda: (root, count) => count === 1 ? 'second' : 'seconds',
            root: 'second'
        }
    }
});
```

## Selector Support

The plugin accepts various selector types:
```javascript
// CSS selector string
simplyCountdown('#countdown');

// Single DOM element
simplyCountdown(document.getElementById('countdown'));

// Multiple elements
simplyCountdown(document.querySelectorAll('.countdown'));
```

## Development Commands

### Main Commands
- `npm run dev`: Start development server for the documentation site & Core library (port 3000)
- `npm run build`: Build everything (library, themes, and documentation)
- `npm run preview`: Preview the documentation site

### Build Commands
- `npm run build:lib`: Build the library (ES and UMD formats)
- `npm run build:themes`: Build CSS themes
- `npm run build:docs`: Build the documentation site

### Test Commands
- `npm run test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run dist:test`: Generate test files for different module formats
- `npm run dist:test:serve`: Generate and serve test files locally

## Module Format Testing

Test different module formats using:

```bash
npm run dist:test:serve
```

Available test files:
1. ES Module (`index.es.html`)
2. UMD Global (`index.umd-global.html`)
3. UMD AMD/RequireJS (`index.umd-amd.html`)
4. UMD CommonJS (`index.umd-commonjs.html`)
5. UMD Dynamic Loading (`index.umd-dynamic.html`)

## Browser Support

The library supports all modern browsers (Chrome, Firefox, Safari, Edge) and IE11+.

## License

MIT © 2014-present - Vincent Loy
