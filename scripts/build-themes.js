import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import CleanCSS from "clean-css";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const themesDir = join(rootDir, "src", "themes");
const distThemesDir = join(rootDir, "dist", "themes");

// Ensure the dist/themes directory exists
fs.ensureDirSync(distThemesDir);

// Clean CSS instance for minification
const minifier = new CleanCSS({
    level: {
        1: {
            all: true,
        },
        2: {
            all: true,
        },
    },
    format: false, // This ensures one-line output
});

// Process all CSS files in the themes directory
async function buildThemes() {
    const themeFiles = await fs.readdir(themesDir);

    for (const file of themeFiles) {
        if (!file.endsWith(".css")) continue;

        const sourcePath = join(themesDir, file);
        const cssContent = await fs.readFile(sourcePath, "utf8");

        // Copy original file
        await fs.copyFile(sourcePath, join(distThemesDir, file));

        // Create minified version
        const minified = minifier.minify(cssContent);
        const minFileName = file.replace(".css", ".min.css");
        await fs.writeFile(join(distThemesDir, minFileName), minified.styles);

        console.log(`✓ Processed ${file}`);
    }

    console.log("\nThemes build completed! 🎉");
}

buildThemes().catch(console.error);
