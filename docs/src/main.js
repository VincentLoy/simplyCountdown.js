// Import styles
import './style.css'

// Import highlight.js
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import elm from 'highlight.js/lib/languages/elm'
import bash from 'highlight.js/lib/languages/bash'
import 'highlight.js/styles/github-dark.css'

// Import our countdown library and themes
import '../../src/themes/default.css'
import '../../src/themes/dark.css'
import '../../src/themes/cyber.css'
import '../../src/themes/losange.css'
import { simplyCountdown } from '../../src/core/simplyCountdown.js'

// Configure highlight.js
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('elm', elm)
hljs.registerLanguage('css', css)
hljs.registerLanguage('bash', bash)
hljs.highlightAll()

// Package manager switcher
document.querySelectorAll('.package-manager-btn').forEach(button => {
    button.addEventListener('click', () => {
        const manager = button.dataset.manager
        
        // Update buttons
        document.querySelectorAll('.package-manager-btn').forEach(btn => {
            btn.classList.toggle('active', btn === button)
        })
        
        // Update content
        document.querySelectorAll('.package-manager-content').forEach(content => {
            content.classList.toggle('active', content.dataset.manager === manager)
        })
    })
})

// Copy button functionality
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', async () => {
        const pre = button.closest('.relative').querySelector('pre.active code')
        const text = pre.textContent
        
        try {
            await navigator.clipboard.writeText(text)
            button.dataset.copied = true
            
            setTimeout(() => {
                delete button.dataset.copied
            }, 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    })
})

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