# simplyCountdown.js

## Why another countdown ?

I developed this little library in a boring day. I regularly use this kind of Javascript's libraries to display countdowns on websites and this one exactly meets the needs that I have. It is perfect to make 'under construction' pages, etc.

This is a very (very) basic Javascript CountDown.

## Getting Started

install via npm or bower

```
$ bower install simplycountdown.js
$ npm install simplycountdown.js
```

### Insert simplyCountdown to your HTML

```html 
<link rel="stylesheet" href="css/simplyCountdown.theme.default.css"/> 
<script src="dist/simplyCountdown.min.js"></script> 
``` 
```javascript 
    // This is an example with default parameters
    // You'll always have to call simplyCountdown using ID's, no classes.

    simplyCountdown('elementId', {
            year: 2015, // required
            month: 6, // required
            day: 28, // required
            words: { //words displayed into the countdown
                days: 'day',
                hours: 'hour',
                minutes: 'minute',
                seconds: 'second',
                pluralLetter: 's'
            },
            plural: true, //use plurals
            inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
            inlineClass: 'simply-countdown-inline', //inline css span class in case of inline = true
            // in case of inline set to false
            sectionClass: 'simply-section', //section css class
            amountClass: 'simply-amount', // amount css class
            wordClass: 'simply-word' // word css class
    });
```

### You can use it with jQuery too (not required)

```javascript 
// jQuery Example 
$('#elementId').simplyCountdown({ 
    year: 2015, // required 
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
