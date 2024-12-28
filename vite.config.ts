import { defineConfig } from "vite";
import { resolve } from "path";

// Configuration commune
const commonConfig = {
    sourcemap: true,
};

// Configuration pour le build ES
const esConfig = defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: true,
        ...commonConfig,
        lib: {
            entry: resolve(__dirname, "src/core/simplyCountdown.ts"),
            formats: ["es"],
            fileName: () => "simplyCountdown.js",
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") {
                        return "themes/[name][extname]";
                    }
                    return "[name][extname]";
                },
            },
        },
    },
});

// Configuration pour le build UMD
const umdConfig = defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: false,
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
        ...commonConfig,
        lib: {
            entry: resolve(__dirname, "src/core/simplyCountdown.umd.ts"),
            name: "simplyCountdown",
            formats: ["umd"],
            fileName: () => "simplyCountdown.umd.js",
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") {
                        return "themes/[name][extname]";
                    }
                    return "[name][extname]";
                },
                format: "umd",
                name: "simplyCountdown",
                amd: {
                    id: "simplyCountdown",
                },
            },
        },
    },
});

// Configuration pour la documentation
const docsConfig = defineConfig({
    root: "docs/src",
    publicDir: resolve(__dirname, "docs/src/public"),
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "docs/src/index.html"),
            },
            output: {
                entryFileNames: "assets/[name].min.js",
                chunkFileNames: "assets/[name].min.js",
                assetFileNames: "assets/[name].min.[ext]",
            },
        },
    },
});

// Export la configuration en fonction du mode
export default ({ mode }: { mode?: string }) => {
    if (mode === "docs") {
        return docsConfig;
    }
    if (mode === "umd") {
        return umdConfig;
    }
    return esConfig;
};
