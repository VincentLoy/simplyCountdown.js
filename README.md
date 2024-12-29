![SimplyCountdown.js](docs/src/public/images/simplyCountdown_banner.webp)

# SimplyCountdown.js

A simple yet powerful countdown plugin, with no dependencies. Create beautiful countdowns with ease!

## Features

-   Zero dependencies
-   TypeScript support
-   Multiple module formats (ES, UMD, CommonJS)
-   Multiple themes included
-   Lightweight and performant
-   Count up or down functionality
-   UTC support
-   Highly customizable
-   Control API (stop, resume, update)
-   Comprehensive event callbacks

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
import simplyCountdown from "simplycountdown.js";

simplyCountdown("#mycountdown", {
    year: 2025,
    month: 12,
    day: 25,
});
```

## Accessing Source Files

If you want to import and compile the TypeScript source files directly, you can include the source files in your project:

```typescript
import simplyCountdown from "simplycountdown.js/src/core/simplyCountdown";
```

### CommonJS

```javascript
const simplyCountdown = require("simplycountdown");

simplyCountdown("#mycountdown", {
    year: 2025,
    month: 12,
    day: 25,
});
```

### Browser (UMD)

```html
<script src="path/to/simplyCountdown.umd.js"></script>
<script>
    simplyCountdown("#mycountdown", {
        year: 2025,
        month: 12,
        day: 25,
    });
