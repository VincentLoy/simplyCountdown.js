// Import UnoCSS
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

// Import styles
import './css/demo.css'
import './css/simplyCountdown.theme.default.css'
import './css/simplyCountdown.theme.dark.css'
import './css/simplyCountdown.theme.cyberpunk.css'
import './css/simplyCountdown.theme.losange.css'

// Import the library
import simplyCountdown from '/src/simplyCountdown.js'

// Make it available globally for the demo
window.simplyCountdown = simplyCountdown

// Wait for jQuery to be loaded
const checkJQuery = setInterval(() => {
    if (window.jQuery) {
        clearInterval(checkJQuery)
        // Initialize demo
        import('./js/demo.js')
    }
}, 100)
