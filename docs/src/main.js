// Import styles
import './style.css'

// Import highlight.js
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import elm from 'highlight.js/lib/languages/elm'
import 'highlight.js/styles/atom-one-dark.css'

// Import our countdown library and themes
import '../../src/themes/default.css'
import '../../src/themes/dark.css'
import '../../src/themes/cyber.css'
import '../../src/themes/losange.css'
import '../../src/themes/circle.css'
import { simplyCountdown } from '../../src/core/simplyCountdown.js'

// Configure highlight.js
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('elm', elm)
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

// Glow effect
const glow = document.createElement('div');
glow.className = 'sc-doc-block-glow';
document.body.appendChild(glow);

let currentBlock = null;
let rafId = null;
let mouseX = 0;
let mouseY = 0;

function updateGlowPosition() {
    if (currentBlock) {
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
        glow.style.opacity = '1';
        rafId = requestAnimationFrame(updateGlowPosition);
    }
}

document.querySelectorAll('.sc-doc-block').forEach(block => {
    block.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!currentBlock) {
            currentBlock = block;
            rafId = requestAnimationFrame(updateGlowPosition);
        }
    });
    
    block.addEventListener('mouseleave', () => {
        currentBlock = null;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        glow.style.opacity = '0';
    });
});

// Configuration des exemples
const now = new Date();
const nextYear = now.getFullYear() + 1
const nextMonth = now.getMonth() + 1

// Example 1: Default Theme
simplyCountdown('.simply-countdown-one', {
    year: now.getFullYear(),
    month: nextMonth,
    day: 28,
    zeroPad: true,
})

// Example 2: Dark Theme without Zero Units
simplyCountdown('.simply-countdown-two', {
    year: now.getFullYear(),
    month: nextMonth,
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
    removeZeroUnits: true,
})

// Example 5: Losange Theme
simplyCountdown('#simply-countdown-losange', {
    year: nextYear,
    month: 6,
    day: 28,
})

// Example 6: Circle Theme
simplyCountdown('.simply-countdown-circle-demo', {
    year: now.getFullYear(),
    month: nextMonth,
    day: 28,
    zeroPad: true,
})