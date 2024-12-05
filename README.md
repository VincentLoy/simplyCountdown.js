# simplyCountdown.js

## Why another countdown ?

I developed this little library in a boring day. I regularly use this kind of Javascript's libraries to display countdowns on websites and this one exactly meets the needs that I have. It is perfect to make 'under construction' pages, etc.

This is a very (very) basic Javascript CountDown.

## Getting Started

install via npm or bower

```
$ yarn add simplycountdown.js

// or

$ npm install simplycountdown.js
```

### Insert simplyCountdown to your HTML

```html
<link rel="stylesheet" href="css/simplyCountdown.theme.default.css"/>
<script src="dist/simplyCountdown.min.js"></script>
```
```javascript
    // This is an example with default parameters

    simplyCountdown('[CSS-SELECTOR]', {
        year: 2015, // Target year (required)
        month: 6, // Target month [1-12] (required)
        day: 28, // Target day [1-31] (required)
        hours: 0, // Target hour [0-23], default: 0
        minutes: 0, // Target minute [0-59], default: 0
        seconds: 0, // Target second [0-59], default: 0
        words: { // Custom labels, with lambda for plurals
            days: { root: 'day', lambda: (root, n) => n > 1 ? root + 's' : root },
            hours: { root: 'hour', lambda: (root, n) => n > 1 ? root + 's' : root },
            minutes: { root: 'minute', lambda: (root, n) => n > 1 ? root + 's' : root },
            seconds: { root: 'second', lambda: (root, n) => n > 1 ? root + 's' : root }
        },
        plural: true, // Use plurals for labels
        inline: false, // Inline format: e.g., "24 days, 4 hours, 2 minutes"
        inlineSeparator: ', ', // Separator for inline format, default: ", "
        inlineClass: 'simply-countdown-inline', // CSS class for inline countdown
        enableUtc: false, // Use UTC time if true
        onEnd: function () {}, // Callback when countdown ends
        refresh: 1000, // Refresh interval in ms, default: 1000
        sectionClass: 'simply-section', // CSS class for each countdown section
        amountClass: 'simply-amount', // CSS class for numeric values
        wordClass: 'simply-word', // CSS class for unit labels
        zeroPad: false, // Pad numbers with leading zero
        removeZeroUnits: false, // Remove units with zero value
        countUp: false // Count up after reaching zero
    });

    // Also, you can init with already existing Javascript Object.
    let myElement = document.querySelector('.my-countdown');
    simplyCountdown(myElement, { /* options */ });

    let multipleElements = document.querySelectorAll('.my-countdown');
    simplyCountdown(multipleElements, { /* options */ });
```

### You can use it with jQuery too (not required)

```javascript
// jQuery Example
$('[CSS-SELECTOR]').simplyCountdown({
    year: 2019, // required
    month: 6, // required
    day: 28, // required
    ...
});
```

