/**
 * Compiles & bundles sass sources for production.
 * This task will fail on any compiler error!
 */
'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var config          = require('../config');
var minify          = require('gulp-minify-css');

gulp.task('sass-build', ['scsslint', 'sass-importall'], function() {
    return gulp.src(config.srcDir + config.sass.subDir + config.sass.files)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.settings))
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildTargetDir + config.sass.targetDir));
});
