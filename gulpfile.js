/*jslint node: true, for */

'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    cssCompressor = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    saveLicense = require('uglify-save-license'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    reload = browserSync.reload,
    browserChoice = 'default';

const buildScss = function (filePath) {
    return gulp.src(filePath)
        .pipe(sass({
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(cssCompressor({
            restructure: false,
        }))
        .pipe(gulp.dest('css'));
};

/**
 * Build the demo sass styles
 */
gulp.task('build:scss:demo', function () {
    buildScss('css/scss/demo.scss');
});

/**
 * Build the themes sass styles
 */
gulp.task('build:scss:themes', function () {
    buildScss('css/scss/simplyCountdown.theme.*.scss');
});

/**
 * Transpile the lib from es6 to es5
 */
gulp.task('build:es6', function () {
    return gulp.src('dev/simplyCountdown.js')
        .pipe(concat('simplyCountdown.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            output: {
                comments: saveLicense,
            },
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * BUILD
 * Build everything Sass & JS
 */
gulp.task('build', [
    'build:scss:demo',
    'build:scss:themes',
    'build:es6',
]);


/**
 *  SERVE
 *  Take a coffee, relax, and write some code
 */
gulp.task('serve', ['build:scss:demo', 'build:scss:themes', 'build:es6'], function () {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        browser: browserChoice,
        server: {
            baseDir: './'
        }
    });

    gulp.watch('dev/**/*.js', ['build:es6'])
        .on('change', reload);

    gulp.watch('css/scss/**/*', ['build:scss:demo', 'build:scss:themes'])
        .on('change', reload);

    gulp.watch('./**/*.php')
        .on('change', reload);
});
