'use strict';

var gulp    = require('gulp');
var config  = require('../config').html;
var ejs     = require('gulp-ejs');

gulp.task('html-build', function() {
    return gulp.src(config.src)
    .pipe(ejs({
        production: false
    }))
    .pipe(gulp.dest(config.dest));
});
