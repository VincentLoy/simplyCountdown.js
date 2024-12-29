import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetYear = new Date().getFullYear() + 1;

// Configuration commune pour tous les tests
const commonHtml = (type, content) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SimplyCountdown.js - ${type} Test</title>
    <link rel="stylesheet" href="../dist/themes/default.min.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
            line-height: 1.5;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 0.5rem;
            font-size: 1.6rem;
            text-align: center;
        }
        nav {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
        }
        nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        nav li {
            margin: 0.5rem 0;
        }
        nav a {
            color: #0366d6;
            text-decoration: none;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            transition: all 0.2s ease;
        }
        nav a:hover {
            background: #e1e4e8;
            text-decoration: none;
        }
        nav a.active {
            background: #0366d6;
            color: white;
        }
        nav a.active:hover {
            background: #0356c6;
        }
        #countdown {
            margin: 2rem auto;
            text-align: center;
        }
        hr {
            border: none;
            border-top: 1px solid #eee;
            margin: 2rem 0;
        }
    </style>
</head>
<body>
    <h1>SimplyCountdown.js - ${type} Test</h1>
    <hr>
    <nav>
        <ul>
            <li><a href="index.es.html" ${type === "ES Module" ? 'class="active"' : ""}>ES Module version</a></li>
            <li><a href="index.umd-global.html" ${type === "UMD (Global)" ? 'class="active"' : ""}>UMD (global)</a></li>
            <li><a href="index.umd-amd.html" ${type === "UMD (AMD/RequireJS)" ? 'class="active"' : ""}>UMD (AMD/RequireJS)</a></li>
            <li><a href="index.umd-commonjs.html" ${type === "CommonJS (Node.js-like)" ? 'class="active"' : ""}>UMD (CommonJS/Node.js-like)</a></li>
            <li><a href="index.umd-dynamic.html" ${type === "Dynamic Loading" ? 'class="active"' : ""}>UMD (Dynamic Loading)</a></li>
        </ul>
    </nav>
    <div id="countdown" class="simply-countdown"></div>
    ${content}
</body>
</html>`;
};

// Test ES Module natif
const esTest = commonHtml(
    "ES Module",
    `
    <script type="module">
        import simplyCountdown from '../dist/simplyCountdown.js';
        simplyCountdown('#countdown', {
            year: ${targetYear},
            month: 12,
            day: 25
        });
    </script>
`
);

// Test UMD Global
const umdGlobalTest = commonHtml(
    "UMD (Global)",
    `
    <script src="../dist/simplyCountdown.umd.js"></script>
    <script>
        simplyCountdown('#countdown', {
            year: ${targetYear},
            month: 12,
            day: 25
        });
    </script>
`
);

// Test UMD avec AMD (RequireJS)
const umdAmdTest = commonHtml(
    "UMD (AMD/RequireJS)",
    `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.7/require.min.js"></script>
    <script>
        // Configuration de RequireJS
        requirejs.config({
            baseUrl: '../dist',
            paths: {
                'simplyCountdown': 'simplyCountdown.umd'
            }
        });

        // module usecase
        requirejs(['simplyCountdown'], function(simplyCountdown) {
            console.log('Module Loaded:', simplyCountdown);
            if (typeof simplyCountdown === 'function') {
                simplyCountdown('#countdown', {
                    year: ${targetYear},
                    month: 12,
                    day: 25
                });
            } else {
                console.error("simplyCountdown is not a function:", simplyCountdown);
            }
        });
    </script>
`
);

// Test CommonJS (Node.js)
const commonJsTest = commonHtml(
    "CommonJS (Node.js-like)",
    `
    <script>
        // Simulate CommonJS/Node.js environment
        var require = function(modulePath) {
            if (typeof module !== 'undefined' && module.exports) {
                return module.exports;
            }
            throw new Error('Module not found: ' + modulePath);
        };
        var module = { exports: {} };
        var exports = module.exports;
    </script>
    <script src="../dist/simplyCountdown.umd.js"></script>
    <script>
        try {
            // Use require syntax as shown in README
            var simplyCountdown = require('simplycountdown');
            console.log('Module loaded via require():', simplyCountdown);

            if (typeof simplyCountdown === 'function') {
                simplyCountdown('#countdown', {
                    year: ${targetYear},
                    month: 12,
                    day: 25
                });
                console.log('✅ Countdown initialized successfully');
            } else {
                console.error('❌ simplyCountdown is not a function:', simplyCountdown);
            }
        } catch (error) {
            console.error('❌ Error loading module:', error);
        }
    </script>
`
);

// Test Dynamic Loading
const dynamicLoadingTest = commonHtml(
    "Dynamic Loading",
    `
    <script>
        // Create script element
        var script = document.createElement('script');
        script.src = '../dist/simplyCountdown.umd.js';

        // Handle script load event
        script.onload = function() {
            console.log('Script loaded dynamically');

            // Use the global simplyCountdown
            if (typeof simplyCountdown === 'function') {
                simplyCountdown('#countdown', {
                    year: ${targetYear},
                    month: 12,
                    day: 25
                });
            } else {
                console.error("simplyCountdown is not a function:", simplyCountdown);
            }
        };

        // Handle loading error
        script.onerror = function() {
            console.error('Failed to load script');
        };

        // Append script to document
        document.head.appendChild(script);
    </script>
`
);

// Générer tous les fichiers de test
const tests = {
    "index.es.html": esTest,
    "index.umd-global.html": umdGlobalTest,
    "index.umd-amd.html": umdAmdTest,
    "index.umd-commonjs.html": commonJsTest,
    "index.umd-dynamic.html": dynamicLoadingTest,
};

// Créer le dossier dist_tests s'il n'existe pas
const testDir = path.join(__dirname, "..", "dist_tests");
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
}

// Générer tous les fichiers
Object.entries(tests).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(testDir, filename), content);
});
