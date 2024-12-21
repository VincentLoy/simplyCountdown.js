import { defineConfig } from 'unocss'
import { presetWind } from '@unocss/preset-wind'
import { presetAttributify } from '@unocss/preset-attributify'
import { presetTypography } from '@unocss/preset-typography'
import { presetIcons } from '@unocss/preset-icons'
import { presetUno } from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetWind(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  preflights: [
    {
      getCSS: () => `
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        img,
        picture,
        video,
        canvas,
        svg {
          display: block;
          max-width: 100%;
        }

        input,
        button,
        textarea,
        select {
          font: inherit;
        }

        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          overflow-wrap: break-word;
        }
      `
    }
  ],
  theme: {
    colors: {
      'main': '#3F72AF',
      'main-dark': '#112D4E',
      'main-light': '#6995ca',
      'secondary': '#F9F7F7',
      'secondary-dark': '#DBE2EF',
      'dark': '#112D4E',
      'light': '#DBE2EF',
      'lighter': '#F9F7F7'
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'wix': ['Wix Madefor Text', 'sans-serif'],
    },
  },
  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg bg-main text-white hover:bg-main-dark transition-colors',
    'section-title': 'text-3xl font-bold text-main-dark mb-6',
    'container': 'max-w-6xl mx-auto px-4',
  }
})
