# Structure du Projet simplyCountdown

📦 simplyCountdown
 ┣ 📂 src                     # Code source du plugin
 ┃ ┣ 📂 core                  # Logique principale
 ┃ ┃ ┗ 📜 simplyCountdown.js  # Fichier principal du plugin
 ┃ ┣ 📂 themes               # Thèmes CSS source
 ┃ ┃ ┣ 📜 default.css
 ┃ ┃ ┣ 📜 dark.css
 ┃ ┃ ┣ 📜 cyber.css
 ┃ ┃ ┗ 📜 losange.css
 ┃ ┗ 📂 types                # Types TypeScript
 ┃   ┗ 📜 index.d.ts
 ┃
 ┣ 📂 docs                   # Documentation et environnement de dev
 ┃ ┣ 📂 src                  # Sources de la documentation
 ┃ ┃ ┣ 📂 assets            
 ┃ ┃ ┃ ┣ 📂 styles          # Styles de la doc
 ┃ ┃ ┃ ┃ ┣ 📜 main.css      # Styles principaux
 ┃ ┃ ┃ ┃ ┗ 📜 highlight.css  # Styles pour la coloration syntaxique
 ┃ ┃ ┃ ┣ 📂 js              # Scripts de la doc
 ┃ ┃ ┃ ┃ ┣ 📜 examples.js    # Configuration des exemples
 ┃ ┃ ┃ ┃ ┗ 📜 highlight.js   # Configuration highlight.js
 ┃ ┃ ┃ ┗ 📂 images          # Images de la doc
 ┃ ┃ ┣ 📜 index.html        # Page principale
 ┃ ┃ ┗ 📜 main.js           # Point d'entrée
 ┃ ┃
 ┃ ┗ 📂 dist                # Documentation buildée (site statique)
 ┃   ┣ 📂 assets
 ┃   ┃ ┣ 📜 main.min.js      # JS bundlé et minifié
 ┃   ┃ ┣ 📜 main.min.css     # CSS bundlé et minifié
 ┃   ┃ ┗ 📂 images           # Images optimisées
 ┃   ┣ 📜 index.html         # HTML optimisé
 ┃   ┗ 📜 favicon.ico
 ┃
 ┣ 📂 dist                   # Distribution du plugin
 ┃ ┣ 📂 themes              # Thèmes CSS buildés
 ┃ ┃ ┣ 📜 default.min.css
 ┃ ┃ ┣ 📜 dark.min.css
 ┃ ┃ ┣ 📜 cyber.min.css
 ┃ ┃ ┗ 📜 losange.min.css
 ┃ ┣ 📜 simplyCountdown.es.js      # Version ES Module
 ┃ ┣ 📜 simplyCountdown.es.js.map  # Source map ES
 ┃ ┣ 📜 simplyCountdown.umd.js     # Version UMD
 ┃ ┣ 📜 simplyCountdown.umd.js.map # Source map UMD
 ┃ ┣ 📜 simplyCountdown.iife.js    # Version IIFE
 ┃ ┗ 📜 simplyCountdown.iife.js.map# Source map IIFE
 ┃
 ┣ 📜 .gitignore
 ┣ 📜 package.json           # Configuration npm
 ┣ 📜 package-lock.json
 ┣ 📜 vite.config.js         # Config Vite principale
 ┣ 📜 uno.config.js          # Config UnoCSS
 ┣ 📜 tsconfig.json          # Config TypeScript
 ┣ 📜 LICENSE               # License MIT
 ┗ 📜 README.md             # Documentation principale

## Structure des builds

### Build de la librairie (/dist)
- Formats disponibles : ES Module, UMD, et IIFE
- Source maps pour chaque format
- Thèmes CSS minifiés séparément
- Pas de dépendances externes

### Build de la documentation (/docs/dist)
- Site statique optimisé
- Assets minifiés et bundlés
- Intégration de la dernière version de la librairie
- Exemples interactifs
- Support mobile et responsive
- Optimisation des performances (images, CSS, JS)
