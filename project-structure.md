# simplyCountdown Project Structure

```
.
├── src
│   ├── core
│   │   ├── dom.ts
│   │   ├── simplyCountdown.ts
│   │   └── simplyCountdown.umd.ts
│   ├── themes
│   │   ├── circle.css
│   │   ├── cyber.css
│   │   ├── dark.css
│   │   ├── default.css
│   │   └── losange.css
│   └── types
│       └── index.d.ts
│
├── dist
│   ├── themes
│   │   ├── ALL BUILT THEMES, both minified and unminified
│   ├── simplyCountdown.js
│   ├── simplyCountdown.js.map
│   ├── simplyCountdown.umd.js
│   └── simplyCountdown.umd.js.map
│
├── dist_tests
│   ├── index.es.html
│   ├── index.umd-amd.html
│   ├── index.umd-commonjs.html
│   ├── index.umd-dynamic.html
│   └── index.umd-global.html
│
├── docs
│   ├── src
│   │   ├── assets
│   │   │   ├── js
│   │   │   │   ├── examples.js
│   │   │   │   └── highlight.js
│   │   │   └── styles
│   │   │       ├── highlight.css
│   │   │       └── main.css
│   │   ├── index.html
│   │   ├── main.js
│   │   └── style.css
│   └── dist
│       └── assets
│           ├── main.min.css
│           ├── main.min.js
│           └── main.min.js.map
│
├── scripts
│   ├── build-themes.js
│   ├── generate-dist-tests.js
│   └── server.test.js
│
├── bun.lockb
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── LICENSE
└── README.md
```

## Build Outputs

### Library Build (/dist)

-   ES module and UMD formats with source maps
-   Minified and unminified theme CSS files
-   Zero dependencies

### Documentation Build (/docs/dist)

-   Static documentation site
-   Minified assets (CSS/JS)
-   Source maps for debugging
