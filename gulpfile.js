/**
 * Project : SimplyCountdown
 * File : gulpfile
 * Date : 06/20/2015
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 */

/*jslint indent: 4, maxlen: 100, node: true, vars: true, nomen: true */

(function () {
    'use strict';

    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        less = require('gulp-less'),
        minifyCSS = require('gulp-minify-css'),
        sourcemaps = require('gulp-sourcemaps'),
        plumber = require('gulp-plumber'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        browserSync = require('browser-sync'),
        targetCSSDir = 'css',
        targetLESSDir = targetCSSDir + '/less',
        devJSDir = 'dev',
        distJSDir = 'dist';


    // Compile Less
    // and save to target CSS directory
    gulp.task('css', function () {
        return gulp.src(targetLESSDir + '/demo.less')
            .pipe(plumber())
            .pipe(less({style: 'compressed'})
                .on('error', gutil.log))
            .pipe(sourcemaps.init())
            .pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(targetCSSDir));
    });

    gulp.task('compile-themes', function () {
        return gulp.src(targetLESSDir + '/simplyCountdown.theme.*.less')
            .pipe(plumber())
            .pipe(less({style: 'compressed'})
                .on('error', gutil.log))
            .pipe(sourcemaps.init())
            //.pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(targetCSSDir));
    });

    gulp.task('compress', function () {
        return gulp.src(devJSDir + '/simplyCountdown.js')
            .pipe(sourcemaps.init())
            .pipe(uglify({
                preserveComments: 'some'
            }))
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(distJSDir));
    });

    gulp.task('serve', ['css', 'compress'], function () {
        browserSync.init({
            open: false,
            server: {
                baseDir: './'
            }
        });

        gulp.watch(devJSDir + '/simplyCountdown.js', ['compress']);
        gulp.watch(targetLESSDir + '/**/*.less', ['css', 'compile-themes']);
        gulp.watch(['*.html', targetLESSDir + '/**/*.less', devJSDir + '/simplyCountdown.js'])
            .on('change', browserSync.reload);
    });

    // Keep an eye on Less
    //gulp.task('watch', function () {
    //    gulp.watch(targetLESSDir + '/**/*.less', ['css', 'compile-themes']);
    //});

    // What tasks does running gulp trigger?
    gulp.task('default', ['css', 'compile-themes', 'serve']);

    //To uglify the new version of simplyCountdown run : gulp release or gulp compress
    gulp.task('release', ['compress']);
}());
