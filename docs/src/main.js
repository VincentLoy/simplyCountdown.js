// Import styles
import './style.css'

// Import highlight.js
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github-dark.css'

// Import our countdown library and themes
import '../../src/themes/default.css'
import '../../src/themes/dark.css'
import '../../src/themes/cyber.css'
import '../../src/themes/losange.css'
import { simplyCountdown } from '../../src/core/simplyCountdown.js'

// Configure highlight.js
hljs.registerLanguage('javascript', javascript)
hljs.highlightAll()

// Configuration des exemples
const nextYear = new Date().getFullYear() + 1

// Example 1: Default Theme
simplyCountdown('.simply-countdown-one', {
    year: nextYear,
    month: 6,
    day: 28,
})

// Example 2: Dark Theme without Zero Units
simplyCountdown('.simply-countdown-two', {
    year: nextYear,
    month: 6,
    day: 28,
    zeroPad: false,
})

// Example 3: Inline
simplyCountdown('.simply-countdown-inline', {
    year: nextYear,
    month: 6,
    day: 28,
    inline: true,
})

// Example 4: Count Up with Cyberpunk Theme
simplyCountdown('.simply-countdown-countup', {
    year: 2023,
    month: 1,
    day: 1,
    countUp: true,
})

// Example 5: Losange Theme
simplyCountdown('#simply-countdown-losange', {
    year: nextYear,
    month: 6,
    day: 28,
})