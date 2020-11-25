/*jslint node: true, for */

"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const cssCompressor = require("gulp-csso");
const terser = require("gulp-terser");
const eslint = require("gulp-eslint");
const saveLicense = require("uglify-save-license");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const browserChoice = "default";

/**
 * Build the demo sass styles
 */
function buildScssDemo() {
    return gulp.src("css/scss/demo.scss")
        .pipe(sass({
            precision: 10
        }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cssCompressor({
            restructure: false
        }))
        .pipe(gulp.dest("css"));
}

/**
 * Build the themes sass styles
 */
function buildScssThemes() {
    return gulp.src("css/scss/simplyCountdown.theme.*.scss")
        .pipe(sass({
            precision: 10
        }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cssCompressor({
            restructure: false
        }))
        .pipe(gulp.dest("css"));
}

/**
 * Transpile the lib from es6 to es5
 */
function buildEs6() {
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

function lintEs6() {
    return gulp.src("dev/simplyCountdown.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function lintNoBreakEs6() {
    return gulp.src("dev/simplyCountdown.js")
        .pipe(eslint())
        .pipe(eslint.format());
}


/**
 *  SERVE
 *  Take a coffee, relax, and write some code
 */
function reload(done) {
    browserSync.reload();
    done();
}

function serve() {
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

exports.default = gulp.series(buildScssDemo, buildScssThemes, lintNoBreakEs6, buildEs6, serve);
exports.serve = gulp.series(buildScssDemo, buildScssThemes, lintNoBreakEs6, buildEs6, serve);
exports.build = gulp.series(buildScssDemo, buildScssThemes, lintEs6, buildEs6);
