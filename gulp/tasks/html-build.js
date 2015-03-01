'use strict';

var gulp            = require('gulp');
var config          = require('../config').html;
var ejs             = require('gulp-ejs');
var handleErrors    = require('../handleErrors');

gulp.task('html-build', function() {
    return gulp.src(config.src)
    .pipe(ejs({
        production: false
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
