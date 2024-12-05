/*jslint node: true, for */

"use strict";

import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import babel from "gulp-babel";
import autoprefixer from "gulp-autoprefixer";
import cssCompressor from "gulp-csso";
import terser from "gulp-terser";
import eslint from "gulp-eslint";
import saveLicense from "uglify-save-license";
import browserSyncPackage from "browser-sync";
import concat from "gulp-concat";

const browserSync = browserSyncPackage.create();
const sass = gulpSass(dartSass);
const browserChoice = "default";

/**
 * Build the demo Sass styles
 */
export function buildScssDemo() {
    return gulp.src("css/scss/demo.scss")
        .pipe(sass({ precision: 10 }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cssCompressor({ restructure: false }))
        .pipe(gulp.dest("css"));
}

/**
 * Build the themes Sass styles
 */
export function buildScssThemes() {
    return gulp.src("css/scss/simplyCountdown.theme.*.scss")
        .pipe(sass({ precision: 10 }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cssCompressor({ restructure: false }))
        .pipe(gulp.dest("css"));
}

/**
 * Transpile the lib from ES6 to ES5
 */
export function buildEs6() {
    return gulp.src("dev/simplyCountdown.js")
        .pipe(concat("simplyCountdown.min.js"))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(terser({
            output: {
                comments: saveLicense
            }
        }))
        .pipe(gulp.dest("dist"));
}

/**
 * Lint ES6
 */
export function lintEs6() {
    return gulp.src("dev/simplyCountdown.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

/**
 * Lint without breaking
 */
export function lintNoBreakEs6() {
    return gulp.src("dev/simplyCountdown.js")
        .pipe(eslint())
        .pipe(eslint.format());
}

/**
 * Reload Browser
 */
export function reload(done) {
    browserSync.reload();
    done();
}

/**
 * Serve with BrowserSync
 */
export function serve() {
    browserSync.init({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        browser: browserChoice,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("dev/**/*.js", gulp.series(lintNoBreakEs6, buildEs6, reload));
    gulp.watch("css/scss/**/*", gulp.series(buildScssDemo, buildScssThemes, reload));
    gulp.watch("./**/*.html", gulp.series(reload));
}

// Default Task
export default gulp.series(buildScssDemo, buildScssThemes, lintNoBreakEs6, buildEs6, serve);

// Serve Task
export const serveTask = gulp.series(buildScssDemo, buildScssThemes, lintNoBreakEs6, buildEs6, serve);

// Build Task
export const build = gulp.series(buildScssDemo, buildScssThemes, lintEs6, buildEs6);
