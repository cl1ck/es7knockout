'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var handleErrors    = require('../handleErrors');
var config          = require('../config').sass;

gulp.task('sass', ['scsslint'], function() {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', function() {
            // ignore error (usually already thrown by scsslint)
            this.emit('end');
        })
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer(config.autoprefixer))
        .on('error', handleErrors)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
        .on('error', handleErrors);
});
