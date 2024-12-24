import { defineConfig } from 'vite';
import { resolve } from 'path';

// Configuration pour le build de la librairie
const libraryConfig = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/core/simplyCountdown.ts'),
            name: 'simplyCountdown',
            formats: ['es', 'umd', 'iife'],
            fileName: (format) => `simplyCountdown.${format}.js`
        },
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'themes/[name][extname]';
                    }
                    return '[name][extname]';
                }
            }
        }
    }
});

// Configuration pour la documentation
const docsConfig = defineConfig({
    root: 'docs/src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'docs/src/index.html')
            },
            output: {
                entryFileNames: 'assets/[name].min.js',
                chunkFileNames: 'assets/[name].min.js',
                assetFileNames: 'assets/[name].min.[ext]'
            }
        }
    }
});

// Export la configuration en fonction du mode
export default ({ mode }: { mode?: string }) => {
    if (mode === 'docs') {
        return docsConfig;
    }
    return libraryConfig;
};
