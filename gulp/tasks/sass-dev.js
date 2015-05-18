/**
 * Compiles sass sources for development.
 */
'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var handleErrors    = require('../handleErrors');
var config          = require('../config');

gulp.task('sass-dev', ['sass-importall'], function() {
    return gulp.src(config.srcDir + config.sass.subDir + config.sass.files)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.settings))
        .on('error', handleErrors)
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer(config.sass.autoprefixer))
        .on('error', handleErrors)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.devTempDir + config.sass.targetDir));
});
