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
            year: 2019, // required
            month: 6, // required
            day: 28, // required
            hours: 0, // Default is 0 [0-23] integer
            minutes: 0, // Default is 0 [0-59] integer
            seconds: 0, // Default is 0 [0-59] integer
            words: { //words displayed into the countdown
                days: { singular: 'day', plural: 'days' },
                hours: { singular: 'hour', plural: 'hours' },
                minutes: { singular: 'minute', plural: 'minutes' },
                seconds: { singular: 'second', plural: 'seconds' }
            },
            plural: true, //use plurals
            inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
            inlineClass: 'simply-countdown-inline', //inline css span class in case of inline = true
            // in case of inline set to false
            enableUtc: false, //Use UTC or not - default : false
            onEnd: function() { return; }, //Callback on countdown end, put your own function here
            refresh: 1000, // default refresh every 1s
            sectionClass: 'simply-section', //section css class
            amountClass: 'simply-amount', // amount css class
            wordClass: 'simply-word', // word css class
            zeroPad: false,
            countUp: false
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