</script>
```

## Configuration Options

```javascript
simplyCountdown("#mycountdown", {
    // Target date (Required)
    year: 2025, // Target year [YYYY]
    month: 12, // Target month [1-12]
    day: 25, // Target day [1-31]
    hours: 0, // Target hours [0-23]
    minutes: 0, // Target minutes [0-59]
    seconds: 0, // Target seconds [0-59]

    // Words customization
    words: {
        days: {
            // Function to handle pluralization
            lambda: (root, count) => (count > 1 ? root + "s" : root),
            root: "day", // Base word for days
        },
        hours: {
            lambda: (root, count) => (count > 1 ? root + "s" : root),
            root: "hour",
        },
        minutes: {
            lambda: (root, count) => (count > 1 ? root + "s" : root),
            root: "minute",
        },
        seconds: {
            lambda: (root, count) => (count > 1 ? root + "s" : root),
            root: "second",
        },
    },

    // Display options
    plural: true, // Enable/disable pluralization
    inline: false, // Display inline (true) or in blocks (false)
    inlineSeparator: ", ", // Separator for inline display
    enableUtc: false, // Use UTC time instead of local time

    // Styling classes
    inlineClass: "simply-countdown-inline", // Class for inline display
    sectionClass: "simply-section", // Class for each time unit section
    amountClass: "simply-amount", // Class for number display
    wordClass: "simply-word", // Class for word display

    // Formatting options
    zeroPad: false, // Add leading zeros to numbers (e.g., 05 instead of 5)
    countUp: false, // Count up from target date instead of down to it
    removeZeroUnits: false, // Hide time units when they reach zero
    refresh: 1000, // Update interval in milliseconds (1 second = 1000)

    // Event handlers
    onEnd: () => {
        // Callback function when countdown ends
        console.log("Countdown finished!");
    },
    onStop: () => {}, // Callback when countdown is stopped
    onResume: () => {}, // Callback when countdown is resumed
    onUpdate: (params) => {}, // Callback when countdown is updated
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
<div class="simply-countdown simply-countdown-inline">24 days, 3 hours, 45 minutes, 12 seconds</div>
```

## Themes

The library comes with several built-in themes:

-   `default.css` - Classic theme with clean, modern design
-   `dark.css` - Dark mode theme
-   `circle.css` - Circular display with modern aesthetics
-   `cyber.css` - Cyberpunk-inspired design
-   `losange.css` - Diamond-shaped display

To use a theme, include its CSS file:

```html
<link rel="stylesheet" href="path/to/themes/default.css" />
```

## Examples

### New Year Countdown with UTC

```javascript
simplyCountdown("#newyear", {
    year: 2025,
    month: 1,
    day: 1,
    enableUtc: true,
    zeroPad: true,
    onEnd: () => {
        alert("Happy New Year!");
    },
});
```

### Event Timer (Count Up) with Zero Padding

```javascript
simplyCountdown("#timer", {
    year: 2024,
    month: 1,
    day: 1,
    countUp: true,
    zeroPad: true,
    removeZeroUnits: true,
});
```

### Custom Words with Inline Display

```javascript
simplyCountdown("#inline", {
    year: 2025,
    month: 12,
    day: 25,
    inline: true,
    inlineSeparator: " | ",
    words: {
        days: {
            lambda: (root, count) => (count === 1 ? "day" : "days"),
            root: "day",
        },
        hours: {
            lambda: (root, count) => (count === 1 ? "hour" : "hours"),
            root: "hour",
        },
        minutes: {
            lambda: (root, count) => (count === 1 ? "minute" : "minutes"),
            root: "minute",
        },
        seconds: {
            lambda: (root, count) => (count === 1 ? "second" : "seconds"),
            root: "second",
        },
    },
});
```

## Selector Support

The plugin accepts various selector types:

```javascript
// CSS selector string
simplyCountdown("#countdown", parameters);

// Single DOM element
simplyCountdown(document.getElementById("countdown"), parameters);

// Multiple elements
simplyCountdown(document.querySelectorAll(".countdown"), parameters);
```

## Control Features

The countdown instance returns a controller object that allows you to manipulate the countdown:

```javascript
// Initialize countdown
const countdown = simplyCountdown("#mycountdown", parameters);

// Stop the countdown
countdown.pause();

// Resume countdown
countdown.resume();

// Update countdown parameters
countdown.update({
    year: 2026,
    month: 1,
    day: 1,
});

// Chain control methods
countdown.pause();
countdown.resume();
countdown.update({ year: 2026, hours: 12, minutes: 51 });
```

## Development Commands

### Main Commands

-   `npm run dev`: Start development server for the documentation site & Core library (port 3000)
-   `npm run build`: Build everything (library, themes, and documentation)
-   `npm run preview`: Preview the documentation site

### Build Commands

-   `npm run build:lib`: Build the library (ES and UMD formats)
-   `npm run build:themes`: Build CSS themes
-   `npm run build:docs`: Build the documentation site

### Test Commands

-   `npm run test`: Run tests
-   `npm run test:watch`: Run tests in watch mode
-   `npm run dist:test`: Generate test files for different module formats
-   `npm run dist:test:serve`: Generate and serve test files locally

## Module Format Testing

Test different usecases using:

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

## Key Changes from v1.x/v2.x to v3.x 🚀

### 🔌 Removal of jQuery Support

jQuery is no longer supported in simplyCountdown to reduce dependencies and improve performance. This change ensures a more lightweight and modern library.

**Note:** You can still use simplyCountdown in your jQuery projects by using the vanilla JavaScript syntax instead of the jQuery-specific one:

-   Old jQuery-compatible syntax: `$('.some-countdowns').simplyCountdown(options)`
-   New vanilla JavaScript syntax: `simplyCountdown('.some-countdowns', options)`

### ⚡ Transition from Gulp to Vite

The build process has been migrated from Gulp to Vite. Vite offers faster builds, better development server capabilities, and improved support for modern JavaScript features.

### 📝 Migration from ES6 JavaScript to TypeScript

The source code has been rewritten in TypeScript to enhance code quality, provide better type checking, and improve developer experience.

### 📚 New Documentation Website

A new documentation website has been launched to provide comprehensive guides, examples, and API references. This site aims to make it easier for developers to integrate and use simplyCountdown.

### 📦 Updated Distribution Files

The distribution files have been reorganized to include multiple module formats (ES, UMD, CommonJS) and themes. This change ensures compatibility with various development environments and build tools.

### 🏃‍♂️ Transition from npm to Bun

The package manager has been switched from npm to Bun for faster installs and improved performance. Bun offers a more efficient and modern package management experience.

## License

MIT © 2015-present - Vincent Loy-Serre
