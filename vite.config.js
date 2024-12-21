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
      usePolling: true,
      include: [
        'src/**',
        'demo/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo')
    }
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
      input: path.resolve(__dirname, 'demo/index.html'),
      output: {
        dir: 'docs',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        format: 'es',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (ext === 'css') {
            return 'assets/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
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
      name: 'post-build',
      closeBundle: async () => {
        // Copier le fichier IIFE de la lib dans docs/assets
        await fs.copy(
          path.resolve(__dirname, 'dist/simplyCountdown.iife.js'),
          path.resolve(__dirname, 'docs/assets/simplyCountdown.iife.js')
        );
        
        // Déplacer index.html à la racine de docs
        const indexPath = path.resolve(__dirname, 'docs/demo/index.html');
        if (await fs.pathExists(indexPath)) {
          const content = await fs.readFile(indexPath, 'utf-8');
          // Ajuster les chemins relatifs
          const updatedContent = content
            .replace(/src="\.?\/?/g, 'src="')
            .replace(/href="\.?\/?/g, 'href="')
            .replace(/assets\/assets\//g, 'assets/')
            .replace(
              'src="https://code.jquery.com/jquery-1.11.3.min.js"',
              'src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"'
            )
            .replace(
              'src="https://cdnjs.cloudflare.com/ajax/libs/prism/0.0.1/prism.min.js"',
              'src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"'
            );
          
          await fs.writeFile(path.resolve(__dirname, 'docs/index.html'), updatedContent);
          await fs.remove(path.resolve(__dirname, 'docs/demo'));
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: '/demo/index.html',
    watch: {
      usePolling: true,
      include: [
        'src/**',
        'demo/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo')
    }
  }
};

export default defineConfig(process.env.BUILD_TYPE === 'docs' ? docsConfig : libConfig);
