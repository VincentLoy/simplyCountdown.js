// Import UnoCSS
import 'uno.css'
import '@unocss/reset/tailwind.css'

// Import styles
import './css/simplyCountdown.theme.default.css'
import './css/simplyCountdown.theme.dark.css'
import './css/simplyCountdown.theme.cyberpunk.css'
import './css/simplyCountdown.theme.losange.css'

// Import the library and demo
import simplyCountdown from '../src/simplyCountdown.js'
import './js/demo.js'

// Make it available globally for the demo
window.simplyCountdown = simplyCountdown
