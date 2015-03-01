'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var handleErrors    = require('../handleErrors');
var config          = require('../config').sass;
var minify          = require('gulp-minify-css');

gulp.task('sass-dist', function() {
    return gulp.src(config.src)
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(autoprefixer(config.autoprefixer))
        .on('error', handleErrors)
        .pipe(minify())
        .pipe(gulp.dest(config.dist));
});
