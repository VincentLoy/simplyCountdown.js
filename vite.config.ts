import { defineConfig } from "vite";
import { resolve } from "path";
import pkg from "./package.json";
import { replaceCodePlugin } from "vite-plugin-replace";

// Configuration commune
const commonConfig = {
    sourcemap: true,
};

const commonPlugins = [
    replaceCodePlugin({
        replacements: [
            {
                from: /__SCD_BUILD_DATE__/g,
                to: new Date().toISOString().split("T")[0],
            },
            {
                from: /__SCD_VERSION__/g,
                to: pkg.version,
            },
        ],
    }),
];

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
    plugins: commonPlugins,
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
    plugins: commonPlugins,
});

// Configuration pour la documentation
const docsConfig = defineConfig({
    root: "docs/src",
    base: "./",
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
                assetFileNames: (assetInfo) => {
                    // here deprecated stuff, should improve later, maybe I misunderstood something
                    if (assetInfo.originalFileName?.includes("public/favicon")) {
                        return "favicon/[name][extname]";
                    } else if (assetInfo.name?.includes(".css")) {
                        return "assets/[name].min.[extname]";
                    }
                    return "ssssss/[name][extname]";
                },
            },
        },
    },
    plugins: commonPlugins,
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
