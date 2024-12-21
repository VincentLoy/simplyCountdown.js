import { defineConfig } from 'vite';
import path from 'path';
import UnoCSS from 'unocss/vite';
import { presetWind, presetIcons, presetTypography } from 'unocss';
import fs from 'fs-extra';

// Configuration pour le build de la librairie
const libConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/simplyCountdown.js'),
      name: 'simplyCountdown',
      fileName: (format) => `simplyCountdown.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  plugins: [
    UnoCSS({
      mode: 'global',
      presets: [
        presetWind(),
        presetIcons({
          cdn: 'https://esm.sh/'
        }),
        presetTypography()
      ],
      shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
        'btn-primary': 'text-white bg-indigo-500 hover:bg-indigo-700'
      }
    })
  ],
  server: {
    port: 3000,
    open: '/demo/index.html',
    watch: {
      include: ['src/**', 'demo/**'],
      usePolling: true
    },
    hmr: {
      overlay: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo'),
      'simplyCountdown': path.resolve(__dirname, './src/simplyCountdown.js')
    }
  },
  optimizeDeps: {
    include: ['src/simplyCountdown.js']
  }
};

// Configuration pour le build de la documentation
const docsConfig = {
  root: '.',
  base: '',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'demo/index.html')
      },
      output: {
        dir: 'docs',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    UnoCSS({
      mode: 'global',
      presets: [
        presetWind(),
        presetIcons({
          cdn: 'https://esm.sh/'
        }),
        presetTypography()
      ],
      shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
        'btn-primary': 'text-white bg-indigo-500 hover:bg-indigo-700'
      }
    }),
    {
      name: 'pre-build',
      buildStart: async () => {
        // Créer le dossier assets s'il n'existe pas
        await fs.ensureDir(path.resolve(__dirname, 'demo/assets'));
        
        // Copier simplyCountdown.js dans les assets de la démo
        await fs.copy(
          path.resolve(__dirname, 'src/simplyCountdown.js'),
          path.resolve(__dirname, 'demo/assets/simplyCountdown.js')
        );
      }
    },
    {
      name: 'post-build',
      closeBundle: async () => {
        // Copier le fichier IIFE
        await fs.copy(
          path.resolve(__dirname, 'dist/simplyCountdown.iife.js'),
          path.resolve(__dirname, 'docs/assets/simplyCountdown.iife.js')
        );

        // Déplacer index.html à la racine de docs
        const indexPath = path.resolve(__dirname, 'docs/demo/index.html');
        if (await fs.pathExists(indexPath)) {
          const content = await fs.readFile(indexPath, 'utf-8');
          // Ajuster les chemins relatifs et ajouter le script IIFE
          const updatedContent = content
            .replace(/src="\.?\/?/g, 'src="')
            .replace(/href="\.?\/?/g, 'href="')
            .replace(/assets\/assets\//g, 'assets/')
            .replace(
              '<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>',
              '<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>\n    <script src="assets/simplyCountdown.iife.js"></script>'
            );
          
          await fs.writeFile(path.resolve(__dirname, 'docs/index.html'), updatedContent);
          await fs.remove(path.resolve(__dirname, 'docs/demo'));
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo'),
      'simplyCountdown': path.resolve(__dirname, './src/simplyCountdown.js')
    }
  },
  optimizeDeps: {
    include: ['src/simplyCountdown.js']
  }
};

export default defineConfig(process.env.BUILD_TYPE === 'docs' ? docsConfig : libConfig);