## Parameters
| Parameter          | Type            | Description                                                                                 | Default                     |
|--------------------|-----------------|---------------------------------------------------------------------------------------------|-----------------------------|
| `year`             | Number (required) | The target year for the countdown.                                                          | -                           |
| `month`            | Number (required) | The target month [1-12] for the countdown.                                                  | -                           |
| `day`              | Number (required) | The target day [1-31] for the countdown.                                                    | -                           |
| `hours`            | Number           | The target hour [0-23].                                                                     | 0                           |
| `minutes`          | Number           | The target minute [0-59].                                                                   | 0                           |
| `seconds`          | Number           | The target second [0-59].                                                                   | 0                           |
| `words`            | Object           | Custom labels for the units (days, hours, minutes, seconds) with optional lambda for pluralization. | `{ days: { root: 'day', lambda: (root, n) => n > 1 ? root + 's' : root }, ... }` |
| `plural`           | Boolean          | Whether to use plural forms for the unit labels.                                            | `true`                      |
| `inline`           | Boolean          | Set to `true` for a simple inline countdown (e.g., "24 days, 4 hours, 2 minutes").          | `false`                     |
| `inlineSeparator`  | String           | Separator used in the inline countdown format.                                              | `, `                        |
| `inlineClass`      | String           | CSS class applied to the inline countdown container.                                        | `"simply-countdown-inline"` |
| `enableUtc`        | Boolean          | Set to `true` to use UTC time for the countdown calculations.                               | `false`                     |
| `onEnd`            | Function         | Callback function executed when the countdown ends.                                         | `() => {}`                  |
| `refresh`          | Number           | The countdown refresh interval in milliseconds.                                             | `1000`                      |
| `sectionClass`     | String           | CSS class applied to each countdown section (days, hours, minutes, seconds).                | `"simply-section"`          |
| `amountClass`      | String           | CSS class applied to the numeric value of each countdown section.                           | `"simply-amount"`           |
| `wordClass`        | String           | CSS class applied to the unit label of each countdown section.                              | `"simply-word"`             |
| `zeroPad`          | Boolean          | Whether to pad the numeric values with leading zeros (e.g., "05").                         | `false`                     |
| `removeZeroUnits`  | Boolean          | Remove units with zero value (e.g., remove "0 days" if days are zero).                     | `false`                     |
| `countUp`          | Boolean          | Count up after reaching zero if set to `true`.                                              | `false`                     |

## Easy to customize

You can easly customize the countdown using the css theme starter file or create your own like so :

/!\ The following theme template works with default class in parameters.

 ```css
    /*
    * Project : simply-countdown
    * File : simplyCountdown.theme.custom
    * Author : Your Name <your-mail[at]example.com>
    */

    .simply-countdown {
        /* The countdown */
    }
    .simply-countdown > .simply-section {
        /* coutndown blocks */
    }

    .simply-countdown > .simply-section > div {
        /* countdown block inner div */
    }

    .simply-countdown > .simply-section .simply-amount,
    .simply-countdown > .simply-section .simply-word {
        /* amounts and words */
    }

    .simply-countdown > .simply-section .simply-amount {
        /* amounts */
    }

    .simply-countdown > .simply-section .simply-word {
        /* words */
   }
```

### Contributing
- Give it a [star](https://github.com/VincentLoy/simplyCountdown.js/stargazers) !
- [Report a bug](https://github.com/VincentLoy/simplyCountdown.js/issues)
- Tweet about it :)

#### Pull Requests
- **Solve a problem**
- For code enhancement, use [ESLint](https://eslint.org/) as a code quality tool.
- Small is better than Big.

### Changelog

#### 1.7.0
- Countdowns can be initialized directly with HTML elements with variables like
    - document.getElementById
    - document.querySelector
    - document.querySelectorAll
    - etc...

##### 1.6.0
- Compatibility with languages like german for plurals ([PR #15](https://github.com/VincentLoy/simplyCountdown.js/pull/15)), thanks to [q30t](https://github.com/q30t)

##### 1.5.0
- Resolve #10 - Add countup support
- Upgrade yarn dev dependencies
- Some minor code reformatting

##### 1.4.0
- Remove bower support
- migrate from LESS to SASS (scss) / for demo and themes
- migrate lib from ES5 to a really basic ES6
    - Remove JSLint support
    - Add ESLint support based on customized [airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb-base)

##### 1.3.2
- add zeroPad parameter
```javascript
zeroPad: false //default
```
- fixed Flash of Unstyled Content

##### 1.3.1
- clean some code
- add refresh parameter
```javascript
refresh: 1000 //default
```

##### 1.3.0
- Add onEnd callback
```javascript
onEnd: function () {
    // some code
}
```

##### 1.2.0
- Resolve #4 - Add UTC support adding enableUtc parameter
```javascript
enableUtc: true //true is default
```
##### 1.1.1
- Resolve #3 - Remove ID Only compatibility

##### 1.1.0
- Add hours, minutes, seconds in available settings to set the target Date

##### 1.0.1
- Fix console error when not using jQuery

##### 1.0.0
- initial release
